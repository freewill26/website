import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";
import { FOUNDERS, EMPLOYEES } from "@/lib/aboutContent";

/** Founders (large cards) and the wider team (compact cards). */
export default function AboutTeam() {
  return (
    <section
      id="fw-team"
      className="box-border bg-cream px-[6vw]"
      style={{ paddingBlock: "clamp(80px,9vw,150px)" }}
    >
      <FwReveal className="mb-[clamp(40px,5vw,64px)]">
        <div className="mb-4 flex items-center gap-3">
          <span className="block h-0.5 w-7 bg-brand" />
          <span className="text-xs font-bold tracking-[0.28em] text-brand">
            THE TEAM
          </span>
        </div>
        <MaskedHeading
          className="m-0 font-display uppercase leading-none text-[#111820]"
          style={{ fontSize: "clamp(42px,5.5vw,88px)" }}
          lines={["Our Founders."]}
        />
      </FwReveal>

      <div className="mb-[clamp(56px,7vw,96px)] grid gap-6 md:grid-cols-2">
        {FOUNDERS.map((f) => (
          <FwReveal key={f.name}>
            <div
              className="overflow-hidden rounded-2xl bg-white"
              style={{ boxShadow: "0 2px 20px rgba(24,26,32,0.09)" }}
            >
              <div className="relative aspect-[3/2] overflow-hidden" style={{ background: "#DCD3BE" }}>
                <ImageSlot label={f.name} className="absolute inset-0 h-full w-full" />
              </div>
              <div className="p-[clamp(22px,2.5vw,32px)]">
                <div
                  className="mb-1 font-display text-[#111820]"
                  style={{ fontSize: "clamp(22px,2.2vw,30px)" }}
                >
                  {f.name}
                </div>
                <div className="mb-3.5 text-[11px] font-bold tracking-[0.16em] text-brand">
                  {f.role}
                </div>
                <p className="m-0 text-sm leading-[1.8] text-[#181A20]/[0.62]">{f.bio}</p>
              </div>
            </div>
          </FwReveal>
        ))}
      </div>

      <FwReveal className="mb-[clamp(28px,3.5vw,44px)]">
        <MaskedHeading
          as="h3"
          className="m-0 font-display uppercase leading-none text-[#181A20]/50"
          style={{ fontSize: "clamp(28px,3.2vw,52px)" }}
          lines={["Our People."]}
        />
      </FwReveal>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {EMPLOYEES.map((e) => (
          <FwReveal key={e.name}>
            <div
              className="overflow-hidden rounded-xl bg-white"
              style={{ boxShadow: "0 1px 10px rgba(24,26,32,0.07)" }}
            >
              <div className="relative aspect-square overflow-hidden" style={{ background: "#DCD3BE" }}>
                <ImageSlot label={e.name} className="absolute inset-0 h-full w-full" />
              </div>
              <div className="px-[18px] pb-5 pt-4">
                <div className="mb-[3px] font-display text-[17px] text-[#111820]">
                  {e.name}
                </div>
                <div className="text-[10.5px] font-bold tracking-[0.14em] text-[#181A20]/[0.46]">
                  {e.role}
                </div>
              </div>
            </div>
          </FwReveal>
        ))}
      </div>
    </section>
  );
}
