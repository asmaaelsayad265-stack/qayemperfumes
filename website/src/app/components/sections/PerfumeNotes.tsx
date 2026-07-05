"use client";

import ScrollReveal from "./ScrollReveal";

const notes = {
  top: [
    { name: "برغموت", short: "Citrus" },
    { name: "ليمون", short: "Bright" },
    { name: "زنجبيل", short: "Spice" },
  ],
  middle: [
    { name: "ياسمين", short: "Floral" },
    { name: "ورد", short: "Rose" },
    { name: "قرنفل", short: "Warm" },
  ],
  base: [
    { name: "عنبر", short: "Amber" },
    { name: "مسك", short: "Musk" },
    { name: "خشب", short: "Wood" },
  ],
};

export default function PerfumeNotes() {
  return (
    <section className="rounded-3xl border border-gold/15 bg-surface/70 p-5 sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold">نوتات العطر</h2>
          <p className="mt-1 text-sm text-muted">Top • Middle • Base (Mock visualization)</p>
        </div>
        <div className="gold-shimmer text-sm font-semibold text-transparent">
          Luxury layering
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <ScrollReveal>
          <div className="rounded-3xl border border-gold/15 bg-bg1/30 p-4">
            <div className="text-xs font-semibold text-gold">Top Notes</div>
            <div className="mt-3 space-y-2">
              {notes.top.map((n) => (
                <div key={n.name} className="flex items-center justify-between gap-3">
                  <div className="text-sm font-bold">{n.name}</div>
                  <div className="text-xs text-muted">{n.short}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 rounded-full bg-gold/15">
              <div className="h-full w-4/5 rounded-full bg-gold/60" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-3xl border border-gold/15 bg-bg1/30 p-4">
            <div className="text-xs font-semibold text-gold">Middle Notes</div>
            <div className="mt-3 space-y-2">
              {notes.middle.map((n) => (
                <div key={n.name} className="flex items-center justify-between gap-3">
                  <div className="text-sm font-bold">{n.name}</div>
                  <div className="text-xs text-muted">{n.short}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 rounded-full bg-gold/15">
              <div className="h-full w-3/5 rounded-full bg-gold/55" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-3xl border border-gold/15 bg-bg1/30 p-4">
            <div className="text-xs font-semibold text-gold">Base Notes</div>
            <div className="mt-3 space-y-2">
              {notes.base.map((n) => (
                <div key={n.name} className="flex items-center justify-between gap-3">
                  <div className="text-sm font-bold">{n.name}</div>
                  <div className="text-xs text-muted">{n.short}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 rounded-full bg-gold/15">
              <div className="h-full w-2/5 rounded-full bg-gold/70" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-6">
        <div className="rounded-3xl border border-gold/15 bg-bg0/30 p-4">
          <div className="text-sm font-semibold">Timeline (Layered)</div>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-2 w-1/3 rounded-full bg-gold/60" />
            <div className="h-2 w-1/3 rounded-full bg-gold/40" />
            <div className="h-2 w-1/3 rounded-full bg-gold/30" />
          </div>
          <p className="mt-2 text-xs text-muted">
            Mock timeline — العلو = البداية، الوسط = القلب، القاعدة = الأثر.
          </p>
        </div>
      </div>
    </section>
  );
}

