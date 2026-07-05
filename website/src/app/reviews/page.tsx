"use client";

import { useState, useEffect } from "react";
import PublicShell from "../components/layout/PublicShell";
import ErrorBoundary from "@/components/ErrorBoundary";
import { reviewsApi } from "@/services/reviews";
import { Review } from "@/services/products";
import { retryWithBackoff } from "@/utils/retry";

function ReviewsContent() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await retryWithBackoff(() => reviewsApi.getApproved());
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold">التقييمات</h1>
          <p className="text-sm text-muted">جاري التحميل...</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-3xl border border-gold/15 bg-surface/70 p-5">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-800" />
              <div className="mt-3 h-3 w-24 animate-pulse rounded bg-gray-800" />
              <div className="mt-3 space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-gray-800" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold">التقييمات</h1>
          <p className="text-sm text-red-400">{error}</p>
        </div>
        <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-8 text-center">
          <p className="text-muted mb-4">تعذر تحميل التقييمات. يرجى المحاولة مرة أخرى.</p>
          <button
            onClick={() => window.location.reload()}
            className="gold-shimmer inline-flex items-center justify-center rounded-2xl bg-transparent px-6 py-3 text-sm font-semibold text-transparent ring-1 ring-gold/40"
          >
            إعادة المحاولة
          </button>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold">التقييمات</h1>
          <p className="text-sm text-muted">لا توجد تقييمات بعد</p>
        </div>
        <div className="rounded-3xl border border-gold/15 bg-surface/70 p-12 text-center">
          <p className="text-muted">لا توجد تقييمات متاحة حالياً. كن أول من يقيم!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold">التقييمات</h1>
        <p className="text-sm text-muted">{reviews.length} تقييم</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-3xl border border-gold/15 bg-surface/70 p-5 transition hover:border-gold/40"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold">{review.customer_name}</div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-extrabold text-gold">{review.rating}</span>
                <span className="text-gold">★</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted">
              {new Date(review.created_at).toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text/80">
              {review.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ReviewsPage() {
  return (
    <PublicShell>
      <div className="space-y-8">
        <ErrorBoundary>
          <ReviewsContent />
        </ErrorBoundary>
      </div>
    </PublicShell>
  );
}
