"use client";

import { FormEvent, useState } from "react";
import { Loader2, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { categoriesApi, CategoryPayload } from "@/services/categories";
import { Category } from "@/services/products";

const inputClass =
  "w-full rounded-xl border border-gold/10 bg-bg1 px-3 py-2 text-sm text-text outline-none transition focus:border-gold/40";

const labelClass = "mb-1 block text-xs font-medium text-muted";

function buildInitialCategory(category?: Category): CategoryPayload {
  return {
    name_ar: category?.name_ar ?? "",
    name_en: category?.name_en ?? "",
    slug: category?.slug ?? "",
    description_ar: category?.description_ar ?? "",
    description_en: category?.description_en ?? "",
    image: category?.image ?? "",
    sort_order: category?.sort_order ?? 0,
    is_active: category?.is_active ?? true,
  };
}

function normalizePayload(payload: CategoryPayload): CategoryPayload {
  return {
    ...payload,
    name_en: payload.name_en || null,
    description_ar: payload.description_ar || null,
    description_en: payload.description_en || null,
    image: payload.image || null,
  };
}

export default function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter();
  const [payload, setPayload] = useState<CategoryPayload>(() => buildInitialCategory(category));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const isEditing = Boolean(category);

  const updateField = <K extends keyof CategoryPayload>(key: K, value: CategoryPayload[K]) => {
    setPayload((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      if (payload.sort_order < 0) {
        setError("لا يمكن أن يكون ترتيب العرض أقل من صفر.");
        return;
      }

      const normalized = normalizePayload(payload);
      let nextPath = "/admin/categories";

      if (isEditing && category) {
        await categoriesApi.update(category.id, normalized);
        nextPath = `/admin/categories/${category.id}`;
      } else {
        const created = await categoriesApi.create(normalized);
        nextPath = `/admin/categories/${created.id}`;
      }

      setSuccess("تم حفظ التصنيف بنجاح.");
      window.setTimeout(() => {
        router.push(nextPath);
        router.refresh();
      }, 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر حفظ التصنيف");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!category || !confirm("هل تريد حذف هذا التصنيف نهائيا؟")) {
      return;
    }

    setDeleting(true);
    setError(null);
    setSuccess(null);

    try {
      await categoriesApi.delete(category.id);
      setSuccess("تم حذف التصنيف بنجاح.");
      window.setTimeout(() => {
        router.push("/admin/categories");
        router.refresh();
      }, 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر حذف التصنيف");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {success}
          </div>
        )}

        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <h2 className="mb-4 text-sm font-medium text-gold">بيانات التصنيف</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className={labelClass}>الاسم العربي</span>
              <input
                required
                value={payload.name_ar}
                onChange={(event) => updateField("name_ar", event.target.value)}
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>الاسم الإنجليزي</span>
              <input
                value={payload.name_en ?? ""}
                onChange={(event) => updateField("name_en", event.target.value)}
                className={inputClass}
                dir="ltr"
              />
            </label>

            <label>
              <span className={labelClass}>الرابط المختصر</span>
              <input
                required
                value={payload.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                className={inputClass}
                dir="ltr"
              />
            </label>

            <label>
              <span className={labelClass}>ترتيب العرض</span>
              <input
                min={0}
                type="number"
                value={payload.sort_order}
                onChange={(event) => updateField("sort_order", Number(event.target.value))}
                className={inputClass}
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <h2 className="mb-4 text-sm font-medium text-gold">الوصف</h2>
          <div className="grid gap-4">
            <label>
              <span className={labelClass}>الوصف العربي</span>
              <textarea
                rows={5}
                value={payload.description_ar ?? ""}
                onChange={(event) => updateField("description_ar", event.target.value)}
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>الوصف الإنجليزي</span>
              <textarea
                rows={4}
                value={payload.description_en ?? ""}
                onChange={(event) => updateField("description_en", event.target.value)}
                className={inputClass}
                dir="ltr"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <h2 className="mb-4 text-sm font-medium text-gold">الصورة والحالة</h2>
          <label>
            <span className={labelClass}>رابط الصورة</span>
            <input
              value={payload.image ?? ""}
              onChange={(event) => updateField("image", event.target.value)}
              className={inputClass}
              dir="ltr"
              placeholder="/categories/oud.jpg"
            />
          </label>

          <label className="mt-4 flex items-center justify-between rounded-xl border border-gold/10 bg-bg1 px-3 py-2">
            <span className="text-sm text-text">تصنيف نشط</span>
            <input
              type="checkbox"
              checked={payload.is_active}
              onChange={(event) => updateField("is_active", event.target.checked)}
              className="h-4 w-4 accent-gold"
            />
          </label>
        </div>

        <button
          disabled={saving || deleting}
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-medium text-black transition hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          حفظ التصنيف
        </button>

        {category && (
          <button
            disabled={deleting}
            type="button"
            onClick={handleDelete}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            حذف التصنيف
          </button>
        )}
      </div>
    </form>
  );
}
