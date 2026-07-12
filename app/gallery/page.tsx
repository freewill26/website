import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import GalleryClient from "@/components/gallery/GalleryClient";
import { getGalleryPageContent, getGalleryFeedPage, getGalleryTaxonomy } from "@/lib/api/gallery";

/** SEO/OG metadata for `/gallery` sourced from the CMS "gallery" page. */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getGalleryPageContent();
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
 * Freewill Gallery — an async Server Component. The hero copy comes from the
 * CMS; the feed's first page is fetched server-side so it's in the initial
 * HTML, and `GalleryClient` takes over paging further pages client-side.
 */
export default async function GalleryPage() {
  const [content, firstPage, taxonomy] = await Promise.all([
    getGalleryPageContent(),
    getGalleryFeedPage(1),
    getGalleryTaxonomy(),
  ]);
  const headlineLines = content.hero.headline.split("\n").map((line) => line.trim());

  return (
    <div className="overflow-x-clip bg-cream text-[#111820]">
      <SiteHeader solid />
      <main>
        {/* Intro band */}
        <section className="box-border bg-cream px-[6vw] pb-[clamp(28px,3vw,44px)] pt-[clamp(120px,10vw,164px)]">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <FwReveal className="mb-3.5 flex items-center gap-3">
                <span className="block h-0.5 w-7 bg-brand" />
                <span className="text-xs font-bold tracking-[0.28em] text-brand">
                  {content.hero.title.toUpperCase()}
                </span>
              </FwReveal>
              <MaskedHeading
                as="h1"
                className="m-0 font-display uppercase leading-[0.94] text-[#111820]"
                style={{ fontSize: "clamp(44px,6.4vw,108px)" }}
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

        <GalleryClient
          initialItems={firstPage.items}
          initialHasMore={firstPage.hasMore}
          taxonomy={taxonomy}
        />

        {/* CTA banner */}
        <section className="box-border bg-brand px-[6vw] py-[clamp(60px,8vw,100px)] text-center text-cream">
          <FwReveal>
            <h3
              className="m-0 mb-4 font-display uppercase leading-[1.1]"
              style={{ fontSize: "clamp(32px,4vw,64px)" }}
            >
              Want your venue here?
            </h3>
            <p className="mx-auto mb-7 max-w-[560px] text-base leading-[1.7] text-cream/[0.72]">
              From a single court to a national-games complex — let&apos;s build
              the ground you&apos;ll play on.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-cream px-[30px] py-4 text-[13px] font-bold tracking-[0.1em] text-brand no-underline transition-colors hover:bg-cream/90"
            >
              GET A FREE ESTIMATE <ArrowRightIcon size={14} color="00687F" />
            </Link>
          </FwReveal>
        </section>
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
