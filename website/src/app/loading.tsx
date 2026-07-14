export default function Loading() {
  return (
    <div className="fixed inset-0 z-overlay flex items-center justify-center overlay-backdrop text-text">
      <div className="absolute inset-0 luxury-grain opacity-80" />
      <div className="relative flex flex-col items-center gap-6 rounded-[2.5rem] border border-gold/15 bg-bg1/35 px-8 py-10 backdrop-blur-2xl shadow-luxury">
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-gold/20 bg-[linear-gradient(135deg,rgba(200,162,74,0.24),rgba(255,255,255,0.04))] text-2xl font-black text-text shadow-[0_0_40px_rgba(200,162,74,0.16)]">
          Q
        </div>
        <div className="text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.42em] text-gold/80">Maison fragrance brand</div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight">قَيَّم للعطور</div>
        </div>
        <div className="h-1.5 w-56 overflow-hidden rounded-full bg-bg0/60">
          <div className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,transparent,var(--gold),var(--gold-2),transparent)] animate-[loadingSweep_1.4s_ease-in-out_infinite]" />
        </div>
        <div className="text-xs uppercase tracking-[0.32em] text-muted">Loading luxury experience</div>
      </div>
    </div>
  );
}