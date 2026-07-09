import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";
import ParallaxMedia from "@/components/site/ParallaxMedia";
import { LinkedInIcon, XTwitterIcon, FacebookIcon } from "@/components/ui/icons";
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

      <div className="mb-[clamp(56px,7vw,96px)] flex flex-col gap-[clamp(48px,6vw,88px)]">
        {FOUNDERS.map((f, i) => (
          <FwReveal key={f.name}>
            <div
              className={`flex flex-col items-stretch gap-8 lg:gap-14 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-ink-card lg:w-[38%]">
                <ParallaxMedia>
                  {f.image ? (
                    <img
                      src={f.image}
                      alt={f.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <ImageSlot label={f.name} className="absolute inset-0 h-full w-full" />
                  )}
                </ParallaxMedia>
              </div>

              <div className="flex flex-1 flex-col justify-center">
                <MaskedHeading
                  as="div"
                  className="mb-2 font-display uppercase leading-[1.02] text-[#111820]"
                  style={{ fontSize: "clamp(40px,5vw,68px)" }}
                  lines={[f.name]}
                />
                <div className="mb-5 text-xs font-bold tracking-[0.16em] text-brand">
                  {f.role}
                </div>
                <p
                  className="m-0 mb-7 max-w-[46ch] text-[15px] leading-[1.85] text-[#181A20]/[0.62]"
                >
                  {f.bio}
                </p>
                {f.social && (
                  <div className="flex items-center gap-3">
                    {f.social.linkedin && (
                      <a
                        href={f.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${f.name} on LinkedIn`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181A20]/[0.06] transition-colors hover:bg-brand/10"
                      >
                        <LinkedInIcon size={16} color="181A20" />
                      </a>
                    )}
                    {f.social.twitter && (
                      <a
                        href={f.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${f.name} on X`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181A20]/[0.06] transition-colors hover:bg-brand/10"
                      >
                        <XTwitterIcon size={16} color="181A20" />
                      </a>
                    )}
                    {f.social.facebook && (
                      <a
                        href={f.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${f.name} on Facebook`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181A20]/[0.06] transition-colors hover:bg-brand/10"
                      >
                        <FacebookIcon size={16} color="181A20" />
                      </a>
                    )}
                  </div>
                )}
                {f.quote && (
                  <div
                    className="mt-8 pl-5"
                    style={{ borderLeft: "2px solid rgba(0,104,127,0.3)" }}
                  >
                    <div className="mb-2 font-display leading-[0.5] text-brand" style={{ fontSize: "48px" }}>
                      &ldquo;
                    </div>
                    <p className="m-0 max-w-[42ch] font-display italic leading-[1.4] text-[#181A20]/80" style={{ fontSize: "clamp(17px,1.6vw,21px)", textTransform: "none" }}>
                      {f.quote}&rdquo;
                    </p>
                  </div>
                )}
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
                <ParallaxMedia scale={1.18}>
                  <ImageSlot label={e.name} className="absolute inset-0 h-full w-full" src={e.image} />
                </ParallaxMedia>
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
