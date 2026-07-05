"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { PageHeader, FilterBar, StatusBadge } from "../lib/admin-ui";
import { mockCategories } from "../lib/mock-data";
import Link from "next/link";

export default function AdminCategoriesPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return mockCategories.filter(
      (c) =>
        c.name.includes(search) ||
        c.description.includes(search) ||
        c.slug.includes(search)
    );
  }, [search]);

  return (
    <div>
      <PageHeader
        title="التصنيفات"
        description="إدارة تصنيفات المنتجات"
        action={
          <Link
            href="/admin/categories/create"
            className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-medium text-black transition hover:bg-gold/90"
          >
            <Plus className="h-4 w-4" />
            إضافة تصنيف
          </Link>
        }
      />

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="بحث عن تصنيف..."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((category) => (
          <Link
            key={category.id}
            href={`/admin/categories/${category.id}`}
            className="group rounded-2xl border border-gold/10 bg-surface/50 p-5 transition hover:border-gold/30 hover:bg-gold/[0.02]"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-text group-hover:text-gold transition">
                {category.name}
              </h3>
              <StatusBadge status={String(category.isActive)} />
            </div>
            <p className="mb-3 text-xs text-muted line-clamp-2">
              {category.description}
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">
                {category.productCount} منتج
              </span>
              <span className="text-muted/60">{category.createdAt}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
