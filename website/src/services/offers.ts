import apiClient, { ApiResource, unwrapResource } from './api';

export interface Offer {
  id: number;
  product_id: number;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  product?: Product;
  created_at: string;
  updated_at: string;
}

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

export interface OfferPayload {
  product_id: number;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
}

export const offersApi = {
  getAll: async (): Promise<Offer[]> => {
    const response = await apiClient.get<ApiResource<Offer[]>>('/offers');
    return unwrapResource(response.data);
  },

  getActive: async (): Promise<Offer[]> => {
    const response = await apiClient.get<ApiResource<Offer[]>>('/offers/active');
    return unwrapResource(response.data);
  },

  getById: async (id: number): Promise<Offer> => {
    const response = await apiClient.get<ApiResource<Offer>>(`/offers/${id}`);
    return unwrapResource(response.data);
  },

  create: async (payload: OfferPayload): Promise<Offer> => {
    const response = await apiClient.post<ApiResource<Offer>>('/offers', payload);
    return unwrapResource(response.data);
  },

  update: async (id: number, payload: OfferPayload): Promise<Offer> => {
    const response = await apiClient.put<ApiResource<Offer>>(`/offers/${id}`, payload);
    return unwrapResource(response.data);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/offers/${id}`);
  },
};
