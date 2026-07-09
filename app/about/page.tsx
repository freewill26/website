import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import AboutHero from "@/components/about/AboutHero";
import AboutManifesto from "@/components/about/AboutManifesto";
import AboutMarquee from "@/components/about/AboutMarquee";
import AboutStats from "@/components/about/AboutStats";
import AboutStory from "@/components/about/AboutStory";
import AboutFounderQuote from "@/components/about/AboutFounderQuote";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutTeam from "@/components/about/AboutTeam";
import AboutAwards from "@/components/about/AboutAwards";
import AboutBrands from "@/components/about/AboutBrands";
import AboutContact from "@/components/about/AboutContact";

export const metadata: Metadata = {
  title: "About Freewill · Sports Infrastructure Since 1990",
  description:
    "The most innovative sports infrastructure company in India — building the ground a billion people play on since 1990.",
};

/** Freewill About — the "Freewill About.dc.html" design ported to Next.js. */
export default function AboutPage() {
  return (
    <div className="overflow-x-clip" style={{ background: "#0A0E1C" }}>
      <SiteHeader solid />
      <main>
        <AboutHero />
        <AboutManifesto />
        <AboutMarquee />
        <AboutStats />
        <AboutStory
          id="fw-s1"
          kicker="01 — THE PRODUCT"
          titleLines={["The Ground", "India Plays On."]}
          body="From school multi-sport halls to championship arenas, Freewill supplies and installs indoor vinyl, synthetic grass, PU courts and athletics tracks — all laid by our own certified crews."
          ctaLabel="View Products →"
          ctaHref="/products"
          imageLabel="Sports surface"
          imageSide="left"
          imageSrc="/assets/about-story-surface.png"
        />
        <AboutStory
          id="fw-s2"
          kicker="02 — THE CRAFT"
          titleLines={[
            "Built to Last,",
            <span style={{ color: "#5FD0E0" }}>Built to Perform.</span>,
          ]}
          body="Every surface follows a rigorous process — sub-floor assessment, preparation, surface lay and final line marking — backed by 35 years of expertise and trained to international standards."
          ctaLabel="Get a Quote →"
          ctaHref="/#fw-contact"
          imageLabel="Installation"
          imageSide="right"
          variant="dark"
          imageSrc="/assets/about-story-install.png"
        />
        <AboutStory
          id="fw-s3"
          kicker="03 — THE EDGE"
          titleLines={["Pioneer of", "Innovation."]}
          body="Today Freewill is the pioneer in optimising and introducing sports infrastructure with innovative technology — dynamic marking, acoustic flooring, synchronised clocks and smart scoreboards."
          ctaLabel="Talk to Us →"
          ctaHref="/#fw-contact"
          imageLabel="Innovation"
          imageSide="left"
          imageSrc="/assets/about-story-innovation.png"
        />
        <AboutFounderQuote />
        {/* <AboutTimeline /> */}
        <AboutTeam />
        <AboutAwards />
        <AboutBrands />
        <AboutContact />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
