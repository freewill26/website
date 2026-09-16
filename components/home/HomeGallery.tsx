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
 * Products gallery — a masonry mosaic, 3 columns on mobile and 4 from `md`.
 * Every tile keeps its own photo's width-to-height ratio rather than being
 * cropped to a square. Tapping a tile opens the shared native-feel
 * {@link PhotoLightbox}.
 */
export default function HomeGallery({ images, heading, paragraph }: HomeGalleryProps) {
  const [viewer, setViewer] = useState(-1);
  const open = viewer >= 0 && viewer < images.length;

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

      {/* Masonry mosaic: 3 columns on mobile, 4 from md, each tile as tall as
          its own photo. */}
      <div className="columns-3 gap-1 [&>*]:mb-1 md:columns-4">
        {images.map((g, i) => (
          <div
            key={g.id}
            className="group relative break-inside-avoid overflow-hidden transition-transform duration-200 active:scale-[0.97] md:active:scale-100"
            style={{ background: "#DCD3BE" }}
          >
            <button
              type="button"
              onClick={() => setViewer(i)}
              aria-label={`View ${g.label}`}
              className="block w-full cursor-pointer border-0 p-0"
            >
              <Image
                src={g.img}
                alt={g.label}
                width={0}
                height={0}
                sizes="(max-width: 768px) 33vw, 25vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover affordance so it reads as openable */}
              <span className="pointer-events-none absolute inset-0 bg-[#0A0E1C]/0 transition-colors duration-300 group-hover:bg-[#0A0E1C]/25" />
              {/* Permanent scrim so the always-on name stays readable over
                  bright photography. */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/65 to-transparent" />
              <span className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between">
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
          className="group relative flex min-h-[180px] break-inside-avoid flex-col justify-between overflow-hidden bg-[#181A20] p-4 text-[#F6F4EC] no-underline transition-colors hover:bg-brand active:scale-[0.97] sm:p-6 md:active:scale-100"
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
