import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Blog · Freewill",
  description:
    "Buyer's guides, maintenance know-how and design insight from 35 years of building India's sports infrastructure.",
};

/** Freewill Blog (index) — evergreen guides and insight, distinct from News. */
export default function BlogPage() {
  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <SiteHeader solid />
      <main>
        <BlogHero />
        <BlogGrid />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
