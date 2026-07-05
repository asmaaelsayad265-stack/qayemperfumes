"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "../ProductCard";
import ScrollReveal from "./ScrollReveal";
import { productsApi, Product } from "@/services/products";

export default function FeaturedPerfumes() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsApi.getFeatured();
        setProducts(data.slice(0, 6)); // Show only 6 featured products
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold tracking-tight">Featured Perfumes</h2>
            <p className="text-sm text-muted">Loading...</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <ScrollReveal key={i}>
              <div className="h-full">
                <div className="h-64 animate-pulse rounded-lg bg-gradient-to-br from-gray-900 to-black" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-800" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-gray-800" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold tracking-tight">Featured Perfumes</h2>
            <p className="text-sm text-red-400">Error: {error}</p>
          </div>
        </div>
        <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-8 text-center">
          <p className="text-muted">Unable to load featured products. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold tracking-tight">Featured Perfumes</h2>
          <p className="text-sm text-muted">Curated selection of luxury fragrances</p>
        </div>

        <Link
          href="/perfumes/best-sellers"
          className="gold-shimmer inline-flex w-fit items-center gap-2 text-sm font-semibold text-transparent"
        >
          استكشف المزيد
          <span className="h-2 w-2 rounded-full bg-gold" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ScrollReveal key={product.id}>
            <Link href={`/product/${product.slug}`} className="block">
              <div className="h-full transition-transform duration-500 will-change-transform hover:-translate-y-1">
                <ProductCard />
                <div className="mt-3">
                  <div className="text-sm font-bold">{product.name_ar}</div>
                  <div className="mt-1 text-xs text-muted">{product.price} EGP</div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

