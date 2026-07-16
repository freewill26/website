/**
 * News-page data layer, mirroring `lib/api/products.ts`: fetches from the
 * service API and maps the response into the small view model each component
 * consumes, degrading to an empty list / `null` on failure.
 */
import { safeGet, safeList } from "./http";
import { API_ENDPOINTS, API_ROUTES } from "@/utils/apis";
import { NEWS_LIMITS } from "@/utils/constants";
import { sanitizeArticleHtml, type ArticleHeading } from "@/utils/sanitizeHtml";
import type { ApiNews } from "./types";

/* ------------------------------------------------------------------ *
 * View models
 * ------------------------------------------------------------------ */

export interface NewsCardVM {
  id: string;
  cat: string;
  date: string;
  readMins: number;
  title: string;
  excerpt: string;
  image: string | null;
  imageAlt: string;
}

export interface NewsArticleVM extends NewsCardVM {
  bodyHtml: string;
  toc: ArticleHeading[];
  facts: { k: string; v: string }[];
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string | null;
  };
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

/** "18 MAY 2026" style label used across the editorial cards. */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
}

/** Roughly the read time at 200wpm, from the plain text of the HTML body. */
function estimateReadMins(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function toCard(n: ApiNews): NewsCardVM {
  return {
    id: n.id,
    cat: (n.tag ?? "News").toUpperCase(),
    date: formatDate(n.publishedDate),
    readMins: estimateReadMins(n.content),
    title: n.title,
    excerpt: n.description,
    image: n.bannerImageUrl || null,
    imageAlt: n.bannerImageAlt ?? n.title,
  };
}

/* ------------------------------------------------------------------ *
 * Fetchers
 * ------------------------------------------------------------------ */

/** Every published article, newest first (the API already orders by `createdAt desc`). */
export async function getNewsList(): Promise<NewsCardVM[]> {
  const news = await safeList<ApiNews>(API_ENDPOINTS.news, {
    searchParams: { limit: NEWS_LIMITS.list },
  });
  return news.filter((n) => n.isActive).map(toCard);
}

/** A single article for the detail page, or `null` if it doesn't exist / isn't published. */
export async function getNewsArticle(id: string): Promise<NewsArticleVM | null> {
  const article = await safeGet<ApiNews | null>(API_ROUTES.news(id), null);
  if (!article || !article.isActive) return null;

  const { html, headings } = sanitizeArticleHtml(article.content);

  return {
    ...toCard(article),
    bodyHtml: html,
    toc: headings,
    facts: article.keyFacts
      .map((f) => ({ k: f.key ?? f.label ?? "", v: f.value }))
      .filter((f) => f.k && f.v),
    seo: {
      title: article.seoTitle || `${article.title} · Freewill News`,
      description: article.seoDescription || article.description,
      ogTitle: article.ogTitle || article.title,
      ogDescription: article.ogDescription || article.description,
      ogImage: article.ogImage || null,
    },
  };
}

/** Up to `count` other published articles, for the "more news" rail on the single page. */
export async function getRelatedNews(id: string, count = 3): Promise<NewsCardVM[]> {
  const all = await getNewsList();
  return all.filter((a) => a.id !== id).slice(0, count);
}
