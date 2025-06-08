# Multi-Tenancy Setup with Supabase RLS

This document outlines the multi-tenancy model implemented for this SaaS boilerplate, leveraging Supabases Row Level Security (RLS).

## Model: Shared Database, Shared Schema, RLS

We use a single database with a shared schema (e.g., `public`) for all tenants. Data separation is enforced by RLS policies associated with each relevant table. Each user authenticates normally via Supabase Auth.

## Core Tables

### 1. `tenants`
Stores information about each tenant (organization/workspace).
- `id` (UUID, PK): Unique identifier for the tenant.
- `name` (TEXT): Name of the tenant.
- `created_at` (TIMESTAMPTZ): Timestamp of creation.

**RLS Policies for `tenants`:**
- Service Role: Full access.
- Authenticated Users: Can select tenants they are a member of (via `user_tenants` table). This means a user must be linked to a tenant in `user_tenants` to see that tenants entry in the `tenants` table.

### 2. `user_tenants`
A junction table linking users (`auth.users`) to tenants (`tenants`) and defining their role within that tenant.
- `user_id` (UUID, FK to `auth.users.id`): Users ID.
- `tenant_id` (UUID, FK to `tenants.id`): Tenants ID.
- `role` (TEXT, default member): Users role within the tenant (e.g., admin, member).
- `created_at` (TIMESTAMPTZ): Timestamp of membership creation.
- PK: (`user_id`, `tenant_id`)

**RLS Policies for `user_tenants`:**
- Service Role: Full access.
- Authenticated Users:
    - Can select their own memberships (i.e., see which tenants they belong to and their role).
    - Can delete their own membership (i.e., leave a tenant).
- _Future: Tenant admins (users with admin role in a specific tenant) could be granted permissions to manage other users within their tenant (add/remove/update roles). This requires more complex helper functions and policies._

### 3. `projects` (Example Tenant-Specific Table)
An example table to demonstrate how tenant-specific data is handled.
- `id` (UUID, PK): Unique identifier for the project.
- `tenant_id` (UUID, FK to `tenants.id`): Associates the project with a tenant. **Crucial for RLS.**
- `name` (TEXT): Name of the project.
- `created_by` (UUID, FK to `auth.users.id`): Optional, tracks the user who created the project.
- `created_at` (TIMESTAMPTZ): Timestamp of creation.

**RLS Policies for `projects`:**
- Service Role: Full access (implicitly, as RLS is not bypassed by default for service role unless specific `BYPASS RLS` is used or policies grant it). The current policies are for authenticated users.
- Authenticated Users:
    - Can perform all operations (SELECT, INSERT, UPDATE, DELETE) on projects IF the projects `tenant_id` is one of the tenants they are a member of (as per the `user_tenants` table).
    - This means a user querying the `projects` table will only see and be able to modify projects belonging to tenants they are part of.

## Setting "Current Tenant" Context for RLS

RLS policies often need to know the "active" or "current" tenant for a user, especially if a user can belong to multiple tenants but only acts within one at a time. The provided `projects` table policies use a simpler approach: `tenant_id IN (SELECT ut.tenant_id FROM user_tenants ut WHERE ut.user_id = auth.uid())`. This allows access if the user is a member of the tenant that owns the project, without needing a single "active" tenant.

For scenarios requiring an "active" tenant context (e.g., user switches between workspaces):
1.  **Custom JWT Claims**: When a user logs in or switches tenants, a custom claim (e.g., `active_tenant_id`) can be added to their JWT. Supabase RLS policies can then access this using `current_setting(request.jwt.claims, true)::json->>active_tenant_id`. This requires setting up a custom token hook function in Supabase.
2.  **Session Variables**: The application backend can set a session variable (e.g., `SET app.current_tenant_id = ...;`) at the beginning of each transaction. RLS policies can then use `current_setting(app.current_tenant_id)`. This requires careful management by the application.
3.  **Explicit Filtering**: The application can include `tenant_id = :current_tenant_id` in every query. This makes RLS less "transparent" but is straightforward.

The current setup for `projects` is simpler and works well if users operate concurrently across all their tenants or if the app logic filters further.

## Applying Migrations

These SQL scripts are intended to be used with the Supabase CLI or applied manually via the Supabase Studio SQL editor.
- **Using Supabase CLI**:
  1.  Link your local project to your Supabase project: `supabase link --project-ref YOUR_PROJECT_ID`
  2.  Push database changes: `supabase db push`
- **Manual Application**: Copy and paste the SQL content into the Supabase SQL editor in the correct order.

## Future Considerations
-   **Tenant Provisioning**: Define how tenants are created (e.g., on user signup, by an admin).
-   **User Invitation Flow**: Implement how users are invited and added to tenants.
-   **Role Management**: More granular role definitions and permissions within tenants.
-   **Tenant Switching UI/Logic**: If users can be part of multiple tenants, provide a way for them to switch their active context.
-   **Helper Functions for RLS**: For more complex RLS policies (e.g., role-based access within a tenant), SQL helper functions (like `is_tenant_admin`) will be necessary. These functions should often be `SECURITY DEFINER` to operate with elevated privileges if they need to query tables that the calling user might not have direct access to.
