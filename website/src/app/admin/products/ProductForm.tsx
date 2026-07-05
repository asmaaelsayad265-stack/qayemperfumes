"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { ImagePlus, Loader2, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Category } from "@/services/categories";
import { Product, ProductPayload, productsApi } from "@/services/products";

const inputClass =
  "w-full rounded-xl border border-gold/10 bg-bg1 px-3 py-2 text-sm text-text outline-none transition focus:border-gold/40";

const labelClass = "mb-1 block text-xs font-medium text-muted";
const maxImageSizeBytes = 5 * 1024 * 1024;

function buildInitialProduct(product?: Product): ProductPayload {
  return {
    name_ar: product?.name_ar ?? "",
    name_en: product?.name_en ?? "",
    slug: product?.slug ?? "",
    description_ar: product?.description_ar ?? "",
    description_en: product?.description_en ?? "",
    price: Number(product?.price ?? 0),
    original_price: product?.original_price ? Number(product.original_price) : null,
    category_id: product?.category_id ?? 0,
    status: (product?.status as ProductPayload["status"]) ?? "draft",
    season: (product?.season as ProductPayload["season"]) ?? "all",
    gender: (product?.gender as ProductPayload["gender"]) ?? "unisex",
    is_featured: Boolean(product?.is_featured),
    is_best_seller: Boolean(product?.is_best_seller),
    is_limited_edition: Boolean(product?.is_limited_edition),
    image: product?.image ?? "",
  };
}

function normalizePayload(payload: ProductPayload): ProductPayload {
  return {
    ...payload,
    name_en: payload.name_en || null,
    description_ar: payload.description_ar || null,
    description_en: payload.description_en || null,
    original_price: payload.original_price || null,
    image: payload.image || null,
  };
}

export default function ProductForm({
  product,
  categories,
}: {
  product?: Product;
  categories: Category[];
}) {
  const router = useRouter();
  const [payload, setPayload] = useState<ProductPayload>(() => buildInitialProduct(product));
  const [preview, setPreview] = useState(product?.image ?? "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isEditing = Boolean(product);
  const activeCategories = useMemo(
    () => categories.filter((category) => category.is_active || category.id === product?.category_id),
    [categories, product?.category_id]
  );

  const updateField = <K extends keyof ProductPayload>(key: K, value: ProductPayload[K]) => {
    setPayload((current) => ({ ...current, [key]: value }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("يرجى اختيار ملف صورة صالح.");
      event.target.value = "";
      return;
    }

    if (file.size > maxImageSizeBytes) {
      setError("حجم الصورة كبير جدا. الحد الأقصى المسموح به هو 5 ميجابايت.");
      event.target.value = "";
      return;
    }

    const nextImage = `/uploads/products/${file.name}`;
    setError(null);
    setSuccess("تم تجهيز معاينة الصورة بنجاح.");
    updateField("image", nextImage);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      if (payload.price < 0 || (payload.original_price ?? 0) < 0) {
        setError("لا يمكن أن تكون الأسعار أقل من صفر.");
        return;
      }

      const normalized = normalizePayload(payload);
      let nextPath = "/admin/products";

      if (isEditing && product) {
        await productsApi.update(product.id, normalized);
        nextPath = `/admin/products/${product.id}`;
      } else {
        const created = await productsApi.create(normalized);
        nextPath = `/admin/products/${created.id}`;
      }

      setSuccess("تم حفظ المنتج بنجاح.");
      window.setTimeout(() => {
        router.push(nextPath);
        router.refresh();
      }, 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر حفظ المنتج");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!product || !confirm("هل تريد حذف هذا المنتج نهائيا؟")) {
      return;
    }

    setDeleting(true);
    setError(null);
    setSuccess(null);

    try {
      await productsApi.delete(product.id);
      setSuccess("تم حذف المنتج بنجاح.");
      window.setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر حذف المنتج");
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
          <h2 className="mb-4 text-sm font-medium text-gold">بيانات المنتج</h2>
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
              <span className={labelClass}>التصنيف</span>
              <select
                required
                value={payload.category_id || ""}
                onChange={(event) => updateField("category_id", Number(event.target.value))}
                className={inputClass}
              >
                <option value="">اختر التصنيف</option>
                {activeCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name_ar}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className={labelClass}>السعر</span>
              <input
                required
                min={0}
                type="number"
                value={payload.price}
                onChange={(event) => updateField("price", Number(event.target.value))}
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>السعر قبل الخصم</span>
              <input
                min={0}
                type="number"
                value={payload.original_price ?? ""}
                onChange={(event) =>
                  updateField("original_price", event.target.value ? Number(event.target.value) : null)
                }
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
          <h2 className="mb-4 text-sm font-medium text-gold">الصورة</h2>
          <div className="overflow-hidden rounded-2xl border border-gold/10 bg-bg1">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="h-44 w-full object-cover" />
            ) : (
              <div className="flex h-44 items-center justify-center text-muted">
                <ImagePlus className="h-8 w-8" />
              </div>
            )}
          </div>

          <label className="mt-3 block">
            <span className={labelClass}>رابط الصورة</span>
            <input
              value={payload.image ?? ""}
              onChange={(event) => {
                updateField("image", event.target.value);
                setPreview(event.target.value);
              }}
              className={inputClass}
              dir="ltr"
              placeholder="/perfumes/name.jpg"
            />
          </label>

          <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gold/20 bg-gold/5 px-4 py-2 text-sm text-gold transition hover:bg-gold/10">
            <ImagePlus className="h-4 w-4" />
            اختيار صورة
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <h2 className="mb-4 text-sm font-medium text-gold">النشر والمزايا</h2>
          <div className="space-y-3">
            <label>
              <span className={labelClass}>الحالة</span>
              <select
                value={payload.status}
                onChange={(event) => updateField("status", event.target.value as ProductPayload["status"])}
                className={inputClass}
              >
                <option value="active">نشط</option>
                <option value="draft">مسودة</option>
                <option value="archived">مؤرشف</option>
              </select>
            </label>

            <label>
              <span className={labelClass}>الموسم</span>
              <select
                value={payload.season}
                onChange={(event) => updateField("season", event.target.value as ProductPayload["season"])}
                className={inputClass}
              >
                <option value="all">كل المواسم</option>
                <option value="summer">صيفي</option>
                <option value="winter">شتوي</option>
                <option value="spring">ربيعي</option>
                <option value="autumn">خريفي</option>
              </select>
            </label>

            <label>
              <span className={labelClass}>الفئة</span>
              <select
                value={payload.gender}
                onChange={(event) => updateField("gender", event.target.value as ProductPayload["gender"])}
                className={inputClass}
              >
                <option value="unisex">للجميع</option>
                <option value="men">رجالي</option>
                <option value="women">نسائي</option>
              </select>
            </label>

            {[
              ["is_featured", "منتج مميز"],
              ["is_best_seller", "الأكثر مبيعا"],
              ["is_limited_edition", "إصدار محدود"],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center justify-between rounded-xl border border-gold/10 bg-bg1 px-3 py-2">
                <span className="text-sm text-text">{label}</span>
                <input
                  type="checkbox"
                  checked={Boolean(payload[key as keyof ProductPayload])}
                  onChange={(event) =>
                    updateField(key as keyof ProductPayload, event.target.checked as never)
                  }
                  className="h-4 w-4 accent-gold"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <button
            disabled={saving || deleting}
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-medium text-black transition hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            حفظ المنتج
          </button>

          {product && (
            <button
              disabled={deleting}
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              حذف المنتج
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
