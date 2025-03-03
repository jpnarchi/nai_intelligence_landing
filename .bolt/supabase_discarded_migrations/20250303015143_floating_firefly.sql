/*
  # Fix contact submissions policy

  1. Changes
    - Update the RLS policy for contact_submissions table to allow anonymous users to insert data
    - Ensure the policy uses the correct syntax for anonymous inserts
  
  2. Security
    - Maintains security by only allowing inserts, not reads/updates/deletes for anonymous users
*/

-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;

-- Create a new policy with the correct syntax for anonymous inserts
CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);