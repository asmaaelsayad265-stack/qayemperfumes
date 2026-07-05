import { useCallback, useEffect, useState } from "react";
import { ordersApi, Order, OrderStatus } from "@/services/orders";
import { retryWithBackoff } from "@/utils/retry";

interface UseOrdersOptions {
  status?: OrderStatus | "all";
  customerId?: number | null;
  recentOnly?: boolean;
}

interface UseOrdersResult {
  orders: Order[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useOrders(options: UseOrdersOptions = {}): UseOrdersResult {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await retryWithBackoff(() => {
        if (options.customerId) {
          return ordersApi.getByCustomer(options.customerId);
        }

        if (options.recentOnly) {
          return ordersApi.getRecent();
        }

        if (options.status && options.status !== "all") {
          return ordersApi.getByStatus(options.status);
        }

        return ordersApi.getAll();
      });

      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  }, [options.customerId, options.recentOnly, options.status]);

  useEffect(() => {
    let mounted = true;

    const loadOrders = async () => {
      if (!mounted) {
        return;
      }

      await fetchOrders();
    };

    loadOrders();

    return () => {
      mounted = false;
    };
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
}

interface UseOrderResult {
  order: Order | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  setOrder: (order: Order) => void;
}

export function useOrder(id: number | null): UseOrderResult {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await retryWithBackoff(() => ordersApi.getById(id));
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحميل بيانات الطلب");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let mounted = true;

    const loadOrder = async () => {
      if (!mounted) {
        return;
      }

      await fetchOrder();
    };

    loadOrder();

    return () => {
      mounted = false;
    };
  }, [fetchOrder]);

  return { order, loading, error, refetch: fetchOrder, setOrder };
}
