import { supabase } from '../lib/supabase';
import { withRetry } from './supabaseRetry';

export async function testConnection() {
  try {
    // Use a simple auth check instead of querying tables
    const { data, error } = await withRetry(() => 
      supabase.auth.getSession()
    );

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Connection test failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Failed to connect') 
    };
  }
}

export async function initializeSupabase() {
  try {
    const { success, error } = await testConnection();
    if (!success) {
      throw error || new Error('Connection failed');
    }
    return true;
  } catch (error) {
    console.error('Initialization failed:', error);
    return false;
  }
}