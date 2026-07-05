"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import CategoryForm from "../CategoryForm";
import { PageHeader } from "../../lib/admin-ui";

function CreateCategoryContent() {
  return (
    <div>
      <Link
        href="/admin/categories"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition hover:text-text"
      >
        <ArrowRight className="h-4 w-4" />
        العودة للتصنيفات
      </Link>

      <PageHeader title="إضافة تصنيف" description="إنشاء تصنيف جديد وربطه بمنتجات العطور" />
      <CategoryForm />
    </div>
  );
}

export default function CreateCategoryPage() {
  return (
    <ErrorBoundary>
      <CreateCategoryContent />
    </ErrorBoundary>
  );
}
