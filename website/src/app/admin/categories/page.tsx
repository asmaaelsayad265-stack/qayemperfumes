"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Plus, RefreshCw, Trash2 } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { categoriesApi } from "@/services/categories";
import { EmptyState, FilterBar, PageHeader, StatusBadge } from "../lib/admin-ui";

function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="h-36 animate-pulse rounded-2xl bg-gold/10" />
      ))}
    </div>
  );
}

function AdminCategoriesContent() {
  const { categories, loading, error, refetch } = useCategories({ includeInactive: true });
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const productCounts = useMemo(() => {
    const counts = new Map<number, number>();
    products.forEach((product) => {
      counts.set(product.category_id, (counts.get(product.category_id) ?? 0) + 1);
    });
    return counts;
  }, [products]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return categories.filter((category) => {
      return (
        !term ||
        category.name_ar.toLowerCase().includes(term) ||
        category.name_en?.toLowerCase().includes(term) ||
        category.description_ar?.toLowerCase().includes(term) ||
        category.slug.toLowerCase().includes(term)
      );
    });
  }, [categories, search]);

  const toggleActive = async (categoryId: number) => {
    const category = categories.find((item) => item.id === categoryId);

    if (!category) {
      return;
    }

    setUpdatingId(categoryId);
    setActionError(null);
    setSuccess(null);

    try {
      await categoriesApi.update(categoryId, {
        name_ar: category.name_ar,
        name_en: category.name_en,
        slug: category.slug,
        description_ar: category.description_ar,
        description_en: category.description_en,
        image: category.image,
        sort_order: category.sort_order,
        is_active: !category.is_active,
      });
      setSuccess(category.is_active ? "تم تعطيل التصنيف بنجاح." : "تم تفعيل التصنيف بنجاح.");
      await refetch();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "تعذر تحديث حالة التصنيف");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (categoryId: number) => {
    if (!confirm("هل تريد حذف هذا التصنيف نهائيا؟")) {
      return;
    }

    setUpdatingId(categoryId);
    setActionError(null);
    setSuccess(null);

    try {
      await categoriesApi.delete(categoryId);
      setSuccess("تم حذف التصنيف بنجاح.");
      await refetch();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "تعذر حذف التصنيف");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="التصنيفات"
        description="إدارة تصنيفات المنتجات وحالة ظهورها"
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

      <FilterBar searchValue={search} onSearchChange={setSearch} placeholder="بحث عن تصنيف..." />

      {(error || actionError) && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          <span className="inline-flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {actionError || error}
          </span>
          <button type="button" onClick={refetch} className="inline-flex items-center gap-1 rounded-lg border border-red-300/20 px-3 py-1 text-xs">
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
        <CategorySkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState title="لا توجد تصنيفات" description="غيّر البحث أو أضف تصنيفا جديدا" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-gold/10 bg-surface/50 p-5 transition hover:border-gold/30 hover:bg-gold/[0.02]"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <Link
                  href={`/admin/categories/${category.id}`}
                  className="text-sm font-bold text-text transition hover:text-gold"
                >
                  {category.name_ar}
                </Link>
                <StatusBadge status={String(category.is_active)} />
              </div>
              <p className="mb-3 line-clamp-2 text-xs text-muted">{category.description_ar || "بدون وصف"}</p>
              <div className="mb-4 flex items-center justify-between text-xs">
                <span className="text-muted">{productCounts.get(category.id) ?? 0} منتج</span>
                <span className="text-muted/60" dir="ltr">
                  {category.slug}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/admin/categories/${category.id}`}
                  className="rounded-lg border border-gold/20 px-3 py-1 text-xs text-gold transition hover:bg-gold/10"
                >
                  تعديل
                </Link>
                <button
                  type="button"
                  disabled={updatingId === category.id}
                  onClick={() => toggleActive(category.id)}
                  className="rounded-lg border border-gold/10 px-3 py-1 text-xs text-muted transition hover:text-text disabled:opacity-50"
                >
                  {category.is_active ? "تعطيل" : "تفعيل"}
                </button>
                <button
                  type="button"
                  disabled={updatingId === category.id}
                  onClick={() => handleDelete(category.id)}
                  className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 px-3 py-1 text-xs text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminCategoriesPage() {
  return (
    <ErrorBoundary>
      <AdminCategoriesContent />
    </ErrorBoundary>
  );
}
