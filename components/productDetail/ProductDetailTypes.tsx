import Image from "next/image";
import { FwReveal } from "@/components/site/FwReveal";
import type { ApiProductType } from "@/lib/api/types";

/**
 * "Product Types" — the variants a product comes in, authored in the CMS.
 * Each type is a full-bleed image tile (plain slate when no photo yet) in a
 * flush hairline grid, its name overlaid as the tile's title above a scrim.
 * Renders nothing when the product has no types.
 */
export default function ProductDetailTypes({ types }: { types: ApiProductType[] }) {
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
        className="m-0 grid list-none grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#16305C]/15 p-0 sm:grid-cols-2 lg:grid-cols-3"
      >
        {types.map((type, i) => (
          <li
            key={`${type.title}-${i}`}
            className="relative flex aspect-[4/3] items-end overflow-hidden bg-slate-800"
          >
            {/* A type can be authored before its photo exists — the tile then
                stays plain slate under the same scrim and title. */}
            {type.image && (
              <Image
                src={type.image}
                alt={type.imageAlt || type.title}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover object-center"
              />
            )}
            {/* Bright photography (open sky, pale surfaces) would otherwise
                swallow the copy, so the scrim keeps weight all the way up. */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
            <div className="relative flex flex-col gap-1.5 p-[clamp(20px,2.2vw,32px)]">
              <h3
                className="m-0 font-display uppercase leading-none text-white"
                style={{ fontSize: "clamp(22px,2.2vw,32px)" }}
              >
                {type.title}
              </h3>
              {type.description && (
                <p className="m-0 max-w-[42ch] text-sm leading-[1.6] text-white/75">
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
