"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import {
  PageHeader,
  DataTable,
  Td,
  StatusBadge,
  FilterBar,
  formatCurrency,
} from "../lib/admin-ui";
import { mockProducts } from "../lib/mock-data";
import Link from "next/link";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchesSearch =
        p.name.includes(search) ||
        p.id.includes(search) ||
        p.category.includes(search);
      const matchesStatus =
        filterStatus === "all" || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [search, filterStatus]);

  return (
    <div>
      <PageHeader
        title="المنتجات"
        description={`${mockProducts.length} منتج في المتجر`}
        action={
          <Link
            href="/admin/products/create"
            className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-medium text-black transition hover:bg-gold/90"
          >
            <Plus className="h-4 w-4" />
            إضافة منتج
          </Link>
        }
      />

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="بحث عن منتج..."
      >
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-gold/10 bg-bg1 px-3 py-2 text-sm text-text outline-none transition focus:border-gold/40"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="draft">مسودة</option>
          <option value="archived">مؤرشف</option>
        </select>
      </FilterBar>

      <DataTable
        headers={["المنتج", "التصنيف", "السعر", "المخزون", "الحالة", "المبيعات"]}
      >
        {filtered.map((product) => (
          <tr key={product.id} className="hover:bg-gold/[0.02]">
            <Td>
              <Link
                href={`/admin/products/${product.id}`}
                className="font-medium text-text transition hover:text-gold"
              >
                {product.name}
              </Link>
            </Td>
            <Td className="text-muted">{product.category}</Td>
            <Td>
              <div>
                <span>{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="mr-2 text-xs text-muted line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
            </Td>
            <Td>
              <span
                className={
                  product.stock <= 5
                    ? "text-red-400"
                    : product.stock <= 15
                      ? "text-amber-400"
                      : "text-emerald-400"
                }
              >
                {product.stock}
              </span>
            </Td>
            <Td>
              <StatusBadge status={product.status} />
            </Td>
            <Td className="text-muted">{product.salesCount}</Td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
