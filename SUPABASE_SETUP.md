# Supabase Setup Guide

This guide will help you connect your CRUD API to Supabase.

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `crud-operation-api` (or any name you prefer)
   - Database Password: Choose a strong password (save this!)
   - Region: Choose the closest region to your users
5. Click "Create new project" and wait for it to be set up (takes 1-2 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find:
   - **Project URL**: Copy this value
   - **anon public** key: Copy this value (under "Project API keys")

## Step 3: Set Up the Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click "New query"
3. Copy the contents of `supabase-schema.sql` file
4. Paste it into the SQL Editor
5. Click "Run" to execute the SQL
6. You should see "Success. No rows returned" - this means the table was created successfully

## Step 4: Configure Environment Variables

1. Open `.env.local` in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Save the file

## Step 5: Install Dependencies

Run the following command in your terminal:

```bash
npm install
```

This will install the `@supabase/supabase-js` package.

## Step 6: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/dashboards`
3. Try creating a new API key
4. If it works, you're all set! 🎉

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure `.env.local` exists in the project root
- Verify the variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your dev server after changing `.env.local`

### Error: "relation 'api_keys' does not exist"
- Make sure you ran the SQL schema in Step 3
- Check the SQL Editor in Supabase to verify the table exists

### Error: "new row violates row-level security policy"
- The SQL schema includes RLS policies that allow all operations
- If you see this error, check your Supabase RLS settings
- You may need to adjust the policy in the SQL Editor

## Database Schema

The `api_keys` table has the following structure:

- `id` (TEXT, PRIMARY KEY): Unique identifier for the API key
- `name` (TEXT, NOT NULL): Name of the API key
- `key` (TEXT, NOT NULL, UNIQUE): The actual API key value
- `type` (TEXT, DEFAULT 'dev'): Type of key (dev/prod)
- `usage_count` (INTEGER, DEFAULT 0): Number of times the key has been used
- `monthly_limit` (INTEGER): Monthly usage limit (if set)
- `limit_monthly_usage` (BOOLEAN, DEFAULT false): Whether to enforce monthly limit
- `created_at` (TIMESTAMP): When the key was created
- `last_used` (TIMESTAMP): When the key was last used
- `updated_at` (TIMESTAMP): When the key was last updated

## Next Steps

- Consider adding authentication to restrict who can create/manage API keys
- Set up proper RLS policies based on your authentication needs
- Add usage tracking functionality
- Implement rate limiting based on the monthly limits
