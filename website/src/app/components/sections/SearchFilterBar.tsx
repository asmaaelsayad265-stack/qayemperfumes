"use client";

import { useMemo, useState } from "react";

export default function SearchFilterBar() {
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");

  const chips = useMemo(
    () =>
      [
        { label: "Best Sellers", value: "best" },
        { label: "Special Editions", value: "special" },
        { label: "Men", value: "men" },
        { label: "Women", value: "women" },
        { label: "Summer", value: "summer" },
        { label: "Winter", value: "winter" },
      ],
    []
  );

  return (
    <div className="rounded-3xl border border-gold/15 bg-surface/70 p-4">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-muted">بحث</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="مثال: عود، نسائي، فخم"
            className="mt-2 w-full rounded-2xl border border-gold/15 bg-bg1/40 px-4 py-3 text-sm text-text outline-none transition focus:border-gold/60"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted">السعر</label>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-gold/15 bg-bg1/40 px-4 py-3 text-sm text-text outline-none transition focus:border-gold/60"
          >
            <option value="all">الكل</option>
            <option value="mid">متوسط</option>
            <option value="high">مرتفع</option>
          </select>
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2 md:items-center">
        <div>
          <label className="text-xs font-semibold text-muted">ترتيب</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-gold/15 bg-bg1/40 px-4 py-3 text-sm text-text outline-none transition focus:border-gold/60"
          >
            <option value="featured">مميز</option>
            <option value="price_asc">السعر: الأقل</option>
            <option value="price_desc">السعر: الأعلى</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <div className="flex min-w-max items-center gap-2">
            {chips.map((c) => (
              <button
                key={c.value}
                type="button"
                className="rounded-full border border-gold/20 bg-bg1/30 px-4 py-2 text-xs font-semibold text-muted transition hover:border-gold/50 hover:text-text"
                onClick={() => setQuery(c.label)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted">
        واجهة بحث وتصنيف للعرض (Mock UI) — بدون تكامل بيانات.
      </p>
    </div>
  );
}

