"use client";

import { useEffect, useRef } from "react";
import type { ManifestoWordVM } from "@/lib/api/about";

/**
 * "Who we are" manifesto — words light up one by one as the tall section
 * scrolls past a pinned viewport (ports the design's scroll word-highlight).
 *
 * Words (with their CMS-authored colours) are rendered as React spans that
 * start dimmed to 0.12 opacity; their opacity is driven from scroll progress.
 */
export default function AboutManifesto({ words }: { words: ManifestoWordVM[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    let raf = 0;

    const update = () => {
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;
      const prog = clamp(-section.getBoundingClientRect().top / total, 0, 1);
      const n = wordRefs.current.length;
      for (let i = 0; i < n; i++) {
        const el = wordRefs.current[i];
        if (!el) continue;
        const wp = clamp(prog * (n + 3) - i, 0, 1);
        el.style.opacity = (0.12 + 0.88 * wp).toFixed(3);
      }
      raf = 0;
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
  }, [words]);

  return (
    <section
      id="fw-manifesto"
      ref={sectionRef}
      className="relative bg-cream"
      style={{ minHeight: "230vh" }}
    >
      <div className="sticky top-0 box-border flex h-screen flex-col justify-center px-[6vw]">
        <div className="mb-[38px] flex items-center gap-3">
          <span className="block h-0.5 w-[30px] bg-brand" />
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
            Who We Are
          </span>
        </div>
        <p
          className="m-0 max-w-[18ch] font-display uppercase leading-[1.12]"
          style={{ fontSize: "clamp(30px,5.4vw,82px)" }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className="mr-[0.26em] inline-block"
              style={{ color: w.color, opacity: 0.12 }}
            >
              {w.text}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
