"use client";

import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCategories } from "@/hooks/useCategories";
import ProductForm from "../ProductForm";
import { EmptyState, PageHeader } from "../../lib/admin-ui";

function CreateProductContent() {
  const { categories, loading, error, refetch } = useCategories({ includeInactive: true });

  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
      >
        <ArrowRight className="h-4 w-4" />
        العودة للمنتجات
      </Link>

      <PageHeader title="إضافة منتج" description="إنشاء منتج عطر جديد وربطه بتصنيف حقيقي" />

      {loading ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="h-96 animate-pulse rounded-2xl bg-gold/10 lg:col-span-2" />
          <div className="h-96 animate-pulse rounded-2xl bg-gold/10" />
        </div>
      ) : error ? (
        <EmptyState title="تعذر تحميل التصنيفات" description={error} />
      ) : categories.length === 0 ? (
        <div className="space-y-3">
          <EmptyState title="لا توجد تصنيفات" description="أضف تصنيفا قبل إنشاء المنتجات" />
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center gap-2 rounded-xl border border-gold/20 px-4 py-2 text-sm text-gold"
          >
            <RefreshCw className="h-4 w-4" />
            إعادة التحميل
          </button>
        </div>
      ) : (
        <ProductForm categories={categories} />
      )}
    </div>
  );
}

export default function CreateProductPage() {
  return (
    <ErrorBoundary>
      <CreateProductContent />
    </ErrorBoundary>
  );
}
