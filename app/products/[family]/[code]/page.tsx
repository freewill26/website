import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PRODUCTS,
  getAllProductCodes,
  getRelatedTypes,
} from "@/lib/products";
import { getAllFamilySlugs, getFamily } from "@/lib/productFamily";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductHero from "@/components/sections/ProductHero";
import ProductDescription from "@/components/sections/ProductDescription";
import ProductHighlights from "@/components/sections/ProductHighlights";
import ProductSpecs from "@/components/sections/ProductSpecs";
import ProductGallery from "@/components/sections/ProductGallery";
import ProductCertifications from "@/components/sections/ProductCertifications";
import RelatedTypes from "@/components/sections/RelatedTypes";
import CtaSection from "@/components/sections/CtaSection";

interface ProductTypePageProps {
  params: Promise<{ family: string; code: string }>;
}

/** Pre-render one page per family × product code. */
export function generateStaticParams() {
  return getAllFamilySlugs().flatMap((family) =>
    getAllProductCodes().map((code) => ({ family, code })),
  );
}

export async function generateMetadata({
  params,
}: ProductTypePageProps): Promise<Metadata> {
  const { code } = await params;
  const product = PRODUCTS[code];
  if (!product) return { title: "Product not found · Freewill" };

  return {
    title: `Taraflex® ${product.name} (${product.code}) · Freewill`,
    description: product.tagline,
  };
}

/**
 * Product Type detail page (Page B) — the implementation of "Freewill Product
 * Type". Reached from a family page's type cards (`/products/[family]/[code]`).
 */
export default async function ProductTypePage({ params }: ProductTypePageProps) {
  const { family, code } = await params;
  const product = PRODUCTS[code];

  if (!product || !getFamily(family)) notFound();

  const related = getRelatedTypes(product.code);

  return (
    <>
      <Header />
      <main>
        <ProductHero product={product} />
        <ProductDescription product={product} />
        <ProductHighlights product={product} />
        <ProductSpecs product={product} />
        <ProductGallery product={product} />
        <ProductCertifications product={product} />
        <RelatedTypes types={related} />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
