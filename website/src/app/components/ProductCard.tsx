import Link from "next/link";
import { useMemo } from "react";
import LuxuryBadge from "./ui/LuxuryBadge";
import QuickViewButton from "./sections/QuickViewButton";


const mockBadges = [
  { label: "Best Seller", variant: "best" as const },
  { label: "Limited Edition", variant: "limited" as const },
  { label: "New Collection", variant: "new" as const },
  { label: "Summer Exclusive", variant: "summer" as const },
];

export default function ProductCard() {
  const badge = useMemo(() => mockBadges[Math.floor(Math.random() * mockBadges.length)], []);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-surface/70 p-4 transition hover:border-gold/40 hover:shadow-luxury">

      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 blur-2xl" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-muted">Mock perfume</div>
          </div>
          <div className="shrink-0">
            <LuxuryBadge label={badge.label} variant={badge.variant} />
          </div>
        </div>

        <Link href="/product/demo">
          <div className="mt-3 aspect-[3/2] w-full rounded-xl bg-bg0/50 transition-transform duration-500 group-hover:scale-[1.02]" />
        </Link>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">اسم العطر</div>
            <div className="mt-1 text-xs text-muted">إضافة إلى السلة — Mock</div>
          </div>

          <div className="text-sm font-extrabold">0 EGP</div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="w-full">
            <QuickViewButton />
          </div>
        </div>


      </div>
    </div>
  );
}


