"use client";

import { FormEvent, useMemo, useState } from "react";
import { AlertTriangle, Loader2, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useInventory } from "@/hooks/useInventory";
import { useProducts } from "@/hooks/useProducts";
import { inventoryApi, InventoryItem, InventoryPayload } from "@/services/inventory";
import { DataTable, EmptyState, FilterBar, PageHeader, Td } from "../lib/admin-ui";

const inputClass =
  "w-full rounded-xl border border-gold/10 bg-bg1 px-3 py-2 text-sm text-text outline-none transition focus:border-gold/40";

const labelClass = "mb-1 block text-xs font-medium text-muted";

function buildInventoryPayload(item?: InventoryItem): InventoryPayload {
  return {
    product_id: item?.product_id ?? 0,
    sku: item?.sku ?? "",
    variant: item?.variant ?? "",
    quantity: item?.quantity ?? 0,
    reserved: item?.reserved ?? 0,
    low_stock_threshold: item?.low_stock_threshold ?? 5,
    location: item?.location ?? "",
    status: item?.status ?? "in_stock",
  };
}

function normalizeInventoryPayload(payload: InventoryPayload): InventoryPayload {
  return {
    ...payload,
    variant: payload.variant || null,
    location: payload.location || null,
    status:
      payload.quantity <= 0
        ? "out_of_stock"
        : payload.quantity <= payload.low_stock_threshold
          ? "low_stock"
          : payload.status,
  };
}

function InventorySkeleton() {
  return (
    <DataTable headers={["المنتج", "SKU", "المتغير", "الكمية", "محجوز", "متاح", "تنبيه", "إجراءات"]}>
      {[...Array(5)].map((_, index) => (
        <tr key={index}>
          {[...Array(8)].map((__, cell) => (
            <Td key={cell}>
              <div className="h-4 animate-pulse rounded bg-gold/10" />
            </Td>
          ))}
        </tr>
      ))}
    </DataTable>
  );
}

function AdminInventoryContent() {
  const { inventory, loading, error, refetch } = useInventory();
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [payload, setPayload] = useState<InventoryPayload>(() => buildInventoryPayload());
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const productNames = useMemo(() => {
    return new Map(products.map((product) => [product.id, product.name_ar]));
  }, [products]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return inventory.filter((item) => {
      const productName = productNames.get(item.product_id) ?? "";
      const available = item.quantity - item.reserved;
      const isLowStock = available <= item.low_stock_threshold;
      const matchesSearch =
        !term ||
        productName.toLowerCase().includes(term) ||
        item.sku.toLowerCase().includes(term) ||
        item.variant?.toLowerCase().includes(term) ||
        item.location?.toLowerCase().includes(term);

      return matchesSearch && (!filterLowStock || isLowStock);
    });
  }, [filterLowStock, inventory, productNames, search]);

  const totalUnits = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockCount = inventory.filter((item) => item.quantity - item.reserved <= item.low_stock_threshold).length;

  const updateField = <K extends keyof InventoryPayload>(key: K, value: InventoryPayload[K]) => {
    setPayload((current) => ({ ...current, [key]: value }));
  };

  const toNonNegativeNumber = (value: string): number => Math.max(0, Number(value) || 0);

  const startCreate = () => {
    setEditingItem(null);
    setPayload(buildInventoryPayload());
    setShowForm(true);
    setActionError(null);
    setSuccess(null);
  };

  const startEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setPayload(buildInventoryPayload(item));
    setShowForm(true);
    setActionError(null);
    setSuccess(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setActionError(null);
    setSuccess(null);

    try {
      if (payload.quantity < 0 || payload.reserved < 0 || payload.low_stock_threshold < 0) {
        setActionError("لا يمكن أن تكون كميات المخزون أقل من صفر.");
        return;
      }

      if (payload.reserved > payload.quantity) {
        setActionError("لا يمكن أن تكون الكمية المحجوزة أكبر من الكمية الإجمالية.");
        return;
      }

      const normalized = normalizeInventoryPayload(payload);

      if (editingItem) {
        await inventoryApi.update(editingItem.id, normalized);
      } else {
        await inventoryApi.create(normalized);
      }

      setShowForm(false);
      setEditingItem(null);
      setPayload(buildInventoryPayload());
      setSuccess("تم حفظ المخزون بنجاح.");
      await refetch();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "تعذر حفظ المخزون");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (itemId: number) => {
    if (!confirm("هل تريد حذف سجل المخزون نهائيا؟")) {
      return;
    }

    setDeletingId(itemId);
    setActionError(null);
    setSuccess(null);

    try {
      await inventoryApi.delete(itemId);
      setSuccess("تم حذف سجل المخزون بنجاح.");
      await refetch();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "تعذر حذف سجل المخزون");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="المخزون"
        description="إدارة الكميات، رموز SKU، وتنبيهات المخزون المنخفض"
        action={
          <button
            type="button"
            onClick={startCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-medium text-black transition hover:bg-gold/90"
          >
            <Plus className="h-4 w-4" />
            إضافة SKU
          </button>
        }
      />

      <FilterBar searchValue={search} onSearchChange={setSearch} placeholder="بحث في المخزون...">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={filterLowStock}
            onChange={(event) => setFilterLowStock(event.target.checked)}
            className="h-4 w-4 rounded border-gold/30 bg-bg1 text-gold accent-gold"
          />
          <span>مخزون منخفض فقط</span>
        </label>
      </FilterBar>

      {(error || actionError) && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          <span className="inline-flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {actionError || error}
          </span>
          <button type="button" onClick={refetch} className="inline-flex items-center gap-1 rounded-lg border border-red-300/20 px-3 py-1 text-xs">
            <RefreshCw className="h-3.5 w-3.5" />
            إعادة المحاولة
          </button>
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {success}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-2xl border border-gold/10 bg-surface/50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gold">{editingItem ? "تعديل SKU" : "إضافة SKU"}</h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-gold/10 p-2 text-muted transition hover:text-text"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <label>
              <span className={labelClass}>المنتج</span>
              <select
                required
                value={payload.product_id || ""}
                onChange={(event) => updateField("product_id", Number(event.target.value))}
                className={inputClass}
              >
                <option value="">اختر المنتج</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name_ar}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className={labelClass}>SKU</span>
              <input
                required
                value={payload.sku}
                onChange={(event) => updateField("sku", event.target.value)}
                className={inputClass}
                dir="ltr"
              />
            </label>

            <label>
              <span className={labelClass}>المتغير</span>
              <input
                value={payload.variant ?? ""}
                onChange={(event) => updateField("variant", event.target.value)}
                className={inputClass}
                placeholder="100ml"
              />
            </label>

            <label>
              <span className={labelClass}>الموقع</span>
              <input
                value={payload.location ?? ""}
                onChange={(event) => updateField("location", event.target.value)}
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>الكمية</span>
              <input
                required
                min={0}
                type="number"
                value={payload.quantity}
                onChange={(event) => updateField("quantity", toNonNegativeNumber(event.target.value))}
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>محجوز</span>
              <input
                required
                min={0}
                type="number"
                value={payload.reserved}
                onChange={(event) => updateField("reserved", toNonNegativeNumber(event.target.value))}
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>حد التنبيه</span>
              <input
                required
                min={0}
                type="number"
                value={payload.low_stock_threshold}
                onChange={(event) => updateField("low_stock_threshold", toNonNegativeNumber(event.target.value))}
                className={inputClass}
              />
            </label>

            <label>
              <span className={labelClass}>الحالة</span>
              <select
                value={payload.status}
                onChange={(event) => updateField("status", event.target.value as InventoryPayload["status"])}
                className={inputClass}
              >
                <option value="in_stock">متوفر</option>
                <option value="low_stock">منخفض</option>
                <option value="out_of_stock">غير متوفر</option>
              </select>
            </label>
          </div>

          <button
            disabled={saving || deletingId !== null}
            type="submit"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-medium text-black transition hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            حفظ المخزون
          </button>
        </form>
      )}

      {loading ? (
        <InventorySkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState title="لا توجد سجلات مخزون" description="غيّر البحث أو أضف أول SKU" />
      ) : (
        <DataTable headers={["المنتج", "SKU", "المتغير", "الكمية", "محجوز", "متاح", "تنبيه", "إجراءات"]}>
          {filtered.map((item) => {
            const productName = productNames.get(item.product_id) ?? "منتج غير معروف";
            const available = item.quantity - item.reserved;
            const lowStock = available <= item.low_stock_threshold;

            return (
              <tr key={item.id} className="hover:bg-gold/[0.02]">
                <Td className="font-medium">{productName}</Td>
                <Td className="text-muted">
                  <span dir="ltr">{item.sku}</span>
                </Td>
                <Td className="text-muted">{item.variant || "افتراضي"}</Td>
                <Td>{item.quantity}</Td>
                <Td className="text-amber-400">{item.reserved}</Td>
                <Td>
                  <span className={lowStock ? "font-medium text-red-400" : available <= item.low_stock_threshold * 2 ? "text-amber-400" : "text-emerald-400"}>
                    {available}
                  </span>
                </Td>
                <Td>
                  {lowStock ? (
                    <span className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs text-red-300">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      منخفض
                    </span>
                  ) : (
                    <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                      مستقر
                    </span>
                  )}
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="rounded-lg border border-gold/20 px-3 py-1 text-xs text-gold transition hover:bg-gold/10"
                    >
                      تعديل
                    </button>
                    <button
                      type="button"
                      disabled={deletingId === item.id}
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 px-3 py-1 text-xs text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      حذف
                    </button>
                  </div>
                </Td>
              </tr>
            );
          })}
        </DataTable>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-4">
          <p className="text-xs text-muted">إجمالي الأصناف</p>
          <p className="mt-1 text-xl font-bold">{inventory.length}</p>
        </div>
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-4">
          <p className="text-xs text-muted">إجمالي الوحدات</p>
          <p className="mt-1 text-xl font-bold">{totalUnits}</p>
        </div>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-xs text-muted">مخزون منخفض</p>
          <p className="mt-1 text-xl font-bold text-red-400">{lowStockCount}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminInventoryPage() {
  return (
    <ErrorBoundary>
      <AdminInventoryContent />
    </ErrorBoundary>
  );
}
