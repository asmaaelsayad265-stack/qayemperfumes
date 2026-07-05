"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "../ui/Card";
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
        setCategories(data.slice(0, 6)); // Show only 6 categories
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">التصنيفات</h2>
            <p className="text-sm text-muted">Loading...</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              className={
                "group relative overflow-hidden transition " +
                (i % 2 === 0
                  ? "bg-gradient-to-b from-gold/10 to-surface/60"
                  : "bg-gradient-to-b from-surface/50 to-bg1/20")
              }
            >
              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-800" />
                  <div className="mt-2 h-4 w-24 animate-pulse rounded bg-gray-800" />
                </div>
                <div className="rounded-xl border border-gold/20 bg-bg0/30 p-2">
                  <span className="block h-2 w-2 rounded-full bg-gold" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">التصنيفات</h2>
            <p className="text-sm text-red-400">Error: {error}</p>
          </div>
        </div>
        <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-8 text-center">
          <p className="text-muted">Unable to load categories. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">التصنيفات</h2>
          <p className="text-sm text-muted">Luxury categories</p>
        </div>
        <div className="gold-shimmer text-sm font-semibold">
          اكتشف مزاجك
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, idx) => (
          <Link key={category.id} href={`/perfumes/${category.slug}`}>
            <Card
              className={
                "group relative overflow-hidden transition " +
                (idx % 2 === 0
                  ? "bg-gradient-to-b from-gold/10 to-surface/60"
                  : "bg-gradient-to-b from-surface/50 to-bg1/20")
              }
            >
              <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-gold/15 blur-2xl opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-gold">{category.slug}</div>
                  <div className="mt-1 text-base font-bold">{category.name_ar}</div>
                </div>
                <div className="rounded-xl border border-gold/20 bg-bg0/30 p-2 transition group-hover:border-gold-2">
                  <span className="block h-2 w-2 rounded-full bg-gold" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

