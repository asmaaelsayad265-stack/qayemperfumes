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

export function unwrapResource<T>(payload: ApiResource<T>): T;
export function unwrapResource<T>(payload: PaginatedResponse<T>): T[];
export function unwrapResource<T>(payload: T): T;
export function unwrapResource(payload: unknown): unknown {
  if (payload && typeof payload === 'object' && 'data' in payload) {
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
  if (!errors) return 'تعذر حفظ البيانات. يرجى مراجعة الحقول والمحاولة مرة أخرى.';
  const [field, messages] = Object.entries(errors)[0] ?? [];
  const label = fieldLabels[field] ?? field;
  const firstMessage = messages?.[0] ?? '';
  if (field === 'slug' && firstMessage?.toLowerCase().includes('taken')) {
    return 'الرابط المختصر مستخدم مسبقا. يرجى اختيار رابط آخر.';
  }
  if (field === 'sku' && firstMessage?.toLowerCase().includes('taken')) {
    return 'رمز SKU مستخدم مسبقا. يرجى اختيار رمز آخر.';
  }
  return `${label}: ${firstMessage || 'قيمة غير صالحة.'}`;
}

// Lazy singleton – defers the API-URL check to first invocation so the
// module can be imported safely during build (env vars may not be available).
let _apiClient: AxiosInstance | null = null;

function resolveApiBase(): string {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) {
    throw new Error(
      'NEXT_PUBLIC_API_URL environment variable is required. ' +
      'Set it in .env.local for development or in your Vercel project ' +
      'environment variables for production.',
    );
  }
  return base;
}

function getApiClient(): AxiosInstance {
  if (_apiClient) return _apiClient;

  const baseURL = resolveApiBase();

  _apiClient = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    timeout: 10000,
  });

  // Request interceptor
  _apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      let token: string | null = null;
      if (typeof window !== 'undefined') {
        try { token = localStorage.getItem('auth_token'); } catch { token = null; }
      }
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  // Response interceptor
  _apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ApiError>) => {
      if (!error.response) {
        return Promise.reject({
          message: 'تعذر الاتصال بالخادم. يرجى التحقق من الاتصال والمحاولة مرة أخرى.',
          statusCode: 0,
        } as ApiError);
      }

      const status = error.response.status;
      let message = error.response.data?.message || 'حدث خطأ غير متوقع.';

      switch (status) {
        case 401:
          message = 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.';
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            const loginPath = process.env.NEXT_PUBLIC_LOGIN_URL;
            if (loginPath && window.location.pathname !== loginPath) {
              window.location.href = loginPath;
            }
          }
          break;
        case 403: message = 'ليست لديك صلاحية لتنفيذ هذا الإجراء.'; break;
        case 404: message = 'العنصر المطلوب غير موجود.'; break;
        case 422: message = formatValidationMessage(error.response.data?.errors); break;
        case 429: message = 'تم إرسال طلبات كثيرة. يرجى الانتظار ثم المحاولة مرة أخرى.'; break;
        case 500: message = 'حدث خطأ في الخادم. يرجى المحاولة لاحقا.'; break;
        default: message = error.response.data?.message || `حدث خطأ برقم ${status}.`;
      }

      return Promise.reject({
        message,
        errors: error.response.data?.errors,
        statusCode: status,
      } as ApiError);
    },
  );

  return _apiClient;
}

const apiClient = new Proxy({}, { get(_, prop) { const client = getApiClient(); const val = client[prop]; return typeof val === "function" ? val.bind(client) : val; } }); export default apiClient;

