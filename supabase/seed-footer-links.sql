-- Update footer_links with proper company links
-- Run in Supabase SQL Editor

-- First, clear old placeholder links
DELETE FROM footer_links;

-- Insert proper company links
INSERT INTO footer_links (category, name, href, display_order) VALUES
  ('quick_links', 'About', '/#about', 1),
  ('quick_links', 'Work', '/projects', 2),
  ('quick_links', 'Process', '/#process', 3),
  ('quick_links', 'FAQ', '/#faq', 4),
  ('quick_links', 'Contact', '/#contact', 5),
  ('services', 'MVP Sprint', '/#services', 1),
  ('services', 'Full Product Development', '/#services', 2),
  ('services', 'AI Automation', '/#services', 3),
  ('services', 'Production Upgrade', '/#services', 4),
  ('services', 'Landing Pages', '/#services', 5);
