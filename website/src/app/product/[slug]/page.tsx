"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { useProduct } from "@/hooks/useProducts";
import PublicShell from "../../components/layout/PublicShell";
import ScrollReveal from "../../components/sections/ScrollReveal";
import ProductGalleryWithLightbox from "../../components/sections/ProductGalleryWithLightbox";
import PerfumeNotes from "../../components/sections/PerfumeNotes";
import ProductNotesVisualizer from "../../components/sections/ProductNotesVisualizer";
import LuxuryBadge from "../../components/ui/LuxuryBadge";

function ProductDetailsContent({ slug }: { slug: string }) {
  const { product, loading, error, refetch } = useProduct(slug);

  if (loading) {
    return (
      <PublicShell>
        <div className="space-y-8">
          <section className="rounded-3xl border border-gold/15 bg-gradient-to-b from-gold/10 to-surface/50 p-5 sm:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <div className="h-6 w-48 animate-pulse rounded bg-gray-800" />
                <div className="h-10 w-64 animate-pulse rounded bg-gray-800" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-800" />
                <div className="h-6 w-32 animate-pulse rounded bg-gray-800" />
              </div>
              <div className="rounded-3xl border border-gold/15 bg-bg0/30 p-4 sm:p-6">
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
        <div className="rounded-3xl border border-red-900/50 bg-red-950/20 p-8 text-center">
          <p className="text-muted">{error || "Product not found"}</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-4 rounded-2xl border border-gold/25 bg-bg1/30 px-4 py-3 text-sm font-semibold text-text transition hover:border-gold/50"
          >
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
        <section className="rounded-3xl border border-gold/15 bg-gradient-to-b from-gold/10 to-surface/50 p-5 sm:p-8">
          <ScrollReveal>
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  {product.is_best_seller && <LuxuryBadge label="Best Seller" variant="best" />}
                  {product.is_limited_edition && <LuxuryBadge label="Limited Edition" variant="limited" />}
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {product.name_ar}
                </h1>
                <p className="text-sm leading-7 text-muted sm:text-base">
                  {product.description_ar}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="text-lg font-extrabold">{product.price} EGP</div>
                  {product.original_price && (
                    <div className="text-xs font-semibold text-muted line-through">
                      {product.original_price} EGP
                    </div>
                  )}
                  <div className="text-xs font-semibold text-green-400">
                    {product.inventory?.status === 'in_stock' ? 'متوفر' : 'غير متوفر'}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gold/15 bg-bg0/30 p-4 sm:p-6">
                <div className="text-xs font-semibold text-muted">الحجم</div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {["50ml", "75ml", "100ml"].map((s) => (
                    <div
                      key={s}
                      className="rounded-2xl border border-gold/15 bg-bg1/30 px-3 py-2 text-center text-xs font-semibold"
                    >
                      {s}
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-2">
                  <button
                    type="button"
                    className="gold-shimmer inline-flex items-center justify-center rounded-2xl bg-transparent px-4 py-3 text-sm font-semibold text-transparent ring-1 ring-gold/40"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    className="rounded-2xl border border-gold/25 bg-bg1/30 px-4 py-3 text-sm font-semibold text-text transition hover:border-gold/50"
                  >
                    Wishlist
                  </button>
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

            <div className="rounded-3xl border border-gold/15 bg-surface/70 p-5 sm:p-6">
              <div className="text-sm font-extrabold">التقييمات</div>
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
