import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Sparkles } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function BrandFooter() {
  return (
    <footer className="relative mt-20 w-full overflow-hidden border-t border-gold/20 bg-[linear-gradient(180deg,rgba(11,11,11,0.84),rgba(5,5,5,1))] pt-16">
      {/* Decorative top glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-gold/5 to-transparent" />
      <div className="pointer-events-none absolute inset-0 luxury-grain opacity-70" />

      <div className="mx-auto max-w-6xl px-4 pb-8 relative z-10">
        <div className="mb-12 flex flex-col gap-6 rounded-[2rem] border border-gold/15 bg-bg1/40 p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              Luxury fragrance house
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
              عطور مصممة لتبدو وتُشعِر مثل دور العطور العالمية
            </h3>
          </div>

          <Link
            href="/offers"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/20 bg-gold px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] hover:bg-gold-2"
          >
            تصفح العروض
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] border border-gold/15 bg-[linear-gradient(135deg,rgba(200,162,74,0.22),rgba(255,255,255,0.03))] text-xl font-black text-text shadow-luxury backdrop-blur-xl">
                Q
              </div>
              <div>
                <div className="text-2xl font-extrabold tracking-tight text-text text-shadow-soft">
                  قَيَّم <span className="text-sm font-medium text-gold">للعطور</span>
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-muted">International black & gold maison</div>
              </div>
            </div>
            <p className="text-sm leading-7 text-muted max-w-sm">
              نؤمن أن العطر ليس مجرد رائحة؛ بل هو هوية. من تفاصيل المكوّنات إلى الإحساس الذي يبقى… 
              <span className="gold-shimmer block mt-1 font-semibold">&quot;لكل عطر قيمة&quot;</span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-text">روابط سريعة</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/" className="transition-colors hover:text-gold">الرئيسية</Link></li>
              <li><Link href="/offers" className="transition-colors hover:text-gold">العروض</Link></li>
              <li><Link href="/perfumes/best-sellers" className="transition-colors hover:text-gold">الأكثر مبيعًا</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-gold">قصة البراند</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-gold">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-text">تواصل معنا</h3>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.facebook.com/share/1EYnhrFU6z/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-bg0/50 text-muted transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold hover:shadow-luxury"
                aria-label="فيسبوك"
              >
                  <FacebookIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/201063489799" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-bg0/50 text-muted transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold hover:shadow-luxury"
                aria-label="واتساب"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href="mailto:info@qayemperfumes.com" 
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-bg0/50 text-muted transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold hover:shadow-luxury"
                aria-label="البريد الإلكتروني"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 rounded-[2rem] border border-gold/12 bg-bg1/35 p-6 backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-gold/80">Newsletter</div>
            <h4 className="text-2xl font-extrabold text-text">احصل على الإصدارات والعروض قبل الجميع</h4>
            <p className="text-sm leading-7 text-muted">تلقَّ إشعارًا عند إطلاق النوتات الجديدة والإصدارات المحدودة والعروض الخاصة.</p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="w-full rounded-2xl border border-gold/15 bg-bg0/40 px-4 py-3 text-sm text-text outline-none transition placeholder:text-muted focus:border-gold/50"
            />
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[linear-gradient(135deg,var(--gold),var(--gold-2))] px-5 py-3 text-sm font-bold text-black transition hover:scale-[1.01]"
            >
              Subscribe
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Copyright */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-gold/10 pt-8 text-center text-xs text-muted md:flex-row">
          <p>© {new Date().getFullYear()} قَيَّم للعطور. جميع الحقوق محفوظة.</p>
          <div className="mt-2 flex gap-4 md:mt-0">
            <Link href="#" className="hover:text-gold">سياسة الخصوصية</Link>
            <Link href="#" className="hover:text-gold">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
