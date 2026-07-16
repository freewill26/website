import Link from "next/link";
import { FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";
import type { CategoryTile } from "@/lib/api/home";
import { ArrowUpRightIcon, ArrowRightIcon } from "@/components/ui/icons";

/** Bento span keyed by position: first tile is the hero, 2nd & 7th are wide. */
type Span = "hero" | "wide" | "";

const SPAN_CLASS: Record<Span, string> = {
  hero: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2",
  wide: "col-span-1 sm:col-span-1 lg:col-span-2",
  "": "col-span-1",
};

const spanFor = (idx: number): Span =>
  idx === 0 ? "hero" : idx === 1 || idx === 6 ? "wide" : "";

interface HomeProductsProps {
  categories: CategoryTile[];
  /** Total number of categories in the catalogue (for the CTA badge). */
  totalCategories?: number;
  /** Section heading + intro, sourced from the CMS "category_section" section. */
  heading: string;
  paragraph: string;
}

/** "What we build" bento grid — product categories, plus a catalogue CTA. */
export default function HomeProducts({
  categories,
  totalCategories,
  heading,
  paragraph,
}: HomeProductsProps) {
  const tiles = categories.slice(0, 5);
  const catalogueCount = totalCategories ?? categories.length;

  // The CTA absorbs whatever is left of the bento's last row so the grid ends
  // flush. Cells occupied per breakpoint: lg (4 cols) hero=2×2, wide=2×1;
  // sm (2 cols) hero=2×1, everything else 1.
  const lgCells = tiles.reduce(
    (sum, _, i) => sum + (spanFor(i) === "hero" ? 4 : spanFor(i) === "wide" ? 2 : 1),
    0,
  );
  const smCells = tiles.reduce((sum, _, i) => sum + (spanFor(i) === "hero" ? 2 : 1), 0);
  const lgSpan = 4 - (lgCells % 4) || 4;
  const smSpan = 2 - (smCells % 2) || 2;

  return (
    <section
      id="fw-products"
      className="box-border bg-cream px-[6vw]"
      style={{ paddingBlock: "clamp(72px,8vw,128px)", scrollMarginTop: "104px" }}
    >
      <FwReveal className="mb-[clamp(36px,4vw,56px)] flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="mb-[18px] flex items-center gap-3">
            <span className="block h-0.5 w-7 bg-brand" />
            <span className="text-xs font-bold tracking-[0.28em] text-brand">
              WHAT WE BUILD
            </span>
          </div>
          <h2
            className="m-0 font-display uppercase leading-[0.98] text-[#181A20]"
            style={{ fontSize: "clamp(40px,5vw,84px)" }}
          >
            {heading}
          </h2>
        </div>
        <p className="m-0 max-w-[380px] text-[15px] leading-[1.8] text-[#181A20]/60">
          {paragraph}
        </p>
      </FwReveal>

      <div className="grid grid-cols-1 gap-3.5 [grid-auto-rows:168px] sm:grid-cols-2 lg:grid-cols-4 lg:[grid-auto-rows:208px]">
        {tiles.map((category, idx) => (
          <FwReveal
            key={category.id}
            className={`group relative cursor-pointer overflow-hidden rounded-xl ${SPAN_CLASS[spanFor(idx)]}`}
            style={{ border: "1px solid rgba(24,26,32,0.08)" }}
          >
            <ImageSlot
              label={category.title}
              src={category.image ?? undefined}
              className="absolute inset-0 h-full w-full"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(16,18,26,0) 42%, rgba(16,18,26,0.86) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute left-3.5 top-3.5 inline-flex items-center gap-2 rounded-full px-3 py-[7px]"
              style={{
                background: "rgba(20,22,30,0.55)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              <span className="font-display text-xs text-white/70">{category.no}</span>
              <span className="text-[10px] font-bold tracking-[0.14em] text-[#9FC0FF]">
                {category.kicker}
              </span>
            </div>
            <div className="pointer-events-none absolute inset-x-[18px] bottom-4 flex items-end justify-between gap-3">
              <div>
                <div
                  className="font-display uppercase leading-[1.1] text-white"
                  style={{ fontSize: "clamp(20px,1.6vw,28px)" }}
                >
                  {category.title}
                </div>
                <div className="mt-[5px] text-xs leading-[1.5] text-white/[0.72]">
                  {category.description}
                </div>
              </div>
              <span
                className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                style={{ background: "rgba(255,255,255,0.16)" }}
              >
                <ArrowUpRightIcon size={15} />
              </span>
            </div>
          </FwReveal>
        ))}

        <FwReveal
          className="col-span-1 sm:[grid-column:span_var(--sm)] lg:[grid-column:span_var(--lg)]"
          style={{ ["--sm" as string]: smSpan, ["--lg" as string]: lgSpan }}
        >
          <Link
            href="/products"
            className="group flex h-full flex-col justify-between rounded-xl bg-brand p-6 text-[#071027] no-underline transition-colors hover:bg-[#004E5F]"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-display text-[13px] text-[#071027]/60">
                {catalogueCount}
              </span>
              <span className="text-[10px] font-bold tracking-[0.16em] text-[#071027]/75">
                FULL CATALOGUE
              </span>
            </div>
            <div className="flex items-end justify-between gap-3">
              <div
                className="font-display uppercase leading-[0.98] text-[#071027]"
                style={{ fontSize: "clamp(30px,3vw,46px)" }}
              >
                See all
                <br />
                products
              </div>
              <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full bg-[#071027] transition-transform group-hover:translate-x-1">
                <ArrowRightIcon size={20} />
              </span>
            </div>
          </Link>
        </FwReveal>
      </div>
    </section>
  );
}
