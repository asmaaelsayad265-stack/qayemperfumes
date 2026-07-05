"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Star } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCustomers } from "@/hooks/useCustomers";
import {
  DataTable,
  EmptyState,
  FilterBar,
  PageHeader,
  Td,
  formatCurrency,
} from "../lib/admin-ui";

const pageSize = 10;

function formatDate(value?: string | null): string {
  if (!value) {
    return "لا يوجد";
  }

  return new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium" }).format(new Date(value));
}

function TableSkeleton() {
  return (
    <DataTable headers={["العميل", "البريد الإلكتروني", "الجوال", "الطلبات", "إجمالي المشتريات", "آخر طلب", ""]}>
      {[...Array(5)].map((_, row) => (
        <tr key={row}>
          {[...Array(7)].map((__, cell) => (
            <Td key={cell}>
              <div className="h-4 animate-pulse rounded bg-gold/10" />
            </Td>
          ))}
        </tr>
      ))}
    </DataTable>
  );
}

function AdminCustomersContent() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "vip">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { customers, loading, error, refetch } = useCustomers({ vipOnly: filter === "vip" });

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("ar-SA");

    return customers.filter((customer) => {
      const searchable = [
        String(customer.id),
        customer.name,
        customer.email,
        customer.phone,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("ar-SA");

      return !term || searchable.includes(term);
    });
  }, [customers, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const visibleCustomers = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: "all" | "vip") => {
    setFilter(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <PageHeader
        title="العملاء"
        description={`${filtered.length} عميل من أصل ${customers.length}`}
      />

      <FilterBar
        searchValue={search}
        onSearchChange={handleSearchChange}
        placeholder="بحث باسم العميل أو البريد أو الجوال..."
      >
        <select
          value={filter}
          onChange={(event) => handleFilterChange(event.target.value as "all" | "vip")}
          className="rounded-xl border border-gold/10 bg-bg1 px-3 py-2 text-sm text-text outline-none transition focus:border-gold/40"
        >
          <option value="all">جميع العملاء</option>
          <option value="vip">عملاء VIP</option>
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
      ) : visibleCustomers.length === 0 ? (
        <EmptyState title="لا يوجد عملاء" description="غيّر البحث أو الفلاتر لعرض العملاء" />
      ) : (
        <>
          <DataTable headers={["العميل", "البريد الإلكتروني", "الجوال", "الطلبات", "إجمالي المشتريات", "آخر طلب", ""]}>
            {visibleCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gold/[0.02]">
                <Td>
                  <Link
                    href={`/admin/customers/${customer.id}`}
                    className="flex items-center gap-2 font-medium text-text transition hover:text-gold"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
                      {customer.name.charAt(0)}
                    </span>
                    <span>{customer.name}</span>
                    {customer.is_vip ? <Star className="h-3.5 w-3.5 fill-gold text-gold" /> : null}
                  </Link>
                </Td>
                <Td className="text-muted">{customer.email || "غير مسجل"}</Td>
                <Td className="text-muted text-sm">
                  {customer.phone ? <span dir="ltr">{customer.phone}</span> : "غير مسجل"}
                </Td>
                <Td>{customer.orders_count}</Td>
                <Td className="font-medium">{formatCurrency(Number(customer.total_spent))}</Td>
                <Td className="text-muted">{formatDate(customer.last_order_at)}</Td>
                <Td>
                  {customer.is_vip ? (
                    <span className="inline-block rounded-lg border border-gold/20 bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold">
                      VIP
                    </span>
                  ) : null}
                </Td>
              </tr>
            ))}
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

export default function AdminCustomersPage() {
  return (
    <ErrorBoundary>
      <AdminCustomersContent />
    </ErrorBoundary>
  );
}
