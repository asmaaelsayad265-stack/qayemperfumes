import Image from "next/image";

const mockImages = [
  "/file.svg",
  "/globe.svg",
  "/window.svg",
  "/next.svg",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-b from-bg1/40 to-bg0">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-gold-2/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(200,162,74,0.18),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(200,162,74,0.10),transparent_50%)]" />
      </div>

      <div className="relative grid gap-8 p-6 sm:p-10 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-bg1/40 px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span className="text-muted">Luxury Perfume Platform</span>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl reveal">
            لكُل عطرٍ قيمة
          </h1>

          <p className="text-sm leading-7 text-muted sm:text-base reveal">
            تجربة رقمية فاخرة… صور سينمائية، تفاصيل مكوّنات دقيقة، وتصفح بأناقة
            مناسبة لهوية قَيَّم للعطور.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center reveal">
            <a
              href="/collections/best-sellers"
              className="group inline-flex items-center justify-center rounded-2xl bg-gold px-5 py-3 text-sm font-semibold text-black shadow-luxury transition hover:opacity-95 active:scale-[0.99]"
            >
              اكتشف الأكثر مبيعًا
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-black opacity-80" />
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center rounded-2xl border border-gold/30 bg-transparent px-5 py-3 text-sm font-semibold text-text transition hover:border-gold-2 hover:bg-bg1/40"
            >
              قصة البراند
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center reveal">
            {["ثبات", "رفاهية", "جودة"].map((t) => (
              <div key={t} className="rounded-2xl border border-gold/15 bg-bg1/40 px-2 py-3">
                <div className="text-xs font-semibold text-gold">{t}</div>
                <div className="mt-1 text-[11px] text-muted">Premium Experience</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-b from-gold/10 to-transparent blur-2xl" />

          <div className="relative grid grid-cols-2 gap-3">
            {mockImages.map((src, idx) => (
              <div
                key={src}
                className={
                  "group overflow-hidden rounded-2xl border border-gold/15 bg-bg1/40 shadow-luxury transition " +
                  (idx === 0 ? "col-span-2" : "")
                }
              >
                <div className="aspect-[16/9] w-full">
                  <Image
                    src={src}
                    alt=""
                    width={800}
                    height={450}
                    className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:opacity-100"
                  />
                </div>
                <div className="px-3 py-3 text-right">
                  <div className="text-xs font-semibold text-text">تصميم سينمائي</div>
                  <div className="mt-1 text-[11px] text-muted">Black & Gold Mood</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

