import type { Highlight, Product } from "@/types/product";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/ui/icons";

interface ProductHighlightsProps {
  product: Product;
}

/** Two-column grid of highlight cards, hairline-separated on a teal tint. */
export default function ProductHighlights({ product }: ProductHighlightsProps) {
  return (
    <Section tone="ink">
      <SectionLabel className="mb-8 lg:mb-14">PRODUCT HIGHLIGHTS</SectionLabel>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-brand-accent/[0.14] bg-brand-accent/[0.14] sm:grid-cols-2">
        {product.highlights.map((highlight, i) => (
          <HighlightCard key={highlight.title} highlight={highlight} delay={(i % 2) * 60} />
        ))}
      </div>
    </Section>
  );
}

function HighlightCard({ highlight, delay }: { highlight: Highlight; delay: number }) {
  return (
    <Reveal
      delay={delay}
      className="flex items-start gap-[18px] bg-ink-panel p-6 sm:p-7 lg:p-8"
    >
      <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-[10px] border border-brand-accent/20 bg-brand-accent/[0.12] text-brand-accent">
        <CheckIcon />
      </div>
      <div>
        <div className="mb-1.5 font-mono text-[10px] tracking-[0.18em] text-brand-accent">
          {highlight.tag}
        </div>
        <div className="mb-[5px] text-[clamp(14px,1.2vw,16px)] font-semibold leading-[1.4] text-surface">
          {highlight.title}
        </div>
        <div className="text-[13px] leading-[1.7] text-mist/55">{highlight.detail}</div>
      </div>
    </Reveal>
  );
}
