import PublicShell from "../../components/layout/PublicShell";
import ScrollReveal from "../../components/sections/ScrollReveal";
import ProductGalleryWithLightbox from "../../components/sections/ProductGalleryWithLightbox";
import PerfumeNotes from "../../components/sections/PerfumeNotes";
import ProductNotesVisualizer from "../../components/sections/ProductNotesVisualizer";
import LuxuryBadge from "../../components/ui/LuxuryBadge";

const mockImages = [
  "/file.svg",
  "/globe.svg",
  "/window.svg",
  "/next.svg",
];

export default function ProductPage() {
  return (
    <PublicShell>
      <div className="space-y-8">
        <section className="rounded-3xl border border-gold/15 bg-gradient-to-b from-gold/10 to-surface/50 p-5 sm:p-8">
          <ScrollReveal>
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <LuxuryBadge label="Best Seller" variant="best" />
                  <LuxuryBadge label="Limited Edition" variant="limited" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  اسم العطر الفاخر
                </h1>
                <p className="text-sm leading-7 text-muted sm:text-base">
                  تجربة سينمائية… نوتات دقيقة، وثبات راقٍ — بيانات Mock فقط.
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="text-lg font-extrabold">2800 EGP</div>
                  <div className="text-xs font-semibold text-muted">متوفر — Mock</div>
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
                    Add to Cart (Mock)
                  </button>
                  <button
                    type="button"
                    className="rounded-2xl border border-gold/25 bg-bg1/30 px-4 py-3 text-sm font-semibold text-text transition hover:border-gold/50"
                  >
                    Wishlist (Mock)
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <ProductGalleryWithLightbox images={mockImages} />
          </div>
          <div className="md:col-span-2 space-y-6">
            <PerfumeNotes />
            <ProductNotesVisualizer />

            <div className="rounded-3xl border border-gold/15 bg-surface/70 p-5 sm:p-6">
              <div className="text-sm font-extrabold">التقييمات (Mock)</div>
              <div className="mt-3 space-y-3">
                {["5.0", "4.8", "4.9"].map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-gold/15 bg-bg1/30 px-4 py-3"
                  >
                    <div className="text-xs font-semibold text-muted">عميل {i + 1}</div>
                    <div className="text-sm font-extrabold text-gold">{r} ★</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicShell>
  );
}


