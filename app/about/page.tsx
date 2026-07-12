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
import AboutTeam from "@/components/about/AboutTeam";
import AboutAwards from "@/components/about/AboutAwards";
import AboutBrands from "@/components/about/AboutBrands";
import AboutContact from "@/components/about/AboutContact";
import { getAboutPageContent, getTeam, getAboutBrands } from "@/lib/api/about";
import type { AboutStoryVM } from "@/lib/api/about";

/** SEO/OG metadata for `/about` sourced from the CMS "about" page. */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAboutPageContent();
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

/** Splits a CMS headline (`\n`-delimited) into the stacked lines AboutStory renders. */
function storyLines(story: AboutStoryVM) {
  return story.headline.split("\n").map((line) => line.trim());
}

/**
 * Freewill About — an async Server Component. Every data-driven section is
 * fetched on the server in parallel and passed down as props, so the
 * fully-populated HTML ships in the first response. Each fetch degrades to its
 * defaults independently, so one slow/failing endpoint can't break the page.
 */
export default async function AboutPage() {
  const [content, team, brands] = await Promise.all([
    getAboutPageContent(),
    getTeam(),
    getAboutBrands(),
  ]);
  // brands.organisations → "Trusted by…" band; brands.brands → the ✦ ribbon.

  return (
    <div className="overflow-x-clip" style={{ background: "#0A0E1C" }}>
      <SiteHeader solid />
      <main>
        <AboutHero
          title={content.hero.title}
          headlineHtml={content.hero.headlineHtml}
          description={content.hero.description}
          backgroundImage={content.hero.backgroundImage}
        />
        <AboutManifesto words={content.whoWeAre.words} />
        <AboutMarquee items={brands.brands} />
        <AboutStats stats={content.stats} />
        <AboutStory
          id="fw-s1"
          kicker="01 — THE PRODUCT"
          titleLines={storyLines(content.about1)}
          body={content.about1.description}
          ctaLabel={content.about1.buttonLabel}
          ctaHref={content.about1.buttonLink}
          imageLabel="Sports surface"
          imageSide="left"
          imageSrc={content.about1.image}
        />
        <AboutStory
          id="fw-s2"
          kicker="02 — THE CRAFT"
          titleLines={storyLines(content.about2)}
          body={content.about2.description}
          ctaLabel={content.about2.buttonLabel}
          ctaHref={content.about2.buttonLink}
          imageLabel="Installation"
          imageSide="right"
          variant="dark"
          imageSrc={content.about2.image}
        />
        <AboutStory
          id="fw-s3"
          kicker="03 — THE EDGE"
          titleLines={storyLines(content.about3)}
          body={content.about3.description}
          ctaLabel={content.about3.buttonLabel}
          ctaHref={content.about3.buttonLink}
          imageLabel="Innovation"
          imageSide="left"
          imageSrc={content.about3.image}
        />
        <AboutFounderQuote
          html={content.testimonial.html}
          author={content.testimonial.author}
          occupation={content.testimonial.occupation}
        />
        <AboutTeam founders={team.founders} people={team.people} />
        {/* <AboutAwards /> */}
        <AboutBrands brands={brands.organisations} />
        <AboutContact />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
