import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { ApiError } from "./types";

const DEFAULT_TIMEOUT = 15_000;

const getBaseUrl = () => {
  try {
    const env = process.env.NEXT_PUBLIC_API_URL;
    if (env && env.length > 0) return env;
  } catch (_) {}
  return "/api/v1";
};

const apiClient: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: DEFAULT_TIMEOUT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token from localStorage (if running in browser)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("qayem_token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

const normalizeAxiosError = (err: unknown): ApiError => {
  if (!err) return { message: "Unknown error" };
  if ((err as AxiosError).isAxiosError) {
    const e = err as AxiosError;
    const status = e.response?.status;
    const data = e.response?.data;
    const message =
      (data && (data.message || data.error || data.detail)) || e.message || "Network error";
    return { message: String(message), status, details: data };
  }
  return { message: String((err as Error).message || err) };
};

// Response interceptor: return response.data on success, normalize errors on failure
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    // Let callers handle normalized error objects via rejected promise
    return Promise.reject(normalizeAxiosError(error));
  }
);

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("qayem_token", token);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("qayem_token");
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

export const clearAuthToken = () => setAuthToken(null);

export const apiGet = async <T = any>(url: string, config?: AxiosRequestConfig) => {
  try {
    const res = await apiClient.get<T>(url, config);
    return res.data as T;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
};

export const apiPost = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
  try {
    const res = await apiClient.post<T>(url, data, config);
    return res.data as T;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
};

export const apiPut = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
  try {
    const res = await apiClient.put<T>(url, data, config);
    return res.data as T;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
};

export const apiDelete = async <T = any>(url: string, config?: AxiosRequestConfig) => {
  try {
    const res = await apiClient.delete<T>(url, config);
    return res.data as T;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
};

export default apiClient;
