import { useCallback, useEffect, useState } from "react";
import { customersApi, Customer } from "@/services/customers";
import { retryWithBackoff } from "@/utils/retry";

interface UseCustomersOptions {
  vipOnly?: boolean;
}

interface UseCustomersResult {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCustomers(options: UseCustomersOptions = {}): UseCustomersResult {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await retryWithBackoff(() => (
        options.vipOnly ? customersApi.getVip() : customersApi.getAll()
      ));
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحميل العملاء");
    } finally {
      setLoading(false);
    }
  }, [options.vipOnly]);

  useEffect(() => {
    let mounted = true;

    const loadCustomers = async () => {
      if (!mounted) {
        return;
      }

      await fetchCustomers();
    };

    loadCustomers();

    return () => {
      mounted = false;
    };
  }, [fetchCustomers]);

  return { customers, loading, error, refetch: fetchCustomers };
}

interface UseCustomerResult {
  customer: Customer | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCustomer(id: number | null): UseCustomerResult {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  const fetchCustomer = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await retryWithBackoff(() => customersApi.getById(id));
      setCustomer(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحميل بيانات العميل");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let mounted = true;

    const loadCustomer = async () => {
      if (!mounted) {
        return;
      }

      await fetchCustomer();
    };

    loadCustomer();

    return () => {
      mounted = false;
    };
  }, [fetchCustomer]);

  return { customer, loading, error, refetch: fetchCustomer };
}
