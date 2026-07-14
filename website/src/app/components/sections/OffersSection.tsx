import Link from "next/link";

export default function OffersSection() {
  return (
    <section className="relative overflow-hidden rounded-[2.75rem] border border-gold/15 bg-bg1 group luxury-card">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 z-base opacity-80 luxury-grain">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-linear-to-l from-gold/18 to-transparent" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-bronze/18 blur-3xl mix-blend-screen" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(11,11,11,0.95),transparent)]" />
      </div>

      <div className="relative z-content grid gap-8 md:grid-cols-2">
        {/* Visual side */}
        <div className="relative min-h-[24rem] overflow-hidden md:min-h-[34rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.15),transparent_26%),linear-gradient(180deg,transparent,rgba(5,5,5,0.72))] z-content" />
          <div className="absolute inset-0 bg-bg0/40" />
          <div className="absolute left-6 top-6 z-elevated">
            <div className="inline-flex items-center justify-center rounded-full border border-rose-400/30 bg-rose-950/70 px-4 py-1.5 backdrop-blur-md">
              <span className="text-xs font-bold tracking-[0.28em] text-rose-100">LIMITED OFFER</span>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 z-elevated max-w-xs rounded-[1.75rem] border border-white/10 bg-bg0/55 p-5 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold/80">Edition</div>
            <div className="mt-2 text-lg font-bold text-text">أسرار الشرق</div>
            <p className="mt-2 text-sm leading-6 text-muted">جلسة عرض سينمائية مع عبوة محدودة وخصم ظاهر بوضوح.</p>
          </div>
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center space-y-6 p-8 sm:p-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Offer highlight
            </div>
            <h2 className="text-3xl font-extrabold leading-tight text-text sm:text-4xl">
              فخامة تكتمل <br />
              <span className="gold-shimmer text-transparent bg-clip-text">بنصف السعر</span>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              احصل على خصم 50% على مجموعة &quot;أسرار الشرق&quot; لفترة محدودة. 
              تجربة عطرية لا تُنسى في انتظارك.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-950/20 px-5 py-2.5 text-xs font-bold tracking-[0.28em] text-rose-100">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
            </span>
            عرض محدود لفترة قصيرة
          </div>

          <div className="flex flex-wrap gap-3">
            {['عرض محدود', 'عبوة فاخرة', 'إشعاع ذهبي'].map((tag) => (
              <span key={tag} className="rounded-full border border-gold/15 bg-bg0/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                {tag}
              </span>
            ))}
          </div>

          <div>
            <Link
              href="/offers"
              className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-[linear-gradient(135deg,var(--gold),var(--gold-2))] px-6 py-3 text-sm font-bold text-black transition-all hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(200,162,74,0.32)]"
            >
              تسوق العرض الآن
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
