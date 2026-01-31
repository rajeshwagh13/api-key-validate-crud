-- Create API Keys table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS api_keys (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  api_key_value TEXT NOT NULL UNIQUE,
  type TEXT DEFAULT 'dev',
  usage_count INTEGER DEFAULT 0,
  monthly_limit INTEGER,
  limit_monthly_usage BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on the name column for faster searches
CREATE INDEX IF NOT EXISTS idx_api_keys_name ON api_keys(name);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_api_keys_created_at ON api_keys(created_at DESC);

-- Enable Row Level Security (RLS) - optional, adjust based on your needs
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (adjust based on your authentication needs)
-- For now, we'll allow all operations. In production, you should restrict this based on user authentication
CREATE POLICY "Allow all operations on api_keys" ON api_keys
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
