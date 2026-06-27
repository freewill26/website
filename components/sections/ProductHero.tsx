import Link from "next/link";
import type { Product } from "@/types/product";
import { ROUTES } from "@/lib/navigation";
import CourtImage from "@/components/ui/CourtImage";
import MaskedLines from "@/components/ui/MaskedLines";
import { ArrowRightIcon } from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";

interface ProductHeroProps {
  product: Product;
}

/**
 * Full-viewport hero: court backdrop, breadcrumb, animated headline, tagline
 * and a glassy key-stats panel with a "request a sample" action.
 */
export default function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-[6vw] pb-12 pt-32 sm:pb-16 lg:pb-20 lg:pt-40">
      {/* Backdrop */}
      <div className="absolute inset-0 z-0">
        <CourtImage swatch={product.swatch} variant={1} className="!h-[115%]" />
        <div className="absolute inset-0 bg-[linear-gradient(10deg,rgba(5,8,18,0.95)_0%,rgba(5,8,18,0.72)_45%,rgba(5,8,18,0.28)_100%)]" />
      </div>

      {/* Breadcrumb */}
      <Reveal className="relative z-10 mb-5 flex flex-wrap items-center gap-2 sm:mb-8">
        <Link
          href={ROUTES.products}
          className="font-mono text-[11px] tracking-[0.14em] text-white/45 transition-colors hover:text-brand-accent"
        >
          PRODUCTS
        </Link>
        <Crumb>{product.category}</Crumb>
        <span className="font-mono text-[11px] text-white/25">›</span>
        <span className="font-mono text-[11px] tracking-[0.14em] text-brand-accent">
          {product.code}
        </span>
      </Reveal>

      <div className="relative z-10 grid items-end gap-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
        <div>
          {/* Code badge */}
          <Reveal className="mb-[18px] inline-flex items-center gap-2.5">
            <span
              className="block h-2 w-2 animate-swatch-pulse rounded-full"
              style={{ background: product.swatch }}
            />
            <span className="font-mono text-xs tracking-[0.2em] text-brand-light">
              {product.code}
            </span>
            <span className="block h-3.5 w-px bg-brand-accent/35" />
            <span className="font-mono text-xs tracking-[0.14em] text-white/45">
              TARAFLEX® FAMILY
            </span>
          </Reveal>

          <MaskedLines
            as="h1"
            className="m-0 font-display text-[clamp(42px,7.5vw,130px)] uppercase leading-[0.9] text-surface"
            lines={[
              { text: product.nameL1 },
              { text: product.nameL2, color: product.swatch },
            ]}
          />

          <Reveal
            as="p"
            className="mt-5 max-w-[580px] text-[clamp(15px,1.4vw,18px)] leading-[1.75] text-mist/70 lg:mt-6"
          >
            {product.tagline}
          </Reveal>
        </div>

        {/* Key stats panel */}
        <Reveal className="flex flex-col gap-px overflow-hidden rounded-2xl border border-brand-accent/20 bg-brand-accent/[0.16] backdrop-blur-md">
          {product.keyStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between gap-3 bg-ink/55 px-[22px] py-[18px]"
            >
              <span className="font-mono text-[11px] tracking-[0.14em] text-mist/55">
                {stat.label}
              </span>
              <span className="font-display text-[clamp(18px,1.6vw,24px)] tracking-[0.02em] text-surface">
                {stat.value}
              </span>
            </div>
          ))}
          <div className="bg-brand/40 px-[22px] py-[18px]">
            <Link
              href={ROUTES.contact}
              className="flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-[0.1em] text-surface transition-colors hover:text-brand-pale"
            >
              <span className="inline-flex items-center gap-2">Request a Sample <ArrowRightIcon size={12} color="F6F4EC" /></span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Crumb({ children }: { children: string }) {
  return (
    <>
      <span className="font-mono text-[11px] text-white/25">›</span>
      <span className="font-mono text-[11px] tracking-[0.14em] text-white/45">
        {children}
      </span>
    </>
  );
}
