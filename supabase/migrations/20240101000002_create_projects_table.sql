-- supabase/migrations/20240101000002_create_projects_table.sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members can manage projects in their tenants" ON projects
  FOR ALL
  USING (tenant_id IN (SELECT ut.tenant_id FROM user_tenants ut WHERE ut.user_id = auth.uid()))
  WITH CHECK (tenant_id IN (SELECT ut.tenant_id FROM user_tenants ut WHERE ut.user_id = auth.uid()));
