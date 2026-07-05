"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useOrders } from "@/hooks/useOrders";
import { OrderStatus, orderStatusLabels } from "@/services/orders";
import {
  DataTable,
  EmptyState,
  FilterBar,
  PageHeader,
  StatusBadge,
  Td,
  formatCurrency,
} from "../lib/admin-ui";

const pageSize = 10;
const statusOptions: Array<OrderStatus | "all"> = ["all", "new", "preparing", "shipped", "completed", "canceled"];

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium" }).format(new Date(value));
}

function getCustomerName(orderCustomerName?: string | null, fallback?: string | null): string {
  return orderCustomerName || fallback || "عميل غير محدد";
}

function TableSkeleton() {
  return (
    <DataTable headers={["رقم الطلب", "العميل", "المنتجات", "المبلغ", "الحالة", "التاريخ"]}>
      {[...Array(5)].map((_, row) => (
        <tr key={row}>
          {[...Array(6)].map((__, cell) => (
            <Td key={cell}>
              <div className="h-4 animate-pulse rounded bg-gold/10" />
            </Td>
          ))}
        </tr>
      ))}
    </DataTable>
  );
}

function AdminOrdersContent() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { orders, loading, error, refetch } = useOrders({ status: filterStatus });

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("ar-SA");

    return orders.filter((order) => {
      const customerName = getCustomerName(order.customer?.name, order.customer_email);
      const searchable = [
        order.order_number,
        String(order.id),
        customerName,
        order.customer_email,
        order.customer_phone,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("ar-SA");

      return !term || searchable.includes(term);
    });
  }, [orders, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const visibleOrders = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: OrderStatus | "all") => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <PageHeader
        title="الطلبات"
        description={`${filtered.length} طلب من أصل ${orders.length}`}
      />

      <FilterBar
        searchValue={search}
        onSearchChange={handleSearchChange}
        placeholder="بحث برقم الطلب أو العميل..."
      >
        <select
          value={filterStatus}
          onChange={(event) => handleStatusChange(event.target.value as OrderStatus | "all")}
          className="rounded-xl border border-gold/10 bg-bg1 px-3 py-2 text-sm text-text outline-none transition focus:border-gold/40"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status === "all" ? "جميع الحالات" : orderStatusLabels[status]}
            </option>
          ))}
        </select>
      </FilterBar>

      {error && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          <span className="inline-flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {error}
          </span>
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center gap-1 rounded-lg border border-red-300/20 px-3 py-1 text-xs transition hover:bg-red-500/10"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            إعادة المحاولة
          </button>
        </div>
      )}

      {loading ? (
        <TableSkeleton />
      ) : visibleOrders.length === 0 ? (
        <EmptyState title="لا توجد طلبات" description="غيّر البحث أو الفلاتر لعرض الطلبات المتاحة" />
      ) : (
        <>
          <DataTable headers={["رقم الطلب", "العميل", "المنتجات", "المبلغ", "الحالة", "التاريخ"]}>
            {visibleOrders.map((order) => {
              const customerName = getCustomerName(order.customer?.name, order.customer_email);

              return (
                <tr key={order.id} className="hover:bg-gold/[0.02]">
                  <Td>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-text transition hover:text-gold"
                    >
                      {order.order_number}
                    </Link>
                    <div className="mt-1 text-xs text-muted" dir="ltr">
                      #{order.id}
                    </div>
                  </Td>
                  <Td>
                    <div>
                      <p className="text-sm">{customerName}</p>
                      {order.customer_email && (
                        <p className="text-[11px] text-muted" dir="ltr">
                          {order.customer_email}
                        </p>
                      )}
                    </div>
                  </Td>
                  <Td className="text-muted">{order.items?.length ?? 0} منتج</Td>
                  <Td className="font-medium">{formatCurrency(Number(order.total))}</Td>
                  <Td>
                    <StatusBadge status={order.status} />
                  </Td>
                  <Td className="text-muted">{formatDate(order.created_at)}</Td>
                </tr>
              );
            })}
          </DataTable>

          <div className="mt-4 flex items-center justify-between gap-3 text-sm text-muted">
            <span>
              صفحة {safePage} من {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="rounded-lg border border-gold/15 px-3 py-1 transition hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                السابق
              </button>
              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                className="rounded-lg border border-gold/15 px-3 py-1 transition hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                التالي
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <ErrorBoundary>
      <AdminOrdersContent />
    </ErrorBoundary>
  );
}
