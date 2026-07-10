-- SQL Schema to create the 'auth' table in Supabase PostgreSQL
-- Run this script in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS auth (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  nik VARCHAR(16) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  province VARCHAR(100) NOT NULL,
  pekerjaan VARCHAR(255),
  jenis_kelamin VARCHAR(50),
  koperasi_ref VARCHAR(255),
  anggota_ref VARCHAR(100),
  alamat_koperasi TEXT,
  file_ktp VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Enable Row Level Security (RLS) and allow public/anonymous access for demo purposes.
-- ALTER TABLE auth ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public read access" ON auth FOR SELECT USING (true);
-- CREATE POLICY "Allow public write access" ON auth FOR INSERT WITH CHECK (true);
