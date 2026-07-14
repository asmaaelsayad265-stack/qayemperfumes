import apiClient, { ApiResource, unwrapResource } from './api';
import type { Customer } from './customers';

export type OrderStatus = 'new' | 'preparing' | 'shipped' | 'completed' | 'canceled';
export type PaymentStatus = 'paid' | 'pending' | 'failed';

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number | string;
  subtotal: number | string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_id: number;
  total: number | string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: string | null;
  shipping_address: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  notes: string | null;
  customer?: Customer | null;
  items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderPayload {
  order_number: string;
  customer_id: number;
  total: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method?: string | null;
  shipping_address?: string | null;
  customer_email?: string | null;
  customer_phone?: string | null;
  notes?: string | null;
}

export const orderStatusLabels: Record<OrderStatus, string> = {
  new: 'جديد',
  preparing: 'قيد التحضير',
  shipped: 'تم الشحن',
  completed: 'مكتمل',
  canceled: 'ملغي',
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  paid: 'تم الدفع',
  pending: 'قيد الانتظار',
  failed: 'فشل',
};

export function toOrderPayload(order: Order, status: OrderStatus = order.status): OrderPayload {
  return {
    order_number: order.order_number,
    customer_id: order.customer_id,
    total: Number(order.total),
    status,
    payment_status: order.payment_status,
    payment_method: order.payment_method,
    shipping_address: order.shipping_address,
    customer_email: order.customer_email,
    customer_phone: order.customer_phone,
    notes: order.notes,
  };
}

export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    const response = await apiClient.get<ApiResource<Order[]>>('/orders');
    return unwrapResource(response.data);
  },

  getRecent: async (): Promise<Order[]> => {
    const response = await apiClient.get<ApiResource<Order[]>>('/orders/recent');
    return unwrapResource(response.data);
  },

  getByStatus: async (status: OrderStatus): Promise<Order[]> => {
    const response = await apiClient.get<ApiResource<Order[]>>(`/orders/status/${status}`);
    return unwrapResource(response.data);
  },

  getByCustomer: async (customerId: number): Promise<Order[]> => {
    const response = await apiClient.get<ApiResource<Order[]>>(`/orders/customer/${customerId}`);
    return unwrapResource(response.data);
  },

  getById: async (id: number): Promise<Order> => {
    const response = await apiClient.get<ApiResource<Order>>(`/orders/${id}`);
    return unwrapResource(response.data);
  },

  update: async (id: number, payload: OrderPayload): Promise<Order> => {
    const response = await apiClient.put<ApiResource<Order>>(`/orders/${id}`, payload);
    return unwrapResource(response.data);
  },

  updateStatus: async (order: Order, status: OrderStatus): Promise<Order> => {
    const response = await apiClient.put<ApiResource<Order>>(
      `/orders/${order.id}`,
      toOrderPayload(order, status)
    );
    return unwrapResource(response.data);
  },
};
