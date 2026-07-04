-- Consolidated schema for Bugfree.dev
-- Run in: Supabase Dashboard → SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- STORAGE BUCKETS
-- ============================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('project-images', 'project-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('project-videos', 'project-videos', true, 104857600, ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'])
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  logo_text TEXT NOT NULL DEFAULT 'getcodefree.tech',
  company_name TEXT NOT NULL DEFAULT 'BugFree.dev',
  company_description TEXT,
  primary_email TEXT,
  phone_numbers TEXT[],
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS nav_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  href TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hero_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  badge_text TEXT,
  headline TEXT NOT NULL,
  headline_highlight TEXT,
  subheadline TEXT,
  cta_text TEXT NOT NULL DEFAULT 'Get Started',
  cta_link TEXT NOT NULL DEFAULT '#contact',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS about_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_title TEXT NOT NULL,
  section_description TEXT,
  secondary_title TEXT,
  secondary_description TEXT,
  image_url TEXT,
  benefits TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feature_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  tags TEXT[],
  project_url TEXT,
  status TEXT DEFAULT 'In Progress',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS process_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_title TEXT NOT NULL,
  section_description TEXT,
  form_title TEXT,
  contact_description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faq_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS budget_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS footer_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  href TEXT NOT NULL,
  icon_name TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_brief TEXT,
  budget TEXT,
  prototype_url TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  client_title TEXT,
  client_company TEXT,
  client_image_url TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  submitted_via_form BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Public read for landing page content
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON nav_items FOR SELECT USING (true);
CREATE POLICY "Public read access" ON hero_section FOR SELECT USING (true);
CREATE POLICY "Public read access" ON about_section FOR SELECT USING (true);
CREATE POLICY "Public read access" ON feature_cards FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON process_steps FOR SELECT USING (true);
CREATE POLICY "Public read access" ON contact_section FOR SELECT USING (true);
CREATE POLICY "Public read access" ON faq_items FOR SELECT USING (true);
CREATE POLICY "Public read access" ON budget_options FOR SELECT USING (true);
CREATE POLICY "Public read access" ON footer_links FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);

-- Admin full access (authenticated users)
CREATE POLICY "Admin full access" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON nav_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON hero_section FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON about_section FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON feature_cards FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON process_steps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON contact_section FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON faq_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON budget_options FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON footer_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- Contact submissions: public insert, admin full access
CREATE POLICY "Public can submit" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials: public can submit
CREATE POLICY "Public can submit testimonial" ON testimonials FOR INSERT WITH CHECK (true);

-- Admin profiles: self-only access
CREATE POLICY "Users can view own profile" ON admin_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON admin_profiles FOR UPDATE USING (auth.uid() = id);

-- Storage policies
CREATE POLICY "Public read access for project images"
ON storage.objects FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update project images"
ON storage.objects FOR UPDATE USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Public read access for project videos"
ON storage.objects FOR SELECT USING (bucket_id = 'project-videos');

CREATE POLICY "Authenticated users can upload project videos"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-videos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update project videos"
ON storage.objects FOR UPDATE USING (bucket_id = 'project-videos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete project videos"
ON storage.objects FOR DELETE USING (bucket_id = 'project-videos' AND auth.role() = 'authenticated');
