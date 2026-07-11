"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";
import { GALLERY } from "@/lib/homeContent";
import { ArrowRightIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

/** The photo tiles that are viewable in the lightbox (videos stay inline). */
const PHOTOS = GALLERY.filter((g) => !g.isVideo && g.img).map((g) => ({
  img: g.img as string,
  label: g.ph ?? "Freewill project",
}));

/** Full-bleed gallery grid mixing photo tiles and "live" motion tiles. */
export default function HomeGallery() {
  const [viewer, setViewer] = useState(-1);
  const open = viewer >= 0 && viewer < PHOTOS.length;

  // Map a grid tile back to its index within PHOTOS so clicks open the right slide.
  const photoIndexOf = (img?: string) =>
    img ? PHOTOS.findIndex((p) => p.img === img) : -1;

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
            The gallery.
          </h2>
        </div>
        <p className="m-0 max-w-[360px] text-[15px] leading-[1.8] text-[#181A20]/60">
          Courts, halls and arenas across India — captured the day they opened
          to play.
        </p>
      </FwReveal>

      <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
        {GALLERY.map((g, i) => {
          const pIdx = photoIndexOf(g.img);
          const clickable = !g.isVideo && pIdx >= 0;
          return (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden"
              style={{ background: "#DCD3BE" }}
            >
              {g.isVideo ? (
                <>
                  <video
                    src="/assets/lulu.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-white z-10"
                    style={{ background: "rgba(11,16,32,0.6)" }}
                  >
                    <span className="block h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#C3F53C" }} />
                    LIVE
                  </div>
                </>
              ) : g.img ? (
                <button
                  type="button"
                  onClick={() => clickable && setViewer(pIdx)}
                  aria-label={`View ${g.ph ?? "image"}`}
                  className="absolute inset-0 block h-full w-full cursor-pointer border-0 p-0"
                >
                  <Image
                    src={g.img}
                    alt={g.ph || "Gallery"}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="absolute inset-0 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover affordance so it reads as openable */}
                  <span className="pointer-events-none absolute inset-0 bg-[#0A0E1C]/0 transition-colors duration-300 group-hover:bg-[#0A0E1C]/25" />
                  <span className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="font-display text-[13px] uppercase tracking-[0.04em] text-white drop-shadow">
                      {g.ph}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                      <ArrowRightIcon size={15} color="0A0E1C" />
                    </span>
                  </span>
                </button>
              ) : (
                <ImageSlot label={g.ph} className="absolute inset-0 h-full w-full" />
              )}
            </div>
          );
        })}

        <Link
          href="/gallery"
          className="group relative flex aspect-square flex-col justify-between overflow-hidden bg-[#181A20] p-6 text-[#F6F4EC] no-underline transition-colors hover:bg-brand"
        >
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#F6F4EC]/60">
            96 PROJECTS
          </span>
          <div className="flex items-end justify-between gap-3">
            <span
              className="font-display uppercase leading-[0.98]"
              style={{ fontSize: "clamp(28px,2.4vw,40px)" }}
            >
              View
              <br />
              all
            </span>
            <span
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full transition-transform group-hover:translate-x-1"
              style={{ background: "rgba(255,255,255,0.16)" }}
            >
              <ArrowRightIcon size={18} />
            </span>
          </div>
        </Link>
      </div>

      {open && (
        <GalleryLightbox
          photos={PHOTOS}
          index={viewer}
          onClose={() => setViewer(-1)}
          onNav={(delta) =>
            setViewer((v) => (v + delta + PHOTOS.length) % PHOTOS.length)
          }
        />
      )}
    </section>
  );
}

interface GalleryLightboxProps {
  photos: { img: string; label: string }[];
  index: number;
  onClose: () => void;
  onNav: (delta: number) => void;
}

/** Full-screen photo viewer with keyboard + swipe navigation. */
function GalleryLightbox({ photos, index, onClose, onNav }: GalleryLightboxProps) {
  const touchX = useRef<number | null>(null);
  const current = photos[index];

  // Lock body scroll while open + keyboard navigation.
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNav(1);
      else if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNav]);

  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col"
      style={{ background: "rgba(8,11,22,0.94)", backdropFilter: "blur(6px)", animation: "fade 0.3s ease both" }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 44) onNav(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* Top bar */}
      <div className="flex flex-none items-center justify-between px-[clamp(20px,4vw,44px)] py-[clamp(18px,2.4vw,28px)]">
        <span className="font-mono text-[11px] tracking-[0.14em] text-white/[0.6]">
          {index + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-[46px] w-[46px] items-center justify-center rounded-full transition-colors hover:bg-white/20"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <CloseIcon size={18} />
        </button>
      </div>

      {/* Stage */}
      <div className="flex min-h-0 flex-1 items-center justify-center gap-[clamp(8px,2vw,28px)] px-[clamp(12px,3vw,40px)]">
        <button
          type="button"
          onClick={() => onNav(-1)}
          aria-label="Previous image"
          className="flex h-[clamp(44px,5vw,58px)] w-[clamp(44px,5vw,58px)] flex-none items-center justify-center rounded-full transition-colors hover:bg-white/20"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <ChevronLeftIcon size={20} />
        </button>

        <div
          className="relative overflow-hidden rounded-[14px]"
          style={{
            width: "min(1000px,84vw)",
            height: "min(76vh,720px)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
          }}
        >
          <Image
            key={current.img}
            src={current.img}
            alt={current.label}
            fill
            sizes="84vw"
            className="absolute inset-0 object-cover object-center"
            style={{ animation: "fade 0.35s ease both" }}
          />
        </div>

        <button
          type="button"
          onClick={() => onNav(1)}
          aria-label="Next image"
          className="flex h-[clamp(44px,5vw,58px)] w-[clamp(44px,5vw,58px)] flex-none items-center justify-center rounded-full transition-colors hover:bg-white/20"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>

      {/* Caption + slide dots */}
      <div className="flex-none px-[6vw] pb-[clamp(20px,3vw,36px)] pt-[clamp(12px,2vw,24px)] text-center">
        <div
          className="font-display uppercase leading-none text-white"
          style={{ fontSize: "clamp(18px,2.4vw,30px)" }}
        >
          {current.label}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {photos.map((p, i) => (
            <button
              key={p.img}
              type="button"
              onClick={() => onNav(i - index)}
              aria-label={`Go to image ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? "22px" : "8px",
                background: i === index ? "#5FD0E0" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
