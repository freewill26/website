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
                </span>
              </FwReveal>
              <MaskedHeading
                as="h1"
                className="m-0 break-words font-display uppercase leading-[1.02] text-[#111820] sm:leading-[0.94]"
                style={{ fontSize: "clamp(34px,6.4vw,108px)" }}
                lines={headlineLines}
              />
            </div>
            <FwReveal
              as="p"
              className="m-0 max-w-[380px] leading-[1.7] text-[#181A20]/[0.62]"
              style={{ fontSize: "clamp(15px,1.4vw,18px)" }}
            >
              {content.hero.description}
            </FwReveal>
          </div>
        </section>

        <CatalogueGrid items={items} />

        {/* CTA banner */}
        <section className="box-border bg-brand px-[6vw] py-[clamp(60px,8vw,100px)] text-center text-cream">
          <FwReveal>
            <h3
              className="m-0 mb-4 font-display uppercase leading-[1.1]"
              style={{ fontSize: "clamp(32px,4vw,64px)" }}
            >
              Need a spec we haven&apos;t listed?
            </h3>
            <p className="mx-auto mb-7 max-w-[560px] text-base leading-[1.7] text-cream/[0.72]">
              Tell us the surface, the sport and the venue — we&apos;ll send the
              right documentation and a quote to match.
            </p>
            <Link
              href="/contact"
