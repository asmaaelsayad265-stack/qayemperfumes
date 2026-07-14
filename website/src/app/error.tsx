"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="fixed inset-0 z-overlay flex items-center justify-center overlay-backdrop text-text">
      <div className="absolute inset-0 opacity-80 overlay-glow" />
      <div className="relative flex flex-col items-center gap-6 rounded-[2.5rem] border border-gold/15 px-8 py-10 backdrop-blur-2xl shadow-luxury">
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-gold/20 text-2xl font-black text-text">
          Q
        </div>
        <div className="text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.42em] text-gold/80">حدث خطأ</div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight">تعذر تحميل الصفحة</div>
          <p className="mt-2 text-sm text-muted max-w-xs">نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى.</p>
        </div>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[linear-gradient(135deg,var(--gold),var(--gold-2))] px-7 py-4 text-sm font-bold text-black transition hover:scale-[1.01]"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}