-- Migration: Add status column to projects table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard → SQL Editor

-- Add status column if it doesn't exist
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'In Progress';

-- Optional: Update existing projects to have a default status
-- UPDATE projects SET status = 'Completed' WHERE status IS NULL;
