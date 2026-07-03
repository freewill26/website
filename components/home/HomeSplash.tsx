"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Intro splash loader — counts 0 → 100% then wipes up to reveal the page,
 * triggering the hero's staggered entrance (via the `fw-loaded` html class).
 * Ports the design's GSAP splash + `reveal()` timeline.
 */
export default function HomeSplash() {
  const [pct, setPct] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const [done, setDone] = useState(false);
  const splashRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    html.classList.add("fw-intro");

    const reveal = () => {
      html.classList.add("fw-loaded");
      html.style.overflow = "";
      setRevealing(true);
      window.setTimeout(() => setDone(true), 1100);
    };

    if (reduce) {
      setPct(100);
      reveal();
      return () => {
        html.classList.remove("fw-intro", "fw-loaded");
        html.style.overflow = "";
      };
    }

    html.style.overflow = "hidden";

    let raf = 0;
    let start = 0;
    const HOLD = 2100; // ramp to 90%
    const FINISH = 450; // 90% → 100%

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      if (elapsed < HOLD) {
        // easeInOut to 90
        const t = elapsed / HOLD;
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        setPct(Math.min(90, eased * 90));
        raf = requestAnimationFrame(tick);
      } else if (elapsed < HOLD + FINISH) {
        const t = (elapsed - HOLD) / FINISH;
        setPct(90 + (1 - Math.pow(1 - t, 2)) * 10);
        raf = requestAnimationFrame(tick);
      } else {
        setPct(100);
        reveal();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("fw-intro", "fw-loaded");
      html.style.overflow = "";
    };
  }, []);

  if (done) return null;

  const wipe = {
    transform: revealing ? "translateY(-100%)" : "translateY(0)",
    transition: "transform 0.9s cubic-bezier(0.76,0,0.24,1)",
  } as const;

  return (
    <>
      <div
        ref={accentRef}
        className="fixed inset-0 z-[1001] bg-brand"
        style={{ ...wipe, transitionDelay: revealing ? "0.14s" : "0s" }}
      />
      <div
        ref={splashRef}
        className="fixed inset-0 z-[1002] box-border flex flex-col justify-between overflow-hidden bg-[#0d1017]"
        style={{ padding: "clamp(24px,4vw,56px)", ...wipe }}
      >
        {/* Stadium backdrop + darkening overlay for legibility */}
        <Image
          src="/assets/splash-stadium.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,16,23,0.72) 0%, rgba(13,16,23,0.5) 45%, rgba(13,16,23,0.82) 100%)",
          }}
        />

        <div
          className="flex flex-1 flex-col justify-between"
          style={{
            opacity: revealing ? 0 : 1,
            transition: "opacity 0.35s ease",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <Image src="/assets/logo-freewill-white.svg" alt="Freewill" width={600} height={125} className="h-8 w-auto" />
              <div className="mt-1 text-[10px] font-bold tracking-[0.34em] text-white/80">
                INFRA FOR SPORTS
              </div>
            </div>
            <div className="text-[11px] font-semibold tracking-[0.22em] text-white/55">
              PUNE · INDIA · EST. 1990
            </div>
          </div>

          <div className="flex items-end justify-between gap-8">
            <div className="pb-6 text-xs font-semibold tracking-[0.22em] text-white/60">
              LOADING THE GROUND INDIA PLAYS ON
            </div>
            <div
              className="flex items-baseline font-display leading-[0.82] text-white"
              style={{ fontSize: "clamp(110px,21vw,260px)" }}
            >
              <span>{String(Math.floor(pct)).padStart(2, "0")}</span>
              <span className="ml-2 text-brand-accent" style={{ fontSize: "0.28em" }}>
                %
              </span>
            </div>
          </div>
        </div>

        <div
          className="mt-7 h-0.5 w-full"
          style={{ background: "rgba(255,255,255,0.2)" }}
        >
          <div
            className="h-full bg-brand-accent"
            style={{
              transform: `scaleX(${pct / 100})`,
              transformOrigin: "left center",
            }}
          />
        </div>
      </div>
    </>
  );
}
