"use client";

import { useParams } from "next/navigation";
import { PageHeader, DetailCard, StatusBadge, formatCurrency, EmptyState } from "../../lib/admin-ui";
import { mockProducts } from "../../lib/mock-data";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

export default function AdminProductEditPage() {
  const params = useParams();
  const product = mockProducts.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div>
        <Link
          href="/admin/products"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
        >
          <ArrowRight className="h-4 w-4" />
          العودة للمنتجات
        </Link>
        <EmptyState title="المنتج غير موجود" description="لم يتم العثور على المنتج المطلوب" />
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
      >
        <ArrowRight className="h-4 w-4" />
        العودة للمنتجات
      </Link>

      <PageHeader title={product.name} description={`${product.id} • ${product.category}`} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main info */}
        <div className="space-y-4 lg:col-span-2">
          <DetailCard title="معلومات المنتج">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="text-muted">الاسم</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="text-muted">الرابط المختصر</span>
                <span className="font-medium" dir="ltr">{product.slug}</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="text-muted">التصنيف</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="text-muted">السعر</span>
                <span className="font-medium">
                  {formatCurrency(product.price)}
                  {product.originalPrice && (
                    <span className="mr-2 text-xs text-muted line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="text-muted">المخزون</span>
                <span className="font-medium">{product.stock} وحدة</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="text-muted">الحالة</span>
                <StatusBadge status={product.status} />
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted">تاريخ الإضافة</span>
                <span>{product.createdAt}</span>
              </div>
            </div>
          </DetailCard>

          <DetailCard title="الوصف">
            <p className="text-sm leading-relaxed text-text/80">{product.description}</p>
          </DetailCard>

          <DetailCard title="النوتات العطرية">
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="rounded-lg border border-gold/15 bg-gold/5 px-3 py-1 text-xs text-gold"
                >
                  {note}
                </span>
              ))}
            </div>
          </DetailCard>
        </div>

        {/* Sidebar stats */}
        <div className="space-y-4">
          <DetailCard title="الإحصائيات">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">إجمالي المبيعات</span>
                <span className="text-xl font-bold text-gold">{product.salesCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">الإيرادات</span>
                <span className="font-medium">{formatCurrency(product.revenue)}</span>
              </div>
            </div>
          </DetailCard>

          <DetailCard title="إجراءات سريعة">
            <div className="space-y-2">
              <button className="w-full rounded-xl border border-gold/20 bg-gold/5 px-4 py-2 text-sm text-gold transition hover:bg-gold/10">
                تعديل المنتج
              </button>
              <button className="w-full rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10">
                أرشفة المنتج
              </button>
            </div>
          </DetailCard>
        </div>
      </div>
    </div>
  );
}
