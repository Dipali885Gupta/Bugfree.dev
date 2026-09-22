-- Partner Network applications
CREATE TABLE IF NOT EXISTS partner_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  whatsapp TEXT,
  linkedin_or_website TEXT,
  work_type TEXT,
  client_types TEXT,
  tech_opportunities TEXT,
  partnership_note TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE partner_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit partners"
  ON partner_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin full access partners"
  ON partner_submissions FOR ALL USING (auth.role() = 'authenticated');
