/**
 * Home-page data layer.
 *
 * Each function fetches one section from the service API and maps the raw
 * response into the small, presentational "view model" its component consumes.
 * Keeping the mapping here means the components stay dumb and the API contract
 * lives in one place. Every fetch degrades to an empty result on failure so the
 * server-rendered page always responds.
 */
import { safeList } from "./http";
import { API_ENDPOINTS } from "@/utils/apis";
import { HOME_LIMITS } from "@/utils/constants";
import type {
  ApiCategory,
  ApiEvent,
  ApiGlobalReach,
  ApiMilestone,
  ApiNews,
  ApiProduct,
  ApiTestimonial,
} from "./types";

/* ------------------------------------------------------------------ *
 * View models (the props each Home* component receives)
 * ------------------------------------------------------------------ */

export interface CategoryTile {
  id: string;
  no: string;
  kicker: string;
  title: string;
  description: string;
  image: string | null;
  imageAlt: string;
}

export interface MilestoneVM {
  id: string;
  tag: string;
  year: string;
  title: string;
  body: string;
  image: string | null;
  imageAlt: string;
}

export interface EventMetric {
  v: string;
  k: string;
}

export interface EventDetail {
  cat: string;
  about: string;
  role: string;
  supplied: string[];
  metrics: EventMetric[];
}

export interface EventVM {
  id: string;
  idx: string;
  year: string;
  title: string;
  loc: string;
  img: string;
  detail: EventDetail;
}

export interface RegionVM {
  id: string;
  name: string;
  role: string;
}

export interface GalleryImageVM {
  id: string;
  img: string;
  label: string;
}

export interface TestimonialVM {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string | null;
}

export interface NewsCardVM {
  id: string;
  cat: string;
  date: string;
  title: string;
  excerpt: string;
  image: string | null;
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

const pad2 = (n: number) => String(n + 1).padStart(2, "0");

/** "12 MAY 2026" style label used across the editorial cards. */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-GB", { month: "short", year: "numeric" })
    .toUpperCase();
}

/* ------------------------------------------------------------------ *
 * Section fetchers
 * ------------------------------------------------------------------ */

/** Categories → "What we build" bento (the grid renders the first 5). */
export async function getCategories(
  limit = HOME_LIMITS.categories,
): Promise<CategoryTile[]> {
  const categories = await safeList<ApiCategory>(API_ENDPOINTS.categories, {
    searchParams: { limit },
  });
  return categories.map((c, i) => ({
    id: c.id,
    no: pad2(i),
    kicker: c.isFeatured ? "FEATURED" : "CATEGORY",
    title: c.title,
    description: c.description,
    image: c.image,
    imageAlt: c.imageAlt ?? c.title,
  }));
}

/** Milestones → horizontal scroll timeline (already ordered by the API). */
export async function getMilestones(): Promise<MilestoneVM[]> {
  const milestones = await safeList<ApiMilestone>(API_ENDPOINTS.milestones, {
    searchParams: { limit: HOME_LIMITS.milestones },
  });
  return milestones.map((m, i) => ({
    id: m.id,
    tag: m.tag ?? `${pad2(i)} — MILESTONE`,
    year: String(m.year),
    title: m.title,
    body: m.description,
    image: m.imageUrl || null,
    imageAlt: m.imageAlt ?? m.title,
  }));
}

/** Events → "References & Events" index list + case-study overlay. */
export async function getEvents(): Promise<EventVM[]> {
  const events = await safeList<ApiEvent>(API_ENDPOINTS.events, {
    searchParams: { limit: HOME_LIMITS.events },
  });
  return events.map((e, i) => ({
    id: e.id,
    idx: pad2(i),
    year: String(e.year),
    title: e.title,
    loc: e.location,
    img: e.bannerImage,
    detail: {
      cat: (e.tags[0] ?? "Event").toUpperCase(),
      about: e.broadDescription,
      role: e.ourRole,
      supplied: e.tags,
      // The API carries no numeric metrics, so the overlay derives a couple of
      // honest facts from the record and hides the block when there's nothing.
      metrics: [
        { v: e.year ? String(e.year) : "", k: "Year" },
        ...(e.location ? [{ v: e.location, k: "Location" }] : []),
      ].filter((m) => m.v),
    },
  }));
}

/** Global Reach → the region list beside the 3D globe. */
export async function getRegions(): Promise<RegionVM[]> {
  const reach = await safeList<ApiGlobalReach>(API_ENDPOINTS.globalReach, {
    searchParams: { limit: HOME_LIMITS.regions },
  });
  return reach.map((r) => ({ id: r.id, name: r.country, role: r.description }));
}

/**
 * Products gallery → the 7 image tiles. There's no dedicated gallery endpoint;
 * gallery photos live on products (`images[]`), so we flatten across products
 * and take the first `limit` (default 7).
 */
export async function getGalleryImages(
  limit = HOME_LIMITS.galleryImages,
): Promise<GalleryImageVM[]> {
  const products = await safeList<ApiProduct>(API_ENDPOINTS.products, {
    searchParams: { limit: HOME_LIMITS.galleryProducts },
  });

  const tiles: GalleryImageVM[] = [];
  for (const product of products) {
    for (let i = 0; i < product.images.length; i++) {
      tiles.push({
        id: `${product.id}-${i}`,
        img: product.images[i],
        label: product.title,
      });
      if (tiles.length >= limit) return tiles;
    }
  }
  return tiles;
}

/** Testimonials → carousel (already ordered by the API). */
export async function getTestimonials(): Promise<TestimonialVM[]> {
  const testimonials = await safeList<ApiTestimonial>(API_ENDPOINTS.testimonials, {
    searchParams: { limit: HOME_LIMITS.testimonials },
  });
  return testimonials.map((t) => ({
    id: t.id,
    quote: t.testimonial,
    name: t.name,
    role: t.occupation,
    avatar: t.imageUrl,
  }));
}

/** News → the 3 latest editorial cards. */
export async function getNews(limit = HOME_LIMITS.news): Promise<NewsCardVM[]> {
  const news = await safeList<ApiNews>(API_ENDPOINTS.news, {
    searchParams: { limit },
  });
  return news
    .filter((n) => n.isActive)
    .slice(0, limit)
    .map((n) => ({
      id: n.id,
      cat: (n.tag ?? "News").toUpperCase(),
      date: formatDate(n.publishedDate),
      title: n.title,
      excerpt: n.description,
      image: n.bannerImageUrl || null,
    }));
}
