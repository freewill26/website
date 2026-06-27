"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { productTypeHref } from "@/lib/navigation";
import type { ProductFamily } from "@/lib/productFamily";

/**
 * "The blueprint" — a court schematic that draws itself in on scroll, followed
 * by the family's type cards. Each type card opens its Product Type detail page
 * (Page B).
 */
export default function ProductBlueprint({ family }: { family: ProductFamily }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = svgRef.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // pathLength={1} normalises every stroke so one dash rule animates them all.
  const drawStyle = (i: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: drawn ? 0 : 1,
    transition: "stroke-dashoffset 1.4s ease",
    transitionDelay: `${i * 0.12}s`,
  });

  return (
    <section id="fw-blueprint" className="relative">
      {/* Blueprint stage */}
      <div className="relative" style={{ background: "#0A1024", minHeight: "150vh" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(95,208,224,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(95,208,224,0.10) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />
        <div className="sticky top-0 box-border flex h-screen flex-col justify-between px-[6vw] py-[14vh]">
          {/* Heading */}
          <div className="relative z-10">
            <FwReveal className="mb-[18px] flex items-center gap-3">
              <span className="block h-0.5 w-7" style={{ background: "#5FD0E0" }} />
              <span className="font-mono text-xs font-medium tracking-[0.24em] text-[#9FE4EF]">
                02 — THE BLUEPRINT
              </span>
            </FwReveal>
            <MaskedHeading
              className="m-0 max-w-[11ch] font-display uppercase leading-[0.9] text-[#EAF8FB]"
              style={{ fontSize: "clamp(46px,8vw,150px)" }}
              lines={["Built to", <span key="spec" style={{ color: "#5FD0E0" }}>spec.</span>]}
            />
          </div>

          {/* Centred court schematic */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-[6vw]">
            <svg
              ref={svgRef}
              viewBox="0 0 600 340"
              className="h-auto w-[min(820px,86vw)] overflow-visible"
            >
              <g fill="none" stroke="#5FD0E0" strokeWidth="1.4" vectorEffect="non-scaling-stroke">
                <rect pathLength={1} x="60" y="40" width="480" height="260" style={drawStyle(0)} />
                <rect pathLength={1} x="76" y="56" width="448" height="228" strokeWidth="0.8" opacity="0.6" style={drawStyle(1)} />
                <line pathLength={1} x1="300" y1="40" x2="300" y2="300" style={drawStyle(2)} />
                <circle pathLength={1} cx="300" cy="170" r="46" style={drawStyle(3)} />
                <circle cx="300" cy="170" r="3" fill="#5FD0E0" stroke="none" />
                <path pathLength={1} d="M60 110 H150 V230 H60" style={drawStyle(4)} />
                <path pathLength={1} d="M540 110 H450 V230 H540" style={drawStyle(5)} />
              </g>
              <g stroke="#9FE4EF" strokeWidth="0.8" fill="none" opacity="0.85" vectorEffect="non-scaling-stroke">
                <line pathLength={1} x1="60" y1="20" x2="540" y2="20" style={drawStyle(2)} />
                <line x1="60" y1="14" x2="60" y2="26" />
                <line x1="540" y1="14" x2="540" y2="26" />
                <line pathLength={1} x1="30" y1="40" x2="30" y2="300" style={drawStyle(3)} />
                <line x1="24" y1="40" x2="36" y2="40" />
                <line x1="24" y1="300" x2="36" y2="300" />
              </g>
              <g fill="#9FE4EF" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing="0.04em">
                <text x="300" y="14" textAnchor="middle">18.00 m</text>
                <text x="18" y="175" textAnchor="middle" transform="rotate(-90 18 175)">9.00 m</text>
                <text x="300" y="326" textAnchor="middle" opacity="0.7">
                  POINT-ELASTIC · THICKNESS 9.0 mm · SHOCK ABSORPTION ≥ 53%
                </text>
              </g>
              <g stroke="#5FD0E0" strokeWidth="1" opacity="0.55">
                <path d="M40 40 h-14 M40 40 v-14" />
                <path d="M560 40 h14 M560 40 v-14" />
                <path d="M40 300 h-14 M40 300 v14" />
                <path d="M560 300 h14 M560 300 v14" />
              </g>
            </svg>
          </div>

          {/* Caption + stats */}
          <div className="relative z-10 flex max-w-[760px] flex-wrap gap-8">
            <p className="m-0 max-w-[440px] font-mono text-[13px] leading-[1.8] text-[#DFF6FA]/[0.78]">
              {family.blueprintCaption}
            </p>
            <div className="flex gap-7 font-mono text-[#9FE4EF]">
              {family.blueprintStats.map((s) => (
                <div key={s.label}>
                  <div className="text-[22px] text-[#EAF8FB]">{s.value}</div>
                  <div className="mt-1 text-[10px] tracking-[0.16em] opacity-70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Types grid */}
      <div className="relative" style={{ background: "#0E1730" }}>
        <div className="px-[6vw] pb-[clamp(24px,3vw,40px)] pt-[clamp(40px,5vw,72px)]">
          <FwReveal className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="mb-3.5 flex items-center gap-3">
                <span className="block h-0.5 w-7" style={{ background: "#5FD0E0" }} />
                <span className="font-mono text-xs tracking-[0.22em] text-[#9FE4EF]">
                  THE RANGE
                </span>
              </div>
              <h3
                className="m-0 font-display uppercase leading-none text-[#EAF8FB]"
                style={{ fontSize: "clamp(30px,3.6vw,56px)" }}
              >
                Choose your type.
              </h3>
            </div>
            <p className="m-0 max-w-[380px] text-sm leading-[1.7] text-[#DFF6FA]/60">
              {family.rangeLead}
            </p>
          </FwReveal>
        </div>

        <div
          className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3"
          style={{
            background: "rgba(95,208,224,0.22)",
            borderTop: "1px solid rgba(95,208,224,0.22)",
            borderBottom: "1px solid rgba(95,208,224,0.22)",
          }}
        >
          {family.types.map((t) => (
            <Link
              key={t.code}
              href={productTypeHref(t.code, family.slug)}
              className="group box-border flex min-h-[240px] flex-col p-[clamp(26px,2.6vw,40px)] no-underline transition-colors hover:bg-[#13203F]"
              style={{ background: "#0E1730" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#5FD0E0]">{t.code}</span>
                <span className="block h-2.5 w-[34px] rounded-sm" style={{ background: t.swatch }} />
              </div>
              <div className="mt-auto">
                <h4
                  className="m-0 mb-2 font-display uppercase leading-[1.05] text-[#EAF8FB]"
                  style={{ fontSize: "clamp(22px,2vw,30px)" }}
                >
                  {t.name}
                </h4>
                <p className="m-0 mb-4 text-[13px] leading-[1.65] text-[#DFF6FA]/60">
                  {t.desc}
                </p>
                <div
                  className="flex items-center justify-between pt-3.5"
                  style={{ borderTop: "1px solid rgba(95,208,224,0.18)" }}
                >
                  <span className="font-mono text-[11px] tracking-[0.12em] text-[#9FE4EF]">
                    {t.spec}
                  </span>
                  <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRightIcon size={15} color="5FD0E0" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
