"use client";

import { useState } from "react";
import Image from "next/image";
import { FwReveal } from "@/components/site/FwReveal";
import PhotoLightbox from "@/components/ui/PhotoLightbox";

/**
 * Product image gallery, laid out as a masonry mosaic — each tile as tall as
 * its own photo, never cropped. Tapping a tile opens the shared native-feel
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
      <div className="columns-1 gap-4 [&>*]:mb-4 sm:columns-2 lg:columns-3">
        {images.map((src, i) => (
          <FwReveal
            key={src}
            className="relative break-inside-avoid overflow-hidden rounded-[14px]"
          >
            <button
              type="button"
              onClick={() => setViewer(i)}
              aria-label={`View ${alt} image ${i + 1}`}
              className="group relative block w-full cursor-zoom-in"
            >
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                width={0}
                height={0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
              />
              {/* Name sits over the photo, always on. Every image here belongs
                  to the same record, so the counter carries which one it is. */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="pointer-events-none absolute inset-x-4 bottom-3.5 flex items-end justify-between gap-3 text-left">
                <span className="font-display text-[13px] uppercase tracking-[0.04em] text-white drop-shadow sm:text-[15px]">
                  {alt}
                </span>
                <span className="font-mono text-[11px] text-white/70">
                  {i + 1}/{images.length}
                </span>
              </span>
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
