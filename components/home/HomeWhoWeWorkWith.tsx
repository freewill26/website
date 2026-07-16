import Link from "next/link";
import Image from "next/image";
import { FwReveal } from "@/components/site/FwReveal";

interface HomeWhoWeWorkWithContent {
  headline: string;
  paragraph1: string;
  paragraph2: string;
  buttonLabel: string;
  buttonLink: string;
  image: string;
  audiences: string[];
}

/** "Who We Work With" split: portrait photo on the left, copy + audience tags on the right. */
export default function HomeWhoWeWorkWith({ content }: { content: HomeWhoWeWorkWithContent }) {
  return (
    <section
      id="fw-who-we-work-with"
      className="box-border bg-white px-[6vw] text-[#181A20]"
      style={{ paddingBlock: "clamp(72px,9vw,140px)", scrollMarginTop: "104px" }}
    >
      <div className="grid items-center gap-[clamp(40px,6vw,96px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <FwReveal className="relative aspect-[4/5] w-full overflow-hidden rounded-[6px]">
          <Image
            src={content.image}
            alt={content.headline}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </FwReveal>

        <FwReveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="block h-0.5 w-7 bg-brand" />
            <span className="text-xs font-bold tracking-[0.28em] text-brand">
              WHO WE WORK WITH
            </span>
          </div>
          <h2
            className="m-0 mb-7 font-display uppercase leading-none text-[#181A20]"
            style={{ fontSize: "clamp(36px,4.4vw,68px)" }}
          >
            {content.headline}
          </h2>
          <p className="m-0 mb-[18px] max-w-[560px] text-base leading-[1.8] text-[#181A20]/[0.68]">
            {content.paragraph1}
          </p>
          <p className="m-0 mb-9 max-w-[560px] text-base leading-[1.8] text-[#181A20]/[0.68]">
            {content.paragraph2}
          </p>
          <Link
            href={content.buttonLink}
            className="mb-11 inline-block rounded-full bg-[#181A20] px-8 py-[18px] text-[13px] font-bold tracking-[0.1em] text-white no-underline transition-colors hover:bg-brand"
          >
            {content.buttonLabel}
          </Link>

          <div className="flex flex-wrap gap-3">
            {content.audiences.map((audience) => (
              <span
                key={audience}
                className="rounded-full border border-[#181A20]/15 px-5 py-2.5 text-[13px] font-semibold text-[#181A20]/80"
              >
                {audience}
              </span>
            ))}
          </div>
        </FwReveal>
      </div>
    </section>
  );
}
