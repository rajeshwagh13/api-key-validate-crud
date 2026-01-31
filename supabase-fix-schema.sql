-- Complete schema fix for api_keys table
-- Run this entire script in your Supabase SQL Editor

-- Option 1: If table doesn't exist, create it
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

-- Option 2: If table exists with 'key' column, migrate it
DO $$
BEGIN
  -- Check if 'key' column exists and 'api_key_value' doesn't
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'api_keys' 
    AND column_name = 'key'
  ) AND NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'api_keys' 
    AND column_name = 'api_key_value'
  ) THEN
    -- Drop the unique constraint on the old column if it exists
    ALTER TABLE api_keys DROP CONSTRAINT IF EXISTS api_keys_key_key;
    
    -- Rename the column
    ALTER TABLE api_keys RENAME COLUMN key TO api_key_value;
    
    -- Recreate the unique constraint on the new column name
    ALTER TABLE api_keys ADD CONSTRAINT api_keys_api_key_value_key UNIQUE (api_key_value);
  END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_api_keys_name ON api_keys(name);
CREATE INDEX IF NOT EXISTS idx_api_keys_created_at ON api_keys(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists and create a new one
DROP POLICY IF EXISTS "Allow all operations on api_keys" ON api_keys;
CREATE POLICY "Allow all operations on api_keys" ON api_keys
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create or replace function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists and create a new one
DROP TRIGGER IF EXISTS update_api_keys_updated_at ON api_keys;
CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verify the table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'api_keys'
ORDER BY ordinal_position;
