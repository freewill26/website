import Link from "next/link";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";

interface AboutHeroProps {
  /** Eyebrow line above the wordmark. */
  title: string;
  /** Sanitized rich-text headline; any `<strong>` renders in the brand gradient. */
  headlineHtml: string;
  description: string;
  /** Full-bleed background photo behind the navy gradients. */
  backgroundImage: string;
}

/** About hero — stadium photo under navy gradients with a shimmering gradient wordmark. */
export default function AboutHero({ title, headlineHtml, description, backgroundImage }: AboutHeroProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: "#0A0E1C" }}
    >
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 30% 40%, rgba(20,35,61,0.55) 0%, rgba(11,19,36,0.72) 55%, rgba(10,14,28,0.88) 100%)",
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
            {title}
          </span>
        </FwReveal>

        <MaskedHeading
          as="h1"
          className="fw-hero-headline m-0 font-display uppercase leading-[1.04] text-[#F6F4EC]"
          style={{ fontSize: "clamp(58px,11vw,200px)" }}
          lines={[<span key="headline" dangerouslySetInnerHTML={{ __html: headlineHtml }} />]}
        />

        <div className="mt-9 flex flex-wrap items-end justify-between gap-7">
          <FwReveal
            as="p"
            className="m-0 max-w-[540px] leading-[1.7] text-[#F6F4EC]/[0.82]"
            style={{ fontSize: "clamp(16px,1.6vw,21px)" }}
          >
            {description}
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
