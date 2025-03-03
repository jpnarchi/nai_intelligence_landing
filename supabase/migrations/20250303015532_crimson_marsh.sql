/*
  # Update contact submissions RLS policies

  1. Changes
    - Drop existing policies for contact_submissions table
    - Create specific policies that:
      - Allow anonymous users to ONLY insert data
      - Allow authenticated users to read/update/delete data
  
  2. Security
    - Maintains security by only allowing inserts, not reads/updates/deletes for anonymous users
    - Authenticated users (admins) can perform all operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Only authenticated users can view contact submissions" ON contact_submissions;

-- Create specific policy for anonymous users to ONLY insert
CREATE POLICY "Anonymous users can only insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies for authenticated users to read/update/delete
CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact submissions"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);