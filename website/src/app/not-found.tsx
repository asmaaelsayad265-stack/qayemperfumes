import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-overlay flex items-center justify-center overlay-backdrop text-text">
      <div className="absolute inset-0 opacity-80 overlay-glow" />
      <div className="relative flex flex-col items-center gap-6 rounded-[2.5rem] border border-gold/15 px-8 py-10 backdrop-blur-2xl shadow-luxury">
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-gold/20 text-2xl font-black text-text">
          404
        </div>
        <div className="text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.42em] text-gold/80">الصفحة غير موجودة</div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight">عذراً، لم نتمكن من العثور على الصفحة</div>
          <p className="mt-2 text-sm text-muted max-w-xs">قد تكون الصفحة قد أُزيلت أو الرابط غير صحيح.</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[linear-gradient(135deg,var(--gold),var(--gold-2))] px-7 py-4 text-sm font-bold text-black transition hover:scale-[1.01]"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
