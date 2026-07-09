"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxMediaProps {
  children: ReactNode;
  className?: string;
  /** Height of the drifting layer relative to the frame (1.3 = 130%). */
  scale?: number;
}

/**
 * Vertical parallax drift for media that already sits inside an
 * overflow-hidden frame (ClipReveal, card tiles). Unlike ParallaxTile it
 * imposes no frame of its own — it just oversizes the child layer and
 * translates it as the frame scrolls through the viewport.
 * The child should be absolutely positioned to fill the layer.
 */
export default function ParallaxMedia({
  children,
  className = "",
  scale = 1.3,
}: ParallaxMediaProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -80 || rect.top > vh + 80) return;

      const range = inner.offsetHeight - frame.offsetHeight;
      if (range <= 0) return;

      const progress = Math.min(
        Math.max((vh - rect.top) / (vh + rect.height), 0),
        1,
      );
      inner.style.transform = `translate3d(0, ${progress * range}px, 0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className={`absolute inset-0 overflow-hidden ${className}`.trim()}
    >
      <div
        ref={innerRef}
        className="absolute inset-x-0 bottom-0 will-change-transform"
        style={{ height: `${scale * 100}%` }}
      >
        {children}
      </div>
    </div>
  );
}
