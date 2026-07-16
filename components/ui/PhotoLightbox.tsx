"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import ImageSlot from "@/components/site/ImageSlot";
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

export interface LightboxSlide {
  id: string;
  type?: "image" | "video";
  /** Image URL or video source; `null` renders the branded placeholder. */
  src: string | null;
  title: string;
  subtitle?: string;
  /** Small label shown beside the counter (e.g. the item's category). */
  badge?: string;
  /** Dot colour for the badge, defaults to brand accent. */
  badgeColor?: string;
}

interface PhotoLightboxProps {
  slides: LightboxSlide[];
  initialIndex: number;
  onClose: () => void;
}

/**
 * Full-screen media viewer built to feel native on touch devices: slides live
 * in a scroll-snap track so swiping has real finger-tracking and momentum,
 * dragging down dismisses (with the backdrop fading as you pull), and the
 * chrome respects safe-area insets. Desktop keeps arrow buttons + keyboard
 * navigation. Slides don't wrap — like a platform photo viewer.
 */
export default function PhotoLightbox({ slides, initialIndex, onClose }: PhotoLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRaf = useRef(0);
  // Pull-down-to-close gesture state.
  const touch = useRef<{ x: number; y: number; dy: number; dismissing: boolean } | null>(null);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  }, [slides.length]);

  // Land on the tapped slide before first paint (instant, not animated).
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (track) track.scrollLeft = initialIndex * track.clientWidth;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The key/resize handlers read the live index without re-binding listeners.
  const indexRef = useRef(index);
  indexRef.current = index;

  // Body scroll lock + keyboard + keep alignment across viewport resizes.
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goTo(indexRef.current + 1);
      else if (e.key === "ArrowLeft") goTo(indexRef.current - 1);
    };
    const onResize = () => {
      const track = trackRef.current;
      if (track) track.scrollLeft = indexRef.current * track.clientWidth;
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(scrollRaf.current);
    };
  }, [goTo, onClose]);

  /** Derive the active slide from snap position (rAF-throttled). */
  const onScroll = () => {
    cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      const i = Math.round(track.scrollLeft / track.clientWidth);
      setIndex((prev) => (prev === i ? prev : Math.max(0, Math.min(slides.length - 1, i))));
    });
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, dy: 0, dismissing: false };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const t = touch.current;
    if (!t) return;
    const dx = e.touches[0].clientX - t.x;
    const dy = e.touches[0].clientY - t.y;
    // Commit to the dismiss gesture only when clearly vertical & downward.
    if (!t.dismissing && dy > 14 && Math.abs(dy) > Math.abs(dx) * 1.3) t.dismissing = true;
    if (!t.dismissing) return;
    t.dy = Math.max(0, dy);
    const panel = panelRef.current;
    if (panel) {
      panel.style.transition = "none";
      panel.style.transform = `translateY(${t.dy * 0.55}px)`;
      panel.style.opacity = String(Math.max(0.4, 1 - t.dy / 480));
    }
  };

  const onTouchEnd = () => {
    const t = touch.current;
    touch.current = null;
    const panel = panelRef.current;
    if (!t?.dismissing || !panel) return;
    if (t.dy > 110) {
      onClose();
      return;
    }
    // Spring back.
    panel.style.transition = "transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease";
    panel.style.transform = "";
    panel.style.opacity = "";
  };

  const current = slides[index] ?? slides[0];

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[1000] flex flex-col"
      style={{
        background: "rgba(6,8,15,0.97)",
        backdropFilter: "blur(8px)",
        animation: "fade 0.25s ease both",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="flex flex-none items-center justify-between px-[clamp(16px,4vw,44px)] py-[clamp(12px,2.4vw,28px)]">
        <div className="flex items-center gap-3">
          {current.badge && (
            <>
              <span
                className="block h-2 w-2 rounded-full"
                style={{ background: current.badgeColor ?? "#5FD0E0" }}
              />
              <span className="font-mono text-[11px] tracking-[0.14em] text-white/[0.62]">
                {current.badge}
              </span>
            </>
          )}
          <span className="font-mono text-[11px] tracking-[0.14em] text-white/[0.4]">
            {index + 1} / {slides.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors active:scale-95 hover:bg-white/20"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <CloseIcon size={18} />
        </button>
      </div>

      {/* Stage: scroll-snap track — swiping tracks the finger natively. */}
      <div className="relative min-h-0 flex-1">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [touch-action:pan-x] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="relative flex h-full w-full flex-none snap-center items-center justify-center px-[clamp(4px,1.5vw,24px)]"
            >
              {slide.type === "video" ? (
                <video
                  src={slide.src ?? undefined}
                  controls
                  playsInline
                  preload={Math.abs(i - index) <= 1 ? "metadata" : "none"}
                  className="max-h-full max-w-full rounded-lg bg-black sm:rounded-[14px]"
                />
              ) : slide.src ? (
                <div className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-[14px]">
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    sizes="100vw"
                    priority={Math.abs(i - initialIndex) <= 1}
                    className="object-contain object-center"
                  />
                </div>
              ) : (
                <ImageSlot
                  tone="light"
                  label={slide.title}
                  className="h-[60%] w-full rounded-lg sm:rounded-[14px]"
                />
              )}
            </div>
          ))}
        </div>

        {/* Desktop arrows (touch users swipe instead). */}
        {[
          { d: -1, side: "left", label: "Previous", icon: <ChevronLeftIcon size={20} /> },
          { d: 1, side: "right", label: "Next", icon: <ChevronRightIcon size={20} /> },
        ].map(({ d, side, label, icon }) => {
          const disabled = d === -1 ? index === 0 : index === slides.length - 1;
          return (
            <button
              key={side}
              type="button"
              onClick={() => goTo(index + d)}
              aria-label={label}
              disabled={disabled}
              className="absolute top-1/2 hidden h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full transition-all hover:bg-white/20 disabled:opacity-30 md:flex"
              style={{
                [side]: "clamp(12px,2vw,28px)",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {icon}
            </button>
          );
        })}
      </div>

      {/* Caption + position indicator */}
      <div className="flex-none px-[6vw] pb-[clamp(16px,3vw,36px)] pt-[clamp(12px,2vw,24px)] text-center">
        <div
          className="font-display uppercase leading-none text-white"
          style={{ fontSize: "clamp(17px,2.4vw,30px)" }}
        >
          {current.title}
        </div>
        {current.subtitle && (
          <div className="mt-2 font-mono text-xs tracking-[0.08em] text-white/[0.56]">
            {current.subtitle}
          </div>
        )}
        {slides.length > 1 && slides.length <= 12 ? (
          <div className="mt-4 flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to item ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? "22px" : "8px",
                  background: i === index ? "#5FD0E0" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        ) : slides.length > 12 ? (
          <div className="mx-auto mt-4 h-0.5 w-[160px] rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-[#5FD0E0] transition-transform duration-300"
              style={{
                transform: `scaleX(${(index + 1) / slides.length})`,
                transformOrigin: "left center",
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
