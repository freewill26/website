"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  /** Final value to count up to. */
  target: number;
  /** Duration of the count animation (ms). */
  duration?: number;
  /** Format with Indian-locale grouping (matches the design's toLocaleString). */
  locale?: boolean;
}

/**
 * Counts from 0 to `target` once the element scrolls into view — the React
 * port of the design's GSAP/rAF counters.
 */
export default function Counter({
  target,
  duration = 1800,
  locale = false,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }

    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      // power2.out easing
      const eased = 1 - Math.pow(1 - t, 2);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          raf = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return (
    <span ref={ref}>{locale ? value.toLocaleString("en-IN") : value}</span>
  );
}
