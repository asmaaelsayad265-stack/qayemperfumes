"use client";

import { useParams } from "next/navigation";
import { PageHeader, DetailCard, StatusBadge, EmptyState } from "../../lib/admin-ui";
import { mockCategories, mockProducts } from "../../lib/mock-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AdminCategoryEditPage() {
  const params = useParams();
  const category = mockCategories.find((c) => c.id === params.id);

  if (!category) {
    return (
      <div>
        <Link
          href="/admin/categories"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
        >
          <ArrowRight className="h-4 w-4" />
          العودة للتصنيفات
        </Link>
        <EmptyState title="التصنيف غير موجود" description="لم يتم العثور على التصنيف المطلوب" />
      </div>
    );
  }

  const categoryProducts = mockProducts.filter((p) => p.category === category.name);

  return (
    <div>
      <Link
        href="/admin/categories"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
      >
        <ArrowRight className="h-4 w-4" />
        العودة للتصنيفات
      </Link>

      <PageHeader title={category.name} description={category.description} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <DetailCard title="معلومات التصنيف">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="text-muted">الاسم</span>
                <span className="font-medium">{category.name}</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="text-muted">الرابط المختصر</span>
                <span className="font-medium" dir="ltr">{category.slug}</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="text-muted">عدد المنتجات</span>
                <span>{category.productCount}</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="text-muted">الحالة</span>
                <StatusBadge status={String(category.isActive)} />
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted">تاريخ الإضافة</span>
                <span>{category.createdAt}</span>
              </div>
            </div>
          </DetailCard>

          <DetailCard title="الوصف">
            <p className="text-sm leading-relaxed text-text/80">{category.description}</p>
          </DetailCard>

          {categoryProducts.length > 0 && (
            <DetailCard title="المنتجات في هذا التصنيف">
              <div className="space-y-2">
                {categoryProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/admin/products/${p.id}`}
                    className="flex items-center justify-between rounded-xl border border-gold/5 bg-bg1/50 px-3 py-2 text-sm transition hover:border-gold/20"
                  >
                    <span>{p.name}</span>
                    <span className="text-xs text-muted">{p.status === "active" ? "نشط" : p.status === "draft" ? "مسودة" : "مؤرشف"}</span>
                  </Link>
                ))}
              </div>
            </DetailCard>
          )}
        </div>

        <div className="space-y-4">
          <DetailCard title="إجراءات سريعة">
            <div className="space-y-2">
              <button className="w-full rounded-xl border border-gold/20 bg-gold/5 px-4 py-2 text-sm text-gold transition hover:bg-gold/10">
                تعديل التصنيف
              </button>
              <button className="w-full rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10">
                {category.isActive ? "تعطيل التصنيف" : "تفعيل التصنيف"}
              </button>
            </div>
          </DetailCard>
        </div>
      </div>
    </div>
  );
}
