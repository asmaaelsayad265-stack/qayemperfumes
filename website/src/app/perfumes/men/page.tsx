import PublicShell from "../../components/layout/PublicShell";
import HeroSection from "../../components/sections/HeroSection";
import SearchFilterBar from "../../components/sections/SearchFilterBar";
import ProductCard from "../../components/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "العطور الرجالية — قَيَّم للعطور",
};

const products = Array.from({ length: 12 }).map((_, i) => ({ id: i + 1 }));

export default function PerfumesMenPage() {
  return (
    <PublicShell>
      <div className="space-y-8">
        <HeroSection />
        <SearchFilterBar />

        <section>
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold">عطور رجالية</h1>
              <p className="text-sm text-muted">Mock results — Luxury UI only</p>
            </div>
            <div className="rounded-2xl border border-gold/15 bg-bg1/30 px-4 py-2 text-xs font-semibold text-gold">
              12 خيار
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} />
            ))}
          </div>
        </section>
      </div>
    </PublicShell>
  );
}


