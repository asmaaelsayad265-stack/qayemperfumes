"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, RefreshCw } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCategoryById } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import CategoryForm from "../CategoryForm";
import { EmptyState, PageHeader, StatusBadge } from "../../lib/admin-ui";

function CategoryEditContent() {
  const params = useParams();
  const categoryId = Number(params.id);
  const { category, loading, error, refetch } = useCategoryById(Number.isFinite(categoryId) ? categoryId : null);
  const { products } = useProducts();

  const categoryProducts = useMemo(() => {
    if (!category) {
      return [];
    }

    return products.filter((product) => product.category_id === category.id);
  }, [category, products]);

  return (
    <div>
      <Link
        href="/admin/categories"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
      >
        <ArrowRight className="h-4 w-4" />
        العودة للتصنيفات
      </Link>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="h-80 animate-pulse rounded-2xl bg-gold/10 lg:col-span-2" />
          <div className="h-80 animate-pulse rounded-2xl bg-gold/10" />
        </div>
      ) : error || !category ? (
        <div className="space-y-3">
          <EmptyState title="التصنيف غير موجود" description={error ?? "لم يتم العثور على التصنيف المطلوب"} />
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center gap-2 rounded-xl border border-gold/20 px-4 py-2 text-sm text-gold"
          >
            <RefreshCw className="h-4 w-4" />
            إعادة المحاولة
          </button>
        </div>
      ) : (
        <>
          <PageHeader
            title={category.name_ar}
            description={`${categoryProducts.length} منتج مرتبط • ${category.slug}`}
            action={<StatusBadge status={String(category.is_active)} />}
          />
          <CategoryForm category={category} />
        </>
      )}
    </div>
  );
}

export default function AdminCategoryEditPage() {
  return (
    <ErrorBoundary>
      <CategoryEditContent />
    </ErrorBoundary>
  );
}
