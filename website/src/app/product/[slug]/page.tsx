"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { useProduct } from "@/hooks/useProducts";
import PublicShell from "../../components/layout/PublicShell";
import ScrollReveal from "../../components/sections/ScrollReveal";
import ProductGalleryWithLightbox from "../../components/sections/ProductGalleryWithLightbox";
import PerfumeNotes from "../../components/sections/PerfumeNotes";
import ProductNotesVisualizer from "../../components/sections/ProductNotesVisualizer";
import LuxuryBadge from "../../components/ui/LuxuryBadge";
import { ArrowLeft, ShoppingBag, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function ProductDetailsContent({ slug }: { slug: string }) {
  const { product, loading, error, refetch } = useProduct(slug);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!isAdding) return;
    const timer = window.setTimeout(() => setIsAdding(false), 900);
    return () => window.clearTimeout(timer);
  }, [isAdding]);

  if (loading) {
    return (
      <PublicShell>
        <div className="space-y-8">
          <section className="rounded-[2.5rem] border border-gold/15 bg-[linear-gradient(180deg,rgba(17,17,17,0.94),rgba(5,5,5,1))] p-5 shadow-luxury sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-3">
                <div className="h-5 w-28 animate-pulse rounded bg-gray-800" />
                <div className="h-11 w-72 animate-pulse rounded bg-gray-800" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-800" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-gray-800" />
              </div>
              <div className="rounded-[2rem] border border-gold/15 bg-bg0/30 p-4 sm:p-6">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-800" />
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-10 animate-pulse rounded bg-gray-800" />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </PublicShell>
    );
  }

  if (error || !product) {
    return (
      <PublicShell>
        <div className="rounded-[2.5rem] border border-red-900/50 bg-red-950/20 p-8 text-center">
          <p className="text-muted">{error || "Product not found"}</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-gold/25 bg-bg1/30 px-4 py-3 text-sm font-semibold text-text transition hover:border-gold/50"
          >
            <ArrowLeft className="h-4 w-4" />
            إعادة المحاولة
          </button>
        </div>
      </PublicShell>
    );
  }

  const images = product.images?.map((img) => img.url) || [product.image];

  return (
    <PublicShell>
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-[2.75rem] border border-gold/15 bg-[linear-gradient(180deg,rgba(17,17,17,0.92),rgba(5,5,5,1))] shadow-luxury">
          <div className="pointer-events-none absolute inset-0 luxury-grain" />
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_50%_0%,rgba(200,162,74,0.18),transparent_60%)]" />
          <ScrollReveal>
            <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {product.is_best_seller && <LuxuryBadge label="Best Seller" variant="best" />}
                  {product.is_limited_edition && <LuxuryBadge label="Limited Edition" variant="limited" />}
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-bg1/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted backdrop-blur-xl">
                    <Sparkles className="h-3.5 w-3.5 text-gold" />
                    Signature edit
                  </span>
                </div>
                <h1 className="max-w-xl text-3xl font-extrabold tracking-tight text-text sm:text-4xl lg:text-5xl">
                  {product.name_ar}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">
                  {product.description_ar}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-2xl font-extrabold text-text">{product.price} <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">EGP</span></div>
                  {product.original_price && (
                    <div className="text-xs font-semibold text-muted line-through">
                      {product.original_price} EGP
                    </div>
                  )}
                  <div className="text-xs font-semibold text-green-400">
                    {product.inventory?.status === 'in_stock' ? 'متوفر' : 'غير متوفر'}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { title: "Luxury finish", body: "تجربة تحرير بصري مستوحاة من بيوت العطور العالمية." },
                    { title: "Notes story", body: "عرض واضح للنوتات مع تناظر وهدوء بصري." },
                    { title: "Premium support", body: "إعادة المحاولة، المفضلة، والسلة محفوظة دون تغيير." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-[1.5rem] border border-white/8 bg-bg1/35 p-4 backdrop-blur-xl">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold/80">{item.title}</div>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-gold/15 bg-bg0/30 p-4 sm:p-6 backdrop-blur-xl">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">الحجم</div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["50ml", "75ml", "100ml"].map((s) => (
                    <div
                      key={s}
                      className="rounded-2xl border border-gold/15 bg-bg1/35 px-3 py-3 text-center text-xs font-semibold text-text transition hover:border-gold/40 hover:text-gold"
                    >
                      {s}
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[1.5rem] border border-white/8 bg-bg1/30 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">الكمية</div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/15 bg-bg0/40 text-lg font-bold text-text transition hover:border-gold/50 hover:text-gold"
                      aria-label="تقليل الكمية"
                    >
                      −
                    </button>
                    <div className="min-w-16 rounded-2xl border border-gold/15 bg-bg0/40 px-4 py-2 text-center text-lg font-bold text-text">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => setQuantity((value) => Math.min(9, value + 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/15 bg-bg0/40 text-lg font-bold text-text transition hover:border-gold/50 hover:text-gold"
                      aria-label="زيادة الكمية"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[linear-gradient(135deg,var(--gold),var(--gold-2))] px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] ${isAdding ? "animate-pulse" : ""}`}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {isAdding ? `Added ×${quantity}` : `Add to Cart ×${quantity}`}
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/25 bg-bg1/35 px-4 py-3 text-sm font-semibold text-text transition hover:border-gold/50 hover:text-gold"
                  >
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </button>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-bg1/30 px-4 py-3 text-xs font-medium text-muted">
                    <ShieldCheck className="h-4 w-4 text-gold" />
                    عبوة premium + إضاءة سينمائية + عرض محدود
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <ProductGalleryWithLightbox images={images} />
          </div>
          <div className="md:col-span-2 space-y-6">
            <PerfumeNotes />
            <ProductNotesVisualizer />

            <div className="rounded-[2rem] border border-gold/15 bg-surface/70 p-5 sm:p-6 backdrop-blur-xl">
              <div className="text-sm font-extrabold text-text">التقييمات</div>
              <div className="mt-3 space-y-3">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex items-center justify-between rounded-2xl border border-gold/15 bg-bg1/30 px-4 py-3"
                    >
                      <div className="text-xs font-semibold text-muted">{review.customer_name}</div>
                      <div className="text-sm font-extrabold text-gold">{review.rating} ★</div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted">No reviews yet</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicShell>
  );
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <ErrorBoundary>
      <ProductDetailsContent slug={params.slug} />
    </ErrorBoundary>
  );
}
