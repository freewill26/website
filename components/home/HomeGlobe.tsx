"use client";

import dynamic from "next/dynamic";
import { FwReveal } from "@/components/site/FwReveal";
import type { RegionVM } from "@/lib/api/home";
import { splitLastWord } from "@/utils/text";

/* The R3F canvas can't be server-rendered, so load it on the client only. */
const Globe3D = dynamic(
  () => import("@/components/ui/3d-globe").then((m) => m.Globe3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-sm text-[#9FC0FF]/70">Loading globe…</span>
      </div>
    ),
  },
);

interface HomeGlobeProps {
  regions: RegionVM[];
  heading: string;
  description: string;
}

/**
 * "Built here, sourced worldwide" — a dark rounded card with the copy on the
 * left and an oversized interactive globe bleeding off the bottom-right
 * corner, cropped by the card's edges.
 */
export default function HomeGlobe({ regions, heading, description }: HomeGlobeProps) {
  const [headingRest, headingLast] = splitLastWord(heading);
  return (
    <section
      id="fw-globe"
      className="box-border bg-cream px-[6vw]"
      style={{ paddingBlock: "clamp(64px,7vw,110px)" }}
    >
      <FwReveal>
        <div
          className="relative overflow-hidden rounded-[22px] text-[#F6F4EC] sm:rounded-[28px]"
          style={{
            background: "#0B1020",
            // Card padding, exposed as --pad so the mobile globe can bleed past it.
            ["--pad" as string]: "clamp(28px,5.5vw,84px)",
            padding: "var(--pad)",
            boxShadow: "0 40px 90px rgba(11,16,32,0.28)",
          }}
        >
          {/* Copy. Below lg it's a normal flowing block; at lg it caps its
              width so the corner-anchored globe owns the right side. */}
          <div className="relative z-10 max-w-[640px] lg:pointer-events-none lg:pb-[clamp(60px,8vw,120px)]">
            <div className="mb-5 flex items-center gap-3">
              <span className="block h-0.5 w-7" style={{ background: "#5E93FF" }} />
              <span className="text-xs font-bold tracking-[0.28em] text-[#9FC0FF]">
                GLOBAL REACH
              </span>
            </div>
            <h2
              className="m-0 mb-[26px] font-display uppercase leading-[0.96]"
              style={{ fontSize: "clamp(38px,4.6vw,80px)" }}
            >
              {headingRest} <span style={{ color: "#5E93FF" }}>{headingLast}</span>
            </h2>
            <p className="m-0 mb-9 max-w-[440px] text-base leading-[1.8] text-[#F6F4EC]/[0.66]">
              {description}
            </p>
            <div className="flex max-w-[480px] flex-col gap-3.5">
              {regions.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-4 pt-3.5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <span
                    className="block h-2.5 w-2.5 flex-none rounded-full"
                    style={{ background: "#5E93FF", boxShadow: "0 0 16px rgba(94,147,255,0.8)" }}
                  />
                  <span className="min-w-[150px] font-display text-[22px] tracking-[0.02em] text-[#F6F4EC]">
                    {r.name}
                  </span>
                  <span className="text-[13px] text-[#F6F4EC]/[0.58]">{r.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Globe: below lg it flows under the copy, centered and pulled past
              the card's bottom edge so the sphere crops like a horizon; at lg
              it anchors past the bottom-right corner instead. */}
          <div className="relative mx-auto mt-10 aspect-square w-full max-w-[440px] mb-[calc(-1*var(--pad)-22%)] [touch-action:pan-y] lg:absolute lg:bottom-[max(-24%,-210px)] lg:right-[max(-14%,-150px)] lg:m-0 lg:w-[min(860px,60vw)] lg:max-w-none">
            <Globe3D
              className="h-full w-full"
              config={{
                bumpScale: 5,
                autoRotateSpeed: 0.3,
              }}
            />
          </div>
        </div>
      </FwReveal>
    </section>
  );
}
