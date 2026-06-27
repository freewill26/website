import { FwReveal } from "@/components/site/FwReveal";
import EnquiryForm from "@/components/site/EnquiryForm";

const OPTIONS = [
  "Indoor Surfaces",
  "Outdoor Surfaces",
  "Seating & Structures",
  "Equipment & Pickleball",
  "Not sure — need advice",
];

/** Dark "Get in touch" enquiry block closing the Products index. */
export default function ProductsContact() {
  return (
    <section
      id="fw-contact"
      className="box-border px-[6vw] text-[#F6F4EC]"
      style={{ background: "#0F1428", paddingBlock: "clamp(72px,9vw,150px)", scrollMarginTop: "104px" }}
    >
      <div className="grid items-center gap-[clamp(40px,6vw,90px)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <FwReveal>
          <div className="mb-5 flex items-center gap-3">
            <span className="block h-0.5 w-7" style={{ background: "#5E93FF" }} />
            <span className="text-xs font-bold tracking-[0.28em] text-[#9FC0FF]">
              GET IN TOUCH
            </span>
          </div>
          <h2
            className="m-0 mb-[26px] font-display uppercase leading-[0.94]"
            style={{ fontSize: "clamp(44px,6vw,112px)", textWrap: "balance" }}
          >
            Spec&apos;d your
            <br />
            project yet?
          </h2>
          <p className="m-0 mb-9 max-w-[460px] text-base leading-[1.8] text-[#F6F4EC]/70">
            Send us your venue, sport and timeline. Our team will recommend the
            right system and return a no-obligation estimate within one working
            day.
          </p>
          <div className="flex flex-wrap gap-10">
            <div>
              <div className="mb-1.5 text-[11px] font-bold tracking-[0.22em] text-[#F6F4EC]/45">
                EMAIL
              </div>
              <div className="text-[15px]">info@freewill.co.in</div>
            </div>
            <div>
              <div className="mb-1.5 text-[11px] font-bold tracking-[0.22em] text-[#F6F4EC]/45">
                PHONE
              </div>
              <div className="text-[15px]">+91 20661 14215</div>
            </div>
          </div>
        </FwReveal>

        <FwReveal>
          <EnquiryForm
            tone="dark"
            options={OPTIONS}
            selectLabel="SYSTEM OF INTEREST"
            cardBg="rgba(255,255,255,0.05)"
            fieldBg="rgba(255,255,255,0.06)"
          />
        </FwReveal>
      </div>
    </section>
  );
}
