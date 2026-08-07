import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import CatalogueGrid from "@/components/catalogue/CatalogueGrid";
import { getCataloguePageContent, getCatalogues } from "@/lib/api/catalogue";

/** SEO/OG metadata for `/catalogue` sourced from the CMS "catalogue" page. */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getCataloguePageContent();
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
    },
  };
}

/**
 * Freewill Catalogue — an async Server Component. The hero copy comes from the
 * CMS; the brochures are `Catalogue` records managed in the CMS's own
 * Catalogues section. Reached from the footer only, not the header nav.
 */
export default async function CataloguePage() {
  const [content, items] = await Promise.all([
    getCataloguePageContent(),
    getCatalogues(),
  ]);
  const headlineLines = content.hero.headline.split("\n").map((line) => line.trim());

  return (
    <div className="overflow-x-clip bg-cream text-[#111820]">
      <SiteHeader solid />
      <main>
        {/* Intro band */}
        <section className="box-border bg-cream px-[6vw] pb-[clamp(28px,3vw,44px)] pt-[clamp(148px,12vw,180px)]">
          <div className="flex flex-wrap items-end justify-between gap-6 sm:gap-8">
            <div className="min-w-0">
              <FwReveal className="mb-3.5 flex items-center gap-3">
                <span className="block h-0.5 w-7 bg-brand" />
                <span className="text-xs font-bold tracking-[0.28em] text-brand">
                  {content.hero.title.toUpperCase()}
