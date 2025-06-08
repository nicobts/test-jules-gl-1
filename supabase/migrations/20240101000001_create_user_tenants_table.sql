-- supabase/migrations/20240101000001_create_user_tenants_table.sql
CREATE TABLE user_tenants (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT member, -- e.g., admin, member
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, tenant_id)
);

-- Enable RLS
ALTER TABLE user_tenants ENABLE ROW LEVEL SECURITY;

-- Policies:
CREATE POLICY "Users can see their own tenant memberships" ON user_tenants
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tenant membership" ON user_tenants
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Allow service_role to manage user_tenants" ON user_tenants
  FOR ALL USING (auth.role() = service_role) WITH CHECK (auth.role() = service_role);
