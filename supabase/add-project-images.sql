-- Add image columns for project gallery
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS hero_image_url TEXT,
  ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;
