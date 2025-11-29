-- Migration script to add GPS address fields to existing visitors table
-- Run this SQL in your Supabase SQL Editor if you already have an existing visitors table

-- Add new GPS address columns
ALTER TABLE visitors 
ADD COLUMN IF NOT EXISTS gps_country VARCHAR(100),
ADD COLUMN IF NOT EXISTS gps_region VARCHAR(100),
ADD COLUMN IF NOT EXISTS gps_city VARCHAR(100),
ADD COLUMN IF NOT EXISTS gps_address TEXT;

-- Create indexes for the new GPS address fields
CREATE INDEX IF NOT EXISTS idx_visitors_gps_country ON visitors(gps_country);
CREATE INDEX IF NOT EXISTS idx_visitors_gps_city ON visitors(gps_city);

-- Verify the new columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'visitors' 
AND column_name IN ('gps_country', 'gps_region', 'gps_city', 'gps_address')
ORDER BY column_name;

-- Optional: Show sample of updated table structure
SELECT * FROM visitors LIMIT 1;