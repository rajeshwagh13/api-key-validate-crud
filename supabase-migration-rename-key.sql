-- Migration script to rename 'key' column to 'api_key_value'
-- Run this if you already created the table with the 'key' column

-- First, drop the unique constraint on the old column
ALTER TABLE api_keys DROP CONSTRAINT IF EXISTS api_keys_key_key;

-- Rename the column
ALTER TABLE api_keys RENAME COLUMN key TO api_key_value;

-- Recreate the unique constraint on the new column name
ALTER TABLE api_keys ADD CONSTRAINT api_keys_api_key_value_key UNIQUE (api_key_value);
