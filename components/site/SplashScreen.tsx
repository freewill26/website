"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Relative weight of each asset class in the progress bar. The hero clip
 * dominates because it *is* the wait — it's several MB against a handful of
 * images and one font payload, so letting it share equally with them would make
 * the counter race to ~90% and then sit there.
 */
const WEIGHT = {
  /** The scroll-scrubbed hero clip (`data-splash-critical`). */
  heroVideo: 6,
  /** Any other above-the-fold video. */
  video: 2,
  /** Web fonts, counted as a single unit. */
  fonts: 2,
  /** One eager image. */
  image: 1,
} as const;

/** Don't flash past on a warm cache. */
const MIN_MS = 500;
/**
 * Hard ceiling. The hero clip streams from storage and a slow connection can
 * take a while to reach HAVE_ENOUGH_DATA; past this we reveal regardless rather
 * than hold the page hostage.
 */
const MAX_MS = 12000;

/**
 * Fraction of a clip the browser has actually buffered. Ranges are summed
 * rather than read off the last one — a scrubbed video seeks around, so what's
 * buffered is often disjoint.
 */
function bufferedFraction(v: HTMLVideoElement): number {
  if (!v.duration || !Number.isFinite(v.duration) || v.duration <= 0) return 0;
  const ranges = v.buffered;
  if (!ranges || ranges.length === 0) return 0;
  let seconds = 0;
  for (let i = 0; i < ranges.length; i++) seconds += ranges.end(i) - ranges.start(i);
  return Math.min(1, seconds / v.duration);
}

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** One thing the splash waits on. */
interface PreloadTask {
  weight: number;
  /** Real 0..1 progress for this asset. */
  progress: () => number;
  /** True once it can't progress further — loaded, errored, or good enough. */
  settled: () => boolean;
}

/**
 * Set once the intro has played for this page load, so returning Home via
 * client-side navigation doesn't replay a full-screen loader over assets the
 * browser already has. A hard refresh resets it.
 */
let introPlayed = false;

/**
 * Home intro splash — a *real* asset preloader, not a timer.
 *
 * Progress is the weighted fraction of what has genuinely arrived: the hero's
 * scroll-scrubbed video (buffered seconds / duration, weighted heaviest), any
 * other above-the-fold video, every eager image, and the web fonts. Everything
 * is polled from the rAF loop — `readyState`, `buffered`, `HTMLImageElement.complete`
 * and `MediaError` are all readable properties, so there are no listeners to
 * leak and nothing that can silently fail to fire.
 *
 * The hero clip is held to a higher bar than the rest: because scroll *scrubs*
 * its playhead, metadata alone would reveal a hero that stutters or shows black
 * on the first drag, so it must reach HAVE_ENOUGH_DATA. Lazy (below-the-fold)
 * images are skipped, errored assets count as settled, and {@link MAX_MS} caps
 * the whole thing.
 *
 * Home only — other routes render without it.
 */
export default function SplashScreen() {
  const [pct, setPct] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const [done, setDone] = useState(() => introPlayed);
  const splashRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Already shown this page load (client-side nav back to Home).
    if (introPlayed) return;

    const html = document.documentElement;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    html.classList.add("fw-intro");

    // Scroll stays locked by CSS for as long as #fw-splash is mounted — see
    // globals.css. Nothing here touches documentElement.style.overflow: the
    // home page's other modals own that inline style and would clobber us.
    const reveal = () => {
      introPlayed = true;
      html.classList.add("fw-loaded");
      setPct(100);
      setRevealing(true);
      window.setTimeout(() => setDone(true), 1100);
    };

    if (reduce) {
      setPct(100);
      reveal();
      return () => html.classList.remove("fw-intro", "fw-loaded");
    }

    // --- What we actually wait on -----------------------------------------
    const tasks: PreloadTask[] = [];

    for (const v of Array.from(document.querySelectorAll("video"))) {
      // Read the attribute, not `.src`: an empty `src` resolves to the document
      // URL, which would leave us waiting on a clip that will never load.
      const hasSource = Boolean(v.getAttribute("src")) || Boolean(v.querySelector("source"));
      if (!hasSource) continue;

      const critical = v.hasAttribute("data-splash-critical");
      // Nudge non-critical clips into at least fetching metadata, or they'd
      // never settle. The critical one is left alone — HomeHero owns its
      // preload/load() so the two don't restart each other's fetch.
      if (!critical && v.preload === "none") v.preload = "metadata";

      tasks.push({
        weight: critical ? WEIGHT.heroVideo : WEIGHT.video,
        progress: () =>
          v.error ? 1 : Math.max(v.readyState / 4, bufferedFraction(v)),
        // Scrubbing needs real buffer, so the hero waits for HAVE_ENOUGH_DATA;
        // other clips only need to have shown up (HAVE_METADATA).
        settled: () => Boolean(v.error) || v.readyState >= (critical ? 4 : 1),
      });
    }

    // Eager images only — lazy ones load on scroll and would never settle.
    for (const img of Array.from(document.images)) {
      if (img.getAttribute("loading") === "lazy") continue;
      if (!img.getAttribute("src") && !img.getAttribute("srcset")) continue;
      // `complete` covers loaded, errored and empty-src alike.
      tasks.push({
        weight: WEIGHT.image,
        progress: () => (img.complete ? 1 : 0),
        settled: () => img.complete,
      });
    }

    let fontsDone = false;
    void (document.fonts?.ready ?? Promise.resolve()).finally(() => {
      fontsDone = true;
    });
    tasks.push({
      weight: WEIGHT.fonts,
      progress: () => (fontsDone ? 1 : 0),
      settled: () => fontsDone,
    });

    const totalWeight = tasks.reduce((sum, t) => sum + t.weight, 0) || 1;

    // --- Drive the counter from the real loaded fraction -------------------
    let raf = 0;
    let display = 0; // smoothed 0..100
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const frac =
        tasks.reduce((sum, t) => sum + t.weight * clamp01(t.progress()), 0) / totalWeight;
      const ready = tasks.every((t) => t.settled());
      const complete = ready && elapsed >= MIN_MS;
      const forced = elapsed >= MAX_MS;

      // Hold just under 100 until everything has truly settled, so the number
      // never claims done before the page is.
      let target = frac * 100;
      if (!complete && !forced) target = Math.min(target, 96);
      else target = 100;

      display += (target - display) * 0.14;
      if (target - display < 0.4) display = target;

      const next = Math.min(100, Math.round(display));
      setPct((prev) => (prev === next ? prev : next));

      if ((complete || forced) && display >= 99.5) {
        reveal();
        return;
      }
      raf = requestAnimationFrame(tick);
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
