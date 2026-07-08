import Link from "next/link";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";

/** About hero — gridded navy backdrop with a shimmering gradient wordmark. */
export default function AboutHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: "#0A0E1C" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 30% 40%, #14233d 0%, #0b1324 55%, #0A0E1C 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg,rgba(10,14,28,0.92) 0%,rgba(10,14,28,0.6) 45%,rgba(10,14,28,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(95,208,224,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(95,208,224,0.06) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 30% 50%, #000 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 30% 50%, #000 0%, transparent 75%)",
        }}
      />

      <div className="relative z-[1] box-border w-full px-[6vw]">
        <FwReveal className="mb-[30px] flex items-center gap-3">
          <span className="block h-0.5 w-[30px]" style={{ background: "#5FD0E0" }} />
          <span className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#9FE4EF]">
            Est. 1990 · Pune, India
          </span>
        </FwReveal>

        <MaskedHeading
          as="h1"
          className="m-0 font-display uppercase leading-[1.04] text-[#F6F4EC]"
          style={{ fontSize: "clamp(58px,11vw,200px)" }}
          lines={[
            "Welcome to",
            <span
              className="fw-anim-shimmer inline-block bg-clip-text text-transparent"
              style={{
                background:
                  "linear-gradient(90deg,#5FD0E0 0%,#00687F 22%,#C3F53C 50%,#1FA95B 72%,#5FD0E0 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Freewill
            </span>,
          ]}
        />

        <div className="mt-9 flex flex-wrap items-end justify-between gap-7">
          <FwReveal
            as="p"
            className="m-0 max-w-[540px] leading-[1.7] text-[#F6F4EC]/[0.82]"
            style={{ fontSize: "clamp(16px,1.6vw,21px)" }}
          >
            The Most Innovative Sports Infrastructure Company in India — building
            the ground a billion people play on.
          </FwReveal>
          <FwReveal as="div">
            <Link
              href="#fw-manifesto"
              className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#F6F4EC] no-underline transition-colors hover:border-white hover:bg-white/10"
              style={{ borderColor: "rgba(246,244,236,0.4)" }}
            >
              Our Story ↓
            </Link>
          </FwReveal>
        </div>
      </div>

      <div
        className="absolute bottom-[34px] left-1/2 h-[46px] w-px -translate-x-1/2 overflow-hidden"
        style={{ background: "rgba(246,244,236,0.2)" }}
      >
        <div className="fw-anim-cue h-3.5 w-full" style={{ background: "#5FD0E0" }} />
      </div>
    </section>
  );
}
