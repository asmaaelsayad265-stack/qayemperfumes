import apiClient from './api';
import { Review } from './products';

// API Functions
export const reviewsApi = {
  // Get approved reviews
  getApproved: async (): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>('/reviews/approved');
    return response.data;
  },

  // Get reviews by product
  getByProduct: async (productId: number): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>(`/reviews/product/${productId}`);
    return response.data;
  },

  // Get review by ID
  getById: async (id: number): Promise<Review> => {
    const response = await apiClient.get<Review>(`/reviews/${id}`);
    return response.data;
  },
};
