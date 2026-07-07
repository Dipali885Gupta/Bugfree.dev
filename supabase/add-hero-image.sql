-- Hero section image upload support
ALTER TABLE hero_section
  ADD COLUMN IF NOT EXISTS hero_image_url TEXT;
