-- Leads / CRM table for tracking prospective clients
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  source TEXT DEFAULT 'direct',
  source_url TEXT,
  status TEXT DEFAULT 'new',
  priority TEXT DEFAULT 'medium',
  project_type TEXT,
  budget TEXT,
  notes TEXT,
  last_followup_at TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access" ON leads FOR ALL USING (auth.role() = 'authenticated');
