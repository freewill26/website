import { FwReveal } from "@/components/site/FwReveal";

/** Blog index hero — light cream band with the section headline. */
export default function BlogHero() {
  return (
    <section
      id="top"
      className="box-border bg-cream px-[6vw]"
      style={{ paddingBlock: "clamp(120px,14vw,200px) clamp(40px,5vw,72px)", scrollMarginTop: "104px" }}
    >
      <FwReveal className="mb-5 flex items-center gap-3">
        <span className="block h-0.5 w-7 bg-brand" />
        <span className="text-xs font-bold tracking-[0.3em] text-brand">
          THE BLOG
        </span>
      </FwReveal>
      <FwReveal
        as="h1"
        className="m-0 max-w-[1100px] font-display uppercase leading-[0.92] text-[#181A20]"
        style={{ fontSize: "clamp(52px,8vw,150px)", textWrap: "balance" }}
      >
        Field notes.
      </FwReveal>
      <FwReveal
        as="p"
        className="m-0 mt-7 max-w-[640px] leading-[1.7] text-[#181A20]/[0.66]"
        style={{ fontSize: "clamp(16px,1.5vw,20px)" }}
      >
        Buyer&apos;s guides, maintenance know-how and design insight from 35 years
        of surfacing, seating and equipping India&apos;s arenas — written by the
        people who lay the floor.
      </FwReveal>
    </section>
  );
}
