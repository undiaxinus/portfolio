-- Create visitors table in Supabase
-- Run this SQL in your Supabase SQL Editor

-- Drop table if it exists (for clean setup)
DROP TABLE IF EXISTS visitors CASCADE;

-- Drop view if it exists
DROP VIEW IF EXISTS visitor_stats;

CREATE TABLE visitors (
  id BIGSERIAL PRIMARY KEY,
  ip VARCHAR(45) NOT NULL,
  local_ip VARCHAR(45),
  country_name VARCHAR(100),
  region_name VARCHAR(100),
  city VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  gps_latitude DECIMAL(10, 8),
  gps_longitude DECIMAL(11, 8),
  gps_country VARCHAR(100),
  gps_region VARCHAR(100),
  gps_city VARCHAR(100),
  gps_address TEXT,
  location_source VARCHAR(10) CHECK (location_source IN ('ip', 'gps', 'both')),
  timezone VARCHAR(50),
  user_agent TEXT,
  timestamp VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: local_ip column is already included in the table creation above

-- Create index on IP for faster queries
CREATE INDEX IF NOT EXISTS idx_visitors_ip ON visitors(ip);

-- Create index on local_ip for faster queries
CREATE INDEX IF NOT EXISTS idx_visitors_local_ip ON visitors(local_ip);

-- Create index on created_at for faster date queries
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON visitors(created_at);

-- Create index on country for analytics
CREATE INDEX IF NOT EXISTS idx_visitors_country ON visitors(country_name);

-- Create index on GPS coordinates for location queries
CREATE INDEX IF NOT EXISTS idx_visitors_gps_coords ON visitors(gps_latitude, gps_longitude);

-- Create index on location source for filtering
CREATE INDEX IF NOT EXISTS idx_visitors_location_source ON visitors(location_source);

-- Create index on GPS country for analytics
CREATE INDEX IF NOT EXISTS idx_visitors_gps_country ON visitors(gps_country);

-- Create index on GPS city for location queries
CREATE INDEX IF NOT EXISTS idx_visitors_gps_city ON visitors(gps_city);

-- Enable Row Level Security (RLS)
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for visitor tracking)
CREATE POLICY "Allow anonymous inserts" ON visitors
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow anonymous reads (for admin)
CREATE POLICY "Allow anonymous reads" ON visitors
  FOR SELECT
  TO anon
  USING (true);

-- Create policy to allow anonymous deletes (for admin)
CREATE POLICY "Allow anonymous deletes" ON visitors
  FOR DELETE
  TO anon
  USING (true);

-- Optional: Create a view for visitor statistics
CREATE OR REPLACE VIEW visitor_stats AS
SELECT 
  COUNT(*) as total_visitors,
  COUNT(DISTINCT ip) as unique_visitors,
  COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END) as today_visitors,
  COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as week_visitors,
  COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as month_visitors
FROM visitors;

-- Grant access to the view
GRANT SELECT ON visitor_stats TO anon, authenticated;