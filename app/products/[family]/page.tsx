import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import ProductFamilyHero from "@/components/product/ProductFamilyHero";
import ProductFamilyAbout from "@/components/product/ProductFamilyAbout";
import ProductBlueprint from "@/components/product/ProductBlueprint";
import ProductInPlay from "@/components/product/ProductInPlay";
import ProductFamilyContact from "@/components/product/ProductFamilyContact";
import { getFamily, getAllFamilySlugs } from "@/lib/productFamily";

interface FamilyPageProps {
  params: Promise<{ family: string }>;
}

/** Pre-render one page per product family. */
export function generateStaticParams() {
  return getAllFamilySlugs().map((family) => ({ family }));
}

export async function generateMetadata({ params }: FamilyPageProps): Promise<Metadata> {
  const { family } = await params;
  const data = getFamily(family);
  if (!data) return { title: "Product not found · Freewill" };
  return {
    title: `${data.nameLead}${data.mark ?? ""} · Freewill`,
    description: data.tagline,
  };
}

/** Freewill Product (family overview) — the "Freewill Product.dc.html" design. */
export default async function ProductFamilyPage({ params }: FamilyPageProps) {
  const { family } = await params;
  const data = getFamily(family);
  if (!data) notFound();

  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <SiteHeader solid />
      <main>
        <ProductFamilyHero family={data} />
        <ProductFamilyAbout family={data} />
        <ProductBlueprint family={data} />
        <ProductInPlay />
        <ProductFamilyContact />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
