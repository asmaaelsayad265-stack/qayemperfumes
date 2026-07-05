import apiClient from './api';
import type { Order } from './orders';

export interface DashboardStats {
  total_orders: number;
  total_products: number;
  total_customers: number;
  low_stock_items: number;
  recent_orders: Order[];
}

export interface SalesAnalytics {
  total_sales: number | string;
  orders_by_status: Partial<Record<string, number>>;
  recent_sales: number | string;
  monthly_sales: MonthlySalesPoint[];
  sales_by_category: CategorySalesPoint[];
}

export interface MonthlySalesPoint {
  month: string;
  revenue: number | string;
  orders: number;
}

export interface CategorySalesPoint {
  category: string;
  revenue: number | string;
  items_sold: number;
}

export interface TopProductSales {
  product_id: number;
  product_name: string;
  sales: number | string;
  revenue: number | string;
}

export const analyticsApi = {
  getDashboard: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>('/analytics/dashboard');
    return response.data;
  },

  getSales: async (): Promise<SalesAnalytics> => {
    const response = await apiClient.get<SalesAnalytics>('/analytics/sales');
    return response.data;
  },

  getTopProducts: async (): Promise<TopProductSales[]> => {
    const response = await apiClient.get<TopProductSales[]>('/analytics/top-products');
    return response.data;
  },
};
