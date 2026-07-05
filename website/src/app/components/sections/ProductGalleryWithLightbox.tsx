"use client";

import LightboxGallery from "./LightboxGallery";

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
