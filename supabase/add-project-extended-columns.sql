-- Add extended columns for full project detail pages
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS long_description TEXT,
  ADD COLUMN IF NOT EXISTS architecture TEXT,
  ADD COLUMN IF NOT EXISTS outcomes TEXT[],
  ADD COLUMN IF NOT EXISTS testimonial_quote TEXT,
  ADD COLUMN IF NOT EXISTS testimonial_author TEXT,
  ADD COLUMN IF NOT EXISTS testimonial_role TEXT,
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS metrics JSONB DEFAULT '[]'::jsonb;
