"use client";

import { useState, useMemo } from "react";
import {
  PageHeader,
  DataTable,
  Td,
  FilterBar,
} from "../lib/admin-ui";
import { mockInventory } from "../lib/mock-data";
import { AlertTriangle } from "lucide-react";

export default function AdminInventoryPage() {
  const [search, setSearch] = useState("");
  const [filterLowStock, setFilterLowStock] = useState(false);

  const filtered = useMemo(() => {
    let items = mockInventory;
    if (search) {
      items = items.filter(
        (i) =>
          i.productName.includes(search) ||
          i.variant.includes(search) ||
          i.id.includes(search) ||
          i.location.includes(search)
      );
    }
    if (filterLowStock) {
      items = items.filter((i) => i.available <= i.reorderPoint);
    }
    return items;
  }, [search, filterLowStock]);

  return (
    <div>
      <PageHeader
        title="المخزون"
        description="إدارة مخزون المنتجات والمتغيرات"
      />

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="بحث في المخزون..."
      >
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={filterLowStock}
            onChange={(e) => setFilterLowStock(e.target.checked)}
            className="h-4 w-4 rounded border-gold/30 bg-bg1 text-gold accent-gold"
          />
          <span>مخزون منخفض فقط</span>
        </label>
      </FilterBar>

      <DataTable
        headers={["المنتج", "المتغير", "الكمية", "محجوز", "متاح", "حد الطلب", "الموقع"]}
      >
        {filtered.map((item) => {
          const isLowStock = item.available <= item.reorderPoint;
          return (
            <tr key={item.id} className="hover:bg-gold/[0.02]">
              <Td className="font-medium">{item.productName}</Td>
              <Td className="text-muted">{item.variant}</Td>
              <Td>{item.quantityOnHand}</Td>
              <Td className="text-amber-400">{item.reserved}</Td>
              <Td>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      isLowStock
                        ? "text-red-400 font-medium"
                        : item.available <= item.reorderPoint * 2
                          ? "text-amber-400"
                          : "text-emerald-400"
                    }
                  >
                    {item.available}
                  </span>
                  {isLowStock && (
                    <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                  )}
                </div>
              </Td>
              <Td className="text-muted">{item.reorderPoint}</Td>
              <Td className="text-muted text-xs">{item.location}</Td>
            </tr>
          );
        })}
      </DataTable>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-4">
          <p className="text-xs text-muted">إجمالي الأصناف</p>
          <p className="mt-1 text-xl font-bold">{mockInventory.length}</p>
        </div>
        <div className="rounded-2xl border border-gold/10 bg-surface/50 p-4">
          <p className="text-xs text-muted">إجمالي الوحدات</p>
          <p className="mt-1 text-xl font-bold">
            {mockInventory.reduce((s, i) => s + i.quantityOnHand, 0)}
          </p>
        </div>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-xs text-muted">مخزون منخفض</p>
          <p className="mt-1 text-xl font-bold text-red-400">
            {mockInventory.filter((i) => i.available <= i.reorderPoint).length}
          </p>
        </div>
      </div>
    </div>
  );
}
