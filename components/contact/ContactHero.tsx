import { FwReveal } from "@/components/site/FwReveal";

/** Contact page hero — light cream band with the headline + intro. */
export default function ContactHero() {
  return (
    <section
      id="top"
      className="box-border bg-cream px-[6vw]"
      style={{ paddingBlock: "clamp(120px,14vw,200px) clamp(40px,5vw,72px)", scrollMarginTop: "104px" }}
    >
      <FwReveal className="mb-5 flex items-center gap-3">
        <span className="block h-0.5 w-7 bg-brand" />
        <span className="text-xs font-bold tracking-[0.3em] text-brand">
          GET IN TOUCH
        </span>
      </FwReveal>
      <FwReveal
        as="h1"
        className="m-0 max-w-[1100px] font-display uppercase leading-[0.92] text-[#181A20]"
        style={{ fontSize: "clamp(48px,7.4vw,140px)", textWrap: "balance" }}
      >
        Let&apos;s build your arena.
      </FwReveal>
      <FwReveal
        as="p"
        className="m-0 mt-7 max-w-[640px] leading-[1.7] text-[#181A20]/[0.66]"
        style={{ fontSize: "clamp(16px,1.5vw,20px)" }}
      >
        New build, retrofit or a quick consultation — tell us about your project
        and our team responds within one working day.
      </FwReveal>
    </section>
  );
}
