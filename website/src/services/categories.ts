import apiClient, { ApiResource, unwrapResource } from './api';
import { Category } from './products';

// Re-export Category type
export type { Category };

export interface CategoryPayload {
  name_ar: string;
  name_en?: string | null;
  slug: string;
  description_ar?: string | null;
  description_en?: string | null;
  image?: string | null;
  sort_order: number;
  is_active: boolean;
}

// API Functions
export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<ApiResource<Category[]> | Category[]>('/categories');
    return unwrapResource(response.data);
  },

  // Get active categories (for navigation)
  getActive: async (): Promise<Category[]> => {
    const response = await apiClient.get<ApiResource<Category[]> | Category[]>('/categories/active');
    return unwrapResource(response.data);
  },

  // Get category by slug
  getBySlug: async (slug: string): Promise<Category> => {
    const response = await apiClient.get<ApiResource<Category> | Category>(`/categories/slug/${slug}`);
    return unwrapResource(response.data);
  },

  // Get category by ID
  getById: async (id: number): Promise<Category> => {
    const response = await apiClient.get<ApiResource<Category> | Category>(`/categories/${id}`);
    return unwrapResource(response.data);
  },

  create: async (payload: CategoryPayload): Promise<Category> => {
    const response = await apiClient.post<ApiResource<Category> | Category>('/categories', payload);
    return unwrapResource(response.data);
  },

  update: async (id: number, payload: CategoryPayload): Promise<Category> => {
    const response = await apiClient.put<ApiResource<Category> | Category>(`/categories/${id}`, payload);
    return unwrapResource(response.data);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },
};
