"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ImageSlot from "@/components/site/ImageSlot";
import type { MilestoneVM } from "@/lib/api/home";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * "Three decades on the ground" — a pinned section that translates the
 * milestone track horizontally as the page scrolls vertically (the design's
 * scroll-scrubbed horizontal timeline). The outer height is sized to the track
 * so 1px of vertical scroll maps to 1px of horizontal travel.
 */
interface HomeTimelineProps {
  milestones: MilestoneVM[];
  heading: string;
}

export default function HomeTimeline({ milestones, heading }: HomeTimelineProps) {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

    const setHeight = () => {
      const dist = Math.max(0, track.scrollWidth - window.innerWidth);
      outer.style.height = `${window.innerHeight + dist}px`;
    };
    setHeight();
    const onResize = () => setHeight();
    window.addEventListener("resize", onResize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setHeight);
    const t = window.setTimeout(setHeight, 1200);

    let raf = 0;
    let dead = false;
    const loop = () => {
      if (dead) return;
      const vh = window.innerHeight;
      const rect = outer.getBoundingClientRect();
      const total = rect.height - vh;
      const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
      const dist = Math.max(0, track.scrollWidth - window.innerWidth);
      track.style.transform = `translateX(${-dist * p}px)`;
      if (progRef.current) progRef.current.style.transform = `scaleX(${p})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={outerRef} id="fw-tl-outer" className="relative" style={{ background: "#0F1428" }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="flex items-end justify-between gap-5 px-[6vw] pt-12">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-0.5 w-7" style={{ background: "#5E93FF" }} />
              <span className="text-xs font-bold tracking-[0.28em] text-[#9FC0FF]">
                KEY MILESTONES
              </span>
            </div>
            <h2
              className="m-0 font-display uppercase leading-none text-[#F6F4EC]"
              style={{ fontSize: "clamp(32px,3.8vw,58px)" }}
            >
              {heading}
            </h2>
          </div>
          <div className="whitespace-nowrap pb-2 text-[11px] font-bold tracking-[0.3em] text-[#F6F4EC]/50">
            <span className="inline-flex items-center gap-2">SCROLL TO TRAVEL <ArrowRightIcon size={11} color="F6F4EC" /></span>
          </div>
        </div>

        <div className="flex flex-1 items-center overflow-hidden">
          <div
            ref={trackRef}
            id="fw-tl-track"
            className="flex items-center px-[6vw] will-change-transform"
          >
            {milestones.map((m, i) => (
              <article
                key={m.id}
                className="relative mr-7 h-[min(560px,58vh)] min-h-[400px] w-[min(620px,82vw)] flex-none overflow-hidden rounded-[14px]"
                style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.4)" }}
              >
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={m.imageAlt}
                    fill
                    sizes="(max-width: 768px) 80vw, 600px"
                    className="absolute inset-0 object-cover object-center"
                    priority={i < 2}
                  />
                ) : (
                  <ImageSlot tone="light" label="Milestone" className="absolute inset-0 h-full w-full" />
                )}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(195deg, rgba(8,12,28,0.4) 0%, rgba(8,12,28,0.06) 38%, rgba(8,12,28,0.94) 82%)",
                  }}
                />
                <div className="pointer-events-none absolute inset-x-6 top-6 flex items-center justify-between">
                  <span className="rounded-full bg-brand px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-white">
                    {m.tag}
                  </span>
                  <Image src="/assets/logo-freewill-white.svg" alt="Freewill" width={80} height={18} className="h-[18px] w-auto opacity-85" />
                </div>
                <div className="pointer-events-none absolute inset-x-7 bottom-7">
                  <div
                    className="font-display leading-[0.9]"
                    style={{ fontSize: "clamp(64px,7vw,112px)", color: "#5E93FF", textShadow: "0 10px 44px rgba(7,13,28,0.55)" }}
                  >
                    {m.year}
                  </div>
                  <h3 className="mb-2.5 mt-4 max-w-[420px] font-display text-2xl uppercase leading-[1.12] text-white">
                    {m.title}
                  </h3>
                  <p className="m-0 max-w-[440px] text-sm leading-[1.7] text-white/[0.82]">
                    {m.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="px-[6vw] pb-11">
          <div className="h-0.5 w-full" style={{ background: "rgba(255,255,255,0.14)" }}>
            <div
              ref={progRef}
              className="h-full"
              style={{ background: "#5E93FF", transform: "scaleX(0)", transformOrigin: "left center" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
