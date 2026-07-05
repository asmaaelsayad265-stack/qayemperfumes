"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  Warehouse,
  BarChart3,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/categories", label: "التصنيفات", icon: Tags },
  { href: "/admin/orders", label: "الطلبات", icon: ShoppingCart },
  { href: "/admin/customers", label: "العملاء", icon: Users },
  { href: "/admin/inventory", label: "المخزون", icon: Warehouse },
  { href: "/admin/analytics", label: "الإحصائيات", icon: BarChart3 },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg0 text-text" dir="rtl">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-40 h-full w-64 transform border-l border-gold/10 bg-bg1 transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-center border-b border-gold/10">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="gold-shimmer text-lg font-bold tracking-wider">
              قَيَّم
            </span>
            <span className="text-xs text-muted">| إدارة</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-gold/15 text-gold shadow-[inset_0_0_0_1px_rgba(200,162,74,0.2)]"
                        : "text-muted hover:bg-gold/5 hover:text-text"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gold/10 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-surface/50 px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold">
              أ
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium">المدير</span>
              <span className="text-[10px] text-muted">admin@qayyam.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b border-gold/10 bg-bg1 px-4 lg:px-6">
          <button
            className="flex items-center gap-2 text-sm text-muted hover:text-text lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span className="text-xs">القائمة</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-xs text-muted">
              {new Date().toLocaleDateString("ar-SA", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <div className="h-6 w-px bg-gold/10" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                أ
              </div>
              <span className="hidden text-xs font-medium sm:inline">
                المدير
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
