import { FwReveal } from "@/components/site/FwReveal";
import EnquiryForm from "@/components/site/EnquiryForm";
import ImageSlot from "@/components/site/ImageSlot";

const CHANNELS = [
  { label: "OFFICE", value: "6, Premier Plaza-II, Mumbai–Pune Highway, Chinchwad, Pune 411019", href: "https://maps.google.com/?q=Premier+Plaza+II+Chinchwad+Pune" },
  { label: "EMAIL", value: "info@freewill.co.in", href: "mailto:info@freewill.co.in" },
  { label: "PHONE", value: "+91 20661 14215", href: "tel:+912066114215" },
  { label: "WHATSAPP", value: "+91 20661 14215", href: "https://wa.me/912066114215" },
];

const HOURS = [
  { d: "Mon — Fri", h: "9:30 — 18:30" },
  { d: "Saturday", h: "9:30 — 14:00" },
  { d: "Sunday", h: "Closed" },
];

/** Contact body — enquiry form beside the contact channels, hours and map. */
export default function ContactBody({ options }: { options: string[] }) {
  return (
    <>
      <section
        className="box-border bg-cream px-[6vw]"
        style={{ paddingBlock: "0 clamp(72px,9vw,140px)" }}
      >
        <div className="grid gap-[clamp(40px,6vw,90px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Channels */}
          <FwReveal>
            <h2 className="m-0 mb-7 font-display text-[clamp(26px,3vw,40px)] uppercase leading-[1.05] text-[#181A20]">
              Talk to the team.
            </h2>
            <div className="flex flex-col gap-[22px]">
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group block no-underline"
                >
                  <div className="mb-1.5 text-[11px] font-bold tracking-[0.22em] text-[#181A20]/45">
                    {c.label}
                  </div>
                  <div className="text-[15px] leading-[1.7] text-[#181A20] transition-colors group-hover:text-brand">
                    {c.value}
                  </div>
                </a>
              ))}
            </div>

            <div
              className="mt-9 rounded-[18px] bg-white p-7"
              style={{ border: "1px solid rgba(24,26,32,0.08)" }}
            >
              <div className="mb-4 text-[11px] font-bold tracking-[0.22em] text-[#181A20]/45">
                OFFICE HOURS
              </div>
              <dl className="m-0 flex flex-col gap-3">
                {HOURS.map((row) => (
                  <div key={row.d} className="flex items-baseline justify-between gap-4">
                    <dt className="text-[14px] text-[#181A20]/60">{row.d}</dt>
                    <dd className="m-0 text-[14px] font-semibold text-[#181A20]">{row.h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FwReveal>

          {/* Form */}
          <FwReveal>
            <EnquiryForm
              options={options}
              selectLabel="PROJECT TYPE"
              cardBg="#F6F1E6"
              fieldBg="#FFFFFF"
            />
          </FwReveal>
        </div>
      </section>

      {/* Map band */}
      <section className="box-border bg-white px-[6vw]" style={{ paddingBlock: "clamp(56px,7vw,96px)" }}>
        <FwReveal className="mb-7 flex items-center gap-3">
          <span className="block h-0.5 w-7 bg-brand" />
          <span className="text-xs font-bold tracking-[0.28em] text-brand">FIND US</span>
        </FwReveal>
        <FwReveal>
          <a
            href="https://maps.google.com/?q=Premier+Plaza+II+Chinchwad+Pune"
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline"
          >
            <ImageSlot
              label="Pune · Chinchwad"
              shape="rounded"
              className="aspect-[16/6] w-full"
              style={{ borderRadius: "18px" }}
            />
          </a>
        </FwReveal>
      </section>
    </>
  );
}
