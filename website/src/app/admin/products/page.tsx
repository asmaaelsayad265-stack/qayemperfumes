"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Plus, RefreshCw, Trash2 } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { productsApi } from "@/services/products";
import {
  DataTable,
  EmptyState,
  FilterBar,
  PageHeader,
  StatusBadge,
  Td,
  formatCurrency,
} from "../lib/admin-ui";

function TableSkeleton() {
  return (
    <DataTable headers={["المنتج", "التصنيف", "السعر", "المخزون", "الحالة", "إجراءات"]}>
      {[...Array(5)].map((_, index) => (
        <tr key={index}>
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

function AdminProductsContent() {
  const { products, loading, error, refetch } = useProducts();
  const { categories } = useCategories({ includeInactive: true });
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const categoryNames = useMemo(() => {
    return new Map(categories.map((category) => [category.id, category.name_ar]));
  }, [categories]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const categoryName = categoryNames.get(product.category_id) ?? "";
      const matchesSearch =
        !term ||
        product.name_ar.toLowerCase().includes(term) ||
        product.name_en?.toLowerCase().includes(term) ||
        product.slug.toLowerCase().includes(term) ||
        categoryName.toLowerCase().includes(term);
      const matchesStatus = filterStatus === "all" || product.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [categoryNames, filterStatus, products, search]);

  const handleDelete = async (id: number) => {
    if (!confirm("هل تريد حذف هذا المنتج نهائيا؟")) {
      return;
    }

    setDeletingId(id);
    setActionError(null);
    setSuccess(null);

    try {
      await productsApi.delete(id);
      setSuccess("تم حذف المنتج بنجاح.");
      await refetch();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "تعذر حذف المنتج");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="المنتجات"
        description={`${products.length} منتج في المتجر`}
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

      <FilterBar searchValue={search} onSearchChange={setSearch} placeholder="بحث عن منتج...">
        <select
          value={filterStatus}
          onChange={(event) => setFilterStatus(event.target.value)}
          className="rounded-xl border border-gold/10 bg-bg1 px-3 py-2 text-sm text-text outline-none transition focus:border-gold/40"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="draft">مسودة</option>
          <option value="archived">مؤرشف</option>
        </select>
      </FilterBar>

      {(error || actionError) && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          <span className="inline-flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {actionError || error}
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
      {success && (
        <div className="mb-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {success}
        </div>
      )}

      {loading ? (
        <TableSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState title="لا توجد منتجات" description="غيّر البحث أو أضف أول منتج حقيقي للمتجر" />
      ) : (
        <DataTable headers={["المنتج", "التصنيف", "السعر", "المخزون", "الحالة", "إجراءات"]}>
          {filtered.map((product) => {
            const stock = product.inventory?.quantity ?? 0;
            const threshold = product.inventory?.low_stock_threshold ?? 0;
            const lowStock = threshold > 0 && stock <= threshold;

            return (
              <tr key={product.id} className="hover:bg-gold/[0.02]">
                <Td>
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="font-medium text-text transition hover:text-gold"
                  >
                    {product.name_ar}
                  </Link>
                  <div className="mt-1 text-xs text-muted" dir="ltr">
                    {product.slug}
                  </div>
                </Td>
                <Td className="text-muted">{categoryNames.get(product.category_id) ?? "غير مصنف"}</Td>
                <Td>
                  <span>{formatCurrency(Number(product.price))}</span>
                  {product.original_price && (
                    <span className="mr-2 text-xs text-muted line-through">
                      {formatCurrency(Number(product.original_price))}
                    </span>
                  )}
                </Td>
                <Td>
                  <span className={lowStock ? "text-red-400" : stock <= threshold * 2 ? "text-amber-400" : "text-emerald-400"}>
                    {stock}
                  </span>
                </Td>
                <Td>
                  <StatusBadge status={product.status} />
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="rounded-lg border border-gold/20 px-3 py-1 text-xs text-gold transition hover:bg-gold/10"
                    >
                      تعديل
                    </Link>
                    <button
                      type="button"
                      disabled={deletingId === product.id}
                      onClick={() => handleDelete(product.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 px-3 py-1 text-xs text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      حذف
                    </button>
                  </div>
                </Td>
              </tr>
            );
          })}
        </DataTable>
      )}
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <ErrorBoundary>
      <AdminProductsContent />
    </ErrorBoundary>
  );
}
