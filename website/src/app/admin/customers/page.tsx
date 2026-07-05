"use client";

import { useState, useMemo } from "react";
import {
  PageHeader,
  DataTable,
  Td,
  FilterBar,
  formatCurrency,
} from "../lib/admin-ui";
import { mockCustomers } from "../lib/mock-data";
import { Star } from "lucide-react";

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return mockCustomers.filter(
      (c) =>
        c.name.includes(search) ||
        c.email.includes(search) ||
        c.phone.includes(search) ||
        c.id.includes(search)
    );
  }, [search]);

  return (
    <div>
      <PageHeader
        title="العملاء"
        description={`${mockCustomers.length} عميل مسجل`}
      />

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="بحث عن عميل..."
      />

      <DataTable
        headers={["العميل", "البريد الإلكتروني", "الجوال", "الطلبات", "إجمالي المشتريات", "آخر طلب", ""]}
      >
        {filtered.map((customer) => (
          <tr key={customer.id} className="hover:bg-gold/[0.02]">
            <Td>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
                  {customer.name.charAt(0)}
                </div>
                <span className="font-medium">{customer.name}</span>
                {customer.isVIP && (
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                )}
              </div>
            </Td>
            <Td className="text-muted">{customer.email}</Td>
            <Td className="text-muted text-sm">
              <span dir="ltr">{customer.phone}</span>
            </Td>
            <Td>{customer.ordersCount}</Td>
            <Td className="font-medium">{formatCurrency(customer.totalSpent)}</Td>
            <Td className="text-muted">{customer.lastOrderAt}</Td>
            <Td>
              {customer.isVIP && (
                <span className="inline-block rounded-lg border border-gold/20 bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold">
                  VIP
                </span>
              )}
            </Td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
