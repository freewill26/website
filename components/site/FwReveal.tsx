"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

interface BaseProps {
  className?: string;
  style?: CSSProperties;
  /** Reveal threshold (0–1). */
  threshold?: number;
}

/** Shared one-shot intersection observer used by every reveal variant. */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

interface FwRevealProps extends BaseProps {
  children: ReactNode;
  as?: ElementType;
}

/** Fade-up on scroll (ports the design's `data-fade` / `data-reveal`). */
export function FwReveal({
  children,
  as = "div",
  className = "",
  style,
  threshold,
}: FwRevealProps) {
  const { ref, inView } = useInView(threshold);
  return createElement(
    as,
    {
      ref,
      className: `fw-reveal ${inView ? "fw-in" : ""} ${className}`.trim(),
      style,
    },
    children,
  );
}

interface MaskedHeadingProps extends BaseProps {
  /** Each line wipes up from its own clipping mask. */
  lines: ReactNode[];
  as?: ElementType;
}

/** Stacked Anton heading where each line wipes up (ports `data-line`). */
export function MaskedHeading({
  lines,
  as = "h2",
  className = "",
  style,
  threshold,
}: MaskedHeadingProps) {
  const { ref, inView } = useInView(threshold);
  return createElement(
    as,
    { ref, className, style },
    lines.map((line, i) => (
      <span key={i} className={`fw-line-mask ${inView ? "fw-in" : ""}`}>
        <span>{line}</span>
      </span>
    )),
  );
}

interface ClipRevealProps extends BaseProps {
  children: ReactNode;
}

/** Image frame that clip-wipes into view (ports `data-clip`). */
export function ClipReveal({
  children,
  className = "",
  style,
  threshold,
}: ClipRevealProps) {
  const { ref, inView } = useInView(threshold);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`fw-clip ${inView ? "fw-in" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
