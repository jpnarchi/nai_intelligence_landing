/*
  # Configuración de tabla de contacto

  1. Nueva Tabla
    - `contact_submissions`
      - `id` (serial, primary key)
      - `created_at` (timestamptz, default now())
      - `name` (text, not null)
      - `email` (text, not null)
      - `phone` (text, not null)
      - `message` (text, not null)
  2. Seguridad
    - Habilitar RLS en `contact_submissions`
    - Política para permitir inserciones anónimas
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