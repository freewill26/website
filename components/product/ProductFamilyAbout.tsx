import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";
import type { ProductFamily } from "@/lib/productFamily";

/** "About the product" — copy + spec chips beside a detail photo. */
export default function ProductFamilyAbout({ family }: { family: ProductFamily }) {
  return (
    <section
      id="fw-about"
      className="box-border bg-white px-[6vw] text-[#181A20]"
      style={{ paddingBlock: "clamp(72px,9vw,150px)" }}
    >
      <div className="grid items-center gap-[clamp(40px,6vw,96px)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div>
          <FwReveal className="mb-6 flex items-center gap-3">
            <span className="block h-0.5 w-7" style={{ background: "#2F6BFF" }} />
            <span className="text-xs font-bold tracking-[0.28em]" style={{ color: "#2F6BFF" }}>
              ABOUT THE PRODUCT
            </span>
          </FwReveal>
          <MaskedHeading
            className="m-0 mb-7 font-display uppercase leading-none text-[#181A20]"
            style={{ fontSize: "clamp(34px,4.2vw,68px)" }}
            lines={family.aboutTitle}
          />
          {family.about.map((p, i) => (
            <FwReveal
              key={i}
              as="p"
              className="m-0 mb-[18px] max-w-[520px] text-base leading-[1.8] text-[#181A20]/70"
            >
              {p}
            </FwReveal>
          ))}
          <FwReveal className="mt-4 flex flex-wrap gap-2.5">
            {family.aboutChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full px-[18px] py-[11px] text-xs font-bold tracking-[0.08em] text-[#181A20]"
                style={{ background: "#F1EAD8", border: "1px solid rgba(24,26,32,0.12)" }}
              >
                {chip}
              </span>
            ))}
          </FwReveal>
        </div>

        <FwReveal className="relative aspect-[4/5]">
          <ImageSlot label="Surface detail" shape="rounded" className="absolute inset-0 h-full w-full" />
          <div
            className="absolute bottom-[8%] left-[-6%] rounded-lg px-[22px] py-[18px] text-white"
            style={{ background: "#2F6BFF", boxShadow: "0 24px 48px rgba(47,107,255,0.32)" }}
          >
            <div className="font-display text-[26px] leading-none">SINCE 1976</div>
            <div className="mt-1.5 text-xs font-semibold leading-[1.5] opacity-90">
              on every Olympic indoor court
            </div>
          </div>
        </FwReveal>
      </div>
    </section>
  );
}
