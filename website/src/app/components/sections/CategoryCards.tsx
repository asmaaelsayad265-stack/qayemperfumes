"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "../ui/Card";
import ScrollReveal from "./ScrollReveal";
import { categoriesApi, Category } from "@/services/categories";

export default function CategoryCards() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await categoriesApi.getActive();
        setCategories(data.slice(0, 6));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load categories");
        setCategories([]); // Empty state on error, not blocked
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-text">
            التصنيفات
          </h2>
          <p className="text-sm text-muted">جاري التحميل...</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              className="h-28 animate-pulse bg-bg1/40 border border-gold/10 rounded-[2rem]"
            >
              <></>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  // Show error state - graceful degradation
  if (error) {
    return (
      <section className="space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-text">
            عائلات <span className="text-gold font-light">العطور</span>
          </h2>
        </div>
        <div className="rounded-[2rem] border border-gold/15 bg-surface/70 p-10 text-center">
          <p className="text-muted mb-2">التصنيفات غير متاحة حالياً.</p>
          <p className="text-sm text-muted/70">تأكد من اتصال الخادم والمحاولة لاحقاً.</p>
        </div>
      </section>
    );
  }

  // Show empty state
  if (categories.length === 0) {
    return (
      <section className="space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-text">
            عائلات <span className="text-gold font-light">العطور</span>
          </h2>
          <p className="text-sm text-muted">
            اكتشف العطر الذي يطابق شخصيتك ومزاجك
          </p>
        </div>
        <div className="rounded-[2rem] border border-gold/15 bg-surface/70 p-10 text-center">
          <p className="text-muted">لا توجد تصنيفات متاحة حالياً.</p>
        </div>
      </section>
    );
  }

  // Show categories
  return (
    <section className="space-y-10 relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gold/10 pb-6">
        <div className="space-y-2 text-center md:text-right">
          <h2 className="text-3xl font-extrabold tracking-tight text-text">
            عائلات <span className="text-gold font-light">العطور</span>
          </h2>
          <p className="text-sm text-muted">
            اكتشف العطر الذي يطابق شخصيتك ومزاجك
          </p>
        </div>
        <div className="hidden md:block">
          <span className="gold-shimmer text-sm font-semibold px-4 py-2 rounded-full border border-gold/20 bg-gold/5">
            Explore Collections
          </span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, idx) => (
          <ScrollReveal key={category.id}>
            <Link href={`/perfumes/${category.slug}`} className="group block">
              <Card
                className={
                  "relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury rounded-[2rem] p-6 " +
                  (idx % 2 === 0
                    ? "bg-gradient-to-br from-gold/5 to-bg1/80 border border-gold/20 hover:border-gold/40"
                    : "bg-gradient-to-tr from-bg0 to-bg1/90 border border-gold/10 hover:border-gold/30")
                }
              >
                <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-gold uppercase mb-1">
                      {category.slug}
                    </div>
                    <div className="text-xl font-bold text-text group-hover:text-gold transition-colors">
                      {category.name_ar}
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/20 bg-bg0/40 shadow-inner transition-transform duration-500 group-hover:scale-110">
                    <span className="block h-2.5 w-2.5 rounded-full bg-gold group-hover:animate-ping" />
                  </div>
                </div>
              </Card>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
