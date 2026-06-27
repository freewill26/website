import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import NewsArticle from "@/components/news/NewsArticle";
import { ARTICLES, getArticle, relatedArticles } from "@/lib/newsContent";

interface NewsSinglePageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render one static page per article. */
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: NewsSinglePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found · Freewill" };

  return {
    title: `${article.title} · Freewill News`,
    description: article.excerpt,
  };
}

/** Freewill News (single) — one newsroom article. */
export default async function NewsSinglePage({ params }: NewsSinglePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const related = relatedArticles(slug);

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
