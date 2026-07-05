import PublicShell from "../components/layout/PublicShell";
import ScrollReveal from "../components/sections/ScrollReveal";
import Card from "../components/ui/Card";

export default function AboutPage() {
  return (
    <PublicShell>
      <div className="space-y-10">
        <section className="relative overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-b from-gold/10 to-surface/50 p-6 sm:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
            <div className="absolute -left-28 -bottom-28 h-72 w-72 rounded-full bg-bronze/10 blur-3xl" />
          </div>

          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-bg1/40 px-4 py-2 text-xs font-semibold text-gold">
                قَيَّم للعطور
              </div>
              <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl">
                لكل عطر قيمة… قصة ووجدان وخبرة
              </h1>
              <p className="text-sm leading-7 text-muted sm:text-base">
                نحن نؤمن أن العطر ليس مجرد رائحة؛ بل هو هوية. من
                تفاصيل المكوّنات إلى الإحساس الذي يبقى… كل خطوة تُصمم
                لتكون فاخرة.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {["تراث" ,"فخامة" ,"جودة" ,"تفاصيل"].map((t) => (
                <ScrollReveal key={t}>
                  <div className="rounded-2xl border border-gold/15 bg-bg1/40 p-4">
                    <div className="text-xs font-semibold text-gold">{t}</div>
                    <div className="mt-1 text-sm font-bold">روح قَيَّم</div>
                    <div className="mt-3 h-1.5 w-20 rounded-full bg-gold/30" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "إلهام مصري & نوبي",
              body: "زخارف مستوحاة… ألوان سوداء/ذهبية… وروح ضيافة لا تُنسى.",
            },
            {
              title: "Minimal Luxury",
              body: "تصميم واضح وراقي مع تفاصيل دقيقة تلمس الإحساس.",
            },
            {
              title: "سينمائية في كل صفحة",
              body: "حركة ناعمة + Scroll reveal لإحساس فخم بدون تشتيت.",
            },
          ].map((x) => (
            <Card key={x.title} className="p-6">
              <div className="text-sm font-semibold text-gold">{x.title}</div>
              <p className="mt-2 text-sm leading-7 text-muted">{x.body}</p>
            </Card>
          ))}
        </section>
      </div>
    </PublicShell>
  );
}




