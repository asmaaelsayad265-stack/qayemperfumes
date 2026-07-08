"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "../ProductCard";
import ScrollReveal from "./ScrollReveal";
import { productsApi, Product } from "@/services/products";

export default function FeaturedPerfumes({ initialProducts }: { initialProducts?: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If initial data was provided server-side, skip client fetch
    if (initialProducts && initialProducts.length > 0) {
      return;
    }

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
  }, [initialProducts]);

  if (loading) {
    return (
      <section className="space-y-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text">العطور الأكثر مبيعًا</h2>
          <p className="text-sm md:text-base text-muted max-w-lg">جاري التحميل...</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <ScrollReveal key={i}>
              <div className="h-full">
                <div className="aspect-[4/5] animate-pulse rounded-2xl bg-bg0/80 border border-gold/10" />
                <div className="mt-5 space-y-3 text-center">
                  <div className="h-4 w-3/4 mx-auto animate-pulse rounded bg-bg0" />
                  <div className="h-3 w-1/2 mx-auto animate-pulse rounded bg-bg0" />
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
      <section className="space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text">العطور الأكثر مبيعًا</h2>
        </div>
        <div className="rounded-3xl border border-red-900/30 bg-red-950/10 p-12 text-center backdrop-blur-sm" role="alert" aria-live="polite">
          <p className="text-muted">نعتذر، لم نتمكن من تحميل المنتجات. يرجى المحاولة مرة أخرى.</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text">العطور الأكثر مبيعًا</h2>
        </div>
        <div className="rounded-3xl border border-gold/15 bg-surface/70 p-10 text-center">
          <p className="text-muted">لا توجد منتجات متاحة حالياً.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-12 relative">
      {/* Decorative background element */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(200,162,74,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-bg1/40 px-4 py-2 text-xs font-semibold tracking-widest text-gold uppercase">
          Best Sellers
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-text">
          العطور <span className="text-gold font-light">الأكثر مبيعًا</span>
        </h2>
        <p className="text-sm md:text-base text-muted max-w-lg">
          مجموعة مختارة بعناية من أفضل عطور قَيَّم، تعكس الفخامة وتناسب ذوقك الرفيع.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ScrollReveal key={product.id}>
            <ProductCard product={product} />
          </ScrollReveal>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <Link
          href="/perfumes/best-sellers"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-gold/30 bg-bg0/40 px-8 py-4 text-sm font-bold text-text backdrop-blur-sm transition-all hover:border-gold hover:text-gold"
        >
          <span className="relative z-10">استكشف جميع العطور</span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </Link>
      </div>
    </section>
  );
}

