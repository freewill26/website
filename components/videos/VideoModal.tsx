"use client";

import { useCallback, useEffect, useRef } from "react";
import type { VideoItemVM } from "@/lib/api/videos";
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

interface VideoModalProps {
  /** The full loaded feed, so the viewer can step through it. */
  videos: VideoItemVM[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /**
   * Called when the viewer reaches the last loaded video while more exist, so
   * the feed can page in the next batch and navigation can keep going.
   */
  onReachEnd?: () => void;
  /** Whether the feed has more videos beyond the ones loaded. */
  hasMore?: boolean;
}

/**
 * Full-screen player popup with prev/next navigation across the feed.
 *
 * The grid cards deliberately render a still rather than an iframe — a page of
 * live embeds is heavy and every one would be its own player — so playback only
 * ever happens here, in a single iframe. It's keyed on the video id so stepping
 * to another video tears the old player down (stopping its audio) and mounts a
 * fresh, autoplaying one.
 *
 * Navigation doesn't wrap, matching {@link PhotoLightbox}.
 */
export default function VideoModal({
  videos,
  index,
  onIndexChange,
  onClose,
  onReachEnd,
  hasMore = false,
}: VideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const current = videos[index];
  const hasPrev = index > 0;
  // The next video may not be loaded yet; the feed pages it in on demand.
  const hasNext = index < videos.length - 1 || hasMore;

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= videos.length) return;
      onIndexChange(next);
    },
    [videos.length, onIndexChange],
  );

  // Pull the next batch in as soon as the viewer lands on the last loaded
  // video, so "next" is ready by the time it's pressed rather than dead-ending
  // at the first page.
  useEffect(() => {
    if (hasMore && index >= videos.length - 1) onReachEnd?.();
  }, [hasMore, index, videos.length, onReachEnd]);

  // Mount-only: lock body scroll and move focus onto the close button so
  // keyboard users don't land behind the iframe.
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Escape dismisses; arrows step through the feed. Rebinding as the index
  // moves is cheap and keeps the handler reading live bounds.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goTo(index + 1);
      else if (e.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, onClose]);

  // The feed can shrink out from under an open viewer (e.g. a filter change);
  // render nothing rather than crash on a stale index.
  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex flex-col"
      style={{
        background: "rgba(6,8,15,0.97)",
        backdropFilter: "blur(8px)",
        animation: "fade 0.25s ease both",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Top bar */}
      <div className="flex flex-none items-center justify-between px-[clamp(16px,4vw,44px)] py-[clamp(12px,2.4vw,28px)]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.14em] text-white/[0.4]">
            NOW PLAYING
          </span>
          {videos.length > 1 && (
            <span className="font-mono text-[11px] tracking-[0.14em] text-white/[0.4]">
              {index + 1} / {videos.length}
              {hasMore ? "+" : ""}
            </span>
          )}
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close player"
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/20 active:scale-95"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <CloseIcon size={18} />
        </button>
      </div>

      {/* Stage — clicks inside the player must not fall through to the backdrop. */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-[clamp(12px,4vw,44px)] [container-type:size]">
        <div
          onClick={(e) => e.stopPropagation()}
          className="aspect-video w-full max-w-[min(1180px,177.78cqh)] overflow-hidden rounded-lg bg-black sm:rounded-[14px]"
        >
          <iframe
            key={current.youtubeId}
            src={current.embedUrl}
            title={current.title}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Desktop arrows. Hidden on phones, where they'd sit on top of the
            full-bleed player and cover YouTube's own controls — the caption
            row below carries the same controls there instead. */}
        {[
          { d: -1, side: "left", label: "Previous video", icon: <ChevronLeftIcon size={20} />, enabled: hasPrev },
          { d: 1, side: "right", label: "Next video", icon: <ChevronRightIcon size={20} />, enabled: hasNext },
        ].map(({ d, side, label, icon, enabled }) => (
          <button
            key={side}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index + d);
            }}
            aria-label={label}
            disabled={!enabled}
            className="absolute top-1/2 hidden h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full transition-all hover:bg-white/20 disabled:opacity-30 md:flex"
            style={{
              [side]: "clamp(12px,2vw,28px)",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Caption */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[40dvh] flex-none overflow-y-auto px-[6vw] pb-[clamp(16px,3vw,36px)] pt-[clamp(12px,2vw,24px)] text-center"
      >
        <div
          className="font-display uppercase leading-none text-white"
          style={{ fontSize: "clamp(17px,2.4vw,30px)" }}
        >
          {current.title}
        </div>
        {current.description && (
          <p className="mx-auto mt-3 line-clamp-2 max-w-[620px] text-sm leading-[1.7] text-white/[0.56] [@media(max-height:480px)]:hidden">
            {current.description}
          </p>
        )}
        <a
          href={current.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-mono text-[11px] tracking-[0.14em] text-white/[0.56] underline-offset-4 transition-colors hover:text-white"
        >
          WATCH ON YOUTUBE
        </a>

        {/* Touch-friendly prev/next, standing in for the side arrows on phones. */}
        {videos.length > 1 && (
          <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
            {[
              { d: -1, label: "Previous video", icon: <ChevronLeftIcon size={18} />, enabled: hasPrev },
              { d: 1, label: "Next video", icon: <ChevronRightIcon size={18} />, enabled: hasNext },
            ].map(({ d, label, icon, enabled }) => (
              <button
                key={label}
                type="button"
                onClick={() => goTo(index + d)}
                aria-label={label}
                disabled={!enabled}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-95 disabled:opacity-30"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
