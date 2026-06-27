import Link from "next/link";
import type { RelatedType } from "@/types/product";
import { productTypeHref } from "@/lib/navigation";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { ArrowUpRightIcon } from "@/components/ui/icons";

interface RelatedTypesProps {
  types: RelatedType[];
}

/** Grid of other product types in the Taraflex® family. */
export default function RelatedTypes({ types }: RelatedTypesProps) {
  return (
    <Section tone="ink">
      <SectionLabel className="mb-7 lg:mb-12">
        OTHER TYPES IN THIS FAMILY
      </SectionLabel>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-brand-accent/[0.14] bg-brand-accent/[0.14] sm:grid-cols-2 lg:grid-cols-3">
        {types.map((type) => (
          <RelatedCard key={type.code} type={type} />
        ))}
      </div>
    </Section>
  );
}

function RelatedCard({ type }: { type: RelatedType }) {
  return (
    <Link
      href={productTypeHref(type.code)}
      className="group flex flex-col gap-2.5 bg-ink-panel p-6 transition-colors hover:bg-ink-raised sm:p-7 lg:p-8"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.16em] text-brand-accent">
          {type.code}
        </span>
        <span
          className="block h-2 w-7 rounded-sm"
          style={{ background: type.swatch }}
        />
      </div>
      <h4 className="m-0 font-display text-[clamp(18px,1.8vw,26px)] uppercase leading-[1.1] text-surface">
        {type.name}
      </h4>
      <p className="m-0 text-[13px] leading-[1.6] text-mist/50">{type.desc}</p>
      <div className="flex items-center justify-between border-t border-brand-accent/15 pt-3.5">
        <span className="font-mono text-[11px] text-mist/45">{type.spec}</span>
        <span className="transition-transform group-hover:translate-x-0.5">
          <ArrowUpRightIcon size={15} color="5FD0E0" />
        </span>
      </div>
    </Link>
  );
}
