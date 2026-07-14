"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import LightboxGallery from "./LightboxGallery";
import PerfumeNotes from "./PerfumeNotes";
import ProductNotesVisualizer from "./ProductNotesVisualizer";
import LuxuryBadge from "../ui/LuxuryBadge";
import { Product, productsApi } from "@/services/products";

interface QuickViewModalProps {
  open: boolean;
  onClose: () => void;
  /** Full product object (preferred). */
  product?: Product | null;
  /** Product id; the modal fetches the product when `product` is not supplied. */
  productId?: number;
}

export default function QuickViewModal({
  open,
  onClose,
  product: productProp,
  productId,
}: QuickViewModalProps) {
  const [activeSize, setActiveSize] = useState("100ml");

  // Resolve the product: prefer the passed object, otherwise fetch by id.
  const [product, setProduct] = useState<Product | null>(productProp ?? null);
  const [loadingProduct, setLoadingProduct] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (productProp) {
      setProduct(productProp);
      return;
    }

    if (productId == null) {
      setProduct(null);
      return;
    }

    let cancelled = false;
    setLoadingProduct(true);
    productsApi
      .getById(productId)
      .then((fetched) => {
        if (!cancelled) setProduct(fetched);
      })
      .catch(() => {
        if (!cancelled) setProduct(null);
      })
      .finally(() => {
        if (!cancelled) setLoadingProduct(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, productProp, productId]);

  const handleClose = useCallback(() => {
    setActiveSize("100ml");
    onClose();
  }, [onClose]);

  const badges = useMemo(() => {
    if (!product) return [];
    const list = [] as { label: string; variant: "best" | "limited" | "new" | "summer" }[];
    if (product.is_best_seller) list.push({ label: "Best Seller", variant: "best" });
    if (product.is_limited_edition) list.push({ label: "Limited Edition", variant: "limited" });
    if (list.length === 0) list.push({ label: "New Collection", variant: "new" });
    return list;
  }, [product]);

  const images = useMemo(() => {
    if (!product?.image) return [];
    return [product.image];
  }, [product]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  if (!open) return null;

  if (!product) {
    if (loadingProduct) {
      return (
        <div
          className="fixed inset-0 z-modal flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
        </div>
      );
    }
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-gold/15 bg-bg1/60 shadow-luxury">
        <div className="flex items-center justify-between gap-3 border-b border-gold/10 bg-bg1/40 px-4 py-3">
          <div className="min-w-0">
            <div className="text-xs font-semibold text-muted">Quick View</div>
            <div className="truncate text-sm font-extrabold">{product.name_ar || "Product"}</div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-2xl border border-gold/25 bg-bg0/30 px-4 py-2 text-xs font-semibold text-text transition hover:border-gold/50"
          >
            إغلاق
          </button>
        </div>

        <div className="grid gap-6 p-4 sm:p-6 md:grid-cols-5">
          <div className="md:col-span-2">
            {images.length > 0 ? (
              <div className="rounded-3xl border border-gold/15 bg-bg0/30 p-2">
                <LightboxGallery images={images} />
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-3xl border border-gold/15 bg-bg0/30 text-xs text-muted">
                No image available
              </div>
            )}
          </div>

          <div className="md:col-span-3 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {badges.map((b) => (
                  <LuxuryBadge key={b.label} label={b.label} variant={b.variant} />
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-muted">السعر</div>
                  <div className="mt-1 text-2xl font-extrabold text-gold">
                    {String(product.price || 0)} <span className="text-sm font-semibold">EGP</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-gold/15 bg-bg1/30 px-4 py-3">
                  <div className="text-xs font-semibold text-muted">الحالة</div>
                  <div className="mt-1 text-xs font-extrabold text-text">متوفر</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-muted">اختر الحجم</div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["50ml", "75ml", "100ml"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setActiveSize(s)}
                    className={
                      "rounded-2xl border px-2 py-2 text-xs font-semibold transition " +
                      (activeSize === s
                        ? "border-gold/60 bg-bg0/40 text-text"
                        : "border-gold/15 bg-bg1/30 text-muted hover:border-gold/40 hover:text-text")
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <PerfumeNotes />
            <ProductNotesVisualizer />

            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                className="gold-shimmer inline-flex items-center justify-center rounded-2xl bg-transparent px-4 py-3 text-sm font-semibold text-transparent ring-1 ring-gold/40 transition hover:opacity-95"
              >
                إضافة للسلة
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-2xl border border-gold/25 bg-bg1/30 px-4 py-3 text-sm font-semibold text-text transition hover:border-gold/50"
              >
                تابع التفاصيل
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
