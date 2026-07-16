import { FwReveal } from "@/components/site/FwReveal";
import EnquiryForm from "@/components/site/EnquiryForm";
import { mailHref, mapEmbedUrl, telHref, whatsappHref } from "@/lib/api/contact";

interface ContactBodyProps {
  options: string[];
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  mapUrl: string;
}

/** Contact body — enquiry form beside the contact channels and map. */
export default function ContactBody({ options, address, email, phone, whatsapp, mapUrl }: ContactBodyProps) {
  const channels = [
    { label: "OFFICE", value: address, href: mapUrl },
    { label: "EMAIL", value: email, href: mailHref(email) },
    { label: "PHONE", value: phone, href: telHref(phone) },
    { label: "WHATSAPP", value: whatsapp, href: whatsappHref(whatsapp) },
  ];

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
              {channels.map((c) => (
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
                  <div className="whitespace-pre-line text-[15px] leading-[1.7] text-[#181A20] transition-colors group-hover:text-brand">
                    {c.value}
                  </div>
                </a>
              ))}
            </div>
          </FwReveal>

          {/* Form */}
          <FwReveal>
            <EnquiryForm
              options={options}
              selectLabel="PROJECT TYPE"
              cardBg="#F6F1E6"
              fieldBg="#FFFFFF"
              whatsapp={whatsapp}
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
          <div
            className="relative aspect-[16/6] w-full overflow-hidden"
            style={{ borderRadius: "18px" }}
          >
            <iframe
              src={mapEmbedUrl(mapUrl, address)}
              title="Freewill office location"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 top-3 rounded-md bg-white/95 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-[#181A20] no-underline shadow-sm transition-colors hover:text-brand"
            >
              OPEN IN GOOGLE MAPS
            </a>
          </div>
        </FwReveal>
      </section>
    </>
  );
}
