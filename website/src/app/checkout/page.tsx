import PublicShell from "../components/layout/PublicShell";

export default function CheckoutPage() {
  return (
    <PublicShell>
      <div className="space-y-8">
        <section className="rounded-[2.5rem] border border-gold/15 bg-[linear-gradient(180deg,rgba(17,17,17,0.94),rgba(5,5,5,1))] p-6 shadow-luxury sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-text">إتمام الطلب</h1>
          <p className="mt-4 text-sm leading-7 text-muted">
           يرجى إضافة منتجات إلى سلة التسوق أولاً.
          </p>
          <div className="mt-8">
            <a
              href="/offers"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[linear-gradient(135deg,var(--gold),var(--gold-2))] px-7 py-4 text-sm font-bold text-black transition hover:scale-[1.01]"
            >
              تصفح العروض
            </a>
          </div>
        </section>
      </div>
    </PublicShell>
  );
}

