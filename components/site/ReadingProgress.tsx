"use client";

import { useEffect, useState } from "react";

/**
 * Thin scroll-progress bar fixed to the very top of the viewport, the way most
 * editorial / news sites indicate how far through an article the reader is.
 * Tracks document scroll against total scrollable height.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[300] h-[3px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg,#1FA95B,#C3F53C)",
        }}
      />
    </div>
  );
}
