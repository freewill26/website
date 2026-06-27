import Link from "next/link";
import { FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";

/** "About Freewill" split: copy on the left, layered photo collage on the right. */
export default function HomeAbout() {
  return (
    <section
      id="fw-about"
      className="box-border bg-white px-[6vw] text-[#181A20]"
      style={{ paddingBlock: "clamp(72px,9vw,140px)", scrollMarginTop: "104px" }}
    >
      <div className="grid items-center gap-[clamp(40px,6vw,96px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <FwReveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="block h-0.5 w-7 bg-brand" />
            <span className="text-xs font-bold tracking-[0.28em] text-brand">
              ABOUT FREEWILL
            </span>
          </div>
          <h2
            className="m-0 mb-7 font-display uppercase leading-none text-[#181A20]"
            style={{ fontSize: "clamp(36px,4.4vw,68px)" }}
          >
            World-class grounds, built in India.
          </h2>
          <p className="m-0 mb-[18px] max-w-[520px] text-base leading-[1.8] text-[#181A20]/[0.68]">
            For 33 years, Freewill has built the ground India plays on — sports
            flooring, stadium seating and competition equipment for the country&apos;s
            biggest stages, from the National Games to the Hockey World Cup.
          </p>
          <p className="m-0 mb-9 max-w-[520px] text-base leading-[1.8] text-[#181A20]/[0.68]">
            As the exclusive Indian partner of Gerflor, Connor Sports, Sport Court
            and Spieth Gymnastics, we bring Olympic-grade systems to every court,
            hall and arena we touch.
          </p>
          <Link
            href="/about"
            className="inline-block rounded-full bg-[#181A20] px-8 py-[18px] text-[13px] font-bold tracking-[0.1em] text-white no-underline transition-colors hover:bg-brand"
          >
            MORE ABOUT US
          </Link>
        </FwReveal>

        <FwReveal className="relative min-h-[440px] lg:min-h-[560px]">
          <ImageSlot
            label="Flagship arena"
            className="absolute right-0 top-0 h-[88%] w-[78%]"
            shape="rounded"
          />
          <ImageSlot
            label="Install detail"
            className="absolute bottom-0 left-0 h-[42%] w-[42%]"
            shape="rounded"
            style={{
              boxShadow: "0 32px 64px rgba(24,26,32,0.22)",
              outline: "10px solid #FFFFFF",
            }}
          />
          <div
            className="absolute left-[8%] top-[4%] max-w-[240px] rounded-md bg-brand px-6 py-5 text-white"
            style={{ boxShadow: "0 24px 48px rgba(0,104,127,0.30)" }}
          >
            <div className="font-display text-[30px] leading-none">33 YRS</div>
            <div className="mt-1.5 text-xs font-semibold leading-[1.5] tracking-[0.06em] opacity-90">
              of building India&apos;s sports landscape
            </div>
          </div>
        </FwReveal>
      </div>
    </section>
  );
}
