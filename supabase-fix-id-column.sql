-- Fix the id column type from UUID to TEXT
-- Run this in your Supabase SQL Editor

-- Check current column type
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'api_keys' AND column_name = 'id';

-- If the id column is UUID, change it to TEXT
DO $$
BEGIN
  -- Check if id column is UUID type
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'api_keys' 
    AND column_name = 'id'
    AND data_type = 'uuid'
  ) THEN
    -- Drop the primary key constraint
    ALTER TABLE api_keys DROP CONSTRAINT IF EXISTS api_keys_pkey;
    
    -- Change the column type from UUID to TEXT
    ALTER TABLE api_keys ALTER COLUMN id TYPE TEXT USING id::TEXT;
    
    -- Recreate the primary key constraint
    ALTER TABLE api_keys ADD PRIMARY KEY (id);
    
    RAISE NOTICE 'Successfully changed id column from UUID to TEXT';
  ELSE
    RAISE NOTICE 'id column is already TEXT or does not exist';
  END IF;
END $$;

-- Verify the change
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'api_keys' AND column_name = 'id';
