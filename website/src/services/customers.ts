import apiClient, { ApiResource, unwrapResource } from './api';

export interface Customer {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  orders_count: number;
  total_spent: number | string;
  is_vip: boolean;
  last_order_at: string | null;
  created_at: string;
  updated_at: string;
}

export const customersApi = {
  getAll: async (): Promise<Customer[]> => {
    const response = await apiClient.get<ApiResource<Customer[]> | Customer[]>('/customers');
    return unwrapResource(response.data);
  },

  getVip: async (): Promise<Customer[]> => {
    const response = await apiClient.get<ApiResource<Customer[]> | Customer[]>('/customers/vip');
    return unwrapResource(response.data);
  },

  getById: async (id: number): Promise<Customer> => {
    const response = await apiClient.get<ApiResource<Customer> | Customer>(`/customers/${id}`);
    return unwrapResource(response.data);
  },

  getByEmail: async (email: string): Promise<Customer> => {
    const response = await apiClient.get<ApiResource<Customer> | Customer>(`/customers/email/${encodeURIComponent(email)}`);
    return unwrapResource(response.data);
  },
};
