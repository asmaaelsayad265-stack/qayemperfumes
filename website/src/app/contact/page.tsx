import PublicShell from "../components/layout/PublicShell";

export default function ContactPage() {
  return (
    <PublicShell>
      <div className="space-y-8">
        <section className="rounded-[2.5rem] border border-gold/15 bg-[linear-gradient(180deg,rgba(17,17,17,0.94),rgba(5,5,5,1))] p-6 shadow-luxury sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-text">تواصل معنا</h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            نحن هنا لمساعدتك. يمكنك التواصل معنا عبر واتساب أو البريد الإلكتروني.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://wa.me/201063489799"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.01]"
            >
              تواصل عبر واتساب
            </a>
            <a
              href="mailto:info@qayemperfumes.com"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/25 bg-bg1/35 px-6 py-3 text-sm font-bold text-text transition hover:border-gold/50"
            >
              راسلنا عبر البريد
            </a>
          </div>
        </section>
      </div>
    </PublicShell>
  );
}

