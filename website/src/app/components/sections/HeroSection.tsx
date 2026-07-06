import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
];

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100vh-7rem)] overflow-hidden rounded-[2.75rem] border border-gold/15 bg-[linear-gradient(180deg,rgba(17,17,17,0.96),rgba(5,5,5,1))] shadow-luxury">
      <div className="pointer-events-none absolute inset-0 luxury-grain" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,162,74,0.22),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_22%),linear-gradient(120deg,rgba(255,255,255,0.02),transparent_36%,transparent_64%,rgba(200,162,74,0.08))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(5,5,5,0.98),transparent)]" />
      <div className="pointer-events-none absolute left-[18%] top-[14%] h-72 w-72 rounded-full bg-gold/15 blur-[130px] animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-[8%] top-[18%] h-80 w-80 rounded-full bg-white/10 blur-[150px] animate-[pulse_10s_ease-in-out_infinite]" />

      <div className="relative z-10 grid min-h-[calc(100vh-7rem)] gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-14 lg:py-16">
        <div className="space-y-8 animate-fade-in-up stagger-1">
          <div className="inline-flex items-center gap-3 rounded-full border border-gold/20 bg-bg1/55 px-5 py-2.5 text-xs font-semibold backdrop-blur-xl shadow-luxury">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="tracking-[0.35em] text-gold uppercase">Luxury fragrance house</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-gold/15 bg-[linear-gradient(135deg,rgba(200,162,74,0.22),rgba(255,255,255,0.04))] text-xl font-black text-text shadow-luxury backdrop-blur-xl">
              Q
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.36em] text-muted">Maison QAYEM</div>
              <div className="mt-1 text-sm font-semibold text-gold/85">Black & Gold fragrance atelier</div>
            </div>
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-text sm:text-5xl md:text-6xl lg:text-7xl">
              فخامة تُرى قبل أن تُشم.
              <span className="gold-shimmer mt-4 block text-transparent bg-clip-text text-3xl font-black sm:text-4xl md:text-5xl">
                لكُل عطرٍ قيمة وهوية
              </span>
            </h1>
            <p className="max-w-2xl text-sm leading-8 text-muted sm:text-base md:text-lg">
              تجربة رقمية مستوحاة من دور العطور العالمية: إضاءة سينمائية، طبقات ناعمة من الضوء، وعرض بصري يرفع كل منتج إلى مستوى فاخر.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { value: "120+", label: "تركيبة عطرية" },
              { value: "24/7", label: "إحساس فاخر" },
              { value: "100%", label: "تجربة مرتبة" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[1.6rem] border border-white/8 bg-bg1/35 p-4 backdrop-blur-xl">
                <div className="text-2xl font-extrabold text-text">{stat.value}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Link
              href="/perfumes/best-sellers"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[linear-gradient(135deg,var(--gold),var(--gold-2))] px-7 py-4 text-sm font-bold text-black transition duration-300 hover:scale-[1.01] hover:shadow-[0_0_24px_rgba(200,162,74,0.32)]"
            >
              اكتشف الأكثر مبيعًا
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/offers"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/25 bg-bg1/35 px-7 py-4 text-sm font-bold text-text backdrop-blur-xl transition duration-300 hover:border-gold/60 hover:bg-bg1/55 hover:text-gold"
            >
              <Sparkles className="h-4 w-4" />
              العروض المحدودة
            </Link>
          </div>
        </div>

        <div className="relative animate-fade-in-up stagger-3 lg:ml-auto lg:max-w-[36rem]">
          <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_20%,rgba(200,162,74,0.18),transparent_38%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.12),transparent_28%)] blur-3xl" />

          <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/18 bg-[linear-gradient(180deg,rgba(17,17,17,0.72),rgba(5,5,5,0.96))] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
            <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem]">
                <Image
                  src={heroImages[0]}
                  alt="Luxury perfume bottle"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(5,5,5,0.84))]" />
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-gold/90 backdrop-blur-xl">
                  signature scent
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-[1.5rem] border border-white/10 bg-bg0/55 p-4 backdrop-blur-xl">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold/80">Maison selection</div>
                      <div className="mt-1 text-lg font-bold text-text">عطر العود الملكي</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-text">2800</div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">EGP</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="relative min-h-[12rem] overflow-hidden rounded-[1.75rem] border border-white/8">
                  <Image
                    src={heroImages[1]}
                    alt="Perfume composition"
                    fill
                    sizes="(max-width: 1024px) 100vw, 20vw"
                    className="object-cover transition duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,5,5,0.86))]" />
                </div>

                <div className="grid gap-3">
                  {[
                    { title: "Luminous finish", body: "طبقات ضوء ناعمة تحاكي واجهات دور العطور الراقية." },
                    { title: "Premium curation", body: "عرض يرتقي بالمنتجات المميزة والإصدارات المحدودة." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-[1.5rem] border border-gold/12 bg-bg1/45 p-4 backdrop-blur-xl">
                      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-gold/80">{item.title}</div>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

