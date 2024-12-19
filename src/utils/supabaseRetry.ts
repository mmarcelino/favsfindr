import { SupabaseClient } from '@supabase/supabase-js';

const RETRY_ATTEMPTS = 5;
const BASE_DELAY = 1000;
const MAX_DELAY = 10000;

function getRetryDelay(attempt: number): number {
  const delay = Math.min(
    BASE_DELAY * Math.pow(2, attempt),
    MAX_DELAY
  );
  return delay + Math.random() * 1000; // Add jitter
}

type SupabaseResponse<T> = {
  data: T | null;
  error: any | null;
};

export async function withRetry<T>(
  operation: () => Promise<SupabaseResponse<T>>,
  maxAttempts = RETRY_ATTEMPTS
): Promise<SupabaseResponse<T>> {
  let lastError: any = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const result = await operation();
      
      // Success case
      if (!result.error) {
        return result;
      }

      // Handle specific error cases
      if (result.error?.message?.includes('Failed to fetch')) {
        lastError = result.error;
        if (attempt < maxAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, getRetryDelay(attempt)));
          continue;
        }
      }

      // Other errors should not be retried
      return result;
    } catch (err) {
      lastError = err;
      
      if (attempt < maxAttempts - 1) {
        await new Promise(resolve => setTimeout(resolve, getRetryDelay(attempt)));
        continue;
      }
    }
  }

  return { 
    data: null, 
    error: lastError || new Error('Max retry attempts reached')
  };
}