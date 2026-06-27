import type { Product } from "@/types/product";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import ParallaxTile from "@/components/ui/ParallaxTile";
import CourtImage from "@/components/ui/CourtImage";

interface ProductGalleryProps {
  product: Product;
}

/**
 * Mosaic gallery of court imagery. The first tile spans two rows and the last
 * spans two columns, matching the source layout. Tiles parallax on scroll.
 */
export default function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <Section tone="ink">
      <SectionLabel className="mb-7 lg:mb-12">PRODUCT GALLERY</SectionLabel>
      <div className="grid auto-rows-[clamp(180px,22vw,300px)] grid-cols-2 gap-4">
        <ParallaxTile className="row-span-2">
          <CourtImage swatch={product.swatch} variant={0} />
        </ParallaxTile>
        <ParallaxTile>
          <CourtImage swatch={product.swatch} variant={2} />
        </ParallaxTile>
        <ParallaxTile>
          <CourtImage swatch={product.swatch} variant={3} />
        </ParallaxTile>
        <ParallaxTile className="col-span-2">
          <CourtImage swatch={product.swatch} variant={1} />
        </ParallaxTile>
      </div>
    </Section>
  );
}
