"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FwReveal } from "@/components/site/FwReveal";
import { ArrowRightIcon, CloseIcon } from "@/components/ui/icons";
import { REFERENCES, type Reference } from "@/lib/homeContent";

/**
 * "Built for India's biggest stages" — an awwwards-style index list with a
 * sweeping teal hover fill, a cursor-following preview image, and a full-screen
 * case-study overlay on click.
 */
export default function HomeReferences() {
  const [active, setActive] = useState<Reference | null>(null);
  const [showCursor, setShowCursor] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorImgRef = useRef<HTMLImageElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const hasPointer = useRef(false);

  const setPreview = (src: string) => {
    if (cursorImgRef.current && cursorImgRef.current.getAttribute("src") !== src) {
      cursorImgRef.current.src = src;
    }
  };

  // Smoothly lerp the preview image toward the pointer (ports gsap.quickTo).
  useEffect(() => {
    const fine = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    let raf = 0;
    let dead = false;
    const loop = () => {
      if (dead) return;
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${showCursor ? 1 : 0.6})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
    };
  }, [showCursor]);

  // The pointer can be stationary while the page scrolls a different row under
  // it — re-resolve the row beneath the cursor on scroll so the preview tracks.
  useEffect(() => {
    const fine = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const onScroll = () => {
      if (!hasPointer.current) return;
      const el = document.elementFromPoint(target.current.x, target.current.y);
      const row = el?.closest<HTMLElement>("[data-ref-img]");
      if (row?.dataset.refImg) {
        setPreview(row.dataset.refImg);
        setShowCursor(true);
      } else {
        setShowCursor(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = active ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section
      id="fw-refs"
      className="box-border bg-cream"
      style={{ paddingBlock: "clamp(72px,9vw,130px)", scrollMarginTop: "104px" }}
    >
      <FwReveal className="flex flex-wrap items-end justify-between gap-7 px-[6vw] pb-[clamp(40px,4.5vw,60px)]">
        <div className="max-w-[680px]">
          <div className="mb-[18px] flex items-center gap-3">
            <span className="block h-0.5 w-7 bg-brand" />
            <span className="text-xs font-bold tracking-[0.28em] text-brand">
              REFERENCES &amp; EVENTS
            </span>
          </div>
          <h2
            className="m-0 font-display uppercase leading-[0.98] text-[#181A20]"
            style={{ fontSize: "clamp(36px,4.6vw,72px)", textWrap: "balance" }}
          >
            Built for India&apos;s
            <br />
            biggest stages.
          </h2>
          <p className="mt-[22px] max-w-[480px] text-base leading-[1.8] text-[#181A20]/[0.62]">
            From the National Games to World Cups — three decades of surfaces,
            seating and equipment trusted at the events that matter most.
          </p>
        </div>
        <div className="flex-none text-right">
          <div
            className="font-display leading-[0.86] text-brand"
            style={{ fontSize: "clamp(56px,6vw,104px)" }}
          >
            26
          </div>
          <div className="mt-2 text-xs font-bold tracking-[0.2em] text-[#181A20]/55">
            EVENTS · 1994—2025
          </div>
        </div>
      </FwReveal>

      {/* Cursor-following preview image (fine-pointer devices only) */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[650] hidden overflow-hidden md:block"
        style={{
          width: "clamp(300px,26vw,420px)",
          height: "clamp(380px,34vw,540px)",
          opacity: showCursor ? 1 : 0,
          transition: "opacity 0.35s ease",
          boxShadow: "0 30px 80px rgba(7,16,39,0.45)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={cursorImgRef}
          src=""
          alt=""
          className="h-full w-full object-cover"
          style={{ background: "#0F1428" }}
        />
        <div className="absolute bottom-3 left-3.5 flex items-center gap-2.5">
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-brand">
            <ArrowRightIcon size={14} />
          </span>
          <span
            className="font-display text-[13px] tracking-[0.14em] text-white"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.65)" }}
          >
            VIEW
          </span>
        </div>
      </div>

      <div
        style={{ borderBottom: "1px solid rgba(24,26,32,0.14)" }}
        onMouseMove={(e) => {
          target.current = { x: e.clientX, y: e.clientY };
          hasPointer.current = true;
        }}
        onMouseEnter={(e) => {
          pos.current = { x: e.clientX, y: e.clientY };
          target.current = { x: e.clientX, y: e.clientY };
          hasPointer.current = true;
          setShowCursor(true);
        }}
        onMouseLeave={() => setShowCursor(false)}
      >
        {REFERENCES.map((r) => (
          <button
            key={r.idx}
            type="button"
            data-ref-img={r.img}
            onMouseEnter={() => setPreview(r.img)}
            onClick={() => setActive(r)}
            className="group relative block w-full overflow-hidden text-left md:cursor-none"
            style={{ borderTop: "1px solid rgba(24,26,32,0.14)" }}
          >
            <span className="absolute inset-0 -translate-x-full bg-brand transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative grid grid-cols-[28px_64px_1fr] items-center gap-4 px-[6vw] py-[clamp(18px,2vw,26px)] transition-transform duration-500 group-hover:translate-x-[18px] md:grid-cols-[54px_116px_minmax(0,1fr)_auto_34px] md:gap-[clamp(16px,2vw,34px)]">
              <span className="text-xs font-bold tracking-[0.08em] text-[#181A20]/40 transition-colors group-hover:text-cream">
                {r.idx}
              </span>
              <span
                className="font-display leading-none text-brand transition-colors group-hover:text-[#BCE7EF]"
                style={{ fontSize: "clamp(24px,2.4vw,38px)" }}
              >
                {r.year}
              </span>
              <span
                className="font-display uppercase leading-[1.12] tracking-[0.01em] text-[#181A20] transition-colors group-hover:text-cream"
                style={{ fontSize: "clamp(17px,1.5vw,23px)" }}
              >
                {r.title}
              </span>
              <span className="hidden whitespace-nowrap text-right text-[13px] font-semibold tracking-[0.04em] text-[#181A20]/55 transition-colors group-hover:text-cream md:block">
                {r.loc}
              </span>
              <span className="hidden justify-self-end opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 md:block">
                <ArrowRightIcon size={18} color="181A20" />
              </span>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <ReferenceDetail reference={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}

function ReferenceDetail({
  reference,
  onClose,
}: {
  reference: Reference;
  onClose: () => void;
}) {
  const { detail } = reference;
  return (
    <div
      className="fixed inset-0 z-[1000] overflow-y-auto overflow-x-hidden"
      style={{ background: "#0B1020", animation: "fade 0.45s ease both" }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed right-[clamp(18px,3vw,28px)] top-[clamp(18px,3vw,28px)] z-20 flex h-[54px] w-[54px] items-center justify-center rounded-full border"
        style={{
          borderColor: "rgba(255,255,255,0.32)",
          background: "rgba(11,16,32,0.45)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <CloseIcon size={22} />
      </button>

      <div className="relative h-screen w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reference.img}
          alt={reference.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ background: "#0F1428", animation: "fw-hero-zoom 1.4s ease both" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,16,32,0.25) 0%, rgba(11,16,32,0) 32%, rgba(11,16,32,0.88) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 box-border p-[clamp(28px,6vw,80px)]">
          <div className="mb-[18px] text-xs font-bold tracking-[0.28em] text-[#9FE6F0]">
            {detail.cat} · {reference.loc}
          </div>
          <div className="flex flex-wrap items-end gap-[clamp(16px,3vw,44px)]">
            <div
              className="font-display leading-[0.8] text-white"
              style={{ fontSize: "clamp(72px,12vw,210px)" }}
            >
              {reference.year}
            </div>
            <h2
              className="m-0 mb-3.5 max-w-[560px] font-display uppercase leading-none text-white"
              style={{ fontSize: "clamp(26px,3.4vw,56px)" }}
            >
              {reference.title}
            </h2>
          </div>
        </div>
      </div>

      <div
        className="relative z-[5] text-[#181A20]"
        style={{ background: "#F1EAD8", padding: "clamp(56px,7vw,120px) clamp(24px,6vw,90px)" }}
      >
        <div className="mx-auto max-w-[1100px]">
          <div
            className="grid grid-cols-3 gap-[clamp(16px,3vw,40px)] pb-[clamp(40px,5vw,64px)]"
            style={{ borderBottom: "1px solid rgba(24,26,32,0.14)" }}
          >
            {detail.metrics.map((m) => (
              <div key={m.k}>
                <div
                  className="font-display leading-none text-brand"
                  style={{ fontSize: "clamp(34px,4vw,64px)" }}
                >
                  {m.v}
                </div>
                <div className="mt-2 text-[13px] font-semibold tracking-[0.04em] text-[#181A20]/60">
                  {m.k}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-[clamp(40px,6vw,90px)] pt-[clamp(40px,5vw,64px)] md:grid-cols-2">
            <div>
              <div className="mb-[18px] text-xs font-bold tracking-[0.28em] text-brand">
                THE EVENT
              </div>
              <p
                className="m-0 leading-[1.55] text-[#181A20]"
                style={{ fontSize: "clamp(18px,1.9vw,26px)" }}
              >
                {detail.about}
              </p>
            </div>
            <div>
              <div className="mb-[18px] text-xs font-bold tracking-[0.28em] text-brand">
                FREEWILL&apos;S ROLE
              </div>
              <p className="m-0 mb-7 text-base leading-[1.85] text-[#181A20]/[0.72]">
                {detail.role}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {detail.supplied.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-[#181A20]"
                    style={{ border: "1px solid rgba(24,26,32,0.12)" }}
                  >
                    <span className="h-[7px] w-[7px] rounded-full bg-brand" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-[clamp(48px,6vw,80px)] flex flex-wrap items-center justify-between gap-6">
            <div
              className="font-display uppercase leading-none text-[#181A20]"
              style={{ fontSize: "clamp(24px,3vw,44px)" }}
            >
              Want this for
              <br />
              your venue?
            </div>
            <Link
              href="/#fw-contact"
              onClick={onClose}
              className="inline-flex items-center gap-3 rounded-full bg-brand px-7 py-4 text-[13px] font-bold tracking-[0.08em] text-white no-underline"
            >
              TALK TO US <ArrowRightIcon size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
