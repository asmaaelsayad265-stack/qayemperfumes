"use client";

import { useState, useEffect } from "react";
import PublicShell from "../../components/layout/PublicShell";
import HeroSection from "../../components/sections/HeroSection";
import SearchFilterBar from "../../components/sections/SearchFilterBar";
import ProductCard from "../../components/ProductCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import { productsApi, Product } from "@/services/products";
import { retryWithBackoff } from "@/utils/retry";

function SpecialEditionsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const allProducts = await retryWithBackoff(() => productsApi.getAll());
        // Filter limited edition products
        const limited = allProducts.filter(p => p.is_limited_edition);
        setProducts(limited);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section>
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold">إصدارات خاصة</h1>
            <p className="text-sm text-muted">جاري التحميل...</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-lg bg-linear-to-br from-gray-900 to-black" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold">إصدارات خاصة</h1>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
        <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-8 text-center">
          <p className="text-muted mb-4">تعذر تحميل المنتجات. يرجى المحاولة مرة أخرى.</p>
          <button
            onClick={() => window.location.reload()}
            className="gold-shimmer inline-flex items-center justify-center rounded-2xl bg-transparent px-6 py-3 text-sm font-semibold text-transparent ring-1 ring-gold/40"
          >
            إعادة المحاولة
          </button>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section>
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold">إصدارات خاصة</h1>
            <p className="text-sm text-muted">لا توجد منتجات متاحة</p>
          </div>
        </div>
        <div className="rounded-3xl border border-gold/15 bg-surface/70 p-12 text-center">
          <p className="text-muted">لا توجد إصدارات خاصة متاحة حالياً.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold">إصدارات خاصة</h1>
          <p className="text-sm text-muted">إصدارات محدودة فاخرة</p>
        </div>
        <div className="rounded-2xl border border-gold/15 bg-bg1/30 px-4 py-2 text-xs font-semibold text-gold">
          {products.length} خيار
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function SpecialEditionsPage() {
  return (
    <PublicShell>
      <div className="space-y-8">
        <HeroSection />
        <SearchFilterBar />
        <ErrorBoundary>
          <SpecialEditionsContent />
        </ErrorBoundary>
      </div>
    </PublicShell>
  );
}