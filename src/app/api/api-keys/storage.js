// Supabase database storage for API keys
import { supabase } from '../../../lib/supabase';

const TABLE_NAME = 'api_keys';

/**
 * Transform database row to frontend format
 */
function transformApiKey(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    key: row.api_key_value, // Map from database column name
    type: row.type || 'dev',
    usage_count: row.usage_count || 0,
    monthly_limit: row.monthly_limit,
    limit_monthly_usage: row.limit_monthly_usage || false,
    createdAt: row.created_at,
    lastUsed: row.last_used,
    // Keep snake_case for backward compatibility
    created_at: row.created_at,
    last_used: row.last_used,
  };
}

/**
 * Get all API keys from the database
 */
export async function getAllApiKeys() {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching API keys:', error);
      throw error;
    }

    // Transform data to match frontend expectations
    return (data || []).map(transformApiKey);
  } catch (error) {
    console.error('Error in getAllApiKeys:', error);
    throw error;
  }
}

/**
 * Get a single API key by ID
 */
export async function getApiKeyById(id) {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error('Error fetching API key:', error);
      throw error;
    }

    return transformApiKey(data);
  } catch (error) {
    console.error('Error in getApiKeyById:', error);
    throw error;
  }
}

/**
 * Create a new API key
 */
export async function createApiKey(apiKey) {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([apiKey])
      .select()
      .single();

    if (error) {
      console.error('Error creating API key:', error);
      throw error;
    }

    return transformApiKey(data);
  } catch (error) {
    console.error('Error in createApiKey:', error);
    throw error;
  }
}

/**
 * Update an API key
 */
export async function updateApiKey(id, updates) {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating API key:', error);
      throw error;
    }

    if (!data) {
      return null;
    }

    return transformApiKey(data);
  } catch (error) {
    console.error('Error in updateApiKey:', error);
    throw error;
  }
}

/**
 * Delete an API key
 */
export async function deleteApiKey(id) {
  try {
    // First, get the key before deleting to return it
    const { data: existingKey, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        // No rows found
        return null;
      }
      console.error('Error fetching API key before delete:', fetchError);
      throw fetchError;
    }

    if (!existingKey) {
      return null;
    }

    // Now delete the key
    const { error: deleteError } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting API key:', deleteError);
      throw deleteError;
    }

    // Return the deleted key
    return transformApiKey(existingKey);
  } catch (error) {
    console.error('Error in deleteApiKey:', error);
    throw error;
  }
}
