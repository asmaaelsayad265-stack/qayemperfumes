"use client";

import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import { PageHeader, StatsCard, DataTable, Td, formatCurrency } from "../lib/admin-ui";
import { mockProducts, mockOrders, mockCustomers, mockAnalytics } from "../lib/mock-data";

export default function AdminDashboardPage() {
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const activeProducts = mockProducts.filter((p) => p.status === "active").length;
  const totalOrders = mockOrders.length;
  const totalCustomers = mockCustomers.length;
  const pendingOrders = mockOrders.filter((o) => o.status === "new" || o.status === "preparing").length;

  return (
    <div>
      <PageHeader
        title="لوحة التحكم"
        description="نظرة عامة على أداء المتجر"
      />

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="إجمالي الإيرادات"
          value={formatCurrency(totalRevenue)}
          change="+12.5%"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatsCard
          title="المنتجات النشطة"
          value={String(activeProducts)}
          change="+2"
          icon={<Package className="h-5 w-5" />}
        />
        <StatsCard
          title="إجمالي الطلبات"
          value={String(totalOrders)}
          change="+8.3%"
          icon={<ShoppingCart className="h-5 w-5" />}
        />
        <StatsCard
          title="العملاء"
          value={String(totalCustomers)}
          change="+15.2%"
          icon={<Users className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pending orders summary */}
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <h3 className="mb-3 text-sm font-medium text-gold">الطلبات قيد التنفيذ</h3>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{pendingOrders}</p>
              <p className="text-xs text-muted">طلب بانتظار المعالجة</p>
            </div>
          </div>
        </div>

        {/* Top selling product */}
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <h3 className="mb-3 text-sm font-medium text-gold">الأفضل مبيعاً</h3>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-text">{mockAnalytics.topSellingProducts[0].name}</p>
              <p className="text-xs text-muted">{mockAnalytics.topSellingProducts[0].sales} مبيعات</p>
            </div>
          </div>
        </div>

        {/* Revenue this month */}
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <h3 className="mb-3 text-sm font-medium text-gold">إيرادات هذا الشهر</h3>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">
                {formatCurrency(mockAnalytics.monthlyRevenue[mockAnalytics.monthlyRevenue.length - 1].revenue)}
              </p>
              <p className="text-xs text-muted">شهر {mockAnalytics.monthlyRevenue[mockAnalytics.monthlyRevenue.length - 1].month}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="mt-6">
        <h2 className="mb-3 text-sm font-medium text-gold">آخر الطلبات</h2>
        <DataTable headers={["رقم الطلب", "العميل", "المبلغ", "الحالة", "التاريخ"]}>
          {mockOrders.slice(0, 5).map((order) => (
            <tr key={order.id} className="hover:bg-gold/[0.02]">
              <Td>{order.id}</Td>
              <Td>{order.customerName}</Td>
              <Td>{formatCurrency(order.total)}</Td>
              <Td>
                <span
                  className={`inline-block rounded-lg border px-2.5 py-0.5 text-[11px] font-medium ${
                    {
                      new: "bg-blue-500/15 text-blue-400 border-blue-500/25",
                      preparing: "bg-amber-500/15 text-amber-400 border-amber-500/25",
                      shipped: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
                      completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
                      canceled: "bg-red-500/15 text-red-400 border-red-500/25",
                    }[order.status]
                  }`}
                >
                  {{
                    new: "جديد",
                    preparing: "قيد التحضير",
                    shipped: "تم الشحن",
                    completed: "مكتمل",
                    canceled: "ملغي",
                  }[order.status]}
                </span>
              </Td>
              <Td className="text-muted">{order.createdAt}</Td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}
