import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import NewsArticle from "@/components/news/NewsArticle";
import { getNewsArticle, getRelatedNews } from "@/lib/api/news";

interface NewsSinglePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NewsSinglePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getNewsArticle(id);
  if (!article) return { title: "Article not found · Freewill" };

  return {
    title: article.seo.title,
    description: article.seo.description,
    openGraph: {
      title: article.seo.ogTitle,
      description: article.seo.ogDescription,
      ...(article.seo.ogImage ? { images: [article.seo.ogImage] } : {}),
    },
  };
}

/**
 * Real, DB-backed news article — reached from a card on the News index
 * (`/news/[id]`). Both the article and its related rail come straight from
 * the service API.
 */
export default async function NewsSinglePage({ params }: NewsSinglePageProps) {
  const { id } = await params;
  const article = await getNewsArticle(id);

  if (!article) notFound();

  const related = await getRelatedNews(id);

  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <SiteHeader solid />
      <main>
        <NewsArticle article={article} related={related} />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
