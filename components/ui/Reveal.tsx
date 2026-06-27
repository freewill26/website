"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

interface RevealProps {
  children: ReactNode;
  /** Render as a different element (defaults to a div). */
  as?: ElementType;
  /** Extra delay before the element animates in (ms). */
  delay?: number;
  className?: string;
}

/**
 * Scroll-reveal wrapper. Applies the `reveal-fade` utility and toggles
 * `is-visible` once the element scrolls into view (replacing the design's GSAP
 * fade-in). Reveals once, then disconnects the observer.
 */
export default function Reveal({ children, as, delay = 0, className = "" }: RevealProps) {
  const Tag = as ?? "div";
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return createElement(
    Tag,
    {
      ref,
      className: `reveal-fade ${visible ? "is-visible" : ""} ${className}`.trim(),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children,
  );
}
