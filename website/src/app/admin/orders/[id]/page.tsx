"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertTriangle, ArrowRight, RefreshCw } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useOrder } from "@/hooks/useOrders";
import { ordersApi, OrderStatus, orderStatusLabels, paymentStatusLabels } from "@/services/orders";
import {
  DetailCard,
  EmptyState,
  PageHeader,
  StatusBadge,
  formatCurrency,
} from "../../lib/admin-ui";

const statusFlow: OrderStatus[] = ["new", "preparing", "shipped", "completed"];

function formatDate(value?: string | null): string {
  if (!value) {
    return "غير محدد";
  }

  return new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function DetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
            <div className="mb-4 h-4 w-28 animate-pulse rounded bg-gold/10" />
            <div className="space-y-3">
              {[...Array(4)].map((__, row) => (
                <div key={row} className="h-10 animate-pulse rounded-xl bg-gold/10" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
            <div className="mb-4 h-4 w-24 animate-pulse rounded bg-gold/10" />
            <div className="space-y-2">
              <div className="h-4 animate-pulse rounded bg-gold/10" />
              <div className="h-4 animate-pulse rounded bg-gold/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminOrderDetailsContent() {
  const params = useParams<{ id: string }>();
  const orderId = Number(params.id);
  const { order, loading, error, refetch, setOrder } = useOrder(Number.isFinite(orderId) ? orderId : null);
  const [updatingStatus, setUpdatingStatus] = useState<OrderStatus | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const timeline = useMemo(() => {
    const activeIndex = order ? statusFlow.indexOf(order.status) : -1;

    return statusFlow.map((status, index) => ({
      status,
      label: orderStatusLabels[status],
      done: activeIndex >= index,
      date: index === 0 ? order?.created_at : order?.updated_at,
    }));
  }, [order]);

  const updateStatus = async (status: OrderStatus) => {
    if (!order || status === order.status) {
      return;
    }

    setUpdatingStatus(status);
    setActionError(null);
    setSuccess(null);

    try {
      const updated = await ordersApi.updateStatus(order, status);
      setOrder(updated);
      setSuccess("تم تحديث حالة الطلب بنجاح.");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "تعذر تحديث حالة الطلب");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const customerName = order?.customer?.name || order?.customer_email || "عميل غير محدد";

  return (
    <div>
      <Link
        href="/admin/orders"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
      >
        <ArrowRight className="h-4 w-4" />
        العودة للطلبات
      </Link>

      {loading ? (
        <DetailsSkeleton />
      ) : error ? (
        <div>
          <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            <span className="inline-flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </span>
            <button
              type="button"
              onClick={refetch}
              className="inline-flex items-center gap-1 rounded-lg border border-red-300/20 px-3 py-1 text-xs transition hover:bg-red-500/10"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              إعادة المحاولة
            </button>
          </div>
          <EmptyState title="تعذر عرض الطلب" description="تحقق من رقم الطلب أو أعد المحاولة" />
        </div>
      ) : !order ? (
        <EmptyState title="الطلب غير موجود" description="لم يتم العثور على الطلب المطلوب" />
      ) : (
        <>
          <PageHeader title={`طلب ${order.order_number}`} description={`من ${customerName}`} />

          {(actionError || success) && (
            <div
              className={`mb-4 rounded-2xl border px-4 py-3 text-sm ${
                actionError
                  ? "border-red-500/20 bg-red-500/10 text-red-200"
                  : "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
              }`}
            >
              {actionError || success}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <DetailCard title="حالة الطلب">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <StatusBadge status={order.status} />
                    <span className="text-xs text-muted">{formatDate(order.created_at)}</span>
                  </div>

                  <div className="relative mr-2 space-y-0">
                    {timeline.map((step, index) => (
                      <div key={step.status} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                              step.done
                                ? "border-emerald-400 bg-emerald-400/20"
                                : "border-gold/20 bg-bg1"
                            }`}
                          >
                            {step.done ? (
                              <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            ) : null}
                          </div>
                          {index < timeline.length - 1 ? (
                            <div className={`h-8 w-px ${step.done ? "bg-emerald-400/40" : "bg-gold/10"}`} />
                          ) : null}
                        </div>
                        <div className="pb-4">
                          <p className={`text-xs font-medium ${step.done ? "text-emerald-400" : "text-muted/60"}`}>
                            {step.label}
                          </p>
                          {step.done ? <p className="text-[10px] text-muted">{formatDate(step.date)}</p> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DetailCard>

              <DetailCard title="المنتجات">
                <div className="space-y-2">
                  {(order.items ?? []).length === 0 ? (
                    <p className="text-sm text-muted">لا توجد منتجات مرتبطة بهذا الطلب.</p>
                  ) : (
                    order.items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 rounded-xl bg-bg1/50 px-3 py-2 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-[10px] text-gold">
                            {item.quantity}x
                          </span>
                          <span>{item.product_name}</span>
                        </div>
                        <span className="font-medium">{formatCurrency(Number(item.subtotal))}</span>
                      </div>
                    ))
                  )}
                  <div className="flex items-center justify-between border-t border-gold/10 pt-2 text-sm font-bold">
                    <span>المجموع</span>
                    <span className="text-gold">{formatCurrency(Number(order.total))}</span>
                  </div>
                </div>
              </DetailCard>
            </div>

            <div className="space-y-4">
              <DetailCard title="معلومات العميل">
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{customerName}</p>
                  {order.customer_email ? <p className="text-muted" dir="ltr">{order.customer_email}</p> : null}
                  {order.customer_phone ? <p className="text-muted" dir="ltr">{order.customer_phone}</p> : null}
                  {order.customer_id ? (
                    <Link href={`/admin/customers/${order.customer_id}`} className="inline-flex text-xs text-gold transition hover:text-gold/80">
                      عرض ملف العميل
                    </Link>
                  ) : null}
                </div>
              </DetailCard>

              <DetailCard title="معلومات التوصيل">
                <p className="text-sm leading-relaxed text-text/80">
                  {order.shipping_address || "لا يوجد عنوان مسجل"}
                </p>
              </DetailCard>

              <DetailCard title="معلومات الدفع">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-muted">الطريقة</span>
                    <span>{order.payment_method || "غير محدد"}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted">الحالة</span>
                    <StatusBadge status={order.payment_status} />
                  </div>
                  <p className="text-xs text-muted">
                    {paymentStatusLabels[order.payment_status]}
                  </p>
                </div>
              </DetailCard>

              <DetailCard title="تحديث الحالة">
                <div className="space-y-2">
                  {statusFlow.map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={updatingStatus !== null || order.status === status || order.status === "canceled"}
                      onClick={() => updateStatus(status)}
                      className="w-full rounded-xl border border-gold/15 px-4 py-2 text-sm text-text transition hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      {updatingStatus === status ? "جار التحديث..." : orderStatusLabels[status]}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={updatingStatus !== null || order.status === "canceled" || order.status === "completed"}
                    onClick={() => updateStatus("canceled")}
                    className="w-full rounded-xl border border-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {updatingStatus === "canceled" ? "جار الإلغاء..." : "إلغاء الطلب"}
                  </button>
                </div>
              </DetailCard>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminOrderDetailsPage() {
  return (
    <ErrorBoundary>
      <AdminOrderDetailsContent />
    </ErrorBoundary>
  );
}
