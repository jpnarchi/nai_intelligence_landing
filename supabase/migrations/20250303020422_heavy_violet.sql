/*
  # Configuración simple para formulario de contacto
  
  1. Crear tabla contact_submissions si no existe
  2. Habilitar RLS (requerido por Supabase)
  3. Crear política simple que permita a cualquiera insertar datos
*/

-- Crear tabla si no existe
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL
);

-- Habilitar RLS (requerido por Supabase)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes para evitar conflictos
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Anonymous users can only insert contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Only authenticated users can view contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Only authenticated users can update contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can update contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Only authenticated users can delete contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can delete contact submissions" ON contact_submissions;

-- Política simple: permitir a CUALQUIERA insertar datos
CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Política simple: permitir a usuarios autenticados ver los datos
CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);