import type { Product } from "@/types/product";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import MaskedLines from "@/components/ui/MaskedLines";
import Reveal from "@/components/ui/Reveal";

interface ProductDescriptionProps {
  product: Product;
}

/** "What makes it different" — heading on the left, prose on the right. */
export default function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <Section tone="panel">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <div>
          <SectionLabel className="mb-[18px]">ABOUT THIS PRODUCT</SectionLabel>
          <MaskedLines
            className="m-0 font-display text-[clamp(28px,3.2vw,52px)] uppercase leading-[1.02] text-surface"
            lines={[
              { text: "What makes" },
              { text: "it different.", color: "#5FD0E0" },
            ]}
          />
        </div>
        <div>
          <Reveal as="p" className="m-0 mb-5 text-[clamp(15px,1.4vw,18px)] leading-[1.85] text-mist/70">
            {product.description}
          </Reveal>
          <Reveal as="p" className="m-0 text-[clamp(14px,1.2vw,16px)] leading-[1.85] text-mist/55">
            {product.description2}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
