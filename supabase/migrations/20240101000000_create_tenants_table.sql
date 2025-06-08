-- supabase/migrations/20240101000000_create_tenants_table.sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Policies:
-- Allow admin/service role to manage tenants
CREATE POLICY "Allow service_role to manage tenants" ON tenants
  FOR ALL USING (auth.role() = service_role) WITH CHECK (auth.role() = service_role);

CREATE POLICY "Allow authenticated users to read tenants if member" ON tenants
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM user_tenants
      WHERE user_tenants.tenant_id = tenants.id
      AND user_tenants.user_id = auth.uid()
    )
  );
