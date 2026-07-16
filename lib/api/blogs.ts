/**
 * Blog-page data layer, mirroring `lib/api/news.ts`. Distinct from the
 * Newsroom: the Blog is evergreen guidance rather than dated announcements,
 * so posts carry a `topic` (not a news `cat`) and no key-facts rail.
 */
import { safeGet, safeList } from "./http";
import { API_ENDPOINTS, API_ROUTES } from "@/utils/apis";
import { BLOG_LIMITS } from "@/utils/constants";
import { sanitizeArticleHtml, type ArticleHeading } from "@/utils/sanitizeHtml";
import type { ApiBlog } from "./types";

/* ------------------------------------------------------------------ *
 * View models
 * ------------------------------------------------------------------ */

export interface BlogCardVM {
  id: string;
  topic: string;
  date: string;
  readMins: number;
  title: string;
  excerpt: string;
  image: string | null;
  imageAlt: string;
}

export interface BlogArticleVM extends BlogCardVM {
  bodyHtml: string;
  toc: ArticleHeading[];
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

/** "10 JUN 2026" style label used across the editorial cards. */
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

function toCard(p: ApiBlog): BlogCardVM {
  return {
    id: p.id,
    topic: (p.tag ?? "Insight").toUpperCase(),
    date: formatDate(p.publishedDate),
    readMins: estimateReadMins(p.content),
    title: p.title,
    excerpt: p.description,
    image: p.bannerImageUrl || null,
    imageAlt: p.bannerImageAlt ?? p.title,
  };
}

/* ------------------------------------------------------------------ *
 * Fetchers
 * ------------------------------------------------------------------ */

/** Every published post, newest first (the API already orders by `createdAt desc`). */
export async function getBlogList(): Promise<BlogCardVM[]> {
  const posts = await safeList<ApiBlog>(API_ENDPOINTS.blogs, {
    searchParams: { limit: BLOG_LIMITS.list },
  });
  return posts.filter((p) => p.isActive).map(toCard);
}

/** A single post for the detail page, or `null` if it doesn't exist / isn't published. */
export async function getBlogArticle(id: string): Promise<BlogArticleVM | null> {
  const post = await safeGet<ApiBlog | null>(API_ROUTES.blog(id), null);
  if (!post || !post.isActive) return null;

  const { html, headings } = sanitizeArticleHtml(post.content);

  return {
    ...toCard(post),
    bodyHtml: html,
    toc: headings,
    seo: {
      title: post.seoTitle || `${post.title} · Freewill Blog`,
      description: post.seoDescription || post.description,
      ogTitle: post.ogTitle || post.title,
      ogDescription: post.ogDescription || post.description,
      ogImage: post.ogImage || null,
    },
  };
}

/** Up to `count` other published posts, for the "more reading" rail on the single page. */
export async function getRelatedBlogs(id: string, count = 3): Promise<BlogCardVM[]> {
  const all = await getBlogList();
  return all.filter((p) => p.id !== id).slice(0, count);
}
