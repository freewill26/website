"use client";

import { useEffect, useRef, useState } from "react";
import ImageSlot from "@/components/site/ImageSlot";
import {
  GALLERY_ITEMS,
  GALLERY_CATEGORIES,
  countFor,
  dotFor,
  type GalleryItem,
} from "@/lib/galleryContent";
import { PlayIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon, GalleryIcon } from "@/components/ui/icons";

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

  // Lightbox: lock scroll + keyboard navigation.
  const open = viewer >= 0 && viewer < items.length;
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const len = items.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewer(-1);
      else if (e.key === "ArrowRight") setViewer((v) => (v + 1) % len);
      else if (e.key === "ArrowLeft") setViewer((v) => (v - 1 + len) % len);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  const current: GalleryItem | undefined = open ? items[viewer] : undefined;

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
            <div className="[column-count:1] [column-gap:16px] sm:[column-count:2] lg:[column-count:3]">
              {SKELETON_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="mb-4 w-full rounded-2xl [break-inside:avoid]"
                  style={{
                    height: h,
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
            className="[column-count:1] [column-gap:16px] sm:[column-count:2] lg:[column-count:3]"
          >
            {items.map((g, i) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setViewer(i)}
                className="mb-4 block w-full overflow-hidden rounded-2xl border-0 p-0 text-left [break-inside:avoid]"
                style={{
                  background: "#DCD3BE",
                  boxShadow: "0 2px 12px rgba(24,26,32,0.08)",
                  animation: "fw-card-in 0.6s ease both",
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                <div className="relative w-full overflow-hidden" style={{ height: g.height }}>
                  <ImageSlot label={g.title} className="absolute inset-0 h-full w-full" />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(0deg,rgba(10,14,28,0.72) 0%,rgba(10,14,28,0.06) 46%,rgba(10,14,28,0) 70%)",
                    }}
                  />

                  <div
                    className="absolute left-3.5 top-3.5 inline-flex items-center gap-2 rounded-full px-3.5 py-[7px] backdrop-blur-sm"
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
                        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                        style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 10px 30px rgba(0,0,0,0.32)" }}
                      >
                        <PlayIcon size={22} />
                      </div>
                      <div
                        className="absolute right-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
                        style={{ background: "rgba(0,104,127,0.92)" }}
                      >
                        <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.1em] text-white">
                          <PlayIcon size={9} color="FFFFFF" /> {g.duration}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="absolute inset-x-4 bottom-3.5">
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

      {current && (
        <Lightbox
          item={current}
          index={viewer}
          total={items.length}
          onClose={() => setViewer(-1)}
          onPrev={() => setViewer((v) => (v - 1 + items.length) % items.length)}
          onNext={() => setViewer((v) => (v + 1) % items.length)}
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

function Lightbox({
  item,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col"
      style={{ background: "rgba(8,11,22,0.94)", backdropFilter: "blur(6px)", animation: "fade 0.3s ease both" }}
    >
      {/* top bar */}
      <div className="flex flex-none items-center justify-between px-[clamp(20px,4vw,44px)] py-[clamp(18px,2.4vw,28px)]">
        <div className="flex items-center gap-3.5">
          <span className="block h-2 w-2 rounded-full" style={{ background: dotFor(item.category) }} />
          <span className="font-mono text-[11px] tracking-[0.14em] text-white/[0.62]">
            {item.category}
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-white/[0.36]">
            {index + 1} / {total}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-[46px] w-[46px] items-center justify-center rounded-full transition-colors hover:bg-white/20"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <CloseIcon size={18} />
        </button>
      </div>

      {/* stage */}
      <div className="flex min-h-0 flex-1 items-center justify-center gap-[clamp(10px,2vw,28px)] px-[clamp(14px,3vw,40px)]">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous"
          className="flex h-[clamp(44px,5vw,58px)] w-[clamp(44px,5vw,58px)] flex-none items-center justify-center rounded-full transition-colors hover:bg-white/20"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <ChevronLeftIcon size={20} />
        </button>

        <div className="flex h-full min-w-0 flex-1 items-center justify-center">
          {item.type === "video" ? (
            <video
              key={item.id}
              src={item.videoSrc}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-[78vh] max-w-full rounded-[14px] bg-black"
              style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}
            />
          ) : (
            <div
              className="relative overflow-hidden rounded-[14px]"
              style={{
                width: "min(1100px,92vw)",
                height: "min(78vh,720px)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
              }}
            >
              <ImageSlot tone="light" label={item.title} className="absolute inset-0 h-full w-full" />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          className="flex h-[clamp(44px,5vw,58px)] w-[clamp(44px,5vw,58px)] flex-none items-center justify-center rounded-full transition-colors hover:bg-white/20"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>

      {/* caption */}
      <div className="flex-none px-[6vw] pb-[clamp(24px,3vw,40px)] pt-[clamp(16px,2.4vw,30px)] text-center">
        <div
          className="font-display uppercase leading-none text-white"
          style={{ fontSize: "clamp(20px,2.4vw,34px)" }}
        >
          {item.title}
        </div>
        <div className="mt-2 font-mono text-xs tracking-[0.08em] text-white/[0.56]">
          {item.location}
        </div>
      </div>
    </div>
  );
}
