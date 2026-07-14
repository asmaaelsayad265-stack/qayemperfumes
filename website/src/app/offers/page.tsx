"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PublicShell from "../components/layout/PublicShell";
import ScrollReveal from "../components/sections/ScrollReveal";
import ProductCard from "../components/ProductCard";
import LuxuryBadge from "../components/ui/LuxuryBadge";
import { productsApi, Product } from "@/services/products";
import { settingsApi } from "@/services/settings";
import { BadgePercent, Clock3, Sparkles, ArrowUpRight } from "lucide-react";

const expiryKeys = [
  "offer_expires_at",
  "offers_expires_at",
  "limited_offer_expires_at",
  "promo_expires_at",
];

function parseExpiry(value: string | null): Date | null {
  if (!value) return null;

  const numeric = Number(value);
  if (!Number.isNaN(numeric) && numeric > 0) {
    const fromUnix = numeric < 1e12 ? numeric * 1000 : numeric;
    const date = new Date(fromUnix);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getInitialExpiryFallback() {
  const fallback = new Date();
  fallback.setDate(fallback.getDate() + 3);
  fallback.setHours(23, 59, 59, 999);
  return fallback;
}

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

export default function OffersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expiry, setExpiry] = useState<Date>(getInitialExpiryFallback());
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);

        const [allProducts, expiryValue] = await Promise.all([
          productsApi.getAll(),
          (async () => {
            for (const key of expiryKeys) {
              const value = await settingsApi.getByKey(key);
              const parsed = parseExpiry(value);
              if (parsed) return parsed;
            }
            return null;
          })(),
        ]);

        const offerProducts = allProducts
          .filter((product) => product.is_limited_edition || product.original_price !== null || product.is_best_seller)
          .sort((a, b) => Number(b.is_limited_edition) - Number(a.is_limited_edition));

        setProducts(offerProducts.slice(0, 9));
        if (expiryValue) setExpiry(expiryValue);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load offers");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const remaining = useMemo(() => {
    const diff = Math.max(expiry.getTime() - now.getTime(), 0);
    const seconds = Math.floor(diff / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return { days, hours, minutes, secs, finished: diff <= 0 };
  }, [expiry, now]);

  return (
    <PublicShell>
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-[2.75rem] border border-gold/15 bg-[linear-gradient(180deg,rgba(17,17,17,0.96),rgba(5,5,5,1))] shadow-luxury">
          <div className="pointer-events-none absolute inset-0 luxury-grain" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(200,162,74,0.18),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.12),transparent_22%),linear-gradient(120deg,rgba(255,255,255,0.02),transparent_32%,transparent_70%,rgba(200,162,74,0.08))]" />

          <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-950/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-rose-100">
                <BadgePercent className="h-3.5 w-3.5" />
                Limited edition styling
              </div>

              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
                  عروض فاخرة بتوقيت محدود
                  <span className="gold-shimmer mt-3 block text-transparent bg-clip-text text-3xl font-black sm:text-4xl">
                    Countdown live from backend settings
                  </span>
                </h1>
                <p className="max-w-2xl text-sm leading-8 text-muted sm:text-base">
                  صفحة عروض كاملة بتصميم سينمائي، شارات مميزة، وإشارات انتهاء ديناميكية تُقرأ من الإعدادات الخلفية عندما تكون متاحة.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                {[
                  { label: "Days", value: formatNumber(remaining.days) },
                  { label: "Hours", value: formatNumber(remaining.hours) },
                  { label: "Minutes", value: formatNumber(remaining.minutes) },
                  { label: "Seconds", value: formatNumber(remaining.secs) },
                ].map((part) => (
                  <div key={part.label} className="rounded-[1.5rem] border border-white/8 bg-bg1/45 p-4 text-center backdrop-blur-xl">
                    <div className="text-3xl font-extrabold text-text">{part.value}</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">{part.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <LuxuryBadge label={remaining.finished ? "Expired" : "Live now"} variant={remaining.finished ? "new" : "limited"} />
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-bg1/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted backdrop-blur-xl">
                  <Clock3 className="h-3.5 w-3.5 text-gold" />
                  {remaining.finished ? "Offer window ended" : `Expires ${expiry.toLocaleDateString("en-GB")}`}
                </span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#offers-grid"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[linear-gradient(135deg,var(--gold),var(--gold-2))] px-7 py-4 text-sm font-bold text-black transition hover:scale-[1.01]"
                >
                  <Sparkles className="h-4 w-4" />
                  Explore offers
                </Link>
                <Link
                  href="/perfumes/best-sellers"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/25 bg-bg1/35 px-7 py-4 text-sm font-bold text-text backdrop-blur-xl transition hover:border-gold/60 hover:text-gold"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Best sellers
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.25rem] border border-gold/15 bg-bg0/40 p-3 backdrop-blur-xl">
              <div className="h-full w-full rounded-[1.75rem] bg-bg0/60" />
              <div className="absolute inset-0 rounded-[2.25rem] bg-[linear-gradient(180deg,transparent_36%,rgba(5,5,5,0.84))]" />
              <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/90 backdrop-blur-xl">
                seasonal drop
              </div>
              <div className="absolute bottom-6 right-6 left-6 rounded-[1.75rem] border border-white/10 bg-bg0/55 p-5 backdrop-blur-xl">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold/80">Offer badge</div>
                    <h2 className="mt-1 text-2xl font-bold text-text">Limited edition styling</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-text">50%</div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">off select pieces</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="offers-grid" className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                Offer badges
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-text">مختارات العرض</h2>
              <p className="text-sm text-muted">قطع محدودة, إصدارات خاصة, ومنتجات لديها سعر أصلي ظاهر بوضوح.</p>
            </div>
            <div className="rounded-2xl border border-gold/15 bg-bg1/35 px-4 py-3 text-sm font-semibold text-gold backdrop-blur-xl">
              {products.length} curated items
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-[30rem] animate-pulse rounded-[2rem] border border-gold/10 bg-bg1/40" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[2rem] border border-red-900/50 bg-red-950/20 p-8 text-center">
              <p className="text-muted">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-[2rem] border border-gold/15 bg-surface/70 p-10 text-center">
              <p className="text-muted">لا توجد عروض متاحة حالياً.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ScrollReveal key={product.id}>
                  <div className="space-y-3">
                    <ProductCard product={product} />
                    <div className="flex flex-wrap items-center gap-2 px-1">
                      <span className="rounded-full border border-rose-400/20 bg-rose-950/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-rose-100">
                        Limited edition styling
                      </span>
                      {product.original_price && (
                        <span className="rounded-full border border-gold/15 bg-bg1/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
                          Original price visible
                        </span>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </section>
      </div>
    </PublicShell>
  );
}
