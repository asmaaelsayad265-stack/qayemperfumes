import Card from "../ui/Card";
import ScrollReveal from "./ScrollReveal";

const quotes = [
  {
    quote: "ثبات مذهل… وأول مرة أحس أن العطر بيتحرك معايا كأنه قصة.",
    name: "سارة — القاهرة",
    meta: "عميل موثق",
  },
  {
    quote: "الواجهة فخمة جدًا. اختيار النوتات يساعدني أختار صح.",
    name: "أحمد — الإسكندرية",
    meta: "عميل موثق",
  },
  {
    quote: "حسيت بروح نوبية في التصميم. التفاصيل راقية والتجربة مميزة.",
    name: "مها — أسوان",
    meta: "عميل موثق",
  },
];

export default function LuxuryTestimonials() {
  return (
    <section className="space-y-12 py-12 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-bg1/40 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-bg1/40 px-4 py-2 text-xs font-semibold tracking-widest text-gold uppercase">
          Testimonials
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text">
          آراء <span className="text-gold font-light">العملاء</span>
        </h2>
        <p className="text-sm md:text-base text-muted max-w-lg">
          نفتخر بثقة عملائنا ونسعى دائماً لتقديم تجربة عطرية لا تُنسى.
        </p>
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-3">
        {quotes.map((q) => (
          <ScrollReveal key={q.name}>
            <Card className="relative overflow-hidden rounded-[2rem] border border-gold/15 bg-bg1/60 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-luxury group backdrop-blur-sm">
              <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-gold/5 blur-2xl group-hover:bg-gold/10 transition-colors duration-500" />
              <div className="relative">
                <div className="text-4xl text-gold/30 font-serif leading-none mb-4 group-hover:text-gold/50 transition-colors">&quot;</div>
                <p className="text-base leading-relaxed text-text min-h-[5rem] font-medium">{q.quote}</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 border border-gold/20 text-gold font-bold">
                    {q.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text group-hover:text-gold transition-colors">{q.name}</div>
                    <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500/80" />
                      {q.meta}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

