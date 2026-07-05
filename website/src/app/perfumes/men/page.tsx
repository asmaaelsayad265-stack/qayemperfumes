"use client";

import { useState, useEffect } from "react";
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
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const menCategory = await categoriesApi.getBySlug('men');

        if (menCategory) {
          const productsData = await productsApi.getByCategory(menCategory.id);
          setProducts(productsData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <PublicShell>
        <div className="space-y-8">
          <HeroSection />
          <SearchFilterBar />
          <section>
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold">عطور رجالية</h1>
                <p className="text-sm text-muted">Loading...</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-lg bg-gradient-to-br from-gray-900 to-black" />
              ))}
            </div>
          </section>
        </div>
      </PublicShell>
    );
  }

  if (error) {
    return (
      <PublicShell>
        <div className="space-y-8">
          <HeroSection />
          <SearchFilterBar />
          <section>
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold">عطور رجالية</h1>
                <p className="text-sm text-red-400">Error: {error}</p>
              </div>
            </div>
            <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-8 text-center">
              <p className="text-muted">Unable to load products. Please try again later.</p>
            </div>
          </section>
        </div>
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <div className="space-y-8">
        <HeroSection />
        <SearchFilterBar />

        <section>
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold">عطور رجالية</h1>
              <p className="text-sm text-muted">
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
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
      </div>
    </PublicShell>
  );
}
