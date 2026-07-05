"use client";

import { useState, useMemo } from "react";
import {
  PageHeader,
  DataTable,
  Td,
  FilterBar,
  formatCurrency,
} from "../lib/admin-ui";
import { mockOrders } from "../lib/mock-data";
import Link from "next/link";

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = useMemo(() => {
    return mockOrders.filter((o) => {
      const matchesSearch =
        o.id.includes(search) ||
        o.customerName.includes(search) ||
        o.customerEmail.includes(search);
      const matchesStatus =
        filterStatus === "all" || o.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [search, filterStatus]);

  const statusStyles: Record<string, string> = {
    new: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    preparing: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    shipped: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    canceled: "bg-red-500/15 text-red-400 border-red-500/25",
  };

  const statusLabels: Record<string, string> = {
    new: "جديد",
    preparing: "قيد التحضير",
    shipped: "تم الشحن",
    completed: "مكتمل",
    canceled: "ملغي",
  };

  return (
    <div>
      <PageHeader
        title="الطلبات"
        description={`${mockOrders.length} طلب`}
      />

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="بحث عن طلب..."
      >
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-gold/10 bg-bg1 px-3 py-2 text-sm text-text outline-none transition focus:border-gold/40"
        >
          <option value="all">جميع الحالات</option>
          <option value="new">جديد</option>
          <option value="preparing">قيد التحضير</option>
          <option value="shipped">تم الشحن</option>
          <option value="completed">مكتمل</option>
          <option value="canceled">ملغي</option>
        </select>
      </FilterBar>

      <DataTable
        headers={["رقم الطلب", "العميل", "المنتجات", "المبلغ", "الحالة", "تاريخ"]}
      >
        {filtered.map((order) => (
          <tr key={order.id} className="hover:bg-gold/[0.02]">
            <Td>
              <Link
                href={`/admin/orders/${order.id}`}
                className="font-medium text-text transition hover:text-gold"
              >
                {order.id}
              </Link>
            </Td>
            <Td>
              <div>
                <p className="text-sm">{order.customerName}</p>
                <p className="text-[11px] text-muted">{order.customerEmail}</p>
              </div>
            </Td>
            <Td className="text-muted">
              {order.items.length} منتج
            </Td>
            <Td className="font-medium">{formatCurrency(order.total)}</Td>
            <Td>
              <span
                className={`inline-block rounded-lg border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[order.status]}`}
              >
                {statusLabels[order.status]}
              </span>
            </Td>
            <Td className="text-muted">{order.createdAt}</Td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
