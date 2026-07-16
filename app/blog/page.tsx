import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { getBlogList } from "@/lib/api/blogs";

export const metadata: Metadata = {
  title: "Blog · Freewill",
  description:
    "Buyer's guides, maintenance know-how and design insight from 35 years of building India's sports infrastructure.",
};

/** Freewill Blog (index) — evergreen guides and insight, distinct from News, sourced from the CMS. */
export default async function BlogPage() {
  const posts = await getBlogList();

  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <SiteHeader solid />
      <main>
        <BlogHero />
        <BlogGrid posts={posts} />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
