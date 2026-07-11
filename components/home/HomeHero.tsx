"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * Home hero — a 320vh pinned section whose background video is *scrubbed* by
 * scroll position (the design's signature scroll-driven hero). The editorial
 * card fades out as you descend and two captions band in/out, while the video
 * playhead tracks scroll progress. `data-hero-line` / `data-hero-fade` still
 * stagger in once <HomeSplash> clears (see globals.css `.fw-intro`).
 */
export default function HomeHero() {
  const outerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cap1Ref = useRef<HTMLDivElement>(null);
  const cap2Ref = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const video = videoRef.current;
    if (!outer) return;

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    // Trapezoidal fade band: ramps up over `f`, holds, ramps down.
    const band = (p: number, a: number, b: number) => {
      const f = 0.07;
      if (p < a || p > b) return 0;
      if (p < a + f) return (p - a) / f;
      if (p > b - f) return (b - p) / f;
      return 1;
    };

    if (video) {
      video.muted = true;
      try {
        video.load();
      } catch {}
    }

    let raf = 0;
    let dead = false;
    let cur = 0; // lerped playhead

    const loop = () => {
      if (dead) return;
      const vh = window.innerHeight;
      const rect = outer.getBoundingClientRect();
      const total = rect.height - vh;
      const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;

      if (video && video.duration && isFinite(video.duration) && video.readyState >= 2) {
        const t = p * Math.max(0, video.duration - 0.06);
        cur += (t - cur) * 0.14;
        if (Math.abs(video.currentTime - cur) > 0.01) {
          try {
            video.currentTime = cur;
          } catch {}
        }
      }

      if (contentRef.current) {
        const o = 1 - Math.min(1, p / 0.16);
        contentRef.current.style.opacity = String(o);
        contentRef.current.style.visibility = o <= 0.01 ? "hidden" : "visible";
      }
      if (cap1Ref.current) {
        const c = band(p, 0.24, 0.55);
        cap1Ref.current.style.opacity = String(c);
        cap1Ref.current.style.transform = `translateY(${28 - 28 * c}px)`;
      }
      if (cap2Ref.current) {
        const c = band(p, 0.6, 0.94);
        cap2Ref.current.style.opacity = String(c);
        cap2Ref.current.style.transform = `translateY(${28 - 28 * c}px)`;
      }
      if (progRef.current) progRef.current.style.transform = `scaleX(${p})`;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={outerRef}
      id="fw-hero-outer"
      className="relative bg-cream"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          src="/assets/lulu.mp4"
          preload="auto"
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Fades to cream so the section blends into the page */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(241,234,216,0.96) 0%, rgba(241,234,216,0) 24%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(241,234,216,0.97) 0%, rgba(241,234,216,0.5) 13%, rgba(241,234,216,0) 44%)",
          }}
        />

        {/* Hero content — fades out as you scrub */}
        <div ref={contentRef} id="fw-hero-content" className="pointer-events-none absolute inset-0 z-20">
          <div
            data-hero-fade
            className="absolute left-[6vw] right-[6vw] top-[112px] max-w-[440px] rounded-[18px] border p-6 sm:left-auto sm:top-[120px] sm:p-7"
            style={{
              background: "rgba(250,246,236,0.82)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderColor: "rgba(24,26,32,0.08)",
              transitionDelay: "0.95s",
            }}
          >
            <p className="m-0 mb-6 text-base leading-[1.8] text-[#181A20]/[0.78]">
              World-class flooring, seating and equipment — behind every National
              Games since 1992. The ground India plays on.
            </p>
            <div className="pointer-events-auto flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-full bg-brand px-[26px] py-[15px] text-[13px] font-bold tracking-[0.1em] text-white no-underline transition-colors hover:bg-[#004E5F]"
              >
                EXPLORE PRODUCTS
              </Link>
              <Link
                href="/#fw-contact"
                className="rounded-full border px-[26px] py-[15px] text-[13px] font-bold tracking-[0.1em] text-[#181A20] no-underline transition-colors hover:bg-[#181A20]/5"
                style={{ borderColor: "rgba(24,26,32,0.32)" }}
              >
                TALK TO US
              </Link>
            </div>
          </div>

          <div className="absolute inset-x-[6vw] bottom-[5vh]">
            <div
              data-hero-fade
              className="flex flex-wrap justify-between gap-3 border-t py-3.5 text-[11px] font-bold tracking-[0.26em] text-[#181A20]/70"
              style={{ borderColor: "rgba(24,26,32,0.25)", transitionDelay: "0.8s" }}
            >
              <span>INFRA FOR SPORTS</span>
              <span>EST. 1990</span>
              <span>PUNE, INDIA</span>
            </div>
            <div className="overflow-hidden">
              <div
                data-hero-line
                className="font-display leading-[0.92] tracking-[0.01em] text-[#181A20]"
                style={{ fontSize: "clamp(72px,16.5vw,310px)", transitionDelay: "0.55s" }}
              >
                FREEWILL
              </div>
            </div>
          </div>
        </div>

        {/* Scroll-story captions */}
        <div
          ref={cap1Ref}
          className="absolute bottom-[24vh] left-[6vw] z-[15] max-w-[680px] opacity-0"
        >
          <div
            className="font-display uppercase leading-[1.02] text-[#181A20]"
            style={{ fontSize: "clamp(36px,4.6vw,76px)", textShadow: "0 2px 34px rgba(241,234,216,0.95)" }}
          >
            100,000+ seats <span className="text-brand">installed.</span>
          </div>
          <p
            className="m-0 mt-[18px] max-w-[420px] text-[15px] leading-[1.7] text-[#181A20]/[0.72]"
            style={{ textShadow: "0 2px 24px rgba(241,234,216,0.95)" }}
          >
            Every National Games since 1992 has been played on ground Freewill built.
          </p>
        </div>
        <div
          ref={cap2Ref}
          className="absolute bottom-[24vh] left-[6vw] z-[15] max-w-[680px] opacity-0"
        >
          <div
            className="font-display uppercase leading-[1.02] text-[#181A20]"
            style={{ fontSize: "clamp(36px,4.6vw,76px)", textShadow: "0 2px 34px rgba(241,234,216,0.95)" }}
          >
            From court <span className="text-brand">to podium.</span>
          </div>
          <p
            className="m-0 mt-[18px] max-w-[420px] text-[15px] leading-[1.7] text-[#181A20]/[0.72]"
            style={{ textShadow: "0 2px 24px rgba(241,234,216,0.95)" }}
          >
            Surfaces, seating and equipment certified by FIBA, FIVB and FIG.
          </p>
        </div>

        {/* Footer cues + scroll progress */}
        <div className="absolute bottom-9 left-[6vw] z-[25] text-[10px] font-bold tracking-[0.3em] text-[#181A20]/60">
          SCROLL ▾
        </div>
        <div
          className="absolute bottom-11 left-1/2 z-[25] h-0.5 w-[220px] max-w-[40vw] -translate-x-1/2"
          style={{ background: "rgba(24,26,32,0.2)" }}
        >
          <div
            ref={progRef}
            className="h-full bg-brand"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        </div>
        <div className="absolute bottom-9 right-[6vw] z-[25] text-[10px] font-bold tracking-[0.3em] text-[#181A20]/60">
          EST. 1990 — PUNE
        </div>
      </div>
    </section>
  );
}
