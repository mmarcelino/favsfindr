const RETRY_COUNT = 3;
const INITIAL_RETRY_DELAY = 1000;

interface RetryOptions {
  retries?: number;
  initialDelay?: number;
}

export function handleRetry(
  fetchFn: typeof fetch,
  options: RetryOptions = {}
): typeof fetch {
  const { retries = RETRY_COUNT, initialDelay = INITIAL_RETRY_DELAY } = options;

  return async (input: RequestInfo | URL, init?: RequestInit) => {
    let lastError: Error;
    let delay = initialDelay;

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await fetchFn(input, init);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Network request failed');
        
        if (attempt < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        }
      }
    }

    throw lastError;
  };
}