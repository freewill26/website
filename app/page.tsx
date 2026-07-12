import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import HomeSplash from "@/components/home/HomeSplash";
import HomeHero from "@/components/home/HomeHero";
import HomeStats from "@/components/home/HomeStats";
import HomeAbout from "@/components/home/HomeAbout";
import HomeBrands from "@/components/home/HomeBrands";
import HomeShowreel from "@/components/home/HomeShowreel";
import HomeProducts from "@/components/home/HomeProducts";
import HomeTimeline from "@/components/home/HomeTimeline";
import HomeReferences from "@/components/home/HomeReferences";
import HomeGlobe from "@/components/home/HomeGlobe";
import HomeGallery from "@/components/home/HomeGallery";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomeNews from "@/components/home/HomeNews";
import HomeContact from "@/components/home/HomeContact";
import HomeCta from "@/components/home/HomeCta";
import {
  getBrands,
  getCategories,
  getMilestones,
  getEvents,
  getRegions,
  getGalleryImages,
  getTestimonials,
  getNews,
  getHomePageContent,
} from "@/lib/api/home";
import { getCatalogOptions } from "@/lib/api/products";

/** SEO/OG metadata for `/` sourced from the CMS "home" page, server-rendered into the `<head>`. */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHomePageContent();
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
 * Freewill Home — an async Server Component. Every data-driven section is
 * fetched on the server (SSR) in parallel and passed down as props, so the
 * fully-populated HTML ships in the first response. Each fetch degrades to an
 * empty result independently, so one slow/failing endpoint can't break the page.
 */
export default async function HomePage() {
  const [
    brands,
    categories,
    milestones,
    events,
    regions,
    gallery,
    testimonials,
    news,
    content,
    catalogOptions,
  ] = await Promise.all([
    getBrands(),
    getCategories(),
    getMilestones(),
    getEvents(),
    getRegions(),
    getGalleryImages(),
    getTestimonials(),
    getNews(),
    getHomePageContent(),
    getCatalogOptions(),
  ]);

  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <HomeSplash />
      <SiteHeader />
      <main>
        <HomeHero content={content.hero} meta1={content.heroMeta1} meta2={content.heroMeta2} />
        <HomeStats stats={content.stats} />
        <HomeAbout content={content.about} />
        <HomeBrands
          brands={brands}
          heading={content.brands.headline}
          description={content.brands.description}
        />
        <HomeShowreel youtubeId={content.showreel.youtubeId} />
        <HomeProducts
          categories={categories}
          heading={content.products.headline}
          paragraph={content.products.paragraph}
        />
        <HomeTimeline milestones={milestones} heading={content.timeline.headline} />
        <HomeReferences
          events={events}
          heading={content.references.headline}
          description={content.references.description}
        />
        <HomeGlobe
          regions={regions}
          heading={content.globe.headline}
          description={content.globe.description}
        />
        <HomeGallery
          images={gallery}
          heading={content.gallery.headline}
          paragraph={content.gallery.paragraph}
        />
        <HomeTestimonials testimonials={testimonials} />
        <HomeNews news={news} />
        <HomeContact options={catalogOptions} />
        <HomeCta />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
