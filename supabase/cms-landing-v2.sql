-- CMS Landing v2 — extends schema for full landing-page admin control
-- Run in Supabase SQL Editor after schema.sql

-- ============================================
-- Extend site_settings
-- ============================================
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS tagline TEXT,
  ADD COLUMN IF NOT EXISTS booking_url TEXT,
  ADD COLUMN IF NOT EXISTS booking_email TEXT,
  ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
  ADD COLUMN IF NOT EXISTS github_url TEXT,
  ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- ============================================
-- Extend hero_section
-- ============================================
ALTER TABLE hero_section
  ADD COLUMN IF NOT EXISTS headline_line2 TEXT,
  ADD COLUMN IF NOT EXISTS headline_accent1 TEXT,
  ADD COLUMN IF NOT EXISTS headline_accent2 TEXT,
  ADD COLUMN IF NOT EXISTS secondary_cta_text TEXT,
  ADD COLUMN IF NOT EXISTS secondary_cta_link TEXT,
  ADD COLUMN IF NOT EXISTS panel_label TEXT DEFAULT 'What we ship',
  ADD COLUMN IF NOT EXISTS panel_badge TEXT DEFAULT '6 offers',
  ADD COLUMN IF NOT EXISTS meta_chips JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS panel_cards JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS ticker_items TEXT[] DEFAULT '{}';

-- ============================================
-- Extend feature_cards (about + services)
-- ============================================
ALTER TABLE feature_cards
  ADD COLUMN IF NOT EXISTS section TEXT NOT NULL DEFAULT 'about',
  ADD COLUMN IF NOT EXISTS badge TEXT,
  ADD COLUMN IF NOT EXISTS bullets TEXT[],
  ADD COLUMN IF NOT EXISTS item_key TEXT,
  ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '[]'::jsonb;

-- ============================================
-- Extend process_steps
-- ============================================
ALTER TABLE process_steps
  ADD COLUMN IF NOT EXISTS subtitle TEXT,
  ADD COLUMN IF NOT EXISTS timeline TEXT,
  ADD COLUMN IF NOT EXISTS outcomes TEXT[],
  ADD COLUMN IF NOT EXISTS highlight TEXT,
  ADD COLUMN IF NOT EXISTS phase_number TEXT;

-- ============================================
-- Extend projects
-- ============================================
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS industry TEXT,
  ADD COLUMN IF NOT EXISTS categories TEXT[],
  ADD COLUMN IF NOT EXISTS tagline TEXT;

-- ============================================
-- Section headers (eyebrow / title per block)
-- ============================================
CREATE TABLE IF NOT EXISTS landing_sections (
  key TEXT PRIMARY KEY,
  eyebrow TEXT,
  title TEXT,
  title_highlight TEXT,
  subtitle TEXT,
  extra JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Social proof chips
-- ============================================
CREATE TABLE IF NOT EXISTS social_proof_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_name TEXT NOT NULL DEFAULT 'Rocket',
  label TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Metrics grid
-- ============================================
CREATE TABLE IF NOT EXISTS metrics_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_name TEXT NOT NULL DEFAULT 'Rocket',
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Tech stack pills
-- ============================================
CREATE TABLE IF NOT EXISTS tech_stack_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  row_number INTEGER NOT NULL DEFAULT 1,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Developer profile (singleton)
-- ============================================
CREATE TABLE IF NOT EXISTS developer_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  location TEXT,
  experience TEXT,
  tagline TEXT,
  avatar_initials TEXT,
  avatar_url TEXT,
  section_subtitle TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  approach JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Product preview carousel cards
-- ============================================
CREATE TABLE IF NOT EXISTS product_preview_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  card_type TEXT NOT NULL DEFAULT 'App UI',
  accent_color TEXT DEFAULT '#19d3c5',
  gradient_from TEXT DEFAULT '#0d3d3a',
  gradient_to TEXT DEFAULT '#10161c',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RLS (public read, auth write)
-- ============================================
ALTER TABLE landing_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_proof_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE developer_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_preview_cards ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'landing_sections', 'social_proof_items', 'metrics_items',
    'tech_stack_items', 'developer_profile', 'product_preview_cards'
  ] LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Public read %s" ON %I', tbl, tbl);
    EXECUTE format('CREATE POLICY "Public read %s" ON %I FOR SELECT USING (true)', tbl, tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Auth write %s" ON %I', tbl, tbl);
    EXECUTE format('CREATE POLICY "Auth write %s" ON %I FOR ALL USING (auth.role() = ''authenticated'') WITH CHECK (auth.role() = ''authenticated'')', tbl, tbl);
  END LOOP;
END $$;

-- ============================================
-- Seed landing_sections headers
-- ============================================
INSERT INTO landing_sections (key, eyebrow, title, title_highlight, subtitle) VALUES
  ('product_preview', 'Product UI', 'Interfaces we ship', NULL, 'Dashboards, mobile flows, and admin panels — production-grade from day one.'),
  ('services', 'What we build', 'Six ways we ship', 'fast.', 'From MVP sprints to AI automations — pick the track that matches your stage.'),
  ('process', 'How we work', 'Three phases.', 'One partner.', 'A tested delivery model — not a sales pitch.'),
  ('metrics', 'Why us', 'No inflated logos.', 'Just real numbers.', NULL),
  ('projects', 'Selected builds', 'Shipped products.', 'Real results.', NULL),
  ('about', 'The difference', 'Built differently.', 'On purpose.', NULL),
  ('tech', 'What we build with', 'Frontend · Backend · Mobile · AI · Infrastructure', NULL, NULL),
  ('developer', 'Who builds it', 'Senior engineer. Founder-led.', 'No middlemen.', 'Every project is personally built and overseen by Amitav — a senior full-stack engineer with a decade of experience shipping production applications.'),
  ('testimonials', 'Client stories', 'Founders who shipped', 'with us.', NULL),
  ('contact', 'Get started', 'Ready to ship?', NULL, 'Book a call or send a brief — we respond within 24 hours.')
ON CONFLICT (key) DO UPDATE SET
  eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title,
  title_highlight = EXCLUDED.title_highlight,
  subtitle = EXCLUDED.subtitle,
  updated_at = NOW();

-- ============================================
-- Seed hero (upsert if empty)
-- ============================================
INSERT INTO hero_section (
  badge_text, headline, headline_highlight, headline_line2, headline_accent1, headline_accent2,
  subheadline, cta_text, cta_link, secondary_cta_text, secondary_cta_link,
  panel_label, panel_badge, meta_chips, panel_cards, ticker_items, is_active
)
SELECT
  'For founders who ship — not just plan',
  'Ship your MVP in ',
  '3 weeks.',
  'Automate your ops in ',
  '3 weeks.',
  '5 days.',
  'GetCodeFree builds mobile apps, web platforms, and AI automations for startups and growth-stage businesses — with a lean senior team, production-grade execution, and founder-level speed.',
  'Start a project', '#contact',
  'See shipped work', '#projects',
  'What we ship', '6 offers',
  '[{"icon_name":"Smartphone","label":"Mobile apps"},{"icon_name":"Monitor","label":"Web platforms"},{"icon_name":"Bot","label":"AI automations"},{"icon_name":"ShieldCheck","label":"Production support"}]'::jsonb,
  '[{"title":"MVP Launch Sprint","body":"Scope, design, build, ship. One focused sprint — production-ready MVP in ~3 weeks.","featured":true},{"title":"Full Product Development","body":"From zero to production — design, build, deploy, and monthly support included.","featured":false},{"title":"AI Workflow Automation","body":"Lead gen, content pipelines, CRM sync, and internal copilots shipped in days — not months.","featured":false}]'::jsonb,
  ARRAY['React Native builds','Next.js product teams','LangChain workflows','Python automations','Supabase + Node.js','Founder-led execution','AI agent systems'],
  true
WHERE NOT EXISTS (SELECT 1 FROM hero_section LIMIT 1);

-- ============================================
-- Seed site_settings extras
-- ============================================
UPDATE site_settings SET
  tagline = COALESCE(tagline, 'AI-native product studio'),
  booking_url = COALESCE(booking_url, 'https://cal.com/amitav-panda-c6qrd9/15min'),
  booking_email = COALESCE(booking_email, 'getcodefree.tech@gmail.com'),
  linkedin_url = COALESCE(linkedin_url, 'https://www.linkedin.com/company/getcodefree'),
  github_url = COALESCE(github_url, 'https://github.com/getcodefree'),
  company_name = COALESCE(NULLIF(company_name, 'BugFree.dev'), 'GetCodeFree'),
  company_description = COALESCE(company_description, 'AI-native product engineering studio. We ship mobile apps, web platforms, and AI automations — fast.'),
  primary_email = COALESCE(primary_email, 'hello@getcodefreetech.com')
WHERE id IS NOT NULL;

-- ============================================
-- Seed about feature cards (only if none exist for section=about)
-- ============================================
INSERT INTO feature_cards (section, icon_name, title, description, display_order, is_active)
SELECT * FROM (VALUES
  ('about', 'Brain', 'AI-native, not AI-adjacent', 'Every workflow uses LLM-assisted development, automated QA, and agent-driven processes. Speed without sacrificing quality.', 1, true),
  ('about', 'UserCheck', 'Founder-led execution', 'You speak directly with the person building. No account managers, no PM layers, no handoff lag.', 2, true),
  ('about', 'Award', 'Senior engineers only', 'No juniors on your project. Every engineer has shipped production apps with real users and real scale.', 3, true),
  ('about', 'Gauge', 'Speed as a system, not a promise', 'The 5-week MVP timeline is a tested delivery model. It works because scope, tooling, and workflow are built around it.', 4, true)
) AS v(section, icon_name, title, description, display_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM feature_cards WHERE section = 'about' LIMIT 1);

-- ============================================
-- Seed social proof
-- ============================================
INSERT INTO social_proof_items (icon_name, label, display_order)
SELECT * FROM (VALUES
  ('Rocket', '20+ products built', 1),
  ('Smartphone', '1 live App Store app', 2),
  ('Zap', '3-week average MVP delivery', 3),
  ('Bot', 'AI-native team — not a headcount play', 4),
  ('Lock', 'Senior engineers only', 5)
) AS v(icon_name, label, display_order)
WHERE NOT EXISTS (SELECT 1 FROM social_proof_items LIMIT 1);

-- ============================================
-- Seed metrics
-- ============================================
INSERT INTO metrics_items (icon_name, value, label, description, display_order)
SELECT * FROM (VALUES
  ('Rocket', '20+', 'Products built', 'Web platforms, mobile apps, and AI automations shipped to production.', 1),
  ('Clock', '~3 wk', 'Average MVP delivery', 'From scope to deployed product. Not months — weeks.', 2),
  ('Bot', 'AI-native', 'Development approach', 'Multi-agent workflows, LLM-assisted code review, automated testing.', 3),
  ('Users', '10+ yr', 'Senior engineer experience', 'Every project is led by a senior full-stack engineer.', 4),
  ('ShieldCheck', 'Production-', 'grade from day one', 'Auth, CI/CD, monitoring, security. Not a prototype thrown over the wall.', 5),
  ('Gauge', '1 team', 'Direct partnership', 'You speak directly with the person building. No PM layers.', 6)
) AS v(icon_name, value, label, description, display_order)
WHERE NOT EXISTS (SELECT 1 FROM metrics_items LIMIT 1);

-- ============================================
-- Seed tech stack
-- ============================================
INSERT INTO tech_stack_items (label, row_number, display_order)
SELECT * FROM (VALUES
  ('React', 1, 1), ('Next.js', 1, 2), ('React Native', 1, 3), ('Node.js', 1, 4), ('Python', 1, 5),
  ('LangChain', 2, 1), ('GPT-4o / Claude', 2, 2), ('Supabase', 2, 3), ('PostgreSQL', 2, 4), ('Vercel', 2, 5), ('AWS', 2, 6)
) AS v(label, row_number, display_order)
WHERE NOT EXISTS (SELECT 1 FROM tech_stack_items LIMIT 1);

-- ============================================
-- Seed developer profile
-- ============================================
INSERT INTO developer_profile (name, role, location, experience, tagline, avatar_initials, highlights, approach)
SELECT
  'Amitav Panda',
  'Founder & Senior Full-Stack Engineer',
  'Bengaluru, India',
  '10+ years',
  'I lead every project personally. No account managers, no handoffs — just senior-level execution.',
  'AP',
  '[{"icon_name":"Briefcase","label":"10+ years full-stack development"},{"icon_name":"Code","label":"React, Next.js, Node.js, React Native, Python"},{"icon_name":"Award","label":"AI/ML: LLMs, LangChain, agents, RAG pipelines"},{"icon_name":"GraduationCap","label":"Shipped 20+ products from zero to production"}]'::jsonb,
  '["Every line of code I ship is production-grade — not prototype quality","I use AI workflows to deliver 3x faster without cutting corners","You get direct access. No project manager buffer, no communication lag","I only take projects where I can personally guarantee the outcome"]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM developer_profile LIMIT 1);

-- ============================================
-- Seed product preview cards
-- ============================================
INSERT INTO product_preview_cards (name, card_type, accent_color, gradient_from, gradient_to, display_order)
SELECT * FROM (VALUES
  ('KPI Dashboard', 'App UI', '#19d3c5', '#0d3d3a', '#10161c', 1),
  ('Mobile Onboarding', 'App UI', '#6f8cff', '#1a2240', '#10161c', 2),
  ('Analytics Platform', 'Dashboard', '#19d3c5', '#0f2d30', '#10161c', 3),
  ('Control Panel', 'Dashboard', '#ffb44c', '#2d2010', '#10161c', 4),
  ('Transaction Feed', 'Dashboard', '#a78bfa', '#1e1535', '#10161c', 5),
  ('CRM Overview', 'Dashboard', '#19d3c5', '#0d3d3a', '#10161c', 6),
  ('Chat Interface', 'App UI', '#6f8cff', '#1a2240', '#10161c', 7),
  ('Settings Panel', 'Dashboard', '#34d399', '#0f2d20', '#10161c', 8)
) AS v(name, card_type, accent_color, gradient_from, gradient_to, display_order)
WHERE NOT EXISTS (SELECT 1 FROM product_preview_cards LIMIT 1);
