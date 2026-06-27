import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import { AWARDS } from "@/lib/aboutContent";

/** Recognition list on the dark panel. */
export default function AboutAwards() {
  return (
    <section
      id="fw-awards"
      className="box-border px-[6vw] text-[#F6F4EC]"
      style={{ background: "#11162A", paddingBlock: "clamp(80px,9vw,150px)" }}
    >
      <FwReveal className="mb-[clamp(40px,5vw,64px)]">
        <div className="mb-4 flex items-center gap-3">
          <span className="block h-0.5 w-7" style={{ background: "#5FD0E0" }} />
          <span className="text-xs font-bold tracking-[0.28em] text-[#9FE4EF]">
            RECOGNITION
          </span>
        </div>
        <MaskedHeading
          className="m-0 font-display uppercase leading-none text-[#F6F4EC]"
          style={{ fontSize: "clamp(42px,5.5vw,88px)" }}
          lines={[
            "Trusted on the",
            <span key="stages" style={{ color: "#5FD0E0" }}>
              biggest stages.
            </span>,
          ]}
        />
      </FwReveal>

      <div style={{ borderTop: "1px solid rgba(246,244,236,0.14)" }}>
        {AWARDS.map((aw) => (
          <FwReveal
            key={aw.title}
            className="flex items-center gap-[clamp(20px,4vw,64px)] py-[clamp(22px,2.6vw,34px)]"
            style={{ borderBottom: "1px solid rgba(246,244,236,0.14)" }}
          >
            <div
              className="w-[84px] flex-none font-mono text-[13px] tracking-[0.14em]"
              style={{ color: "#5FD0E0" }}
            >
              {aw.year}
            </div>
            <div className="min-w-0 flex-1">
              <div
                className="font-display uppercase leading-[1.05] text-[#F6F4EC]"
                style={{ fontSize: "clamp(22px,2.4vw,38px)" }}
              >
                {aw.title}
              </div>
            </div>
            <div className="max-w-[40%] flex-none text-right text-[13px] text-[#F6F4EC]/60">
              {aw.org}
            </div>
          </FwReveal>
        ))}
      </div>
    </section>
  );
}
