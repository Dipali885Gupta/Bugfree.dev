-- Run this SQL in your Supabase Dashboard SQL Editor to set up image and video storage
-- Go to: https://supabase.com/dashboard → Select your project → SQL Editor → New query

-- =============================================
-- PROJECT IMAGES BUCKET
-- =============================================

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Allow public read access to project images
CREATE POLICY "Public read access for project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- Allow authenticated users to upload project images
CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update project images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete project images
CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- =============================================
-- PROJECT VIDEOS BUCKET
-- =============================================

-- Create storage bucket for project videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-videos',
  'project-videos',
  true,
  104857600, -- 100MB limit
  ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
) ON CONFLICT (id) DO NOTHING;

-- Allow public read access to project videos
CREATE POLICY "Public read access for project videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-videos');

-- Allow authenticated users to upload project videos
CREATE POLICY "Authenticated users can upload project videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-videos' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their video uploads
CREATE POLICY "Authenticated users can update project videos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-videos' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete project videos
CREATE POLICY "Authenticated users can delete project videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-videos' AND auth.role() = 'authenticated');
