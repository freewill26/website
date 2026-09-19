"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import PhotoLightbox from "@/components/ui/PhotoLightbox";
import { GalleryIcon } from "@/components/ui/icons";
import type { ProjectPhotoVM } from "@/lib/api/projects";

const ANIM_BATCH = 12;

/**
 * A project's photo set as a masonry mosaic, filterable by the work each photo
 * shows. The columns are fixed but every tile keeps its own photo's ratio, so
 * nothing is cropped — the same treatment as the site-wide `/gallery` feed.
 *
 * Filtering is client-side over the photos the server already sent, and an
 * untagged photo is kept under "All" rather than dropped: it's still a picture
 * of the site, it just hasn't been labelled yet.
 */
export default function ProjectGallery({
  photos,
  works,
}: {
  photos: ProjectPhotoVM[];
  works: { id: string; title: string }[];
}) {
  const [work, setWork] = useState<string>("ALL");
  const [viewer, setViewer] = useState(-1);

  const shown = useMemo(
    () =>
      work === "ALL"
        ? photos
        : photos.filter((p) => p.works.some((w) => w.id === work)),
    [photos, work],
  );

  const countFor = (id: string) =>
    photos.filter((p) => p.works.some((w) => w.id === id)).length;

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-[clamp(48px,7vw,96px)] text-center">
        <GalleryIcon size={30} />
        <p className="m-0 text-[15px] text-[#181A20]/55">
          Photographs from this project are being prepared.
        </p>
      </div>
    );
  }

  return (
    <>
      {works.length > 0 && (
        <div
          role="tablist"
          aria-label="Filter photos by work"
          className="mb-[clamp(20px,2.4vw,32px)] flex snap-x gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-wrap lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          <Chip
            label="All photos"
            count={photos.length}
            selected={work === "ALL"}
            onSelect={() => { setWork("ALL"); setViewer(-1); }}
          />
          {works.map((w) => (
            <Chip
              key={w.id}
              label={w.title}
              count={countFor(w.id)}
              selected={work === w.id}
              onSelect={() => { setWork(w.id); setViewer(-1); }}
            />
          ))}
        </div>
      )}

      <div
        key={work}
        className="columns-2 gap-2 [&>*]:mb-2 sm:columns-3 sm:gap-3 sm:[&>*]:mb-3 md:columns-4"
      >
        {shown.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setViewer(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-lg border-0 p-0 text-left transition-transform duration-200 active:scale-[0.97] sm:rounded-2xl md:active:scale-100"
            style={{
              background: "#DCD3BE",
              boxShadow: "0 2px 12px rgba(24,26,32,0.08)",
              animation: "fw-card-in 0.5s ease both",
              animationDelay: `${(i % ANIM_BATCH) * 0.04}s`,
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              // The API hands the site bare image URLs with no stored
              // dimensions, so the intrinsic size is left to the browser:
              // 0/0 plus `h-auto` renders each photo at its true ratio.
              width={0}
              height={0}
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 bg-[#0A0E1C]/0 transition-colors duration-300 group-hover:bg-[#0A0E1C]/25" />
            {photo.works.length > 0 && (
              <>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap gap-1">
                  {photo.works.map((w) => (
                    <span
                      key={w.id}
                      className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-white backdrop-blur-sm"
                    >
                      {w.title}
                    </span>
                  ))}
                </span>
              </>
            )}
          </button>
        ))}
      </div>

      {viewer >= 0 && viewer < shown.length && (
        <PhotoLightbox
          slides={shown.map((p) => ({
            id: p.id,
            src: p.src,
            title: p.alt,
            // The work tags are the caption that matters here — a visitor
            // paging through full-screen shots should still see what each one
            // is showing them.
            badge: p.works.map((w) => w.title).join(" · ") || undefined,
          }))}
          initialIndex={viewer}
          onClose={() => setViewer(-1)}
        />
      )}
    </>
  );
}

function Chip({
  label,
  count,
  selected,
  onSelect,
}: {
  label: string;
  count: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      className={`flex flex-none snap-start items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-[11px] font-bold tracking-[0.14em] transition-colors ${
        selected
          ? "border-brand bg-brand text-cream"
          : "border-[rgba(24,26,32,0.18)] bg-transparent text-[#181A20]/70 hover:border-brand hover:text-brand"
      }`}
    >
      {label.toUpperCase()}
      <span className={selected ? "text-cream/60" : "text-[#181A20]/35"}>{count}</span>
    </button>
  );
}
