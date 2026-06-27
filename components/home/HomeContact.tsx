import { FwReveal } from "@/components/site/FwReveal";
import EnquiryForm from "@/components/site/EnquiryForm";

const OPTIONS = [
  "Sports Flooring",
  "Stadium Seating",
  "Gymnastics Equipment",
  "Artificial Turf",
  "Pickleball Court",
  "Other / Consultation",
];

/** "Get in touch" — contact details beside the enquiry form. */
export default function HomeContact() {
  return (
    <section
      id="fw-contact"
      className="box-border bg-white px-[6vw]"
      style={{ paddingBlock: "clamp(72px,8vw,140px)", scrollMarginTop: "104px" }}
    >
      <div className="grid gap-[clamp(40px,6vw,90px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <FwReveal>
          <div className="mb-5 flex items-center gap-3">
            <span className="block h-0.5 w-7 bg-brand" />
            <span className="text-xs font-bold tracking-[0.28em] text-brand">
              GET IN TOUCH
            </span>
          </div>
          <h2
            className="m-0 mb-6 font-display uppercase leading-none text-[#181A20]"
            style={{ fontSize: "clamp(38px,4.4vw,68px)" }}
          >
            Request a quote or a site visit.
          </h2>
          <p className="m-0 mb-9 max-w-[420px] text-base leading-[1.8] text-[#181A20]/[0.66]">
            Tell us about your project — new build, retrofit or consultation. Our
            team responds within one working day.
          </p>
          <div className="flex flex-col gap-[22px]">
            <Detail label="OFFICE">
              6, Premier Plaza-II, Mumbai–Pune Highway, Chinchwad, Pune 411019
            </Detail>
            <div className="flex flex-wrap gap-12">
              <Detail label="EMAIL">info@freewill.co.in</Detail>
              <Detail label="PHONE">+91 20661 14215</Detail>
            </div>
          </div>
        </FwReveal>

        <FwReveal>
          <EnquiryForm
            options={OPTIONS}
            selectLabel="PROJECT TYPE"
            cardBg="#F6F1E6"
            fieldBg="#FFFFFF"
          />
        </FwReveal>
      </div>
    </section>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-bold tracking-[0.22em] text-[#181A20]/45">
        {label}
      </div>
      <div className="text-[15px] leading-[1.7] text-[#181A20]">{children}</div>
    </div>
  );
}
