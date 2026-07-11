import Link from "next/link";
import Image from "next/image";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";
import { ROUTES } from "@/lib/navigation";
import type { ProductFamily } from "@/lib/productFamily";
import { ArrowLeftIcon } from "@/components/ui/icons";

/** Freewill Product hero — dark arena backdrop, family name and headline stats. */
export default function ProductFamilyHero({ family }: { family: ProductFamily }) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden"
      style={{ background: "#0F1428", scrollMarginTop: "104px" }}
    >
      {family.heroImage ? (
        <Image
          src={family.heroImage}
          alt={family.nameLead}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-center opacity-40"
        />
      ) : (
        <ImageSlot tone="light" label="Court photo" className="absolute inset-0 h-full w-full" />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,20,40,0.6) 0%, rgba(15,20,40,0.2) 38%, rgba(15,20,40,0.88) 100%)",
        }}
      />

      <div className="relative box-border px-[6vw] pb-[clamp(56px,7vw,104px)]">
        <FwReveal className="mb-[26px] flex flex-wrap items-center gap-3.5">
          <Link
            href={ROUTES.products}
            className="text-xs font-bold tracking-[0.2em] text-[#9FC0FF] no-underline transition-colors hover:text-white"
          >
            <span className="inline-flex items-center gap-2"><ArrowLeftIcon size={12} color="9FC0FF" /> {family.parent}</span>
          </Link>
          <span className="text-xs font-bold tracking-[0.2em] text-[#F6F4EC]/40">
            / {family.index}
          </span>
        </FwReveal>

        <MaskedHeading
          as="h1"
          className="m-0 font-display uppercase leading-[0.86] text-[#F6F4EC]"
          style={{ fontSize: "clamp(46px,15vw,260px)" }}
          lines={[
            <>
              {family.nameLead}
              {family.mark && <span style={{ color: "#5FD0E0" }}>{family.mark}</span>}
            </>,
          ]}
        />

        <div className="mt-7 flex flex-wrap items-end justify-between gap-7">
          <FwReveal
            as="p"
            className="m-0 max-w-[560px] leading-[1.7] text-[#F6F4EC]/85"
            style={{ fontSize: "clamp(16px,1.6vw,21px)" }}
          >
            {family.tagline}
          </FwReveal>
          <FwReveal className="flex gap-9">
            {family.heroStats.map((s) => (
              <div key={s.label}>
                <div
                  className="font-display leading-none text-[#F6F4EC]"
                  style={{ fontSize: "clamp(30px,3vw,46px)" }}
                >
                  {s.value}
                  <span style={{ fontSize: "0.45em", color: "#5FD0E0" }}>{s.unit}</span>
                </div>
                <div className="mt-1.5 text-[11px] font-bold tracking-[0.16em] text-[#F6F4EC]/55">
                  {s.label}
                </div>
              </div>
            ))}
          </FwReveal>
        </div>
      </div>

      <div
        className="absolute right-[6vw] top-[18vh] text-[10px] font-bold tracking-[0.3em] text-[#F6F4EC]/50"
        style={{ writingMode: "vertical-rl" }}
      >
        SCROLL TO EXPLORE ▾
      </div>
    </section>
  );
}
