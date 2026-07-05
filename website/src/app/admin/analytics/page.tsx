"use client";

import { useMemo } from "react";
import Link from "next/link";
import { AlertTriangle, BarChart3, Package, RefreshCw, ShoppingCart, TrendingUp, Users } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useInventory } from "@/hooks/useInventory";
import { useProducts } from "@/hooks/useProducts";
import { orderStatusLabels, OrderStatus } from "@/services/orders";
import {
  DataTable,
  EmptyState,
  PageHeader,
  StatsCard,
  StatusBadge,
  Td,
  formatCurrency,
} from "../lib/admin-ui";

function formatMonth(value: string): string {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("ar-SA", { month: "short" }).format(new Date(year, month - 1, 1));
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium" }).format(new Date(value));
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="rounded-2xl border border-gold/15 bg-surface/70 p-5">
            <div className="mb-3 h-4 w-24 animate-pulse rounded bg-gold/10" />
            <div className="h-8 w-32 animate-pulse rounded bg-gold/10" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
            <div className="mb-4 h-4 w-32 animate-pulse rounded bg-gold/10" />
            <div className="space-y-3">
              {[...Array(5)].map((__, row) => (
                <div key={row} className="h-8 animate-pulse rounded bg-gold/10" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminAnalyticsContent() {
  const { dashboard, sales, topProducts, loading, error, refetch } = useAnalytics();
  const {
    inventory: lowStock,
    loading: lowStockLoading,
    error: lowStockError,
    refetch: refetchLowStock,
  } = useInventory({ lowStockOnly: true });
  const { products } = useProducts();

  const productNames = useMemo(() => {
    return new Map(products.map((product) => [product.id, product.name_ar]));
  }, [products]);

  const monthlySales = sales?.monthly_sales ?? [];
  const salesByCategory = sales?.sales_by_category ?? [];
  const ordersByStatus = sales?.orders_by_status ?? {};
  const statusEntries = Object.entries(ordersByStatus).map(([status, count]) => ({
    status,
    count: Number(count ?? 0),
  }));
  const maxMonthlyRevenue = Math.max(1, ...monthlySales.map((point) => Number(point.revenue)));
  const maxCategoryRevenue = Math.max(1, ...salesByCategory.map((point) => Number(point.revenue)));
  const maxProductSales = Math.max(1, ...topProducts.map((product) => Number(product.sales)));
  const totalOrdersByStatus = statusEntries.reduce((sum, item) => sum + item.count, 0);
  const combinedError = error || lowStockError;

  const handleRetry = async () => {
    await Promise.all([refetch(), refetchLowStock()]);
  };

  return (
    <div>
      <PageHeader
        title="الإحصائيات"
        description="تحليل أداء المتجر والمبيعات من بيانات Laravel الحقيقية"
      />

      {combinedError && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          <span className="inline-flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {combinedError}
          </span>
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-1 rounded-lg border border-red-300/20 px-3 py-1 text-xs transition hover:bg-red-500/10"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            إعادة المحاولة
          </button>
        </div>
      )}

      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="إجمالي الإيرادات"
              value={formatCurrency(Number(sales?.total_sales ?? 0))}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <StatsCard
              title="إيرادات آخر 30 يوم"
              value={formatCurrency(Number(sales?.recent_sales ?? 0))}
              icon={<BarChart3 className="h-5 w-5" />}
            />
            <StatsCard
              title="الطلبات"
              value={String(dashboard?.total_orders ?? 0)}
              icon={<ShoppingCart className="h-5 w-5" />}
            />
            <StatsCard
              title="العملاء"
              value={String(dashboard?.total_customers ?? 0)}
              icon={<Users className="h-5 w-5" />}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
              <h3 className="mb-4 text-sm font-medium text-gold">المبيعات الشهرية</h3>
              {monthlySales.length === 0 ? (
                <EmptyState title="لا توجد بيانات مبيعات شهرية" />
              ) : (
                <div className="flex h-48 items-end justify-between gap-2">
                  {monthlySales.map((point) => {
                    const height = Math.max(8, (Number(point.revenue) / maxMonthlyRevenue) * 100);

                    return (
                      <div key={point.month} className="flex flex-1 flex-col items-center gap-2">
                        <span className="text-[10px] text-muted">{formatCurrency(Number(point.revenue))}</span>
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-gold/45 to-gold/20 transition hover:from-gold/65"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-[10px] text-muted/70">{formatMonth(point.month)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
              <h3 className="mb-4 text-sm font-medium text-gold">إحصائيات الطلبات</h3>
              {totalOrdersByStatus === 0 ? (
                <EmptyState title="لا توجد طلبات بعد" />
              ) : (
                <div className="space-y-3">
                  {statusEntries.map(({ status, count }) => {
                    const numericCount = count;
                    const pct = totalOrdersByStatus > 0 ? Math.round((numericCount / totalOrdersByStatus) * 100) : 0;

                    return (
                      <div key={status}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-text">{orderStatusLabels[status as OrderStatus] ?? status}</span>
                          <span className="text-muted">{numericCount} طلب ({pct}%)</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-bg1">
                          <div className="h-full rounded-full bg-gold/70" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
              <h3 className="mb-4 text-sm font-medium text-gold">العطور الأكثر مبيعا</h3>
              {topProducts.length === 0 ? (
                <EmptyState title="لا توجد مبيعات منتجات بعد" />
              ) : (
                <div className="space-y-3">
                  {topProducts.map((product, index) => {
                    const pct = (Number(product.sales) / maxProductSales) * 100;

                    return (
                      <div key={`${product.product_id}-${product.product_name}`}>
                        <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[10px] font-bold text-gold">
                              {index + 1}
                            </span>
                            <span className="truncate text-text">{product.product_name}</span>
                          </div>
                          <div className="flex shrink-0 gap-4">
                            <span className="text-muted">{Number(product.sales)} مبيعات</span>
                            <span className="text-text">{formatCurrency(Number(product.revenue))}</span>
                          </div>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-bg1">
                          <div className="h-full rounded-full bg-gradient-to-l from-gold to-gold/60" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
              <h3 className="mb-4 text-sm font-medium text-gold">المبيعات حسب التصنيف</h3>
              {salesByCategory.length === 0 ? (
                <EmptyState title="لا توجد مبيعات حسب التصنيف" />
              ) : (
                <div className="space-y-3">
                  {salesByCategory.map((category) => {
                    const pct = (Number(category.revenue) / maxCategoryRevenue) * 100;

                    return (
                      <div key={category.category}>
                        <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                          <span className="text-text">{category.category}</span>
                          <span className="text-muted">
                            {formatCurrency(Number(category.revenue))} · {category.items_sold} قطعة
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-bg1">
                          <div className="h-full rounded-full bg-emerald-400/70" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-sm font-medium text-gold">تنبيهات انخفاض المخزون</h3>
                <span className="inline-flex items-center gap-1 rounded-lg bg-gold/10 px-2 py-1 text-xs text-gold">
                  <Package className="h-3.5 w-3.5" />
                  {dashboard?.low_stock_items ?? lowStock.length}
                </span>
              </div>
              {lowStockLoading ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="h-10 animate-pulse rounded-xl bg-gold/10" />
                  ))}
                </div>
              ) : lowStock.length === 0 ? (
                <EmptyState title="لا توجد تنبيهات مخزون" />
              ) : (
                <div className="space-y-2">
                  {lowStock.slice(0, 6).map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-bg1/50 px-3 py-2 text-sm">
                      <div>
                        <p className="font-medium">{productNames.get(item.product_id) ?? `منتج #${item.product_id}`}</p>
                        <p className="text-[11px] text-muted" dir="ltr">{item.sku}</p>
                      </div>
                      <span className="rounded-lg border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs text-red-300">
                        {item.quantity} متاح
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
              <h3 className="mb-4 text-sm font-medium text-gold">أحدث الطلبات</h3>
              {(dashboard?.recent_orders ?? []).length === 0 ? (
                <EmptyState title="لا توجد طلبات حديثة" />
              ) : (
                <DataTable headers={["الطلب", "العميل", "المبلغ", "الحالة"]}>
                  {(dashboard?.recent_orders ?? []).map((order) => (
                    <tr key={order.id} className="hover:bg-gold/[0.02]">
                      <Td>
                        <Link href={`/admin/orders/${order.id}`} className="font-medium text-text transition hover:text-gold">
                          {order.order_number}
                        </Link>
                        <div className="mt-1 text-[11px] text-muted">{formatDate(order.created_at)}</div>
                      </Td>
                      <Td className="text-muted">{order.customer?.name || order.customer_email || "غير محدد"}</Td>
                      <Td className="font-medium">{formatCurrency(Number(order.total))}</Td>
                      <Td>
                        <StatusBadge status={order.status} />
                      </Td>
                    </tr>
                  ))}
                </DataTable>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <ErrorBoundary>
      <AdminAnalyticsContent />
    </ErrorBoundary>
  );
}
