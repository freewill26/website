import Image from "next/image";
import Link from "next/link";
import { FwReveal } from "@/components/site/FwReveal";
import type { ApiCatalogueChild } from "@/lib/api/types";

interface ProductDetailChildrenProps {
  items: ApiCatalogueChild[];
  /** Eyebrow above the grid, e.g. "PRODUCT TYPES" or "VARIANTS". */
  eyebrow: string;
  /** Route prefix each tile links into, e.g. "/products/type". */
  hrefBase: string;
}

/**
 * The grid of a record's children — product types under a product, variants
 * under a type. Each child is a full-bleed image tile (plain slate when no
 * photo yet) in a flush hairline grid, its name overlaid above a scrim,
 * linking to that child's own detail page. Renders nothing when there are no
 * children, which is how the leaf level of the catalogue ends up with no grid
 * at all.
 */
export default function ProductDetailChildren({
  items,
  eyebrow,
  hrefBase,
}: ProductDetailChildrenProps) {
  if (!items?.length) return null;

  return (
    <section
      className="box-border bg-cream px-[6vw] text-[#181A20]"
      style={{ paddingBlock: "clamp(64px,8vw,120px)" }}
    >
      <FwReveal className="mb-[clamp(32px,4vw,56px)] flex items-center gap-3">
        <span className="block h-0.5 w-7" style={{ background: "#2F6BFF" }} />
        <span className="text-xs font-bold tracking-[0.28em]" style={{ color: "#2F6BFF" }}>
          {eyebrow}
        </span>
      </FwReveal>

      <FwReveal
        as="ul"
        className="m-0 grid list-none grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#16305C]/15 p-0 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <li key={item.id} className="relative flex bg-slate-800">
            <Link
              href={`${hrefBase}/${item.id}`}
              className="group relative flex aspect-[4/3] w-full items-end overflow-hidden no-underline"
            >
              {/* A child can be authored before its photo exists — the tile
                  then stays plain slate under the same scrim and title. */}
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
                  {item.title}
                </h3>
                {item.description && (
                  <p className="m-0 max-w-[42ch] text-sm leading-[1.6] text-white/75">
                    {item.description}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </FwReveal>
    </section>
  );
}
