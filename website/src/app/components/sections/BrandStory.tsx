import Card from "../ui/Card";
import ScrollReveal from "./ScrollReveal";

export default function BrandStory() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-b from-bg1/40 to-surface/60 p-6 sm:p-10">
      <div className="pointer-events-none absolute inset-0">
        {/* Nubian/egyptian-inspired decorative bands (mock) */}
        <div className="absolute -right-24 -top-16 h-56 w-56 rotate-12 rounded-full bg-gold/10 blur-2xl" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 -rotate-12 rounded-full bg-gold/5 blur-3xl" />

        <div className="absolute left-1/2 top-6 h-12 w-[86%] -translate-x-1/2 rounded-full border border-gold/10 bg-[radial-gradient(circle_at_50%_50%,rgba(200,162,74,0.22),transparent_55%)]" />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(0,0,0,0.45),transparent)]" />
      </div>

      <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-bg1/40 px-4 py-2 text-xs font-semibold text-gold">
              قصة البراند
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
              لكل عطر قيمة…
              <span className="gold-shimmer"> لأن التفاصيل هي التي تَلمع</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-sm leading-7 text-muted sm:text-base">
              قَيَّم للعطور ليست متجرًا—إنها تجربة حسّية مصممة بإيقاع سينمائي وروح
              مصرية ونوبية. من طبقات النوتات العلوية إلى العمق في النوتات القاعدية،
              كل عطر يُصاغ ليترك أثرًا راقيًا.
            </p>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {["ثبات", "توازن", "هيبة"].map((x) => (
              <ScrollReveal key={x}>
                <div className="rounded-2xl border border-gold/15 bg-bg1/40 p-4">
                  <div className="text-xs font-semibold text-gold">{x}</div>
                  <div className="mt-2 h-1.5 w-20 rounded-full bg-gold/30" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-b from-gold/10 to-transparent blur-2xl" />
          <div className="relative grid gap-4">
            <ScrollReveal>
              <Card className="overflow-hidden rounded-3xl border-gold/15 bg-bg0/30 p-6">
                <div className="text-xs font-semibold text-gold">رحلة النوتات</div>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold">Top Notes</span>
                    <span className="text-xs text-muted">لمسة البداية</span>
                  </div>
                  <div className="h-2 rounded-full bg-gold/10">
                    <div className="h-full w-3/5 rounded-full bg-gold/70" />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold">Middle Notes</span>
                    <span className="text-xs text-muted">قلب العطر</span>
                  </div>
                  <div className="h-2 rounded-full bg-gold/10">
                    <div className="h-full w-4/5 rounded-full bg-gold/55" />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold">Base Notes</span>
                    <span className="text-xs text-muted">الأثر والهيبة</span>
                  </div>
                  <div className="h-2 rounded-full bg-gold/10">
                    <div className="h-full w-2/5 rounded-full bg-gold/70" />
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {["مصري/نوبي", "فخامة سوداء", "لمعة ذهب"].map((t) => (
                <ScrollReveal key={t}>
                  <div className="rounded-3xl border border-gold/15 bg-bg1/40 p-4">
                    <div className="text-xs font-semibold text-gold">{t}</div>
                    <div className="mt-2 text-sm font-bold">LUXURY FEEL</div>
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

