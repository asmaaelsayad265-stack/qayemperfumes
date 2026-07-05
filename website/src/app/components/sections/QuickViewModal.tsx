"use client";

import { useEffect, useMemo, useState } from "react";
import LightboxGallery from "./LightboxGallery";
import PerfumeNotes from "./PerfumeNotes";
import ProductNotesVisualizer from "./ProductNotesVisualizer";
import LuxuryBadge from "../ui/LuxuryBadge";


type MockProduct = {
  title: string;
  price: string;
  badges: { label: string; variant: "best" | "limited" | "new" | "summer" }[];
  sizes: string[];
  images: string[];
};

const mockProduct: MockProduct = {
  title: "اسم العطر الفاخر",
  price: "2800 EGP",
  badges: [
    { label: "Best Seller", variant: "best" },
    { label: "Limited Edition", variant: "limited" },
  ],
  sizes: ["50ml", "75ml", "100ml"],
  images: ["/file.svg", "/globe.svg", "/window.svg", "/next.svg"],
};

export default function QuickViewModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeSize, setActiveSize] = useState(mockProduct.sizes[0]);

  useEffect(() => {
    if (!open) return;
    setActiveSize(mockProduct.sizes[0]);
  }, [open]);

  const badges = useMemo(() => mockProduct.badges, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-gold/15 bg-bg1/60 shadow-luxury">
        <div className="flex items-center justify-between gap-3 border-b border-gold/10 bg-bg1/40 px-4 py-3">
          <div className="min-w-0">
            <div className="text-xs font-semibold text-muted">Quick View</div>
            <div className="truncate text-sm font-extrabold">{mockProduct.title}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-gold/25 bg-bg0/30 px-4 py-2 text-xs font-semibold text-text transition hover:border-gold/50"
          >
            إغلاق
          </button>
        </div>

        <div className="grid gap-6 p-4 sm:p-6 md:grid-cols-5">
          <div className="md:col-span-2">
            {/* Gallery lightbox is inside; here we keep the premium preview */}
            <div className="rounded-3xl border border-gold/15 bg-bg0/30 p-2">
              <LightboxGallery images={mockProduct.images} />
            </div>
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
                  <div className="mt-1 text-2xl font-extrabold text-gold">{mockProduct.price}</div>
                </div>
                <div className="rounded-2xl border border-gold/15 bg-bg1/30 px-4 py-3">
                  <div className="text-xs font-semibold text-muted">الحالة</div>
                  <div className="mt-1 text-xs font-extrabold text-text">متوفر — Mock</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-muted">اختر الحجم</div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {mockProduct.sizes.map((s) => (
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
                إضافة للسلة (Mock)
              </button>
              <button
                type="button"
                onClick={onClose}
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

