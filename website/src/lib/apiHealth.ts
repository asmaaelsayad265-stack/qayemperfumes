/**
 * API Health Check Utility
 * Checks if the API is reachable and healthy
 */

export interface HealthCheckResult {
  ok: boolean;
  status: number | null;
  error?: string;
}

/**
 * Check API health by attempting to reach the base URL or a specific endpoint
 * @param baseUrl - The API base URL (without /v1 prefix)
 * @param timeout - Timeout in milliseconds (default: 3000)
 * @returns HealthCheckResult indicating if the API is up
 */
export async function checkApiHealth(
  baseUrl: string,
  timeout: number = 3000
): Promise<HealthCheckResult> {
  // Normalize the base URL (remove trailing slash)
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');

  // Try the /v1/products endpoint as a health check (it's public and lightweight)
  const healthUrl = `${normalizedBaseUrl}/v1/products?limit=1`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(healthUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return { ok: true, status: response.status };
    }

    return { ok: false, status: response.status, error: `HTTP ${response.status}` };
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.name === 'AbortError'
          ? 'Request timeout'
          : err.message
        : 'Unknown error';

    return { ok: false, status: null, error: errorMessage };
  }
}