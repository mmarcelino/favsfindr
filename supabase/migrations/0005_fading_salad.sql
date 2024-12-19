/*
  # Disable email confirmation requirement

  1. Changes
    - Disable email confirmation requirement for new signups
    - Update existing users to mark emails as confirmed
*/

-- Disable email confirmation for all new signups
ALTER TABLE auth.users
ALTER COLUMN email_confirmed_at 
SET DEFAULT NOW();

-- Update existing users to confirm their emails
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;