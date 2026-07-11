"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { FwReveal } from "@/components/site/FwReveal";
import { REGIONS } from "@/lib/homeContent";
import type { GlobeMarker } from "@/components/ui/3d-globe";

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

/* A small teal location dot used for every marker (no avatar assets needed). */
const MARKER_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#5FD0E0"/><circle cx="8" cy="8" r="3.4" fill="#0B1020"/></svg>`,
  );

/* Freewill's delivery base, regional reach and key sourcing partners. */
const MARKERS: GlobeMarker[] = [
  { lat: 18.5204, lng: 73.8567, label: "Pune (HQ)", src: MARKER_SRC },
  { lat: 28.6139, lng: 77.209, label: "New Delhi", src: MARKER_SRC },
  { lat: 19.076, lng: 72.8777, label: "Mumbai", src: MARKER_SRC },
  { lat: 27.7172, lng: 85.324, label: "Kathmandu", src: MARKER_SRC },
  { lat: -33.8688, lng: 151.2093, label: "Sydney", src: MARKER_SRC },
  { lat: -31.9523, lng: 115.8613, label: "Perth", src: MARKER_SRC },
  { lat: 45.764, lng: 4.8357, label: "Lyon · Gerflor", src: MARKER_SRC },
  { lat: 51.5074, lng: -0.1278, label: "London", src: MARKER_SRC },
  { lat: 1.3521, lng: 103.8198, label: "Singapore", src: MARKER_SRC },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo", src: MARKER_SRC },
  { lat: 25.2048, lng: 55.2708, label: "Dubai", src: MARKER_SRC },
];

/** "Built here, sourced worldwide" — an interactive 3D globe of Freewill's reach. */
export default function HomeGlobe() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section
      id="fw-globe"
      className="box-border overflow-hidden px-[6vw] text-[#F6F4EC]"
      style={{ background: "#0B1020", paddingBlock: "clamp(72px,9vw,140px)" }}
    >
      <div className="grid items-center gap-[clamp(40px,6vw,90px)] lg:grid-cols-2">
        <FwReveal>
          <div className="mb-5 flex items-center gap-3">
            <span className="block h-0.5 w-7" style={{ background: "#5E93FF" }} />
            <span className="text-xs font-bold tracking-[0.28em] text-[#9FC0FF]">
              GLOBAL REACH
            </span>
          </div>
          <h2
            className="m-0 mb-[26px] font-display uppercase leading-[0.96]"
            style={{ fontSize: "clamp(40px,5vw,86px)" }}
          >
            Built here.
            <br />
            Sourced <span style={{ color: "#5E93FF" }}>worldwide.</span>
          </h2>
          <p className="m-0 mb-9 max-w-[460px] text-base leading-[1.8] text-[#F6F4EC]/[0.66]">
            From our base in Pune, Freewill delivers and installs across the
            subcontinent and beyond — partnering with the world&apos;s leading
            manufacturers to bring Olympic-grade systems to every arena.
          </p>
          <div className="flex flex-col gap-3.5">
            {REGIONS.map((r) => (
              <div
                key={r.name}
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
        </FwReveal>

        <FwReveal className="flex items-center justify-center">
          <div className="relative aspect-square w-[min(680px,94vw)] lg:-my-12" style={{ touchAction: "pan-y" }}>
            <Globe3D
              className="h-full w-full"
              markers={MARKERS}
              config={{
                atmosphereColor: "#4da6ff",
                atmosphereIntensity: 20,
                atmosphereBlur: 3,
                bumpScale: 5,
                autoRotateSpeed: 0.3,
              }}
              onMarkerHover={(marker) => setActive(marker?.label ?? null)}
              onMarkerClick={(marker) => setActive(marker.label ?? null)}
            />
            {/* Active-location readout (hover / tap a marker) */}
            <div
              className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-center transition-opacity duration-300"
              style={{
                background: "rgba(11,16,32,0.72)",
                border: "1px solid rgba(94,147,255,0.4)",
                backdropFilter: "blur(8px)",
                opacity: active ? 1 : 0,
              }}
            >
              <span className="flex items-center gap-2 font-mono text-[12px] tracking-[0.1em] text-[#9FC0FF]">
                <span className="block h-2 w-2 rounded-full" style={{ background: "#5E93FF" }} />
                {active ?? ""}
              </span>
            </div>
          </div>
        </FwReveal>
      </div>
    </section>
  );
}
