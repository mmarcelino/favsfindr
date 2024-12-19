import { useState, useEffect } from 'react';
import { initializeSupabase } from '../utils/supabaseHelpers';

export function useSupabaseConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    let mounted = true;
    let retryTimeout: number;

    async function checkConnection() {
      try {
        const connected = await initializeSupabase();
        
        if (!mounted) return;
        
        if (connected) {
          setIsConnected(true);
          setError(null);
        } else {
          throw new Error('Connection failed');
        }
      } catch (err) {
        if (!mounted) return;
        
        setError(err instanceof Error ? err : new Error('Connection failed'));
        setIsConnected(false);

        // Retry logic
        if (retryCount < MAX_RETRIES) {
          retryTimeout = window.setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000 * Math.pow(2, retryCount)); // Exponential backoff
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    checkConnection();

    return () => {
      mounted = false;
      clearTimeout(retryTimeout);
    };
  }, [retryCount]);

  return { isConnected, isLoading, error };
}