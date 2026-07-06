"use client";

import { useEffect, useState } from "react";
import PublicShell from "../../components/layout/PublicShell";
import HeroSection from "../../components/sections/HeroSection";
import SearchFilterBar from "../../components/sections/SearchFilterBar";
import ProductCard from "../../components/ProductCard";
import { productsApi, Product } from "@/services/products";
import { categoriesApi } from "@/services/categories";

export default function PerfumesMenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const menCategory = await categoriesApi.getBySlug("men");

        if (menCategory && isMounted) {
          const productsData = await productsApi.getByCategory(menCategory.id);
          if (isMounted) setProducts(productsData);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const title = "عطور رجالية";
  const subtitle = error
    ? "تعذر تحميل المنتجات. حاول مرة أخرى لاحقًا."
    : `${products.length} خيار`;

  return (
    <PublicShell>
      <div className="space-y-8">
        <HeroSection />
        <SearchFilterBar />

        <section aria-labelledby="men-products-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <h1 id="men-products-title" className="text-2xl font-extrabold">
                {title}
              </h1>

              {loading ? (
                <p className="text-sm text-muted" aria-live="polite">
                  جاري التحميل...
                </p>
              ) : error ? (
                <p className="text-sm text-red-400" aria-live="polite">
                  {error}
                </p>
              ) : (
                <p className="text-sm text-muted" aria-live="polite">
                  {products.length} منتج
                </p>
              )}
            </div>

            <div
              className="rounded-2xl border border-gold/15 bg-bg1/30 px-4 py-2 text-xs font-semibold text-gold"
              aria-hidden={loading ? true : undefined}
            >
              {loading ? "" : subtitle}
            </div>
          </div>

          {loading ? (
            <div
              className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              aria-busy="true"
              aria-live="polite"
            >
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-lg bg-gradient-to-br from-gray-900 to-black"
                  aria-hidden="true"
                />
              ))}
            </div>
          ) : error ? (
            <div
              className="mt-6 rounded-lg border border-red-900/50 bg-red-950/20 p-8 text-center"
              role="alert"
            >
              <p className="text-muted">{subtitle}</p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </PublicShell>
  );
}

