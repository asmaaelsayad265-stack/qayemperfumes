"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/** Page header with title and optional action */
export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-text">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

/** KPI / Stats card */
export function StatsCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change?: string;
  icon?: ReactNode;
}) {
  const isPositive = change && change.startsWith("+");
  return (
    <div className="rounded-2xl border border-gold/15 bg-surface/70 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted">{title}</p>
          <p className="mt-1 text-2xl font-bold text-text">{value}</p>
          {change && (
            <p
              className={`mt-1 text-xs font-medium ${
                isPositive ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {change} عن الشهر السابق
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

/** Status badge */
export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    preparing: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    shipped: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    canceled: "bg-red-500/15 text-red-400 border-red-500/25",
    active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    draft: "bg-gray-500/15 text-gray-400 border-gray-500/25",
    archived: "bg-red-500/15 text-red-400 border-red-500/25",
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    failed: "bg-red-500/15 text-red-400 border-red-500/25",
    true: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    false: "bg-gray-500/15 text-gray-400 border-gray-500/25",
  };

  const labels: Record<string, string> = {
    new: "جديد",
    preparing: "قيد التحضير",
    shipped: "تم الشحن",
    completed: "مكتمل",
    canceled: "ملغي",
    active: "نشط",
    draft: "مسودة",
    archived: "مؤرشف",
    paid: "تم الدفع",
    pending: "قيد الانتظار",
    failed: "فشل",
  };

  return (
    <span
      className={`inline-block rounded-lg border px-2.5 py-0.5 text-[11px] font-medium ${colors[status] || "bg-gray-500/15 text-gray-400"}`}
    >
      {labels[status] || status}
    </span>
  );
}

/** Data table wrapper with luxury styling */
export function DataTable({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gold/10">
      <table className="w-full text-right text-sm">
        <thead>
          <tr className="border-b border-gold/10 bg-bg1">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium text-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gold/5">{children}</tbody>
      </table>
    </div>
  );
}

/** Clickable table row */
export function TableRow({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) {
  if (href) {
    return (
      <tr>
        <td colSpan={100} className="p-0">
          <Link
            href={href}
            className="flex w-full hover:bg-gold/[0.02] [&>div]:flex [&>div]:w-full [&>div]:contents"
          >
            <div className="contents">{children}</div>
          </Link>
        </td>
      </tr>
    );
  }
  return <tr className="hover:bg-gold/[0.02]">{children}</tr>;
}

/** Table cell */
export function Td({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}

/** Small section card for detail pages */
export function DetailCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
      <h3 className="mb-3 text-sm font-medium text-gold">{title}</h3>
      {children}
    </div>
  );
}

/** Filter bar with search input */
export function FilterBar({
  searchValue,
  onSearchChange,
  placeholder = "بحث...",
  children,
}: {
  searchValue: string;
  onSearchChange: (v: string) => void;
  placeholder?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative flex-1">
        <svg
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gold/10 bg-bg1 py-2 pr-10 pl-4 text-sm text-text outline-none transition focus:border-gold/40"
        />
      </div>
      {children}
    </div>
  );
}

/** Format number as currency */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString("ar-SA") + " ر.س";
}

/** Empty state */
export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gold/15 p-12 text-center">
      <p className="text-sm font-medium text-muted">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-muted/60">{description}</p>
      )}
    </div>
  );
}
