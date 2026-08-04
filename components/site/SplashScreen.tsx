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
 * Guards against hanging: lazy (below-the-fold) images are skipped, every
 * asset resolves on `error` too, and a safety timeout forces the reveal.
 *
 * Shared by the Home, About, Products and Gallery routes.
 */
export default function SplashScreen() {
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
      setPct(100);
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

    // --- Build the set of assets we actually wait on ------------------------
    let total = 0;
    let loaded = 0;
    const cleanups: Array<() => void> = [];
    const bump = () => {
      loaded += 1;
    };

    // Eager images only — lazy ones load on scroll and would never resolve.
    const images = Array.from(document.images).filter(
      (img) => img.getAttribute("loading") !== "lazy",
    );
    images.forEach((img) => {
      total += 1;
      // `complete` is true once the browser is done — loaded, errored, or the
      // src is empty. Any of those means "settled"; only truly in-flight images
      // (complete === false) get listeners, otherwise an empty-src <img> (which
      // never fires load/error) would hang the counter forever.
      if (img.complete) {
        bump();
        return;
      }
      const onDone = () => {
        img.removeEventListener("load", onDone);
        img.removeEventListener("error", onDone);
        bump();
      };
      img.addEventListener("load", onDone);
      img.addEventListener("error", onDone);
      cleanups.push(() => {
        img.removeEventListener("load", onDone);
        img.removeEventListener("error", onDone);
      });
    });

    // Videos — metadata (dimensions/duration) means the clip is present and
    // ready to play behind the splash. We deliberately DON'T wait on the full
    // download: background/hero videos stream from a CDN and can be many MB,
    // so blocking on first-frame data would stall the splash for seconds.
    const videos = Array.from(document.querySelectorAll("video"));
    videos.forEach((v) => {
      total += 1;
      if (v.readyState >= 1 /* HAVE_METADATA */) {
        bump();
        return;
      }
      const events = ["loadedmetadata", "loadeddata", "canplay", "error"];
      const onDone = () => {
        events.forEach((e) => v.removeEventListener(e, onDone));
        bump();
      };
      events.forEach((e) => v.addEventListener(e, onDone));
      cleanups.push(() => events.forEach((e) => v.removeEventListener(e, onDone)));
      // Nudge lazily-preloaded videos to at least fetch their metadata.
      if (v.preload === "none") v.preload = "metadata";
    });

    // All web fonts, counted as a single unit.
    total += 1;
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    let fontsSettled = false;
    fontsReady.finally(() => {
      if (!fontsSettled) {
        fontsSettled = true;
        bump();
      }
    });

    // --- Animate the counter toward the real loaded fraction ---------------
    let raf = 0;
    let display = 0; // smoothed 0..100
    const startTime = performance.now();
    const MIN_MS = 500; // don't flash by on instant loads
    const MAX_MS = 9000; // never hang, whatever an asset does

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const frac = total > 0 ? loaded / total : 1;
      const complete = frac >= 1 && elapsed >= MIN_MS;
      const forced = elapsed >= MAX_MS;

      // Hold just under 100 until every asset has truly settled.
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
      cleanups.forEach((fn) => fn());
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
