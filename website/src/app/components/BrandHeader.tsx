"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Heart, Sparkles } from "lucide-react";

export default function BrandHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "العروض", href: "/offers" },
    { name: "الأكثر مبيعًا", href: "/perfumes/best-sellers" },
    { name: "قصة البراند", href: "/about" },
    { name: "تواصل معنا", href: "/contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "border-b border-gold/20 bg-bg0/88 backdrop-blur-xl shadow-luxury py-3"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="group relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] border border-gold/15 bg-[linear-gradient(135deg,rgba(200,162,74,0.28),rgba(255,255,255,0.04))] text-lg font-black text-text shadow-luxury backdrop-blur-xl">
              Q
            </div>
            <div className="leading-tight">
              <div className="text-2xl font-extrabold tracking-tight text-text text-shadow-soft transition-colors group-hover:text-gold">
                قَيَّم <span className="text-sm font-medium text-gold/80">للعطور</span>
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-muted">Maison fragrance brand</div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 rounded-full border border-gold/10 bg-bg1/45 px-4 py-2 backdrop-blur-xl md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-semibold transition-colors hover:text-gold ${
                  isActive ? "text-gold" : "text-muted"
                }`}
              >
                {link.name}
                {isActive && <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gold" />}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 z-10">
          <button className="rounded-full border border-gold/10 bg-bg1/35 p-2 text-muted transition-colors hover:border-gold/30 hover:text-gold" aria-label="المفضلة">
            <Heart className="h-5 w-5" />
          </button>
          <button className="rounded-full border border-gold/10 bg-bg1/35 p-2 text-muted transition-colors hover:border-gold/30 hover:text-gold" aria-label="سلة التسوق">
            <ShoppingBag className="h-5 w-5" />
          </button>
          <Link
            href="/offers"
            className="hidden items-center gap-2 rounded-full border border-gold/20 bg-gold px-4 py-2 text-xs font-semibold text-black transition hover:scale-[1.02] hover:bg-gold-2 sm:inline-flex"
          >
            <Sparkles className="h-3.5 w-3.5" />
            اكتشف العروض
          </Link>
          <button
            className="md:hidden rounded-full border border-gold/10 bg-bg1/35 p-2 text-muted transition-colors hover:border-gold/30 hover:text-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`fixed inset-0 top-[60px] z-40 bg-bg0/95 backdrop-blur-xl transition-transform duration-500 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-6 luxury-grain">
          <div className="mb-8 rounded-[1.5rem] border border-gold/12 bg-bg1/35 p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold/80">ドラゴンダイブ</div>
            <div className="mt-2 text-lg font-bold text-text">Brand navigation</div>
          </div>
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-bold transition-colors ${
                    isActive ? "text-gold" : "text-text hover:text-gold"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
