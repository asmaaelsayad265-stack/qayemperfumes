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

export function unwrapResource<T>(payload: T | ApiResource<T>): T {
  if (
    payload &&
    typeof payload === 'object' &&
    'data' in payload &&
    Object.keys(payload as unknown as Record<string, unknown>).length === 1
  ) {
    return (payload as ApiResource<T>).data;
  }

  return payload as T;
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

// Enforce API URL — do not silently fall back
const apiBase = process.env.NEXT_PUBLIC_API_URL;
if (!apiBase) {
  // Throw early so builds fail when env is missing — this prevents accidental silent fallbacks
  throw new Error('NEXT_PUBLIC_API_URL environment variable is required and must point to your API (e.g. https://api.example.com/v1)');
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: apiBase,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
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
