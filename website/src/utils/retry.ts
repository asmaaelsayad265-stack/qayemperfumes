/**
 * Retry utility with exponential backoff
 * Only for GET requests
 */

export interface RetryOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  factor: number;
}

const DEFAULT_OPTIONS: RetryOptions = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  factor: 2,
};

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on client errors (4xx)
      if (lastError.message.includes('4')) {
        throw lastError;
      }

      // Don't retry on last attempt
      if (attempt === opts.maxRetries - 1) {
        break;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        opts.baseDelay * Math.pow(opts.factor, attempt),
        opts.maxDelay
      );

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Wrapper to only retry GET requests
 */
export function createRetryFetch() {
  return async <T>(url: string, options?: RequestInit): Promise<T> => {
    // Only retry GET requests
    if (options?.method && options.method !== 'GET') {
      throw new Error('Retry only supported for GET requests');
    }

    return retryWithBackoff(async () => {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
        (error as { status?: number }).status = response.status;
        throw error;
      }

      return response.json();
    });
  };
}