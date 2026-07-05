"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { productsApi, Product } from "@/services/products";
import { retryWithBackoff } from "@/utils/retry";

interface SearchFilterBarProps {
  onSearchResults?: (results: Product[], query: string) => void;
}

export default function SearchFilterBar({ onSearchResults }: SearchFilterBarProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [price, setPrice] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");
  const [searching, setSearching] = useState(false);

  // Debounce search query (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      if (onSearchResults) onSearchResults([], "");
      return;
    }

    const performSearch = async () => {
      setSearching(true);
      try {
        const results = await retryWithBackoff(() => productsApi.search(debouncedQuery));
        if (onSearchResults) onSearchResults(results, debouncedQuery);
      } catch (err) {
        console.error("Search failed:", err);
        if (onSearchResults) onSearchResults([], debouncedQuery);
      } finally {
        setSearching(false);
      }
    };

    performSearch();
  }, [debouncedQuery, onSearchResults]);

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

  const handleChipClick = useCallback((label: string) => {
    setQuery(label);
  }, []);

  return (
    <div className="rounded-3xl border border-gold/15 bg-surface/70 p-4">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-muted">بحث</label>
          <div className="relative mt-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="مثال: عود، نسائي، فخم"
              className="w-full rounded-2xl border border-gold/15 bg-bg1/40 px-4 py-3 text-sm text-text outline-none transition focus:border-gold/60"
            />
            {searching && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gold/40 border-t-gold" />
              </div>
            )}
          </div>
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
                onClick={() => handleChipClick(c.label)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {debouncedQuery && (
        <p className="mt-3 text-xs text-gold">
          {searching ? "جاري البحث..." : `نتائج البحث عن: "${debouncedQuery}"`}
        </p>
      )}
    </div>
  );
}