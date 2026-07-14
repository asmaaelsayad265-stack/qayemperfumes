import Link from "next/link";
import Image from "next/image";
import LuxuryBadge from "./ui/LuxuryBadge";
import QuickViewButton from "./sections/QuickViewButton";
import { Product } from "@/services/products";

const badgeMap: Record<string, { label: string; variant: "best" | "limited" | "new" | "summer" }> = {
  best: { label: "Best Seller", variant: "best" },
  limited: { label: "Limited Edition", variant: "limited" },
};

interface ProductCardProps {
  product?: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) {
    return null;
  }

  const badge = product.is_best_seller
    ? badgeMap.best
    : product.is_limited_edition
      ? badgeMap.limited
      : { label: "New Collection", variant: "new" as const };

  const productName = product.name_ar || "اسم العطر";
  const productPrice = product.price || 0;
  const productSlug = product.slug || "";
  const imageSrc = product.image || "";
  const categoryName = product.category?.name_ar || "Perfume";

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-gold/15 bg-[linear-gradient(180deg,rgba(17,17,17,0.92),rgba(11,11,11,0.98))] p-4 shadow-luxury luxury-card-hover backdrop-blur-2xl">

      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/12 blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
        <div className="absolute inset-x-6 bottom-0 h-20 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_68%)] blur-2xl" />
      </div>

      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
              {categoryName}
            </div>
          </div>
          <div className="shrink-0">
            <LuxuryBadge label={badge.label} variant={badge.variant} />
          </div>
        </div>

        <Link href={`/product/${productSlug}`} className="block overflow-hidden rounded-[1.5rem]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-gold/10 bg-bg0/60">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={productName}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gold/30">
                <span className="text-4xl font-black">Q</span>
              </div>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,5,5,0.82))]" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/90 backdrop-blur-md">
                {product.is_limited_edition ? "Limited" : "Signature"}
              </div>
              <div className="mt-3 h-px w-16 bg-linear-to-r from-transparent via-gold/70 to-transparent" />
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-base font-bold text-text transition-colors group-hover:text-gold">{productName}</div>
            <div className="mt-1 text-xs text-muted">
              Luxury scent profile
            </div>
          </div>

          <div className="text-sm font-extrabold text-text">
            {productPrice} <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">EGP</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-full">
            <QuickViewButton productId={product.id} />
          </div>
          <Link
            href={`/product/${productSlug}`}
            className="inline-flex h-10 items-center justify-center rounded-2xl border border-gold/20 bg-bg1/35 px-4 text-xs font-semibold text-text transition hover:border-gold/50 hover:text-gold"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </article>
  );
}
