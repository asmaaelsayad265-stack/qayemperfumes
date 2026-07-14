import apiClient, { ApiResource, unwrapResource } from './api';

// Types matching Laravel API responses
export interface Product {
  id: number;
  name_ar: string;
  name_en: string;
  slug: string;
  description_ar: string;
  description_en: string;
  price: number;
  original_price: number | null;
  category_id: number;
  status: string;
  season: string;
  gender: string;
  is_featured: boolean;
  is_best_seller: boolean;
  is_limited_edition: boolean;
  image: string;
  category?: Category;
  images?: ProductImage[];
  notes?: ProductNote[];
  reviews?: Review[];
  inventory?: Inventory;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name_ar: string;
  name_en: string;
  slug: string;
  description_ar: string;
  description_en: string;
  image: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  url: string;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductNote {
  id: number;
  product_id: number;
  note_type: string;
  name_ar: string;
  name_en: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  product_id: number;
  customer_id: number | null;
  customer_name: string;
  customer_email: string;
  rating: number;
  body: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface Inventory {
  id: number;
  product_id: number;
  sku: string;
  variant: string | null;
  quantity: number;
  reserved: number;
  low_stock_threshold: number;
  location: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ProductPayload {
  name_ar: string;
  name_en?: string | null;
  slug: string;
  description_ar?: string | null;
  description_en?: string | null;
  price: number;
  original_price?: number | null;
  category_id: number;
  status: 'active' | 'draft' | 'archived';
  season: 'all' | 'summer' | 'winter' | 'spring' | 'autumn';
  gender: 'unisex' | 'men' | 'women';
  is_featured: boolean;
  is_best_seller: boolean;
  is_limited_edition: boolean;
  image?: string | null;
}

// API Functions
// Note: Caching is handled by Laravel backend cache headers
// Next.js fetch cache can be implemented in Server Components
export const productsApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<ApiResource<Product[]>>('/products');
    return unwrapResource(response.data);
  },

  // Get featured products
  getFeatured: async (): Promise<Product[]> => {
    const response = await apiClient.get<ApiResource<Product[]>>('/products/featured');
    return unwrapResource(response.data);
  },

  // Get best sellers
  getBestSellers: async (): Promise<Product[]> => {
    const response = await apiClient.get<ApiResource<Product[]>>('/products/best-sellers');
    return unwrapResource(response.data);
  },

  // Get products by category
  getByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await apiClient.get<ApiResource<Product[]>>(`/products/category/${categoryId}`);
    return unwrapResource(response.data);
  },

  // Get product by slug
  getBySlug: async (slug: string): Promise<Product> => {
    const response = await apiClient.get<ApiResource<Product>>(`/products/slug/${slug}`);
    return unwrapResource(response.data);
  },

  // Get product by ID
  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<ApiResource<Product>>(`/products/${id}`);
    return unwrapResource(response.data);
  },

  // Search products
  search: async (query: string): Promise<Product[]> => {
    const response = await apiClient.get<ApiResource<Product[]>>('/products/search', {
      params: { q: query },
    });
    return unwrapResource(response.data);
  },

  create: async (payload: ProductPayload): Promise<Product> => {
    const response = await apiClient.post<ApiResource<Product>>('/products', payload);
    return unwrapResource(response.data);
  },

  update: async (id: number, payload: ProductPayload): Promise<Product> => {
    const response = await apiClient.put<ApiResource<Product>>(`/products/${id}`, payload);
    return unwrapResource(response.data);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
