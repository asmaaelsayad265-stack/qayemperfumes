"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  images?: string[];
};

export default function LightboxGallery({
  images,
}: Props) {
  const srcs = useMemo(
    () =>
      images ??
      ["/file.svg", "/globe.svg", "/window.svg", "/next.svg"],
    [images]
  );

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setActive((v) => Math.min(v + 1, srcs.length - 1));
      if (e.key === "ArrowLeft") setActive((v) => Math.max(v - 1, 0));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, srcs.length]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[2rem] border border-gold/15 bg-[linear-gradient(180deg,rgba(17,17,17,0.94),rgba(11,11,11,0.96))] p-2 shadow-luxury">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block w-full"
          aria-label="فتح معرض الصور"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem]">
            <Image
              src={srcs[active]}
              alt=""
              width={1200}
              height={900}
              className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(5,5,5,0.82))]" />
          </div>
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {srcs.map((src, idx) => (
          <button
            key={src + idx}
            type="button"
            onClick={() => setActive(idx)}
            className={
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border transition " +
              (idx === active
                ? "border-gold-2 ring-1 ring-gold/30"
                : "border-gold/15 bg-bg1/30 hover:border-gold/40")
            }
            aria-label={`صورة ${idx + 1}`}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-modal flex items-center justify-center bg-black/75 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-5xl">
            <div className="flex items-center justify-between gap-3 rounded-[1.75rem] border border-gold/15 bg-bg1/55 px-4 py-3 backdrop-blur-2xl">
              <div className="text-xs font-semibold text-muted">
                {active + 1} / {srcs.length}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-2xl border border-gold/25 bg-bg0/30 px-4 py-2 text-xs font-semibold text-text transition hover:border-gold/50"
              >
                <X className="h-3.5 w-3.5" />
                إغلاق
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-[2rem] border border-gold/15 bg-bg0/30 shadow-luxury">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={srcs[active]}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActive((v) => Math.max(v - 1, 0))}
                className="inline-flex items-center gap-2 rounded-2xl border border-gold/25 bg-bg1/40 px-4 py-2 text-xs font-semibold text-text transition hover:border-gold/50 disabled:opacity-40"
                disabled={active === 0}
              >
                <ChevronRight className="h-3.5 w-3.5" />
                السابق
              </button>
              <button
                type="button"
                onClick={() => setActive((v) => Math.min(v + 1, srcs.length - 1))}
                className="inline-flex items-center gap-2 rounded-2xl border border-gold/25 bg-bg1/40 px-4 py-2 text-xs font-semibold text-text transition hover:border-gold/50 disabled:opacity-40"
                disabled={active === srcs.length - 1}
              >
                التالي
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

