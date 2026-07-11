"use client";

import { useState } from "react";
import QuickViewModal from "./QuickViewModal";

export default function QuickViewButton({ productId }: { productId?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border border-gold/25 bg-bg1/30 px-4 py-2 text-xs font-semibold text-text transition hover:border-gold/50 hover:bg-bg1/40"
      >
        Quick View
      </button>

      <QuickViewModal open={open} onClose={() => setOpen(false)} productId={productId} />
    </>
  );
}
