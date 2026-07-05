import ScrollReveal from "./ScrollReveal";

export default function LuxuryEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-gold/15 bg-surface/60 p-6 sm:p-8">
      <ScrollReveal>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-gold">لا شيء هنا بعد</div>
            <h3 className="text-lg font-extrabold">{title}</h3>
            <p className="text-sm leading-7 text-muted">{description}</p>
          </div>

          {/* Simple luxury icon */}
          <div className="relative h-14 w-14 rounded-3xl border border-gold/15 bg-bg1/40">
            <div className="absolute inset-0 m-auto h-8 w-8 rounded-full bg-gold/10 blur" />
            <div className="absolute inset-0 flex items-center justify-center text-gold">✦</div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["جرّب بحثًا آخر", "صفّح التصنيفات", "اكتشف العروض"].map((x) => (
            <span
              key={x}
              className="rounded-full border border-gold/20 bg-bg1/30 px-3 py-1 text-xs font-semibold text-muted"
            >
              {x}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

