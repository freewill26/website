"use client";

import { useEffect, useRef, useState } from "react";
import { ABOUT_TIMELINE } from "@/lib/aboutContent";

/**
 * "Our Journey" — milestone timeline.
 *
 * On desktop the section is pinned and the year-panel track scrubs sideways as
 * the page scrolls vertically (the design's scroll-scrub effect). On touch /
 * small screens, or when the user prefers reduced motion, it gracefully falls
 * back to a native horizontal snap-scroll track.
 */
export default function AboutTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [distance, setDistance] = useState(0);
  const [progress, setProgress] = useState(0);

  // Decide whether the pinned scrub is appropriate, and measure the overscroll
  // distance (how far the track must travel to reveal its last panel).
  useEffect(() => {
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    const wideEnough = window.matchMedia("(min-width: 981px) and (pointer: fine)").matches;

    const measure = () => {
      const on = motionOk && wideEnough;
      setEnabled(on);
      const track = trackRef.current;
      setDistance(on && track ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Map vertical scroll progress through the tall section onto 0 → 1.
  useEffect(() => {
    if (!enabled || distance === 0) {
      setProgress(0);
      return;
    }
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const travel = section.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const p = -section.getBoundingClientRect().top / travel;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, distance]);

  const Header = (
    <div className="flex items-center gap-3 px-[6vw] pb-10">
      <span className="block h-0.5 w-[30px]" style={{ background: "#5FD0E0" }} />
      <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#9FE4EF]">
        Our Journey · 1990 → 2019
      </span>
    </div>
  );

  const Panels = ABOUT_TIMELINE.map((tl) => (
    <div
      key={tl.year}
      className={`box-border w-[min(540px,84vw)] flex-none px-[clamp(28px,4vw,70px)] ${
        enabled ? "" : "snap-start"
      }`}
    >
      <div
        className="mb-6 font-display leading-[0.8]"
        style={{ fontSize: "clamp(80px,9vw,150px)", color: "rgba(95,208,224,0.16)" }}
      >
        {tl.year}
      </div>
      <div className="mb-[18px] flex items-center gap-3">
        <span className="block h-0.5 w-6 bg-brand" />
        <span className="font-mono text-xs tracking-[0.2em]" style={{ color: "#5FD0E0" }}>
          {tl.year}
        </span>
      </div>
      <h3
        className="m-0 mb-[18px] font-display uppercase leading-none text-[#F6F4EC]"
        style={{ fontSize: "clamp(28px,3vw,48px)" }}
      >
        {tl.title}
      </h3>
      <p
        className="m-0 max-w-[440px] leading-[1.8] text-[#F6F4EC]/[0.66]"
        style={{ fontSize: "clamp(15px,1.3vw,17px)" }}
      >
        {tl.desc}
      </p>
    </div>
  ));

  // Fallback: native horizontal snap-scroll track.
  if (!enabled) {
    return (
      <section id="fw-timeline" className="box-border py-16 lg:py-24" style={{ background: "#0A0E1C" }}>
        {Header}
        <div className="flex snap-x snap-mandatory overflow-x-auto pb-4" style={{ scrollbarWidth: "thin" }}>
          {Panels}
        </div>
      </section>
    );
  }

  // Pinned scroll-scrub: tall section + sticky viewport translating the track.
  return (
    <section
      ref={sectionRef}
      id="fw-timeline"
      style={{ background: "#0A0E1C", height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {Header}
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{
            transform: `translate3d(${-progress * distance}px,0,0)`,
            transition: "transform 0.08s linear",
          }}
        >
          {Panels}
        </div>

        {/* Scrub progress indicator */}
        <div className="px-[6vw] pt-12">
          <div className="h-0.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(95,208,224,0.16)" }}>
            <div
              className="h-full rounded-full"
              style={{ background: "#5FD0E0", width: `${Math.max(8, progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
