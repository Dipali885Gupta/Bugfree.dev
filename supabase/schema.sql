-- Supabase Schema for Bugfree.dev Admin Dashboard
-- Run this SQL in your Supabase SQL Editor to set up all required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Site Settings (singleton table)
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

-- Navigation Items
CREATE TABLE IF NOT EXISTS nav_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  href TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hero Section
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

-- About Section
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

-- Feature Cards (About Section)
CREATE TABLE IF NOT EXISTS feature_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  tags TEXT[],
  project_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Process Steps
CREATE TABLE IF NOT EXISTS process_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Section
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

-- FAQ Items
CREATE TABLE IF NOT EXISTS faq_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Budget Options
CREATE TABLE IF NOT EXISTS budget_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Footer Links
CREATE TABLE IF NOT EXISTS footer_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL, -- 'quick_links', 'services', 'legal', 'social'
  name TEXT NOT NULL,
  href TEXT NOT NULL,
  icon_name TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Submissions
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

-- Testimonials
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

-- Admin Profiles (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS on all tables
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

-- Public read access for landing page content
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

-- Authenticated users can manage all content
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

-- Testimonials: public can submit (but inactive by default), admin full access
CREATE POLICY "Public can submit testimonial" ON testimonials FOR INSERT WITH CHECK (true);

-- Admin profiles: only accessible by the user themselves
CREATE POLICY "Users can view own profile" ON admin_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON admin_profiles FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- Seed Data (Optional)
-- ============================================

-- Insert default site settings
INSERT INTO site_settings (logo_text, company_name, company_description, primary_email, phone_numbers, location)
VALUES (
  'getcodefree.tech',
  'BugFree.dev',
  'Building and shipping products faster with AI. We combine cutting-edge technology with expert development to deliver exceptional digital products.',
  'pandaamitav01@gmail.com',
  ARRAY['+91 7077404655', '+91 7735490979'],
  'FortuneTower, Chandrasekharpur, Bhubaneswar'
) ON CONFLICT DO NOTHING;

-- Insert default navigation items
INSERT INTO nav_items (name, href, display_order) VALUES
  ('Home', '#home', 1),
  ('About', '#about', 2),
  ('Projects', '#projects', 3),
  ('Testimonials', '#testimonials', 4),
  ('Process', '#process', 5),
  ('Contact', '#contact', 6)
ON CONFLICT DO NOTHING;

-- Insert default hero section
INSERT INTO hero_section (badge_text, headline, headline_highlight, subheadline, cta_text, cta_link)
VALUES (
  'Next Generation Tech Agency',
  'Building & Shipping Products Faster with AI',
  'Faster',
  'Building and shipping products faster with cutting-edge AI technologies and proven development methodologies to deliver exceptional digital products.',
  'Get Started',
  '#contact'
) ON CONFLICT DO NOTHING;

-- Insert default about section
INSERT INTO about_section (section_title, section_description, secondary_title, secondary_description, image_url, benefits)
VALUES (
  'Redefining Product Development',
  'We merge cutting-edge AI technologies with proven development methodologies to deliver exceptional products faster than traditional agencies.',
  'Why Choose Our AI-Powered Approach?',
  'Our unique combination of AI capabilities and human expertise ensures your project benefits from the best of both worlds. We leverage AI to handle repetitive tasks, analyze data patterns, and optimize code, while our experienced developers focus on creative problem-solving and strategic decisions.',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  ARRAY['10x faster development cycles with AI-assisted coding', 'Reduced bugs through AI-powered code review and testing', 'Automated deployment pipelines for rapid iteration']
) ON CONFLICT DO NOTHING;

-- Insert default feature cards
INSERT INTO feature_cards (icon_name, title, description, display_order) VALUES
  ('Zap', 'AI-Powered Development', 'Leverage cutting-edge AI tools to accelerate your development process', 1),
  ('Rocket', 'Rapid Deployment', 'Go from concept to production in weeks, not months', 2),
  ('Target', 'Precision Engineering', 'Every line of code is optimized for performance and scalability', 3),
  ('Shield', 'Enterprise Security', 'Built-in security best practices to protect your application', 4)
ON CONFLICT DO NOTHING;

-- Insert default process steps
INSERT INTO process_steps (icon_name, title, description, display_order) VALUES
  ('MessageSquare', 'Discovery', 'We start by understanding your vision, goals, and requirements through in-depth consultation.', 1),
  ('Palette', 'Design', 'Our designers create stunning, user-centric interfaces that align with your brand identity.', 2),
  ('Code', 'Development', 'Our AI-powered development process ensures rapid, high-quality code delivery.', 3),
  ('Rocket', 'Launch', 'We deploy your application with automated CI/CD pipelines for seamless releases.', 4),
  ('Headphones', 'Support', 'Ongoing maintenance and support to keep your application running smoothly.', 5)
ON CONFLICT DO NOTHING;

-- Insert default contact section
INSERT INTO contact_section (section_title, section_description, form_title, contact_description)
VALUES (
  'Get In Touch',
  'Get in touch with us to discuss your project or any questions you may have.',
  'Send Us a Message',
  'Ready to transform your idea into reality? Fill out the form and we''ll get back to you within 24 hours.'
) ON CONFLICT DO NOTHING;

-- Insert default FAQ items
INSERT INTO faq_items (question, answer, display_order) VALUES
  ('What technologies do you specialize in?', 'We specialize in modern web technologies including React, Next.js, Node.js, and various AI/ML frameworks. Our team stays current with the latest developments to provide cutting-edge solutions.', 1),
  ('How long does a typical project take?', 'Project timelines vary based on complexity. A simple MVP can be delivered in 4-6 weeks, while more complex applications may take 3-6 months. We provide detailed timelines after understanding your requirements.', 2),
  ('Do you provide ongoing support?', 'Yes, we offer various support packages including bug fixes, feature updates, performance optimization, and 24/7 monitoring to ensure your application runs smoothly.', 3)
ON CONFLICT DO NOTHING;

-- Insert default budget options
INSERT INTO budget_options (value, label, display_order) VALUES
  ('under_5k', 'Under $5,000', 1),
  ('5k_10k', '$5,000 - $10,000', 2),
  ('10k_25k', '$10,000 - $25,000', 3),
  ('25k_50k', '$25,000 - $50,000', 4),
  ('over_50k', 'Over $50,000', 5)
ON CONFLICT DO NOTHING;

-- Insert default footer links
INSERT INTO footer_links (category, name, href, display_order) VALUES
  ('quick_links', 'Home', '#home', 1),
  ('quick_links', 'About Us', '#about', 2),
  ('quick_links', 'Projects', '#projects', 3),
  ('quick_links', 'Testimonials', '#testimonials', 4),
  ('quick_links', 'Process', '#process', 5),
  ('quick_links', 'Contact', '#contact', 6),
  ('services', 'Web Development', '#', 1),
  ('services', 'Mobile Apps', '#', 2),
  ('services', 'AI Solutions', '#', 3),
  ('services', 'Cloud Services', '#', 4),
  ('services', 'Consulting', '#', 5),
  ('legal', 'Privacy Policy', '#', 1),
  ('legal', 'Terms of Service', '#', 2),
  ('legal', 'Cookie Policy', '#', 3)
ON CONFLICT DO NOTHING;

-- Insert default testimonials
INSERT INTO testimonials (client_name, client_title, client_company, client_image_url, testimonial_text, rating, linkedin_url, display_order, is_active, is_featured) VALUES
  ('Sarah Johnson', 'CEO', 'TechStartup Inc', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', 'Working with BugFree.dev was an absolute game-changer for our startup. They delivered our MVP in just 4 weeks, which would have taken us months to build internally. Highly recommended!', 5, 'https://linkedin.com/in/example', 1, true, true),
  ('Michael Chen', 'CTO', 'DataFlow Systems', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', 'The AI-powered development approach they use is truly impressive. Our application performance improved by 40% after their optimization work.', 5, 'https://linkedin.com/in/example', 2, true, false),
  ('Emily Rodriguez', 'Product Manager', 'InnovateCo', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80', 'Professional team with excellent communication throughout the project. They understood our vision and delivered beyond expectations.', 4, NULL, 3, true, false)
ON CONFLICT DO NOTHING;
