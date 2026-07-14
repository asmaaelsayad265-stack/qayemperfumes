import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Types
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiResource<T> {
  data: T;
}

/**
 * Unwrap a Laravel JSON:API envelope so callers always get the bare data.
 *
 * Overloads:
 *   unwrapResource(ApiResource<T>) → T
 *   unwrapResource(PaginatedResponse<T>) → T[]
 *   unwrapResource(T) → T           (passthrough)
 *
 * Callers pass a concrete type via the axios generic and this function
 * resolves the correct shape without needing distributive conditional types
 * on a bare generic (which TypeScript cannot resolve at call sites).
 */
export function unwrapResource<T>(payload: ApiResource<T>): T;
export function unwrapResource<T>(payload: PaginatedResponse<T>): T[];
export function unwrapResource<T>(payload: T): T;
export function unwrapResource(payload: unknown): unknown {
  if (
    payload &&
    typeof payload === 'object' &&
    'data' in payload
  ) {
    return (payload as Record<string, unknown>).data;
  }

  return payload;
}

const fieldLabels: Record<string, string> = {
  name_ar: 'الاسم العربي',
  name_en: 'الاسم الإنجليزي',
  slug: 'الرابط المختصر',
  price: 'السعر',
  original_price: 'السعر قبل الخصم',
  category_id: 'التصنيف',
  sku: 'رمز SKU',
  quantity: 'الكمية',
  reserved: 'الكمية المحجوزة',
  low_stock_threshold: 'حد التنبيه',
  product_id: 'المنتج',
};

function formatValidationMessage(errors?: Record<string, string[]>): string {
  if (!errors) {
    return 'تعذر حفظ البيانات. يرجى مراجعة الحقول والمحاولة مرة أخرى.';
  }

  const [field, messages] = Object.entries(errors)[0] ?? [];
  const label = fieldLabels[field] ?? field;
  const firstMessage = messages?.[0] ?? '';

  if (field === 'slug' && firstMessage.toLowerCase().includes('taken')) {
    return 'الرابط المختصر مستخدم مسبقا. يرجى اختيار رابط آخر.';
  }

  if (field === 'sku' && firstMessage.toLowerCase().includes('taken')) {
    return 'رمز SKU مستخدم مسبقا. يرجى اختيار رمز آخر.';
  }

  return `${label}: ${firstMessage || 'قيمة غير صالحة.'}`;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available (guard against localStorage SecurityError)
    let token: string | null = null;

    if (typeof window !== 'undefined') {
      try {
        token = localStorage.getItem('auth_token');
      } catch {
        token = null;
      }
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'تعذر الاتصال بالخادم. يرجى التحقق من الاتصال والمحاولة مرة أخرى.',
        statusCode: 0,
      } as ApiError);
    }

    // Handle specific status codes
    const status = error.response.status;
    let message = error.response.data?.message || 'حدث خطأ غير متوقع.';

    switch (status) {
      case 401:
        message = 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.';
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          // Sanctum token TTL is enforced server-side; when it expires the API
          // returns 401. Clear the stale token and route the user to login when a
          // login route is configured (NEXT_PUBLIC_LOGIN_URL). The pathname guard
          // prevents redirect loops when already on the login page.
          const loginPath = process.env.NEXT_PUBLIC_LOGIN_URL;
          if (loginPath && window.location.pathname !== loginPath) {
            window.location.href = loginPath;
          }
        }
        break;
      case 403:
        message = 'ليست لديك صلاحية لتنفيذ هذا الإجراء.';
        break;
      case 404:
        message = 'العنصر المطلوب غير موجود.';
        break;
      case 422:
        message = formatValidationMessage(error.response.data?.errors);
        break;
      case 429:
        message = 'تم إرسال طلبات كثيرة. يرجى الانتظار ثم المحاولة مرة أخرى.';
        break;
      case 500:
        message = 'حدث خطأ في الخادم. يرجى المحاولة لاحقا.';
        break;
      default:
        message = error.response.data?.message || `حدث خطأ برقم ${status}.`;
    }

    return Promise.reject({
      message,
      errors: error.response.data?.errors,
      statusCode: status,
    } as ApiError);
  }
);

export default apiClient;