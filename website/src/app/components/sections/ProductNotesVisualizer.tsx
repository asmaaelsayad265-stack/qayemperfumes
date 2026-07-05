import ScrollReveal from "./ScrollReveal";

type NoteLayer = {
  title: string;
  items: { name: string; short: string; width: string }[];
  color: string;
};

const layers: NoteLayer[] = [
  {
    title: "Top Notes",
    color: "bg-gold/60",
    items: [
      { name: "برغموت", short: "Citrus", width: "w-5/6" },
      { name: "ليمون", short: "Bright", width: "w-3/4" },
      { name: "زنجبيل", short: "Spice", width: "w-2/3" },
    ],
  },
  {
    title: "Middle Notes",
    color: "bg-gold/45",
    items: [
      { name: "ياسمين", short: "Floral", width: "w-4/5" },
      { name: "ورد", short: "Rose", width: "w-2/3" },
      { name: "قرنفل", short: "Warm", width: "w-3/5" },
    ],
  },
  {
    title: "Base Notes",
    color: "bg-gold/70",
    items: [
      { name: "عنبر", short: "Amber", width: "w-2/5" },
      { name: "مسك", short: "Musk", width: "w-3/5" },
      { name: "خشب", short: "Wood", width: "w-4/5" },
    ],
  },
];

export default function ProductNotesVisualizer() {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold">Perfume Notes</h2>
          <p className="mt-1 text-sm text-muted">Layered visualization — static/mock</p>
        </div>
        <div className="gold-shimmer text-sm font-semibold text-transparent">
          Luxury timeline
        </div>
      </div>

      <div className="rounded-3xl border border-gold/15 bg-surface/60 p-4 sm:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {layers.map((l, idx) => (
            <ScrollReveal key={l.title}>
              <div className="rounded-3xl border border-gold/15 bg-bg1/30 p-4">
                <div className="text-xs font-semibold text-gold">{l.title}</div>
                <div className="mt-3 space-y-3">
                  {l.items.map((n) => (
                    <div key={n.name} className="space-y-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-bold">{n.name}</div>
                        <div className="text-xs text-muted">{n.short}</div>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gold/10">
                        <div className={`h-full ${n.width} ${l.color} rounded-full`} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div
                    className={
                      "h-2 w-2 rounded-full " +
                      (idx === 0 ? "bg-gold" : idx === 1 ? "bg-gold/70" : "bg-gold/90")
                    }
                  />
                  <div className="text-xs text-muted">Layer {idx + 1}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-gold/15 bg-bg0/30 p-4">
          <div className="text-sm font-semibold">Timeline</div>
          <div className="mt-3 flex items-center gap-2">
            {["Top", "Middle", "Base"].map((t, i) => (
              <div key={t} className="flex-1">
                <div
                  className={
                    "h-2 rounded-full " +
                    (i === 0
                      ? "bg-gold/70"
                      : i === 1
                        ? "bg-gold/45"
                        : "bg-gold/80")
                  }
                />
                <div className="mt-2 text-center text-[11px] font-semibold text-muted">{t}</div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            المحاكاة توضح الانتقال من البداية للقلب ثم الأثر.
          </p>
        </div>
      </div>
    </section>
  );
}

