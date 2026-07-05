import { useCallback, useEffect, useState } from "react";
import { analyticsApi, DashboardStats, SalesAnalytics, TopProductSales } from "@/services/analytics";
import { retryWithBackoff } from "@/utils/retry";

interface UseAnalyticsResult {
  dashboard: DashboardStats | null;
  sales: SalesAnalytics | null;
  topProducts: TopProductSales[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAnalytics(): UseAnalyticsResult {
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const [sales, setSales] = useState<SalesAnalytics | null>(null);
  const [topProducts, setTopProducts] = useState<TopProductSales[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [dashboardData, salesData, topProductsData] = await retryWithBackoff(() => (
        Promise.all([
          analyticsApi.getDashboard(),
          analyticsApi.getSales(),
          analyticsApi.getTopProducts(),
        ])
      ));

      setDashboard(dashboardData);
      setSales(salesData);
      setTopProducts(topProductsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحميل الإحصائيات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadAnalytics = async () => {
      if (!mounted) {
        return;
      }

      await fetchAnalytics();
    };

    loadAnalytics();

    return () => {
      mounted = false;
    };
  }, [fetchAnalytics]);

  return { dashboard, sales, topProducts, loading, error, refetch: fetchAnalytics };
}
