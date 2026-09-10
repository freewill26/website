"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { splitLastWord } from "@/utils/text";

interface HomeHeroContent {
  description: string;
  button1Label: string;
  button1Link: string;
  button2Label: string;
  button2Link: string;
  /** CMS-managed URL for the scroll-scrubbed background video. */
  backgroundVideo: string;
}

interface HomeHeroMeta {
  headline: string;
  description: string;
}

interface HomeHeroProps {
  /** CMS-sourced hero copy, fetched server-side by the page so this still renders in the initial SSR HTML. */
  content: HomeHeroContent;
  meta1: HomeHeroMeta;
  meta2: HomeHeroMeta;
}

/**
 * Home hero — a pinned section whose background video is *scrubbed* by scroll
 * position (the design's signature scroll-driven hero). The section's height is
 * derived from the clip's own duration on mount, so replacing the CMS video
 * keeps the same scrub rate without touching this file. The editorial card
 * fades out as you descend and two captions band in/out, while the video
 * playhead tracks scroll progress. `data-hero-line` / `data-hero-fade` still
 * stagger in once <SplashScreen> clears (see globals.css `.fw-intro`).
 */
export default function HomeHero({ content, meta1, meta2 }: HomeHeroProps) {
  const [meta1Rest, meta1Last] = splitLastWord(meta1.headline);
  const [meta2Rest, meta2Last] = splitLastWord(meta2.headline);
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

    // --- Scroll budget is derived from the clip, not hard-coded -------------
    // The pinned section is 100svh of viewport plus SCROLL_VH_PER_SECOND of
    // scroll travel for every second of video, so the *scrub rate* (seconds of
    // footage per pixel of scroll) stays constant no matter how long the clip
    // is. Swap in a 12s video from the CMS and the section simply grows; the
    // hero keeps the exact same feel. Clamped so a very short or very long
    // upload still yields a sane page.
    //
    // Kept deliberately tight: the hero is an overture, not a chapter, and a
    // visitor who wants the page underneath shouldn't have to wade through
    // several screens of pinned video to reach it.
    const SCROLL_VH_PER_SECOND = 26;
    const MIN_SCROLL_VH = 80;
    const MAX_SCROLL_VH = 240;
    const applyHeight = () => {
      const d = video?.duration;
      const travel = d && isFinite(d) && d > 0
        ? clamp(d * SCROLL_VH_PER_SECOND, MIN_SCROLL_VH, MAX_SCROLL_VH)
        : 120;
      outer.style.height = `${100 + travel}svh`;
    };
    applyHeight();

    if (video) {
      video.muted = true;
      video.playsInline = true;
      // The markup ships `preload="none"` so the clip can't delay the window
      // load event (and with it hydration — a media element keeps the "delaying
      // the load event" flag raised while it fetches). Kicking the fetch off
      // here instead means it starts just after hydration, which is also what
      // lets <SplashScreen> report its buffering as live progress.
      video.preload = "auto";
      try {
        video.load();
      } catch {}
      video.addEventListener("loadedmetadata", applyHeight);
      video.addEventListener("durationchange", applyHeight);
    }

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Wheel smoothing while pinned ---------------------------------------
    // While the hero is pinned we take over wheel input and glide the page
    // toward the target, which turns the mouse wheel's discrete notches into
    // continuous travel so the scrub doesn't step. The gain is 1:1 — this
    // smooths the input, it does not slow it down; a flick covers exactly the
    // distance it would natively, just eased over a few frames. The moment the
    // target hits either end of the pinned range we stop intercepting, so the
    // user is never trapped — native scrolling carries them straight out.
    // Touch, keyboard and scrollbar input stay fully native throughout.
    const WHEEL_GAIN = 1; // 1:1 with native scroll — smoothing, not damping
    const GLIDE_TAU = 0.1; // s; easing time-constant of the page glide
    const MAX_GLIDE_VH_PER_S = 320; // ceiling on flick speed, rarely reached
    let glideTarget = 0;
    let glideY = 0;
    let gliding = false;
    let selfScroll = false; // true while the scroll event was caused by us

    const pinnedRange = () => {
      const rect = outer.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      return { top, end: top + rect.height - window.innerHeight };
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch-zoom
      const { top, end } = pinnedRange();
      if (end <= top) return;
      const y = window.scrollY;
      // Only while the hero is (about to be) pinned.
      if (y < top - 1 || y > end + 1) return;

      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      const delta = e.deltaY * unit * WHEEL_GAIN;
      if (!gliding) {
        glideTarget = y;
        glideY = y;
      }
      const next = glideTarget + delta;
      // Pushing past either end: hand back to native scroll and let it leave.
      if ((next < top && delta < 0) || (next > end && delta > 0)) {
        gliding = false;
        return;
      }
      e.preventDefault();
      glideTarget = clamp(next, top, end);
      gliding = true;
    };

    const onScroll = () => {
      if (selfScroll) return;
      // External scroll (scrollbar, keys, touch) — re-anchor the glide there.
      gliding = false;
    };

    if (!reduceMotion) {
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // --- Scrub engine -------------------------------------------------------
    // Naively assigning `currentTime` every frame is what makes this stutter:
    // each assignment starts a seek, and a seek issued while the previous one
    // is still in flight gets dropped, so the picture lands on keyframes in
    // visible jumps. Instead we let the decoder do the work whenever we can —
    // when the playhead only needs to move *forward* a little we actually play
    // the video and vary `playbackRate` to catch up, which is decoded smoothly
    // at full frame rate. Seeking is reserved for scrolling back up (video
    // can't play in reverse) and for big jumps, and is only ever issued when no
    // seek is already pending.
    //
    // Everything visual — video, captions, progress bar — is driven by one
    // *eased* progress value rather than raw scroll, so the whole composition
    // moves as a single smooth system no matter how jerky the input is.
    const SMOOTH_TAU = 0.12; // s; easing time-constant for eased progress
    const MAX_PROGRESS_PER_S = 1.8; // ceiling on story speed; a hard flick hits it
    // Raised alongside the faster scrub: playbackRate goes to 8×, which erases
    // 1.6s of error within CATCH_UP, so anything under that can still ride the
    // smooth decoded path rather than falling back to a visibly stepping seek.
    const JUMP = 1.2; // s of playhead error above which we snap, not ease
    const DEAD = 0.02; // s of error we consider "arrived"
    const CATCH_UP = 0.2; // s we aim to erase playhead error in, when playing

    let raf = 0;
    let dead = false;
    let pe = 0; // eased progress 0..1
    let last = performance.now();
    let primed = false;

    const loop = (now: number) => {
      if (dead) return;
      // Frame-rate independent easing — a fixed per-frame lerp runs twice as
      // fast on a 120Hz display as on 60Hz, which is jank of its own.
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // Page glide (wheel damping).
      if (gliding) {
        const gap = glideTarget - glideY;
        let step = gap * (1 - Math.exp(-dt / GLIDE_TAU));
        const maxStep = (MAX_GLIDE_VH_PER_S / 100) * window.innerHeight * dt;
        step = clamp(step, -maxStep, maxStep);
        glideY += step;
        if (Math.abs(glideTarget - glideY) < 0.5) {
          glideY = glideTarget;
          gliding = false;
        }
        selfScroll = true;
        window.scrollTo(0, glideY);
        selfScroll = false;
      }

      const vh = window.innerHeight;
      const rect = outer.getBoundingClientRect();
      const total = rect.height - vh;
      const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;

      if (!primed) {
        primed = true;
        pe = p;
      }
      if (reduceMotion) {
        pe = p;
      } else {
        const step = (p - pe) * (1 - Math.exp(-dt / SMOOTH_TAU));
        const maxStep = MAX_PROGRESS_PER_S * dt;
        pe += clamp(step, -maxStep, maxStep);
        // Once the hero has scrolled away, don't leave the story half-told.
        if (rect.bottom <= 0 || rect.top >= vh) pe = p;
      }
      pe = clamp(pe, 0, 1);

      if (video && video.duration && isFinite(video.duration) && video.readyState >= 2) {
        const playable = Math.max(0, video.duration - 0.06);
        const cur = pe * playable;
        const t = video.currentTime;
        const err = cur - t;

        if (err > DEAD && err < JUMP) {
          // Moving forward by a little: play, and scale the rate to close the
          // gap over CATCH_UP seconds. Decoded playback = no seek stutter.
          const rate = clamp(err / CATCH_UP, 0.0625, 8);
          if (Math.abs(video.playbackRate - rate) > 0.01) video.playbackRate = rate;
          if (video.paused) video.play().catch(() => {});
        } else if (Math.abs(err) > DEAD) {
          // Backwards, or too far ahead to play through: seek — but never while
          // another seek is still resolving, otherwise the request is wasted.
          if (!video.paused) video.pause();
          if (!video.seeking) {
            try {
              video.currentTime = cur;
            } catch {}
          }
        } else if (!video.paused) {
          video.pause();
        }
      }

      if (contentRef.current) {
        const o = 1 - Math.min(1, pe / 0.16);
        contentRef.current.style.opacity = String(o);
        contentRef.current.style.visibility = o <= 0.01 ? "hidden" : "visible";
      }
      if (cap1Ref.current) {
        const c = band(pe, 0.24, 0.55);
        cap1Ref.current.style.opacity = String(c);
        cap1Ref.current.style.transform = `translateY(${28 - 28 * c}px)`;
      }
      if (cap2Ref.current) {
        const c = band(pe, 0.6, 0.94);
        cap2Ref.current.style.opacity = String(c);
        cap2Ref.current.style.transform = `translateY(${28 - 28 * c}px)`;
      }
      if (progRef.current) progRef.current.style.transform = `scaleX(${pe})`;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (video) {
        video.removeEventListener("loadedmetadata", applyHeight);
        video.removeEventListener("durationchange", applyHeight);
        try {
          video.pause();
          video.playbackRate = 1;
        } catch {}
      }
    };
  }, []);

  return (
    <section
      ref={outerRef}
      id="fw-hero-outer"
      className="relative bg-cream"
      // Replaced on mount with a duration-derived height (see the effect
      // above); this literal is only the pre-hydration / no-JS default.
      style={{ height: "220svh" }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* `data-splash-critical` makes <SplashScreen> hold the intro until this
            clip has buffered enough to scrub — without it the hero reveals black
            and stutters on the first drag. `preload="none"` is deliberate: the
            effect above flips it to "auto" and starts the fetch, so the download
            can't hold up the load event and stall hydration. */}
        <video
          ref={videoRef}
          data-splash-critical
          src={content.backgroundVideo}
          preload="none"
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
              {content.description}
            </p>
            <div className="pointer-events-auto flex flex-wrap gap-3">
              <Link
                href={content.button1Link}
                className="rounded-full bg-brand px-[26px] py-[15px] text-[13px] font-bold tracking-[0.1em] text-white no-underline transition-colors hover:bg-[#004E5F]"
              >
                {content.button1Label}
              </Link>
              <Link
                href={content.button2Link}
                className="rounded-full border px-[26px] py-[15px] text-[13px] font-bold tracking-[0.1em] text-[#181A20] no-underline transition-colors hover:bg-[#181A20]/5"
                style={{ borderColor: "rgba(24,26,32,0.32)" }}
              >
                {content.button2Label}
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
                style={{ fontSize: "clamp(44px,16.5vw,310px)", transitionDelay: "0.55s" }}
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
            {meta1Rest} <span className="text-brand">{meta1Last}</span>
          </div>
          <p
            className="m-0 mt-[18px] max-w-[420px] text-[15px] leading-[1.7] text-[#181A20]/[0.72]"
            style={{ textShadow: "0 2px 24px rgba(241,234,216,0.95)" }}
          >
            {meta1.description}
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
            {meta2Rest} <span className="text-brand">{meta2Last}</span>
          </div>
          <p
            className="m-0 mt-[18px] max-w-[420px] text-[15px] leading-[1.7] text-[#181A20]/[0.72]"
            style={{ textShadow: "0 2px 24px rgba(241,234,216,0.95)" }}
          >
            {meta2.description}
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
        <div className="absolute bottom-9 right-[6vw] z-[25] hidden text-[10px] font-bold tracking-[0.3em] text-[#181A20]/60 sm:block">
          EST. 1990 — PUNE
        </div>
      </div>
    </section>
  );
}
