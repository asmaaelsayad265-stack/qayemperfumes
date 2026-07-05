import Card from "../ui/Card";

const items = [
  { title: "رجالية", href: "/perfumes/men", badge: "Men" },
  { title: "نسائية", href: "/perfumes/women", badge: "Women" },
  { title: "صيفية", href: "/perfumes/summer", badge: "Summer" },
  { title: "شتوية", href: "/perfumes/winter", badge: "Winter" },
  { title: "الأكثر مبيعًا", href: "/perfumes/best-sellers", badge: "Top" },
  { title: "إصدارات خاصة", href: "/perfumes/special-editions", badge: "Limited" },
];

export default function CategoryCards() {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">التصنيفات</h2>
          <p className="text-sm text-muted">Luxury categories — mock navigation</p>
        </div>
        <div className="gold-shimmer text-sm font-semibold">
          اكتشف مزاجك
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, idx) => (
          <Card
            key={c.href}
            className={
              "group relative overflow-hidden transition " +
              (idx % 2 === 0
                ? "bg-gradient-to-b from-gold/10 to-surface/60"
                : "bg-gradient-to-b from-surface/50 to-bg1/20")
            }
          >
            <a href={c.href} className="relative block">
              <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-gold/15 blur-2xl opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-gold">{c.badge}</div>
                  <div className="mt-1 text-base font-bold">{c.title}</div>
                </div>
                <div className="rounded-xl border border-gold/20 bg-bg0/30 p-2 transition group-hover:border-gold-2">
                  <span className="block h-2 w-2 rounded-full bg-gold" />
                </div>
              </div>
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}

