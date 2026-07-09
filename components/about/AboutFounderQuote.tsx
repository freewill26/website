import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";

/** Founder pull-quote on the deep-navy band. */
export default function AboutFounderQuote() {
  return (
    <section
      id="fw-quote"
      className="box-border px-[6vw] text-[#F6F4EC]"
      style={{ background: "#0A0E1C", paddingBlock: "clamp(90px,11vw,180px)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <FwReveal
          as="div"
          className="mb-6 select-none font-display leading-[0.6] text-brand"
          style={{ fontSize: "clamp(80px,9vw,150px)" }}
        >
          &ldquo;
        </FwReveal>
        <MaskedHeading
          as="blockquote"
          className="m-0 font-display uppercase leading-[1.18] text-[#F6F4EC]"
          style={{ fontSize: "clamp(28px,3.6vw,58px)" }}
          lines={[
            "Growth means nothing if it",
            "doesn't raise the standard",
            <span>
              for the <span style={{ color: "#5FD0E0" }}>athletes</span>
            </span>,
            "who play on what we build.",
          ]}
        />
        <FwReveal
          className="mt-[42px] flex items-center gap-4 pl-5"
          style={{ borderLeft: "2px solid #5FD0E0" }}
        >
          <div>
            <div className="font-display text-[22px] text-[#F6F4EC]">
              Rajesh Kharabanda
            </div>
            <div className="mt-1 text-[11px] font-bold tracking-[0.18em] text-[#9FE4EF]">
              CHAIRMAN, FREEWILL GROUP
            </div>
          </div>
        </FwReveal>
      </div>
    </section>
  );
}
