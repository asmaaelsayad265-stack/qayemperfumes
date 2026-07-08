"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(200,162,74,0.18),rgba(5,5,5,0.98)_60%)] text-text">
      <div className="absolute inset-0 opacity-80" style={{ background: "radial-gradient(circle at 20% 20%, rgba(200,162,74,0.12), transparent 28%), radial-gradient(circle at 80% 12%, rgba(200,162,74,0.15), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0))" }} />
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