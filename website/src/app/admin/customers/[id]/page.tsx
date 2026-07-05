"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertTriangle, ArrowRight, RefreshCw, Star } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCustomer } from "@/hooks/useCustomers";
import { useOrders } from "@/hooks/useOrders";
import {
  DataTable,
  DetailCard,
  EmptyState,
  PageHeader,
  StatusBadge,
  Td,
  formatCurrency,
} from "../../lib/admin-ui";

function formatDate(value?: string | null): string {
  if (!value) {
    return "لا يوجد";
  }

  return new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium" }).format(new Date(value));
}

function ProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-4">
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <div className="mb-4 h-12 w-12 animate-pulse rounded-full bg-gold/10" />
          <div className="space-y-2">
            <div className="h-4 animate-pulse rounded bg-gold/10" />
            <div className="h-4 animate-pulse rounded bg-gold/10" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <div className="mb-4 h-4 w-32 animate-pulse rounded bg-gold/10" />
          <div className="space-y-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-10 animate-pulse rounded-xl bg-gold/10" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminCustomerProfileContent() {
  const params = useParams<{ id: string }>();
  const customerId = Number(params.id);
  const validCustomerId = Number.isFinite(customerId) ? customerId : null;
  const { customer, loading: customerLoading, error: customerError, refetch: refetchCustomer } = useCustomer(validCustomerId);
  const { orders, loading: ordersLoading, error: ordersError, refetch: refetchOrders } = useOrders({ customerId: validCustomerId });

  const loading = customerLoading || ordersLoading;
  const error = customerError || ordersError;

  const handleRetry = async () => {
    await Promise.all([refetchCustomer(), refetchOrders()]);
  };

  return (
    <div>
      <Link
        href="/admin/customers"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
      >
        <ArrowRight className="h-4 w-4" />
        العودة للعملاء
      </Link>

      {loading ? (
        <ProfileSkeleton />
      ) : error ? (
        <div>
          <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            <span className="inline-flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </span>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-1 rounded-lg border border-red-300/20 px-3 py-1 text-xs transition hover:bg-red-500/10"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              إعادة المحاولة
            </button>
          </div>
          <EmptyState title="تعذر عرض العميل" description="تحقق من رقم العميل أو أعد المحاولة" />
        </div>
      ) : !customer ? (
        <EmptyState title="العميل غير موجود" description="لم يتم العثور على العميل المطلوب" />
      ) : (
        <>
          <PageHeader title={customer.name} description={`ملف العميل رقم ${customer.id}`} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <DetailCard title="بيانات العميل">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-lg font-bold text-gold">
                      {customer.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      {customer.is_vip ? (
                        <span className="inline-flex items-center gap-1 rounded-lg border border-gold/20 bg-gold/10 px-2 py-0.5 text-[10px] text-gold">
                          <Star className="h-3 w-3 fill-gold" />
                          VIP
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="border-t border-gold/10 pt-3">
                    <p className="text-muted">البريد الإلكتروني</p>
                    <p dir="ltr">{customer.email || "غير مسجل"}</p>
                  </div>
                  <div>
                    <p className="text-muted">الجوال</p>
                    <p dir="ltr">{customer.phone || "غير مسجل"}</p>
                  </div>
                  <div>
                    <p className="text-muted">آخر طلب</p>
                    <p>{formatDate(customer.last_order_at)}</p>
                  </div>
                </div>
              </DetailCard>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-gold/10 bg-surface/50 p-4">
                  <p className="text-xs text-muted">الطلبات</p>
                  <p className="mt-1 text-xl font-bold text-text">{customer.orders_count}</p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-surface/50 p-4">
                  <p className="text-xs text-muted">المشتريات</p>
                  <p className="mt-1 text-lg font-bold text-gold">{formatCurrency(Number(customer.total_spent))}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <DetailCard title="سجل الطلبات">
                {orders.length === 0 ? (
                  <EmptyState title="لا توجد طلبات لهذا العميل" />
                ) : (
                  <DataTable headers={["رقم الطلب", "المبلغ", "الحالة", "التاريخ"]}>
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gold/[0.02]">
                        <Td>
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="font-medium text-text transition hover:text-gold"
                          >
                            {order.order_number}
                          </Link>
                        </Td>
                        <Td className="font-medium">{formatCurrency(Number(order.total))}</Td>
                        <Td>
                          <StatusBadge status={order.status} />
                        </Td>
                        <Td className="text-muted">{formatDate(order.created_at)}</Td>
                      </tr>
                    ))}
                  </DataTable>
                )}
              </DetailCard>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminCustomerProfilePage() {
  return (
    <ErrorBoundary>
      <AdminCustomerProfileContent />
    </ErrorBoundary>
  );
}
