import Image from "next/image";
import { FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";
import type { NewsCardVM } from "@/lib/api/home";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Latest-news strip — three full-bleed editorial cards. */
export default function HomeNews({ news }: { news: NewsCardVM[] }) {
  return (
    <section
      id="fw-news"
      className="bg-cream"
      style={{ paddingBlock: "clamp(72px,8vw,128px)", scrollMarginTop: "104px" }}
    >
      <FwReveal className="flex flex-wrap items-end justify-between gap-5 px-[6vw] pb-[clamp(32px,4vw,52px)]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-0.5 w-7 bg-brand" />
            <span className="text-xs font-bold tracking-[0.28em] text-brand">
              LATEST NEWS
            </span>
          </div>
          <h2
            className="m-0 font-display uppercase leading-none text-[#181A20]"
            style={{ fontSize: "clamp(36px,4.6vw,72px)" }}
          >
            On the ground.
          </h2>
        </div>
        <a
          href="/news"
          className="rounded-full border px-[26px] py-3.5 text-[13px] font-bold tracking-[0.1em] text-[#181A20] no-underline transition-colors hover:border-brand hover:text-brand"
          style={{ borderColor: "rgba(24,26,32,0.32)" }}
        >
          <span className="inline-flex items-center gap-2">ALL NEWS <ArrowRightIcon size={13} color="181A20" /></span>
        </a>
      </FwReveal>

      <div className="grid gap-5 px-[6vw] md:grid-cols-3">
        {news.map((n) => (
          <FwReveal key={n.id}>
            <article
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white transition-colors hover:border-brand/50"
              style={{ border: "1px solid rgba(24,26,32,0.08)" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {n.image ? (
                  <Image
                    src={n.image}
                    alt={n.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="absolute inset-0 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ImageSlot label="News" className="absolute inset-0 h-full w-full" />
                )}
                <span className="absolute left-3.5 top-3.5 rounded-full bg-brand px-3 py-[7px] text-[10px] font-bold tracking-[0.14em] text-white z-10">
                  {n.cat}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-[26px]">
                <div className="mb-3 text-xs font-semibold tracking-[0.1em] text-[#181A20]/50">
                  {n.date}
                </div>
                <h3 className="m-0 mb-3 font-display text-[23px] uppercase leading-[1.18] text-[#181A20]">
                  {n.title}
                </h3>
                <p className="m-0 mb-5 text-sm leading-[1.75] text-[#181A20]/[0.62]">
                  {n.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-brand">
                  READ MORE <ArrowRightIcon size={12} color="00687F" />
                </span>
              </div>
            </article>
          </FwReveal>
        ))}
      </div>
    </section>
  );
}
