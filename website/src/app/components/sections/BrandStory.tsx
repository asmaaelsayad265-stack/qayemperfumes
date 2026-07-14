import Card from "../ui/Card";
import ScrollReveal from "./ScrollReveal";

export default function BrandStory() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-gold/15 bg-linear-to-br from-bg1/80 via-bg1 to-bg0 p-8 sm:p-12 lg:p-16">
      <div className="pointer-events-none absolute inset-0">
        {/* Nubian/egyptian-inspired decorative bands */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rotate-12 rounded-full bg-gold/10 blur-3xl mix-blend-screen" />
        <div className="absolute -left-32 -bottom-32 h-96 w-96 -rotate-12 rounded-full bg-gold/5 blur-3xl mix-blend-screen" />
        
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(17,17,17,0.8),transparent)]" />
      </div>

      <div className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-bg0/60 px-5 py-2.5 text-xs font-semibold tracking-widest text-gold uppercase backdrop-blur-sm shadow-luxury">
              قصة البراند
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl text-text">
              لكل عطر قيمة…
              <span className="gold-shimmer block mt-2 text-transparent bg-clip-text text-2xl sm:text-3xl font-bold">
                لأن التفاصيل هي التي تَلمع
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              قَيَّم للعطور ليست متجرًا—إنها تجربة حسّية مصممة بإيقاع سينمائي وروح
              مصرية ونوبية. من طبقات النوتات العلوية إلى العمق في النوتات القاعدية،
              كل عطر يُصاغ ليترك أثرًا راقيًا.
            </p>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {["ثبات", "توازن", "هيبة"].map((x, i) => (
              <ScrollReveal key={x}>
                <div className="rounded-2xl border border-gold/10 bg-bg0/40 p-5 backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-bg0/60">
                  <div className="text-sm font-bold text-gold">{x}</div>
                  <div className="mt-3 h-1 w-full rounded-full bg-gold/10 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gold/60" 
                      style={{ width: `${80 + (i * 10)}%` }}
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[3rem] bg-linear-to-b from-gold/10 to-transparent blur-3xl opacity-50" />
          <div className="relative grid gap-6">
            <ScrollReveal>
              <Card className="overflow-hidden rounded-[2rem] border-gold/20 bg-bg0/60 p-8 shadow-luxury backdrop-blur-md">
                <div className="text-xs font-semibold text-gold tracking-widest uppercase mb-6">رحلة النوتات</div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-sm font-bold text-text">النوتات العليا</span>
                      <span className="text-xs text-muted">لمسة البداية</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gold/10">
                      <div className="h-full w-[65%] rounded-full bg-linear-to-r from-gold/40 to-gold" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-sm font-bold text-text">قلب العطر</span>
                      <span className="text-xs text-muted">الجوهر</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gold/10">
                      <div className="h-full w-[85%] rounded-full bg-linear-to-r from-gold/40 to-gold" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-sm font-bold text-text">النوتات القاعدية</span>
                      <span className="text-xs text-muted">الأثر والهيبة</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gold/10">
                      <div className="h-full w-[95%] rounded-full bg-linear-to-r from-gold/40 to-gold" />
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "مصري / نوبي", subtitle: "أصالة الجذور" },
                { title: "فخامة سوداء", subtitle: "هوية بصرية" }
              ].map((t) => (
                <ScrollReveal key={t.title}>
                  <div className="rounded-2xl border border-gold/15 bg-bg0/40 p-5 backdrop-blur-sm transition-all hover:border-gold/40">
                    <div className="text-xs font-semibold text-gold tracking-widest mb-1">{t.subtitle}</div>
                    <div className="text-sm font-bold text-text">{t.title}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

