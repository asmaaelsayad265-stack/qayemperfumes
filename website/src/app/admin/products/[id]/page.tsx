"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, RefreshCw } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCategories } from "@/hooks/useCategories";
import { useProductById } from "@/hooks/useProducts";
import ProductForm from "../ProductForm";
import { EmptyState, PageHeader, StatusBadge, formatCurrency } from "../../lib/admin-ui";

function ProductEditContent() {
  const params = useParams();
  const productId = Number(params.id);
  const { product, loading, error, refetch } = useProductById(Number.isFinite(productId) ? productId : null);
  const { categories, loading: categoriesLoading } = useCategories({ includeInactive: true });

  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
      >
        <ArrowRight className="h-4 w-4" />
        العودة للمنتجات
      </Link>

      {loading || categoriesLoading ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="h-96 animate-pulse rounded-2xl bg-gold/10 lg:col-span-2" />
          <div className="h-96 animate-pulse rounded-2xl bg-gold/10" />
        </div>
      ) : error || !product ? (
        <div className="space-y-3">
          <EmptyState title="المنتج غير موجود" description={error ?? "لم يتم العثور على المنتج المطلوب"} />
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
            title={product.name_ar}
            description={`${product.slug} • ${formatCurrency(Number(product.price))}`}
            action={<StatusBadge status={product.status} />}
          />
          <ProductForm product={product} categories={categories} />
        </>
      )}
    </div>
  );
}

export default function AdminProductEditPage() {
  return (
    <ErrorBoundary>
      <ProductEditContent />
    </ErrorBoundary>
  );
}
