"use client";

import Image from "next/image";
import { FwReveal, MaskedHeading } from "@/components/site/FwReveal";
import type { BrandVM, HomeBrandsVM } from "@/lib/api/home";

/**
 * "The company we keep" — a dark break section with two infinite logo
 * marquees: organisations we collaborate with (drifting left) and product
 * brands we represent (drifting right). Pure logo strips — logos render
 * grayscale and bloom to full colour on hover; brands without an artwork
 * fall back to an Anton wordmark. Rows pause on hover and
 * `prefers-reduced-motion` freezes the drift.
 */
interface HomeBrandsProps {
  brands: HomeBrandsVM;
  heading: string;
  description: string;
}

const SECTION_BG = "#14161D";

/** Seconds one full loop takes per logo — lower is faster. */
const SECONDS_PER_LOGO = 3;

/**
 * Repeats short lists until the track is guaranteed wider than any viewport,
 * then the render duplicates it once more so the -50% keyframe loops cleanly.
 */
function padForLoop(items: BrandVM[]): BrandVM[] {
  if (items.length === 0) return items;
  const padded = [...items];
  while (padded.length < 12) padded.push(...items);
  return padded;
}

function BrandLogo({ brand }: { brand: BrandVM }) {
  return (
    <div
      className="group/logo flex h-[92px] flex-none items-center opacity-70 transition-opacity duration-500 hover:opacity-100"
      title={brand.title}
    >
      {brand.image ? (
        <Image
          src={brand.image}
          alt={brand.imageAlt}
          width={220}
          height={72}
          className="max-h-[64px] w-auto object-contain grayscale transition-[filter] duration-500 group-hover/logo:grayscale-0"
        />
      ) : (
        <span className="whitespace-nowrap font-display text-[clamp(26px,2.8vw,42px)] uppercase leading-none tracking-[0.02em] text-cream">
          {brand.title}
        </span>
      )}
    </div>
  );
}

function MarqueeRow({
  items,
  label,
  note,
  direction,
}: {
  items: BrandVM[];
  label: string;
  note: string;
  /** `left` uses fw-ribbon (0 → -50%), `right` uses fw-ribbon2 (-50% → 0). */
  direction: "left" | "right";
}) {
  if (items.length === 0) return null;
  const padded = padForLoop(items);
  const duration = padded.length * SECONDS_PER_LOGO;
  const gap = "clamp(48px,6vw,110px)";

  return (
    <FwReveal className="group">
      <div className="mb-2 flex items-baseline justify-between gap-4 px-[6vw]">
        <div className="flex items-center gap-3">
          <span className="block h-0.5 w-7 bg-brand-accent" />
          <span className="text-xs font-bold tracking-[0.28em] text-brand-light">
            {label}
          </span>
        </div>
        <span className="hidden font-mono text-[10px] tracking-[0.2em] text-cream/35 sm:block">
          {note}
        </span>
      </div>

      <div
        className="relative overflow-hidden border-y py-6"
        style={{ borderColor: "rgba(241,234,216,0.08)" }}
      >
        {/* Track: content duplicated once so the ±50% keyframes loop seamlessly. */}
        <div
          className="flex w-max [animation-iteration-count:infinite] [animation-timing-function:linear] group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
          style={{
            animationName: direction === "left" ? "fw-ribbon" : "fw-ribbon2",
            animationDuration: `${duration}s`,
            gap,
            paddingRight: gap,
          }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className="flex flex-none items-center"
              style={{ gap }}
            >
              {padded.map((brand, i) => (
                <BrandLogo key={`${brand.id}-${i}`} brand={brand} />
              ))}
            </div>
          ))}
        </div>

        {/* Edge fades so logos materialise out of the section, not a hard clip. */}
        {(["left", "right"] as const).map((side) => (
          <span
            key={side}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 z-10 w-[max(8vw,40px)]"
            style={{
              [side]: 0,
              background: `linear-gradient(to ${side === "left" ? "right" : "left"}, ${SECTION_BG}, transparent)`,
            }}
          />
        ))}
      </div>
    </FwReveal>
  );
}

export default function HomeBrands({ brands, heading, description }: HomeBrandsProps) {
  if (brands.organisations.length === 0 && brands.brands.length === 0) return null;

  return (
    <section
      id="fw-brands"
      className="box-border overflow-hidden text-cream"
      style={{ background: SECTION_BG, paddingBlock: "clamp(80px,9vw,150px)" }}
    >
      <div className="mb-[clamp(44px,5vw,72px)] grid items-end gap-8 px-[6vw] lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <div>
          <FwReveal className="mb-6 flex items-center gap-3">
            <span className="block h-0.5 w-7 bg-brand-accent" />
            <span className="text-xs font-bold tracking-[0.28em] text-brand-light">
              OUR NETWORK
            </span>
          </FwReveal>
          <MaskedHeading
            lines={[heading]}
            className="m-0 font-display uppercase leading-none text-cream"
            style={{ fontSize: "clamp(38px,5vw,76px)" }}
          />
        </div>
        <FwReveal>
          <p className="m-0 max-w-[420px] text-[15px] leading-[1.8] text-cream/60 lg:ml-auto">
            {description}
          </p>
        </FwReveal>
      </div>

      <div className="flex flex-col gap-[clamp(36px,4vw,56px)]">
        <MarqueeRow
          items={brands.organisations}
          label="ORGANISATIONS"
          note="01 / WE WORK IN COLLABORATION"
          direction="left"
        />
        <MarqueeRow
          items={brands.brands}
          label="BRANDS"
          note="02 / PRODUCTS WE REPRESENT"
          direction="right"
        />
      </div>
    </section>
  );
}
