import type { Product } from "@/types/product";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";

interface ProductSpecsProps {
  product: Product;
}

/** Technical datasheet rendered as a bordered label/value table. */
export default function ProductSpecs({ product }: ProductSpecsProps) {
  return (
    <Section tone="panel">
      <SectionLabel className="mb-7 lg:mb-12">TECHNICAL DATASHEET</SectionLabel>
      <div className="overflow-hidden rounded-2xl border border-brand-accent/[0.16]">
        {product.specs.map((spec) => (
          <div
            key={spec.label}
            className="flex flex-col justify-between gap-2.5 border-b border-brand-accent/10 px-5 py-3.5 transition-colors last:border-b-0 hover:bg-brand-accent/[0.04] sm:flex-row sm:items-center sm:gap-4 sm:px-9 sm:py-5"
          >
            <span className="min-w-[200px] font-mono text-xs tracking-[0.1em] text-mist/50">
              {spec.label}
            </span>
            <span className="text-sm font-semibold text-surface sm:text-right">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
