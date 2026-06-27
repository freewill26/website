"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxTileProps {
  children: ReactNode;
  className?: string;
}

/**
 * Rounded image tile whose (taller-than-container) child drifts vertically as
 * the tile scrolls through the viewport — the design's `data-px` parallax.
 * The child should be absolutely positioned and ~150% of the tile height.
 */
export default function ParallaxTile({ children, className = "" }: ParallaxTileProps) {
  const tileRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tile = tileRef.current;
    const inner = innerRef.current;
    if (!tile || !inner) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = tile.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -80 || rect.top > vh + 80) return;

      const range = inner.offsetHeight - tile.offsetHeight;
      if (range <= 0) return;

      const progress = Math.min(
        Math.max((vh - rect.top) / (vh + rect.height), 0),
        1,
      );
      inner.style.transform = `translate3d(0, ${progress * range}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={tileRef}
      className={`relative overflow-hidden rounded-2xl bg-ink-card ${className}`.trim()}
    >
      <div ref={innerRef} className="absolute inset-x-0 bottom-0 h-[150%]">
        {children}
      </div>
    </div>
  );
}
