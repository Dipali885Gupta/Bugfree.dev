-- Add twitter_url column to site_settings
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS twitter_url TEXT;

-- Update URLs (use COALESCE so existing values aren't overwritten)
UPDATE site_settings SET
  linkedin_url = COALESCE(linkedin_url, 'https://www.linkedin.com/company/getcodefree-tech/?viewAsMember=true'),
  twitter_url = COALESCE(twitter_url, 'https://x.com/getcodefre'),
  github_url = COALESCE(github_url, 'https://github.com/getcodefree');
