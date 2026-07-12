import Link from "next/link";
import { FwReveal } from "@/components/site/FwReveal";
import type { ProductsPageContent } from "@/lib/api/products";

interface ProductsHeroProps {
  hero: ProductsPageContent["hero"];
}

/** Products index hero — dark arena backdrop with the page headline + CTAs. */
export default function ProductsHero({ hero }: ProductsHeroProps) {
  return (
    <section
      id="top"
      className="relative h-[92vh] min-h-[600px] overflow-hidden"
      style={{ background: "#0F1428", scrollMarginTop: "104px" }}
    >
      <img
        src={hero.backgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,20,40,0.62) 0%, rgba(15,20,40,0.35) 40%, rgba(15,20,40,0.85) 100%)",
        }}
      />
      <div className="absolute inset-0 box-border flex flex-col justify-end px-[6vw] pb-[clamp(56px,7vw,96px)]">
        <FwReveal className="mb-6 flex items-center gap-3">
          <span className="block h-0.5 w-7" style={{ background: "#5E93FF" }} />
          <span className="text-xs font-bold tracking-[0.3em] text-[#9FC0FF]">
            {hero.title.toUpperCase()}
          </span>
        </FwReveal>
        <FwReveal
          as="h1"
          className="m-0 max-w-[1100px] font-display uppercase leading-[0.92] text-[#F6F4EC]"
          style={{ fontSize: "clamp(34px,8.5vw,168px)", textWrap: "balance" }}
        >
          {hero.headline}
        </FwReveal>
        <FwReveal
          as="p"
          className="m-0 mt-7 max-w-[620px] leading-[1.7] text-[#F6F4EC]/[0.82]"
          style={{ fontSize: "clamp(16px,1.5vw,20px)" }}
        >
          {hero.description}
        </FwReveal>
        <FwReveal className="mt-9 flex flex-wrap gap-3.5">
          <Link
            href="#fw-cat-1"
            className="rounded-full bg-[#F6F4EC] px-[30px] py-[17px] text-[13px] font-bold tracking-[0.1em] text-[#0F1428] no-underline transition-colors hover:bg-white"
          >
            BROWSE CATEGORIES
          </Link>
          <Link
            href="#fw-contact"
            className="rounded-full border px-[30px] py-[17px] text-[13px] font-bold tracking-[0.1em] text-[#F6F4EC] no-underline transition-colors hover:bg-white/[0.08]"
            style={{ borderColor: "rgba(246,244,236,0.4)" }}
          >
            REQUEST A QUOTE
          </Link>
        </FwReveal>
      </div>
      <div
        className="absolute right-[6vw] bottom-[clamp(56px,7vw,96px)] text-[10px] font-bold tracking-[0.3em] text-[#F6F4EC]/55"
        style={{ writingMode: "vertical-rl" }}
      >
        SCROLL ▾
      </div>
    </section>
  );
}
