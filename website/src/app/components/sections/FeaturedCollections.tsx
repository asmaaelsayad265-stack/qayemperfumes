import Card from "../ui/Card";
import ProductCard from "../ProductCard";

const collections = [
  {
    title: "الأكثر مبيعًا",
    subtitle: "Best Sellers",
    href: "/collections/best-sellers",
    badge: "Top",
  },
  {
    title: "إصدارات خاصة",
    subtitle: "Special Editions",
    href: "/collections/special-editions",
    badge: "Limited",
  },
  {
    title: "رجالية",
    subtitle: "Men",
    href: "/perfumes/men",
    badge: "Signature",
  },
  {
    title: "نسائية",
    subtitle: "Women",
    href: "/perfumes/women",
    badge: "Elegant",
  },
];

const mockProducts = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
}));

export default function FeaturedCollections() {
  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">مختارات فاخرة</h2>
          <p className="text-sm text-muted">Featured Collections — Mock Data</p>
        </div>
        <a
          href="/perfumes/best-sellers"
          className="gold-shimmer inline-flex items-center gap-2 text-sm font-semibold text-transparent"
        >
          تصفح الكل
          <span className="h-2 w-2 rounded-full bg-gold" />
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {collections.map((c, idx) => (
          <Card
            key={c.title}
            className={
              "group relative overflow-hidden transition " +
              (idx === 0 ? "bg-gradient-to-b from-gold/10 to-surface/70" : "")
            }
          >
            <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/20 blur-2xl" />
            </div>
            <a href={c.href} className="relative block">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-gold">{c.badge}</div>
                  <div className="text-base font-bold">{c.title}</div>
                  <div className="text-xs text-muted">{c.subtitle}</div>
                </div>
                <div className="rounded-xl border border-gold/20 bg-bg0/40 p-2 transition group-hover:border-gold-2">
                  <div className="h-2 w-2 rounded-full bg-gold" />
                </div>
              </div>
            </a>
          </Card>
        ))}
      </div>

      <div className="pt-2">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">منتجات مقترحة</h3>
            <p className="text-sm text-muted">Luxury cards with hover effects</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts.map((p) => (
            <ProductCard key={p.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

