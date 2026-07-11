import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import HomeSplash from "@/components/home/HomeSplash";
import HomeHero from "@/components/home/HomeHero";
import HomeStats from "@/components/home/HomeStats";
import HomeAbout from "@/components/home/HomeAbout";
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
  getCategories,
  getMilestones,
  getEvents,
  getRegions,
  getGalleryImages,
  getTestimonials,
  getNews,
} from "@/lib/api/home";

/**
 * Freewill Home — an async Server Component. Every data-driven section is
 * fetched on the server (SSR) in parallel and passed down as props, so the
 * fully-populated HTML ships in the first response. Each fetch degrades to an
 * empty result independently, so one slow/failing endpoint can't break the page.
 */
export default async function HomePage() {
  const [categories, milestones, events, regions, gallery, testimonials, news] =
    await Promise.all([
      getCategories(),
      getMilestones(),
      getEvents(),
      getRegions(),
      getGalleryImages(),
      getTestimonials(),
      getNews(),
    ]);

  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <HomeSplash />
      <SiteHeader />
      <main>
        <HomeHero />
        <HomeStats />
        <HomeAbout />
        <HomeShowreel />
        <HomeProducts categories={categories} />
        <HomeTimeline milestones={milestones} />
        <HomeReferences events={events} />
        <HomeGlobe regions={regions} />
        <HomeGallery images={gallery} />
        <HomeTestimonials testimonials={testimonials} />
        <HomeNews news={news} />
        <HomeContact />
        <HomeCta />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
