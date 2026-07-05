"use client";

import {
  PageHeader,
  StatsCard,
  formatCurrency,
} from "../lib/admin-ui";
import { mockAnalytics } from "../lib/mock-data";
import { TrendingUp, Package, ShoppingCart, Users } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="الإحصائيات"
        description="تحليل أداء المتجر والمبيعات"
      />

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="إجمالي الإيرادات"
          value={formatCurrency(mockAnalytics.totalRevenue)}
          change={`+${mockAnalytics.revenueChange}%`}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatsCard
          title="المنتجات"
          value={String(mockAnalytics.totalProducts)}
          icon={<Package className="h-5 w-5" />}
        />
        <StatsCard
          title="الطلبات"
          value={String(mockAnalytics.totalOrders)}
          change={`+${mockAnalytics.ordersChange}%`}
          icon={<ShoppingCart className="h-5 w-5" />}
        />
        <StatsCard
          title="العملاء"
          value={String(mockAnalytics.totalCustomers)}
          change={`+${mockAnalytics.customersChange}%`}
          icon={<Users className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Revenue Chart (bar chart visual) */}
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <h3 className="mb-4 text-sm font-medium text-gold">الإيرادات الشهرية</h3>
          <div className="flex items-end justify-between gap-2" style={{ height: 160 }}>
            {mockAnalytics.monthlyRevenue.map((m) => {
              const maxRev = Math.max(...mockAnalytics.monthlyRevenue.map((r) => r.revenue));
              const height = (m.revenue / maxRev) * 100;
              return (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] text-muted">
                    {formatCurrency(m.revenue)}
                  </span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-gold/40 to-gold/20 transition hover:from-gold/60"
                    style={{ height: `${height}%`, minHeight: 16 }}
                  />
                  <span className="text-[10px] text-muted/60">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Orders by Status */}
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <h3 className="mb-4 text-sm font-medium text-gold">حالة الطلبات</h3>
          <div className="space-y-3">
            {mockAnalytics.ordersByStatus.map((item) => {
              const total = mockAnalytics.ordersByStatus.reduce((s, o) => s + o.count, 0);
              const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
              const colors: Record<string, string> = {
                new: "bg-blue-500",
                preparing: "bg-amber-500",
                shipped: "bg-indigo-500",
                completed: "bg-emerald-500",
                canceled: "bg-red-500",
              };
              const labels: Record<string, string> = {
                new: "جديد",
                preparing: "قيد التحضير",
                shipped: "تم الشحن",
                completed: "مكتمل",
                canceled: "ملغي",
              };
              return (
                <div key={item.status}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-text">{labels[item.status] || item.status}</span>
                    <span className="text-muted">{item.count} طلب ({pct}%)</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-bg1">
                    <div
                      className={`h-full rounded-full transition-all ${colors[item.status] || "bg-gold"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="mt-6">
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <h3 className="mb-4 text-sm font-medium text-gold">المنتجات الأكثر مبيعاً</h3>
          <div className="space-y-3">
            {mockAnalytics.topSellingProducts.map((product, i) => {
              const maxSales = mockAnalytics.topSellingProducts[0].sales;
              const pct = (product.sales / maxSales) * 100;
              return (
                <div key={product.name}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-[10px] font-bold text-gold">
                        {i + 1}
                      </span>
                      <span className="text-text">{product.name}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-muted">{product.sales} مبيعات</span>
                      <span className="text-text">{formatCurrency(product.revenue)}</span>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-bg1">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-gold to-gold/60"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
