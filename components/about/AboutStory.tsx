import Link from "next/link";
import { MaskedHeading, FwReveal, ClipReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";

interface AboutStoryProps {
  id: string;
  kicker: string;
  titleLines: React.ReactNode[];
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageLabel: string;
  imageSide: "left" | "right";
  /** `dark` swaps to the navy panel palette. */
  variant?: "cream" | "dark";
}

/** One alternating story row (image + copy) from the About narrative. */
export default function AboutStory({
  id,
  kicker,
  titleLines,
  body,
  ctaLabel,
  ctaHref,
  imageLabel,
  imageSide,
  variant = "cream",
}: AboutStoryProps) {
  const dark = variant === "dark";
  const accent = dark ? "#5FD0E0" : "#00687F";
  const kickerColor = dark ? "#9FE4EF" : "#00687F";

  const image = (
    <ClipReveal
      className="relative aspect-[4/5] w-full flex-none self-stretch overflow-hidden rounded-2xl md:w-[46%]"
      style={{ background: dark ? "#1B2238" : "#DCD3BE" }}
    >
      <ImageSlot
        tone={dark ? "light" : "dark"}
        label={imageLabel}
        className="absolute inset-0 h-full w-full"
      />
    </ClipReveal>
  );

  const copy = (
    <div
      className="min-w-0 flex-1"
      style={
        imageSide === "left"
          ? { paddingLeft: "clamp(0px,6vw,96px)" }
          : { paddingRight: "clamp(0px,6vw,96px)" }
      }
    >
      <FwReveal className="mb-[22px] flex items-center gap-3">
        <span className="block h-0.5 w-7" style={{ background: accent }} />
        <span className="text-xs font-bold tracking-[0.28em]" style={{ color: kickerColor }}>
          {kicker}
        </span>
      </FwReveal>
      <MaskedHeading
        className="m-0 mb-6 font-display uppercase leading-none"
        style={{ fontSize: "clamp(36px,4.4vw,72px)", color: dark ? "#F6F4EC" : "#111820" }}
        lines={titleLines}
      />
      <FwReveal
        as="p"
        className="m-0 mb-8 max-w-[480px] leading-[1.85]"
        style={{
          fontSize: "clamp(15px,1.4vw,18px)",
          color: dark ? "rgba(246,244,236,0.7)" : "rgba(24,26,32,0.66)",
        }}
      >
        {body}
      </FwReveal>
      <FwReveal as="div">
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 pb-[3px] text-xs font-bold tracking-[0.12em] no-underline transition-colors"
          style={{ color: accent, borderBottom: `1px solid ${accent}66` }}
        >
          {ctaLabel}
        </Link>
      </FwReveal>
    </div>
  );

  return (
    <section
      id={id}
      className="box-border overflow-hidden px-[6vw]"
      style={{
        background: dark ? "#11162A" : "#F1EAD8",
        color: dark ? "#F6F4EC" : "#111820",
        paddingBlock: "clamp(80px,9vw,150px)",
      }}
    >
      <div className="flex flex-col items-center gap-10 md:flex-row md:gap-0">
        {imageSide === "left" ? (
          <>
            {image}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {image}
          </>
        )}
      </div>
    </section>
  );
}
