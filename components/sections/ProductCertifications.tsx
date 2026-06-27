import type { Product } from "@/types/product";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { StarIcon } from "@/components/ui/icons";

interface ProductCertificationsProps {
  product: Product;
}

/** Wrapping row of certification chips. */
export default function ProductCertifications({ product }: ProductCertificationsProps) {
  return (
    <Section tone="panel" spacing="tight">
      <SectionLabel className="mb-6 lg:mb-10">
        CERTIFICATIONS &amp; STANDARDS
      </SectionLabel>
      <div className="flex flex-wrap gap-3">
        {product.certs.map((cert, i) => (
          <Reveal
            key={cert}
            delay={i * 40}
            className="inline-flex items-center gap-2.5 rounded-[10px] border border-brand-accent/20 bg-brand-accent/[0.08] px-5 py-3.5"
          >
            <StarIcon size={16} color="5FD0E0" />
            <span className="font-mono text-xs tracking-[0.1em] text-mist/80">
              {cert}
            </span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
