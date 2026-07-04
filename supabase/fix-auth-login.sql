-- Fix: "Database error querying schema" on admin login
-- Cause: auth.users token columns are NULL (common when user created via raw SQL
-- instead of Supabase Dashboard or auth.admin.createUser).
-- Run in: Supabase Dashboard → SQL Editor → New query → Run

UPDATE auth.users
SET
  confirmation_token = COALESCE(confirmation_token, ''),
  email_change = COALESCE(email_change, ''),
  email_change_token_new = COALESCE(email_change_token_new, ''),
  email_change_token_current = COALESCE(email_change_token_current, ''),
  recovery_token = COALESCE(recovery_token, ''),
  phone_change = COALESCE(phone_change, ''),
  phone_change_token = COALESCE(phone_change_token, '')
WHERE
  confirmation_token IS NULL
  OR email_change IS NULL
  OR email_change_token_new IS NULL
  OR email_change_token_current IS NULL
  OR recovery_token IS NULL
  OR phone_change IS NULL
  OR phone_change_token IS NULL;

-- Ensure future Dashboard-created users default to empty strings (safe to re-run)
ALTER TABLE auth.users ALTER COLUMN confirmation_token SET DEFAULT '';
ALTER TABLE auth.users ALTER COLUMN recovery_token SET DEFAULT '';
ALTER TABLE auth.users ALTER COLUMN email_change_token_new SET DEFAULT '';
ALTER TABLE auth.users ALTER COLUMN email_change SET DEFAULT '';
