import { FwReveal } from "@/components/site/FwReveal";
import EnquiryForm from "@/components/site/EnquiryForm";
import { getContactChannels } from "@/lib/api/contact";

/** "Plan your next sports venue" enquiry block closing the About page. */
export default async function AboutContact({ options }: { options: string[] }) {
  const { email, phone, whatsapp } = await getContactChannels();
  return (
    <section
      id="fw-contact"
      className="box-border bg-cream px-[6vw] text-[#111820]"
      style={{ paddingBlock: "clamp(72px,9vw,150px)", scrollMarginTop: "104px" }}
    >
      <div className="grid items-center gap-[clamp(40px,6vw,90px)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <FwReveal>
          <div className="mb-5 flex items-center gap-3">
            <span className="block h-0.5 w-7 bg-brand" />
            <span className="text-xs font-bold tracking-[0.28em] text-brand">
              GET IN TOUCH
            </span>
          </div>
          <h2
            className="m-0 mb-[26px] font-display uppercase leading-[0.94]"
            style={{ fontSize: "clamp(34px,6vw,118px)", textWrap: "balance" }}
          >
            Plan your next sports venue.
          </h2>
          <p className="m-0 mb-9 max-w-[440px] text-base leading-[1.8] text-[#181A20]/[0.66]">
            Tell us the sport, the area and your timeline. We&apos;ll recommend
            the right surface and return a no-obligation estimate within one
            working day.
          </p>
          <div className="flex flex-wrap gap-10">
            <div>
              <div className="mb-1.5 text-[11px] font-bold tracking-[0.22em] text-[#181A20]/45">
                EMAIL
              </div>
              <div className="text-[15px]">{email}</div>
            </div>
            <div>
              <div className="mb-1.5 text-[11px] font-bold tracking-[0.22em] text-[#181A20]/45">
                PHONE
              </div>
              <div className="text-[15px]">{phone}</div>
            </div>
          </div>
        </FwReveal>

        <FwReveal>
          <EnquiryForm
            options={options}
            selectLabel="SURFACE / PRODUCT"
            cardBg="#FFFFFF"
            fieldBg="#F6F1E6"
            whatsapp={whatsapp}
          />
        </FwReveal>
      </div>
    </section>
  );
}
