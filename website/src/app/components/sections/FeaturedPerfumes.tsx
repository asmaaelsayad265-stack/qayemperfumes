import Link from "next/link";
import ProductCard from "../ProductCard";
import ScrollReveal from "./ScrollReveal";

const items = [
  { id: 1, title: "عطر النيل", price: 2800, href: "/product/demo-nile" },
  { id: 2, title: "ذهب الليل", price: 3200, href: "/product/demo-night-gold" },
  { id: 3, title: "ورد الصحراء", price: 3000, href: "/product/demo-desert-rose" },
  { id: 4, title: "أثر النوبة", price: 3500, href: "/product/demo-nubian" },
  { id: 5, title: "حجر كريم", price: 4100, href: "/product/demo-gem" },
  { id: 6, title: "سكون الحرير", price: 2700, href: "/product/demo-silk" },
];

export default function FeaturedPerfumes() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold tracking-tight">Featured Perfumes</h2>
          <p className="text-sm text-muted">Curated selection — mock data only</p>
        </div>

        <Link
          href="/collections/best-sellers"
          className="gold-shimmer inline-flex w-fit items-center gap-2 text-sm font-semibold text-transparent"
        >
          استكشف المزيد
          <span className="h-2 w-2 rounded-full bg-gold" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ScrollReveal key={p.id}>
            <Link href={p.href} className="block">
              <div className="h-full transition-transform duration-500 will-change-transform hover:-translate-y-1">
                <ProductCard />
                <div className="mt-3">
                  <div className="text-sm font-bold">{p.title}</div>
                  <div className="mt-1 text-xs text-muted">{p.price} EGP · Mock</div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

