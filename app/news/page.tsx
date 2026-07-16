import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import NewsHero from "@/components/news/NewsHero";
import NewsGrid from "@/components/news/NewsGrid";
import { getNewsList } from "@/lib/api/news";

export const metadata: Metadata = {
  title: "News & Updates · Freewill",
  description:
    "Projects, partnerships and milestones from Freewill — the team building India's sports infrastructure since 1990.",
};

/** Freewill News (index) — listing of the newsroom articles, sourced from the CMS. */
export default async function NewsPage() {
  const articles = await getNewsList();

  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <SiteHeader solid />
      <main>
        <NewsHero />
        <NewsGrid articles={articles} />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
