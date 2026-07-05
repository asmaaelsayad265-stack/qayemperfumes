import { useCallback, useEffect, useState } from "react";
import { inventoryApi, InventoryItem } from "@/services/inventory";
import { retryWithBackoff } from "@/utils/retry";

interface UseInventoryOptions {
  lowStockOnly?: boolean;
  outOfStockOnly?: boolean;
}

interface UseInventoryResult {
  inventory: InventoryItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useInventory(options: UseInventoryOptions = {}): UseInventoryResult {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await retryWithBackoff(() => {
        if (options.lowStockOnly) {
          return inventoryApi.getLowStock();
        }

        if (options.outOfStockOnly) {
          return inventoryApi.getOutOfStock();
        }

        return inventoryApi.getAll();
      });

      setInventory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحميل المخزون");
    } finally {
      setLoading(false);
    }
  }, [options.lowStockOnly, options.outOfStockOnly]);

  useEffect(() => {
    let mounted = true;

    const loadInventory = async () => {
      if (!mounted) {
        return;
      }

      await fetchInventory();
    };

    loadInventory();

    return () => {
      mounted = false;
    };
  }, [fetchInventory]);

  return { inventory, loading, error, refetch: fetchInventory };
}
