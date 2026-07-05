"use client";

import LightboxGallery from "./LightboxGallery";
import type { ReactNode } from "react";

export default function ProductGalleryWithLightbox({
  images,
}: {
  images?: string[];
}) {
  return (
    <div className="space-y-4">
      <LightboxGallery images={images} />
    </div>
  );
}

