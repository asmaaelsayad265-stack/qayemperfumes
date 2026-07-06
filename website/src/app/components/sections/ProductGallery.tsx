"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function ProductGallery() {
  const images = useMemo(
    () => ["/file.svg", "/globe.svg", "/window.svg", "/next.svg"],
    []
  );

  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[2rem] border border-gold/15 bg-[linear-gradient(180deg,rgba(17,17,17,0.92),rgba(11,11,11,0.96))] p-2 shadow-luxury">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem]">
          <Image
            src={images[active]}
            alt=""
            width={1200}
            height={900}
            className="h-full w-full object-cover opacity-95 transition duration-700 hover:scale-[1.02] hover:opacity-100"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(5,5,5,0.82))]" />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(idx)}
            className={
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border transition " +
              (idx === active
                ? "border-gold-2 ring-1 ring-gold/30"
                : "border-gold/15 bg-bg1/30 hover:border-gold/40")
            }
          >
            <Image src={src} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

