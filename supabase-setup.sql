-- Create visitors table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS visitors (
  id BIGSERIAL PRIMARY KEY,
  ip VARCHAR(45) NOT NULL,
  country_name VARCHAR(100),
  region_name VARCHAR(100),
  city VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone VARCHAR(50),
  user_agent TEXT,
  timestamp VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on IP for faster queries
CREATE INDEX IF NOT EXISTS idx_visitors_ip ON visitors(ip);

-- Create index on created_at for faster date queries
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON visitors(created_at);

-- Create index on country for analytics
CREATE INDEX IF NOT EXISTS idx_visitors_country ON visitors(country_name);

-- Enable Row Level Security (RLS)
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for visitor tracking)
CREATE POLICY "Allow anonymous inserts" ON visitors
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated reads (for admin)
CREATE POLICY "Allow authenticated reads" ON visitors
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow authenticated deletes (for admin)
CREATE POLICY "Allow authenticated deletes" ON visitors
  FOR DELETE
  TO authenticated
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