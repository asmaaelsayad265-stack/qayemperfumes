import Card from "../ui/Card";
import ScrollReveal from "./ScrollReveal";

const quotes = [
  {
    quote: "ثبات مذهل… وأول مرة أحس أن العطر بيتحرك معايا كأنه قصة.",
    name: "سارة — القاهرة",
    meta: "Egy. Woman",
  },
  {
    quote: "الواجهة فخمة جدًا. اختيار النوتات يساعدني أختار صح.",
    name: "أحمد — الإسكندرية",
    meta: "Egy. Customer",
  },
  {
    quote: "حسيت بروح نوبية في التصميم. التفاصيل راقية والتجربة مميزة.",
    name: "مها — أسوان",
    meta: "Nubian Soul",
  },
];

export default function LuxuryTestimonials() {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold tracking-tight">آراء العملاء</h2>
        <p className="text-sm text-muted">Luxury testimonials — mock data only</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quotes.map((q) => (
          <ScrollReveal key={q.name}>
            <Card className="relative overflow-hidden rounded-3xl border border-gold/15 bg-bg1/40 p-6 transition hover:border-gold/40 hover:shadow-luxury">
              <div className="pointer-events-none absolute -left-12 -top-12 h-28 w-28 rounded-full bg-gold/10 blur-2xl" />
              <div className="relative">
                <div className="text-2xl text-gold">“</div>
                <p className="mt-2 text-sm leading-7 text-text">{q.quote}</p>
                <div className="mt-5">
                  <div className="text-sm font-bold">{q.name}</div>
                  <div className="mt-1 text-xs text-muted">{q.meta}</div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

