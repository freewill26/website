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

/** Freewill Home — the "Freewill Home.dc.html" design ported to Next.js. */
export default function HomePage() {
  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <HomeSplash />
      <SiteHeader />
      <main>
        <HomeHero />
        <HomeStats />
        <HomeAbout />
        <HomeShowreel />
        <HomeProducts />
        <HomeTimeline />
        <HomeReferences />
        <HomeGlobe />
        <HomeGallery />
        <HomeTestimonials />
        <HomeNews />
        <HomeContact />
        <HomeCta />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
