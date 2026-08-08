import Image from "next/image";
import { FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";
import type { ApiProductType } from "@/lib/api/types";

/**
 * "Product Types" — the variants a product comes in, authored in the CMS as a
 * photo, a name and one supporting line each and laid out as a card grid.
 * Renders nothing when the product has no types.
 */
export default function ProductDetailTypes({
  types,
  productTitle,
}: {
  types: ApiProductType[];
  productTitle: string;
}) {
  if (!types?.length) return null;

  return (
    <section
      className="box-border bg-cream px-[6vw] text-[#181A20]"
      style={{ paddingBlock: "clamp(64px,8vw,120px)" }}
    >
      <FwReveal className="mb-[clamp(32px,4vw,56px)] flex items-center gap-3">
        <span className="block h-0.5 w-7" style={{ background: "#2F6BFF" }} />
        <span className="text-xs font-bold tracking-[0.28em]" style={{ color: "#2F6BFF" }}>
          PRODUCT TYPES
        </span>
      </FwReveal>

      <FwReveal
        as="ul"
        className="m-0 grid list-none grid-cols-1 gap-[clamp(20px,2.5vw,32px)] p-0 sm:grid-cols-2 lg:grid-cols-3"
      >
        {types.map((type, i) => (
          <li
            key={`${type.title}-${i}`}
            className="flex flex-col overflow-hidden rounded-[14px] border border-[#16305C]/10 bg-white"
          >
            <div className="relative aspect-[4/3]">
              {/* A type can be authored before its photo exists — fall back to
                  the branded placeholder rather than an empty frame. */}
              {type.image ? (
                <Image
                  src={type.image}
                  alt={type.imageAlt || type.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover object-center"
                />
              ) : (
                <ImageSlot
                  label={`${productTitle} type`}
                  className="absolute inset-0 h-full w-full"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-6">
              <h3
                className="m-0 font-display uppercase leading-tight"
                style={{ fontSize: "clamp(16px,1.5vw,21px)", color: "#16305C" }}
              >
                {type.title}
              </h3>
              {type.description && (
                <p className="m-0 text-sm leading-[1.7] text-[#181A20]/70">
                  {type.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </FwReveal>
    </section>
  );
}
