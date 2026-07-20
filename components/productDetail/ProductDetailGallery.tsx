"use client";

import { useState } from "react";
import Image from "next/image";
import { FwReveal } from "@/components/site/FwReveal";
import PhotoLightbox from "@/components/ui/PhotoLightbox";

/**
 * Product image gallery. Tapping a tile opens the shared native-feel
 * {@link PhotoLightbox}, matching the Gallery page and home rail. Renders
 * nothing when there are no gallery images.
 */
export default function ProductDetailGallery({ images, alt }: { images: string[]; alt: string }) {
  const [viewer, setViewer] = useState(-1);

  if (images.length === 0) return null;

  return (
    <section className="box-border bg-cream px-[6vw]" style={{ paddingBlock: "clamp(56px,7vw,100px)" }}>
      <FwReveal className="mb-7 flex items-center gap-3">
        <span className="block h-0.5 w-7 bg-brand" />
        <span className="text-xs font-bold tracking-[0.28em] text-brand">GALLERY</span>
      </FwReveal>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {images.map((src, i) => (
          <FwReveal key={src} className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
            <button
              type="button"
              onClick={() => setViewer(i)}
              aria-label={`View ${alt} image ${i + 1}`}
              className="group absolute inset-0 h-full w-full cursor-zoom-in"
            >
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          </FwReveal>
        ))}
      </div>

      {viewer >= 0 && (
        <PhotoLightbox
          slides={images.map((src, i) => ({
            id: src,
            src,
            title: alt,
            subtitle: `${i + 1} of ${images.length}`,
          }))}
          initialIndex={viewer}
          onClose={() => setViewer(-1)}
        />
      )}
    </section>
  );
}
