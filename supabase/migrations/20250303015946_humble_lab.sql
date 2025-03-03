/*
  # Reset and recreate schema for NAI Systems website

  1. New Tables
    - `contact_submissions`
      - `id` (serial, primary key)
      - `created_at` (timestamptz, default now())
      - `name` (text, not null)
      - `email` (text, not null)
      - `phone` (text, not null)
      - `message` (text, not null)
    - `services`
      - `id` (serial, primary key)
      - `created_at` (timestamptz, default now())
      - `title` (text, not null)
      - `description` (text, not null)
      - `icon` (text, not null)
      - `color` (text, not null)
      - `features` (text[], not null)
    - `industries`
      - `id` (serial, primary key)
      - `created_at` (timestamptz, default now())
      - `name` (text, not null)
      - `description` (text, not null)
      - `icon` (text, not null)
  2. Security
    - Enable RLS on all tables
    - Add policies for anonymous users to submit contact forms
    - Add policies for authenticated users to manage data
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS contact_submissions;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS industries;

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL
);

-- Create services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  features TEXT[] NOT NULL
);

-- Create industries table
CREATE TABLE industries (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to insert contact submissions
CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies for authenticated users to manage contact submissions
CREATE POLICY "Only authenticated users can view contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only authenticated users can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete contact submissions"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for services
CREATE POLICY "Anyone can view services"
  ON services
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Only authenticated users can insert services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete services"
  ON services
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for industries
CREATE POLICY "Anyone can view industries"
  ON industries
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Only authenticated users can insert industries"
  ON industries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update industries"
  ON industries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete industries"
  ON industries
  FOR DELETE
  TO authenticated
  USING (true);