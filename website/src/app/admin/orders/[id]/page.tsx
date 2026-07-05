"use client";

import { useParams } from "next/navigation";
import { PageHeader, DetailCard, formatCurrency, EmptyState } from "../../lib/admin-ui";
import { mockOrders } from "../../lib/mock-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const order = mockOrders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <div>
        <Link
          href="/admin/orders"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
        >
          <ArrowRight className="h-4 w-4" />
          العودة للطلبات
        </Link>
        <EmptyState title="الطلب غير موجود" description="لم يتم العثور على الطلب المطلوب" />
      </div>
    );
  }

  const statusStyles: Record<string, string> = {
    new: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    preparing: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    shipped: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    canceled: "bg-red-500/15 text-red-400 border-red-500/25",
  };

  const statusLabels: Record<string, string> = {
    new: "جديد",
    preparing: "قيد التحضير",
    shipped: "تم الشحن",
    completed: "مكتمل",
    canceled: "ملغي",
  };

  const orderTimeline = [
    { status: "new", label: "تم تقديم الطلب", date: order.createdAt, done: true },
    { status: "preparing", label: "قيد التحضير", date: "2026-07-02", done: order.status !== "new" && order.status !== "canceled" },
    { status: "shipped", label: "تم الشحن", date: "2026-07-03", done: order.status === "shipped" || order.status === "completed" },
    { status: "completed", label: "تم التسليم", date: "2026-07-05", done: order.status === "completed" },
  ];

  return (
    <div>
      <Link
        href="/admin/orders"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
      >
        <ArrowRight className="h-4 w-4" />
        العودة للطلبات
      </Link>

      <PageHeader
        title={`طلب ${order.id}`}
        description={`من ${order.customerName}`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main info */}
        <div className="space-y-4 lg:col-span-2">
          {/* Timeline */}
          <DetailCard title="حالة الطلب">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-block rounded-lg border px-3 py-1 text-sm font-medium ${statusStyles[order.status]}`}
                >
                  {statusLabels[order.status]}
                </span>
                <span className="text-xs text-muted">{order.createdAt}</span>
              </div>
              <div className="relative mr-2 space-y-0">
                {orderTimeline.map((step, i) => (
                  <div key={step.status} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          step.done
                            ? "border-emerald-400 bg-emerald-400/20"
                            : "border-gold/20 bg-bg1"
                        }`}
                      >
                        {step.done && (
                          <svg className="h-2.5 w-2.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      {i < orderTimeline.length - 1 && (
                        <div className={`h-6 w-px ${step.done ? "bg-emerald-400/40" : "bg-gold/10"}`} />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className={`text-xs font-medium ${step.done ? "text-emerald-400" : "text-muted/60"}`}>
                        {step.label}
                      </p>
                      {step.done && (
                        <p className="text-[10px] text-muted">{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DetailCard>

          {/* Order items */}
          <DetailCard title="المنتجات">
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl bg-bg1/50 px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-[10px] text-gold">
                      {item.quantity}×
                    </span>
                    <span>{item.product}</span>
                  </div>
                  <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-gold/10 pt-2 text-sm font-bold">
                <span>المجموع</span>
                <span className="text-gold">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </DetailCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <DetailCard title="معلومات العميل">
            <div className="space-y-2 text-sm">
              <p className="font-medium">{order.customerName}</p>
              <p className="text-muted" dir="ltr">{order.customerEmail}</p>
              <p className="text-muted" dir="ltr">{order.customerPhone}</p>
            </div>
          </DetailCard>

          <DetailCard title="معلومات الشحن">
            <p className="text-sm leading-relaxed text-text/80">{order.shippingAddress}</p>
          </DetailCard>

          <DetailCard title="معلومات الدفع">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">الطريقة</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">الحالة</span>
                <span
                  className={`inline-block rounded-lg border px-2 py-0.5 text-[11px] font-medium ${
                    order.paymentStatus === "paid"
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                      : order.paymentStatus === "pending"
                        ? "bg-amber-500/15 text-amber-400 border-amber-500/25"
                        : "bg-red-500/15 text-red-400 border-red-500/25"
                  }`}
                >
                  {order.paymentStatus === "paid" ? "تم الدفع" : order.paymentStatus === "pending" ? "قيد الانتظار" : "فشل"}
                </span>
              </div>
            </div>
          </DetailCard>

          {order.status !== "completed" && order.status !== "canceled" && (
            <DetailCard title="تحديث الحالة">
              <div className="space-y-2">
                {order.status === "new" && (
                  <button className="w-full rounded-xl bg-amber-500/15 px-4 py-2 text-sm text-amber-400 transition hover:bg-amber-500/25">
                    بدء التحضير
                  </button>
                )}
                {order.status === "preparing" && (
                  <button className="w-full rounded-xl bg-indigo-500/15 px-4 py-2 text-sm text-indigo-400 transition hover:bg-indigo-500/25">
                    تم الشحن
                  </button>
                )}
                {order.status === "shipped" && (
                  <button className="w-full rounded-xl bg-emerald-500/15 px-4 py-2 text-sm text-emerald-400 transition hover:bg-emerald-500/25">
                    تأكيد التسليم
                  </button>
                )}
                <button className="w-full rounded-xl border border-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10">
                  إلغاء الطلب
                </button>
              </div>
            </DetailCard>
          )}
        </div>
      </div>
    </div>
  );
}
