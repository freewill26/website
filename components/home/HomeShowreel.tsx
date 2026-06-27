"use client";

import { useState } from "react";
import { PlayIcon, PauseIcon } from "@/components/ui/icons";

const YT_ID = "aqz-KE-bpKQ";

/** Full-bleed YouTube showreel behind a glass call-to-play card. */
export default function HomeShowreel() {
  const [muted, setMuted] = useState(true);
  const src = `https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=${
    muted ? 1 : 0
  }&loop=1&playlist=${YT_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1`;

  return (
    <section
      id="fw-reel"
      className="relative h-screen min-h-[560px] overflow-hidden"
      style={{ background: "#E7DECB" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          key={src}
          src={src}
          title="Freewill showreel"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
          style={{ width: "100vw", height: "56.25vw", minHeight: "100vh", minWidth: "177.78vh" }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 85% at 50% 48%, rgba(241,234,216,0.08) 0%, rgba(241,234,216,0.5) 56%, rgba(241,234,216,0.95) 100%)",
        }}
      />

      <div className="absolute inset-0 box-border flex flex-col items-center justify-center px-[6vw] text-center">
        <div
          className="max-w-[760px] rounded-3xl border p-[clamp(32px,4vw,56px)]"
          style={{
            background: "rgba(250,246,236,0.78)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderColor: "rgba(24,26,32,0.08)",
            boxShadow: "0 40px 100px rgba(24,26,32,0.16)",
          }}
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="block h-0.5 w-7 bg-brand" />
            <span className="text-xs font-bold tracking-[0.3em] text-brand">
              THE FREEWILL SHOWREEL
            </span>
            <span className="block h-0.5 w-7 bg-brand" />
          </div>
          <h2
            className="m-0 font-display uppercase leading-[0.92] text-[#181A20]"
            style={{ fontSize: "clamp(48px,8vw,140px)", textWrap: "balance" }}
          >
            See it in <span className="text-brand">play.</span>
          </h2>
          <p className="mx-auto mb-[30px] mt-[22px] max-w-[480px] text-base leading-[1.7] text-[#181A20]/70">
            Three decades of arenas, courts and podiums — built, surfaced and
            equipped by Freewill. Press play.
          </p>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="inline-flex items-center gap-3.5 rounded-full border border-[#181A20] bg-[#181A20] px-[26px] py-[15px] text-white transition-colors hover:border-brand hover:bg-brand"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand">
              {muted ? <PlayIcon size={14} color="FFFFFF" /> : <PauseIcon size={14} color="FFFFFF" />}
            </span>
            <span className="text-[13px] font-bold tracking-[0.14em]">
              {muted ? "PLAY WITH SOUND" : "MUTE SHOWREEL"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
