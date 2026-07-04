-- Fix storage policies: drop old ones first, then create new public ones

-- =============================================
-- PROJECT IMAGES BUCKET
-- =============================================

DROP POLICY IF EXISTS "Public read access for project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;

CREATE POLICY "Public read access for project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Public upload for project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Public update for project images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-images');

CREATE POLICY "Public delete for project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images');

-- =============================================
-- PROJECT VIDEOS BUCKET
-- =============================================

DROP POLICY IF EXISTS "Public read access for project videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload project videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project videos" ON storage.objects;

CREATE POLICY "Public read access for project videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-videos');

CREATE POLICY "Public upload for project videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-videos');

CREATE POLICY "Public update for project videos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-videos');

CREATE POLICY "Public delete for project videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-videos');
