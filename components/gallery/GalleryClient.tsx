"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ImageSlot from "@/components/site/ImageSlot";
import {
  GALLERY_ITEMS,
  GALLERY_CATEGORIES,
  countFor,
  dotFor,
} from "@/lib/galleryContent";
import { PlayIcon, GalleryIcon } from "@/components/ui/icons";
import PhotoLightbox from "@/components/ui/PhotoLightbox";

const SKELETON_HEIGHTS = [320, 420, 300, 380, 340, 300, 410, 320, 360];

/**
 * Filterable masonry gallery with a skeleton-loading transition on filter
 * change and a full-screen lightbox (keyboard + arrow navigation). Ports the
 * design's Gallery screen interactions.
 */
export default function GalleryClient() {
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [viewer, setViewer] = useState(-1);
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items =
    filter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === filter);

  const changeFilter = (cat: string) => {
    if (cat === filter) return;
    setViewer(-1);
    setFilter(cat);
    setLoading(true);
    if (loadTimer.current) clearTimeout(loadTimer.current);
    loadTimer.current = setTimeout(() => setLoading(false), 360);
  };

  useEffect(() => () => {
    if (loadTimer.current) clearTimeout(loadTimer.current);
  }, []);

  const open = viewer >= 0 && viewer < items.length;

  return (
    <>
      {/* Filter chips */}
      <div
        className="sticky top-[104px] z-[120] box-border px-[6vw] py-[clamp(12px,1.6vw,18px)] backdrop-blur-md"
        style={{
          background: "rgba(241,234,216,0.85)",
          borderTop: "1px solid rgba(24,26,32,0.08)",
          borderBottom: "1px solid rgba(24,26,32,0.08)",
        }}
      >
        <div className="flex items-center gap-2.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GALLERY_CATEGORIES.map((cat) => {
            const on = cat === filter;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => changeFilter(cat)}
                className="flex-none whitespace-nowrap rounded-full px-5 py-[11px] text-[12.5px] font-bold uppercase tracking-[0.06em] transition-colors"
                style={{
                  border: `1px solid ${on ? "#00687F" : "rgba(24,26,32,0.2)"}`,
                  background: on ? "#00687F" : "transparent",
                  color: on ? "#FFFFFF" : "rgba(24,26,32,0.72)",
                }}
              >
                {cat}{" "}
                <span className="font-mono text-[10px] opacity-55">{countFor(cat)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid / states */}
      <section
        id="fw-gallery"
        className="box-border bg-cream px-[6vw] pb-[clamp(56px,7vw,96px)] pt-[clamp(28px,3.4vw,52px)]"
        style={{ minHeight: "60vh" }}
      >
        {loading ? (
          <>
            <div className="mb-6 flex items-center gap-3 text-[#181A20]/50">
              <span
                className="block h-[18px] w-[18px] rounded-full"
                style={{
                  border: "2px solid rgba(0,104,127,0.25)",
                  borderTopColor: "#00687F",
                  animation: "fw-spin-fast 0.8s linear infinite",
                }}
              />
              <span className="font-mono text-xs tracking-[0.1em]">
                LOADING {filter.toUpperCase()}…
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 sm:block sm:[column-count:2] sm:[column-gap:16px] lg:[column-count:3]">
              {SKELETON_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="aspect-square w-full rounded-lg [break-inside:avoid] sm:mb-4 sm:aspect-auto sm:h-[var(--h)] sm:rounded-2xl"
                  style={{
                    ["--h" as string]: `${h}px`,
                    background:
                      "linear-gradient(100deg, #E4DAC4 30%, #EFE7D4 50%, #E4DAC4 70%)",
                    backgroundSize: "720px 100%",
                    animation: "fw-skel 1.3s linear infinite",
                  }}
                />
              ))}
            </div>
          </>
        ) : items.length === 0 ? (
          <EmptyState onReset={() => changeFilter("All")} />
        ) : (
          <div
            key={filter}
            className="grid grid-cols-3 gap-1 sm:block sm:[column-count:2] sm:[column-gap:16px] lg:[column-count:3]"
          >
            {items.map((g, i) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setViewer(i)}
                className="block w-full overflow-hidden rounded-lg border-0 p-0 text-left transition-transform duration-200 [break-inside:avoid] active:scale-[0.97] sm:mb-4 sm:rounded-2xl"
                style={{
                  background: "#DCD3BE",
                  boxShadow: "0 2px 12px rgba(24,26,32,0.08)",
                  animation: "fw-card-in 0.6s ease both",
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                <div
                  className="relative aspect-square w-full overflow-hidden sm:aspect-auto sm:h-[var(--h)]"
                  style={{ ["--h" as string]: `${g.height}px` }}
                >
                  {g.image ? (
                    <Image
                      src={g.image}
                      alt={g.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="absolute inset-0 object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <ImageSlot label={g.title} className="absolute inset-0 h-full w-full" />
                  )}
                  <div
                    className="pointer-events-none absolute inset-0 hidden sm:block"
                    style={{
                      background:
                        "linear-gradient(0deg,rgba(10,14,28,0.72) 0%,rgba(10,14,28,0.06) 46%,rgba(10,14,28,0) 70%)",
                    }}
                  />

                  <div
                    className="absolute left-3.5 top-3.5 hidden items-center gap-2 rounded-full px-3.5 py-[7px] backdrop-blur-sm sm:inline-flex"
                    style={{ background: "rgba(10,14,28,0.42)" }}
                  >
                    <span className="block h-1.5 w-1.5 rounded-full" style={{ background: dotFor(g.category) }} />
                    <span className="font-mono text-[9.5px] tracking-[0.12em] text-white/90">
                      {g.category}
                    </span>
                  </div>

                  {g.type === "video" && (
                    <>
                      <div
                        className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-16 sm:w-16"
                        style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 10px 30px rgba(0,0,0,0.32)" }}
                      >
                        <PlayIcon size={22} />
                      </div>
                      <div
                        className="absolute right-3.5 top-3.5 hidden items-center gap-1.5 rounded-full px-3 py-1.5 sm:inline-flex"
                        style={{ background: "rgba(0,104,127,0.92)" }}
                      >
                        <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.1em] text-white">
                          <PlayIcon size={9} color="FFFFFF" /> {g.duration}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="absolute inset-x-4 bottom-3.5 hidden sm:block">
                    <div
                      className="font-display uppercase leading-[1.1] text-white"
                      style={{ fontSize: "clamp(15px,1.3vw,19px)" }}
                    >
                      {g.title}
                    </div>
                    <div className="mt-[5px] font-mono text-[10.5px] tracking-[0.06em] text-white/[0.72]">
                      {g.location}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {open && (
        <PhotoLightbox
          slides={items.map((g) => ({
            id: String(g.id),
            type: g.type,
            src: g.type === "video" ? g.videoSrc ?? null : g.image ?? null,
            title: g.title,
            subtitle: g.location,
            badge: g.category,
            badgeColor: dotFor(g.category),
          }))}
          initialIndex={viewer}
          onClose={() => setViewer(-1)}
        />
      )}
    </>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-[18px] py-[clamp(56px,8vw,120px)] text-center">
      <div
        className="flex h-[84px] w-[84px] items-center justify-center rounded-full"
        style={{ background: "rgba(0,104,127,0.08)", border: "1px solid rgba(0,104,127,0.2)" }}
      >
        <GalleryIcon size={34} />
      </div>
      <h3 className="m-0 font-display uppercase text-[#111820]" style={{ fontSize: "clamp(24px,3vw,40px)" }}>
        Nothing here yet.
      </h3>
      <p className="m-0 max-w-[380px] text-[15px] text-[#181A20]/60">
        We haven&apos;t published media for this category. Try another filter or
        get in touch for project references.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-1.5 rounded-full border-0 bg-brand px-[26px] py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#004E5F]"
      >
        View all media
      </button>
    </div>
  );
}
