import Image from "next/image";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import type { AboutAwardVM } from "@/lib/api/about";

/**
 * Recognition panel on the dark navy band — one award: an image beside a
 * heading and a short description, all authored in the CMS
 * (About page → "Award Section").
 */
export default function AboutAward({ award }: { award: AboutAwardVM }) {
  return (
    <section
      id="fw-award"
      className="box-border px-[6vw] text-[#F6F4EC]"
      style={{ background: "#11162A", paddingBlock: "clamp(80px,9vw,150px)" }}
    >
      <div className="flex flex-col items-center gap-[clamp(32px,5vw,72px)] md:flex-row">
        <FwReveal className="w-full md:w-[46%]">
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
            style={{ background: "#1B2238" }}
          >
            <Image
              src={award.image}
              alt={award.headline}
              fill
              sizes="(min-width: 768px) 42vw, 88vw"
              className="absolute inset-0 object-cover object-center"
            />
          </div>
        </FwReveal>

        <div className="min-w-0 flex-1">
          <FwReveal className="mb-4 flex items-center gap-3">
            <span className="block h-0.5 w-7" style={{ background: "#5FD0E0" }} />
            <span className="text-xs font-bold tracking-[0.28em] text-[#9FE4EF]">
              {award.title.toUpperCase()}
            </span>
          </FwReveal>

          <MaskedHeading
            className="m-0 font-display uppercase leading-[1.05] text-[#F6F4EC]"
            style={{ fontSize: "clamp(30px,3.6vw,58px)" }}
            lines={[award.headline]}
          />

          <FwReveal
            as="p"
            className="m-0 mt-[clamp(18px,2vw,28px)] max-w-[560px] leading-[1.8] text-[#F6F4EC]/60"
            style={{ fontSize: "clamp(15px,1.4vw,18px)" }}
          >
            {award.description}
          </FwReveal>
        </div>
      </div>
    </section>
  );
}
