import apiClient, { ApiResource, unwrapResource } from './api';

export interface InventoryItem {
  id: number;
  product_id: number;
  sku: string;
  variant: string | null;
  quantity: number;
  reserved: number;
  low_stock_threshold: number;
  location: string | null;
  status: 'in_stock' | 'out_of_stock' | 'low_stock';
  created_at: string;
  updated_at: string;
}

export interface InventoryPayload {
  product_id: number;
  sku: string;
  variant?: string | null;
  quantity: number;
  reserved: number;
  low_stock_threshold: number;
  location?: string | null;
  status: 'in_stock' | 'out_of_stock' | 'low_stock';
}

export const inventoryApi = {
  getAll: async (): Promise<InventoryItem[]> => {
    const response = await apiClient.get<ApiResource<InventoryItem[]>>('/inventory');
    return unwrapResource(response.data);
  },

  getLowStock: async (): Promise<InventoryItem[]> => {
    const response = await apiClient.get<ApiResource<InventoryItem[]>>('/inventory/low-stock');
    return unwrapResource(response.data);
  },

  getOutOfStock: async (): Promise<InventoryItem[]> => {
    const response = await apiClient.get<ApiResource<InventoryItem[]>>('/inventory/out-of-stock');
    return unwrapResource(response.data);
  },

  getBySku: async (sku: string): Promise<InventoryItem> => {
    const response = await apiClient.get<ApiResource<InventoryItem>>(`/inventory/sku/${sku}`);
    return unwrapResource(response.data);
  },

  getById: async (id: number): Promise<InventoryItem> => {
    const response = await apiClient.get<ApiResource<InventoryItem>>(`/inventory/${id}`);
    return unwrapResource(response.data);
  },

  create: async (payload: InventoryPayload): Promise<InventoryItem> => {
    const response = await apiClient.post<ApiResource<InventoryItem>>('/inventory', payload);
    return unwrapResource(response.data);
  },

  update: async (id: number, payload: InventoryPayload): Promise<InventoryItem> => {
    const response = await apiClient.put<ApiResource<InventoryItem>>(`/inventory/${id}`, payload);
    return unwrapResource(response.data);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/inventory/${id}`);
  },
};
