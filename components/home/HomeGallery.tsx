"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FwReveal } from "@/components/site/FwReveal";
import type { GalleryImageVM } from "@/lib/api/home";
import { ArrowRightIcon } from "@/components/ui/icons";
import PhotoLightbox from "@/components/ui/PhotoLightbox";

interface HomeGalleryProps {
  images: GalleryImageVM[];
  heading: string;
  paragraph: string;
}

/**
 * Products gallery — a native photos-app style grid (3-up on mobile, 4-up
 * from `md`). Tapping a tile opens the shared native-feel {@link PhotoLightbox}.
 */
export default function HomeGallery({ images, heading, paragraph }: HomeGalleryProps) {
  const [viewer, setViewer] = useState(-1);
  const open = viewer >= 0 && viewer < images.length;

  // The "View all" tile absorbs whatever is left of the last grid row
  // (3 columns on mobile, 4 from md), so the grid always ends flush.
  const mobileSpan = 3 - (images.length % 3);
  const desktopSpan = 4 - (images.length % 4);

  return (
    <section id="fw-gallery" className="bg-cream pt-[clamp(64px,7vw,110px)]">
      <FwReveal className="flex flex-wrap items-end justify-between gap-5 px-[6vw] pb-[clamp(32px,4vw,52px)]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-0.5 w-7 bg-brand" />
            <span className="text-xs font-bold tracking-[0.28em] text-brand">
              FROM THE GROUND
            </span>
          </div>
          <h2
            className="m-0 font-display uppercase leading-none text-[#181A20]"
            style={{ fontSize: "clamp(36px,4.6vw,72px)" }}
          >
            {heading}
          </h2>
        </div>
        <p className="m-0 max-w-[360px] text-[15px] leading-[1.8] text-[#181A20]/60">
          {paragraph}
        </p>
      </FwReveal>

      {/* Native photos-app grid: 3-up on mobile, 4-up from md. */}
      <div className="grid grid-cols-3 gap-1 md:grid-cols-4">
        {images.map((g, i) => (
          <div
            key={g.id}
            className="group relative aspect-square overflow-hidden transition-transform duration-200 active:scale-[0.97] md:active:scale-100"
            style={{ background: "#DCD3BE" }}
          >
            <button
              type="button"
              onClick={() => setViewer(i)}
              aria-label={`View ${g.label}`}
              className="absolute inset-0 block h-full w-full cursor-pointer border-0 p-0"
            >
              <Image
                src={g.img}
                alt={g.label}
                fill
                sizes="(max-width: 768px) 33vw, 25vw"
                className="absolute inset-0 object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover affordance so it reads as openable */}
              <span className="pointer-events-none absolute inset-0 bg-[#0A0E1C]/0 transition-colors duration-300 group-hover:bg-[#0A0E1C]/25" />
              <span className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-display text-[13px] uppercase tracking-[0.04em] text-white drop-shadow">
                  {g.label}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                  <ArrowRightIcon size={15} color="0A0E1C" />
                </span>
              </span>
            </button>
          </div>
        ))}

        <Link
          href="/gallery"
          className={`group relative flex min-h-[140px] flex-col justify-between overflow-hidden bg-[#181A20] p-4 text-[#F6F4EC] no-underline transition-colors [grid-column:span_var(--ms)] hover:bg-brand active:scale-[0.97] sm:p-6 md:[grid-column:span_var(--ds)] md:active:scale-100 ${
            mobileSpan === 1 ? "aspect-square" : ""
          } ${desktopSpan === 1 ? "md:aspect-square" : "md:aspect-auto"}`}
          style={{ ["--ms" as string]: mobileSpan, ["--ds" as string]: desktopSpan }}
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#F6F4EC]/60 sm:text-[11px]">
            96 PROJECTS
          </span>
          <div className="flex items-end justify-between gap-3">
            <span
              className="font-display uppercase leading-[0.98]"
              style={{ fontSize: "clamp(20px,2.4vw,40px)" }}
            >
              View
              <br />
              all
            </span>
            <span
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full transition-transform group-hover:translate-x-1 sm:h-11 sm:w-11"
              style={{ background: "rgba(255,255,255,0.16)" }}
            >
              <ArrowRightIcon size={18} />
            </span>
          </div>
        </Link>
      </div>

      {open && (
        <PhotoLightbox
          slides={images.map((g) => ({ id: g.id, src: g.img, title: g.label }))}
          initialIndex={viewer}
          onClose={() => setViewer(-1)}
        />
      )}
    </section>
  );
}
