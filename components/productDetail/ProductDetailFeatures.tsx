import Image from "next/image";
import { FwReveal } from "@/components/site/FwReveal";
import type { ApiProductFeature } from "@/lib/api/types";

/**
 * "Why choose this" — the CMS feature strip: an icon, a title and one
 * supporting line per item, laid out as an evenly divided row (wrapping to a
 * grid on narrow screens). Renders nothing when the product has no features.
 */
export default function ProductDetailFeatures({
  features,
  productTitle,
}: {
  features: ApiProductFeature[];
  productTitle: string;
}) {
  if (!features?.length) return null;

  return (
    <section
      className="box-border bg-[#F4F6F9] px-[6vw] text-[#181A20]"
      style={{ paddingBlock: "clamp(56px,7vw,110px)" }}
    >
      <FwReveal className="mb-[clamp(32px,4vw,56px)] flex items-center justify-center gap-4">
        <span className="hidden h-0.5 flex-1 max-w-[160px] bg-[#2F6BFF]/40 sm:block" />
        <h2
          className="m-0 text-center font-display uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(22px,2.6vw,36px)", color: "#16305C" }}
        >
          Why choose our {productTitle}?
        </h2>
        <span className="hidden h-0.5 flex-1 max-w-[160px] bg-[#2F6BFF]/40 sm:block" />
      </FwReveal>

      <FwReveal
        as="ul"
        className="m-0 grid list-none grid-cols-2 gap-y-10 p-0 sm:grid-cols-3 lg:grid-cols-5"
      >
        {features.map((feature, i) => (
          <li
            key={`${feature.title}-${i}`}
            className="flex flex-col items-center px-4 text-center lg:border-l lg:border-[#16305C]/15 lg:first:border-l-0"
          >
            {/* Icons are optional — a feature can be authored before its
                artwork exists, and next/image throws on an empty src. */}
            {feature.image && (
              <div className="relative mb-4 h-[clamp(48px,5vw,72px)] w-[clamp(48px,5vw,72px)]">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt || feature.title}
                  fill
                  sizes="72px"
                  className="object-contain object-center"
                />
              </div>
            )}
            <h3
              className="m-0 mb-2 font-display uppercase leading-tight"
              style={{ fontSize: "clamp(14px,1.2vw,18px)", color: "#16305C" }}
            >
              {feature.title}
            </h3>
            {feature.description && (
              <p className="m-0 max-w-[220px] text-sm leading-[1.6] text-[#181A20]/70">
                {feature.description}
              </p>
            )}
          </li>
        ))}
      </FwReveal>
    </section>
  );
}
