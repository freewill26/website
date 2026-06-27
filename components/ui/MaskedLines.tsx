"use client";

import { createElement, useEffect, useRef, useState, type ElementType } from "react";

interface Line {
  text: string;
  /** Optional colour override for emphasis (e.g. the accent swatch). */
  color?: string;
}

interface MaskedLinesProps {
  lines: Line[];
  /** Heading element to render (defaults to h2). */
  as?: ElementType;
  className?: string;
}

/**
 * Headline reveal: each line sits in an overflow-hidden mask and slides up into
 * place when scrolled into view (the design's GSAP `data-line` effect). Empty
 * lines are skipped so single-line product names don't render a blank row.
 */
export default function MaskedLines({ lines, as, className = "" }: MaskedLinesProps) {
  const Tag = as ?? "h2";
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return createElement(
    Tag,
    { ref, className },
    lines
      .filter((line) => line.text.trim() !== "")
      .map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span
            className="block transition-transform duration-[1100ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
            style={{
              color: line.color,
              transform: visible ? "translateY(0)" : "translateY(115%)",
              transitionDelay: `${i * 100}ms`,
            }}
          >
            {line.text}
          </span>
        </span>
      )),
  );
}
