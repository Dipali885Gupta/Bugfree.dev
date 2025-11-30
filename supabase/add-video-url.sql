-- Run this SQL in your Supabase Dashboard SQL Editor to add video_url column
-- Go to: https://supabase.com/dashboard → Select your project → SQL Editor → New query

-- Add video_url column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'projects';
