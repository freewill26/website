/**
 * Gallery-page data layer, mirroring `lib/api/products.ts`. There's no
 * dedicated gallery endpoint, so the full catalogue (all categories +
 * products) is fetched once — cheap, since the underlying `/categories` and
 * `/products` calls are ISR-cached — flattened into one ordered image list,
 * and sliced `GALLERY_LIMITS.imagesPerPage` at a time. This guarantees every
 * infinite-scroll batch is exactly that many images, regardless of how many
 * gallery photos any one product has.
 */
import { safeGet, safeList } from "./http";
import { API_ENDPOINTS, API_ROUTES } from "@/utils/apis";
import { GALLERY_LIMITS } from "@/utils/constants";
import type { ApiCategory, ApiField, ApiPage, ApiProduct } from "./types";

/* ------------------------------------------------------------------ *
 * View models
 * ------------------------------------------------------------------ */

export interface GalleryPageContent {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string | null;
  };
  hero: {
    title: string;
    /** `\n`-delimited — one stacked heading line per entry. */
    headline: string;
    description: string;
  };
}

export interface GalleryFeedItemVM {
  id: string;
  src: string;
  title: string;
  kind: "product" | "category";
  /** The category this image belongs to (its own id for a category image, the product's category for a product image). */
  categoryId: string | null;
  /** The product this image belongs to, or `null` for a category image. */
  productId: string | null;
}

export interface GalleryFeedPage {
  items: GalleryFeedItemVM[];
  /** Whether the flattened image list has more images beyond this page. */
  hasMore: boolean;
}

/** Narrows the feed to one category (with its products) or one product. */
export interface GalleryFeedFilter {
  categoryId?: string;
  productId?: string;
}

/** One selectable filter in the searchbar / chip row / browse sheet. */
export interface GalleryFilterOptionVM {
  id: string;
  title: string;
  kind: "category" | "product";
  /** For products: which category they sit under (so the sheet can group them). */
  categoryId: string | null;
}

/** The category + product taxonomy that drives the gallery's filter UI. */
export interface GalleryTaxonomyVM {
  categories: GalleryFilterOptionVM[];
  products: GalleryFilterOptionVM[];
}

const GALLERY_CONTENT_DEFAULTS: GalleryPageContent = {
  seo: {
    title: "Gallery · Freewill",
    description:
      "Photos and films from sports venues Freewill has surfaced, seated and equipped across India. Filter by surface to explore.",
    ogTitle: "Gallery · Freewill",
    ogDescription:
      "Photos and films from sports venues Freewill has surfaced, seated and equipped across India. Filter by surface to explore.",
    ogImage: null,
  },
  hero: {
    title: "The Gallery",
    headline: "Where India\ncomes to play.",
    description:
      "Photos and films from venues we've surfaced, seated and equipped across the country. Filter by surface to explore.",
  },
};

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function fieldValue(fields: ApiField[] | undefined, key: string): string | undefined {
  const value = fields?.find((f) => f.key === key)?.value;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/* ------------------------------------------------------------------ *
 * Page content
 * ------------------------------------------------------------------ */

/** Gallery CMS page (`slug: "gallery"`) → hero copy + SEO metadata. */
export async function getGalleryPageContent(): Promise<GalleryPageContent> {
  const page = await safeGet<ApiPage | null>(API_ROUTES.page("gallery"), null);
  const hero = page?.sections?.find((s) => s.key === "hero_section")?.fields;
  const d = GALLERY_CONTENT_DEFAULTS;

  return {
    seo: {
      title: page?.seoTitle || d.seo.title,
      description: page?.seoDescription || d.seo.description,
      ogTitle: page?.ogTitle || d.seo.ogTitle,
      ogDescription: page?.ogDescription || d.seo.ogDescription,
      ogImage: page?.ogImage || d.seo.ogImage,
    },
    hero: {
      title: fieldValue(hero, "title") ?? d.hero.title,
      headline: fieldValue(hero, "headline") ?? d.hero.headline,
      description: fieldValue(hero, "description") ?? d.hero.description,
    },
  };
}

/* ------------------------------------------------------------------ *
 * Feed
 * ------------------------------------------------------------------ */

/**
 * The full catalogue flattened into one ordered image list: every category's
 * image first, then every product's main image + gallery images, in listing
 * order. Built fresh per call, but cheap — the two underlying list fetches
 * are ISR-cached (`DEFAULT_REVALIDATE`), so repeated calls across pages/requests
 * don't hit the service API each time.
 */
async function getFullGalleryFeed(): Promise<GalleryFeedItemVM[]> {
  const [categories, products] = await Promise.all([
    safeList<ApiCategory>(API_ENDPOINTS.categories, {
      searchParams: { limit: GALLERY_LIMITS.categories },
    }),
    safeList<ApiProduct>(API_ENDPOINTS.products, {
      searchParams: { limit: GALLERY_LIMITS.products },
    }),
  ]);

  const items: GalleryFeedItemVM[] = [];
  for (const c of categories) {
    if (c.image) {
      items.push({ id: `category-${c.id}`, src: c.image, title: c.title, kind: "category", categoryId: c.id, productId: null });
    }
  }
  for (const p of products) {
    if (p.image) {
      items.push({ id: `product-${p.id}-main`, src: p.image, title: p.title, kind: "product", categoryId: p.categoryId, productId: p.id });
    }
    for (let i = 0; i < p.images.length; i++) {
      items.push({ id: `product-${p.id}-${i}`, src: p.images[i], title: p.title, kind: "product", categoryId: p.categoryId, productId: p.id });
    }
  }
  return items;
}

/**
 * One page of the gallery feed — always exactly `GALLERY_LIMITS.imagesPerPage`
 * images (or fewer on the last page). `page` is 1-indexed. An optional filter
 * narrows the flattened list to one product, or one category and its products,
 * before slicing — so paging works identically within a filtered set.
 */
export async function getGalleryFeedPage(
  page: number,
  filter?: GalleryFeedFilter,
): Promise<GalleryFeedPage> {
  const all = await getFullGalleryFeed();
  const scoped = filter?.productId
    ? all.filter((i) => i.productId === filter.productId)
    : filter?.categoryId
      ? all.filter((i) => i.categoryId === filter.categoryId)
      : all;

  const perPage = GALLERY_LIMITS.imagesPerPage;
  const start = (page - 1) * perPage;

  return {
    items: scoped.slice(start, start + perPage),
    hasMore: start + perPage < scoped.length,
  };
}

/**
 * The category + product lists that drive the filter UI (searchbar, chip row,
 * browse sheet). Only entries that actually contribute at least one gallery
 * image are included, so no filter can ever resolve to an empty feed.
 */
export async function getGalleryTaxonomy(): Promise<GalleryTaxonomyVM> {
  const feed = await getFullGalleryFeed();
  const categoryIds = new Set(feed.map((i) => i.categoryId).filter((id): id is string => Boolean(id)));
  const productIds = new Set(feed.map((i) => i.productId).filter((id): id is string => Boolean(id)));

  const [categories, products] = await Promise.all([
    safeList<ApiCategory>(API_ENDPOINTS.categories, {
      searchParams: { limit: GALLERY_LIMITS.categories },
    }),
    safeList<ApiProduct>(API_ENDPOINTS.products, {
      searchParams: { limit: GALLERY_LIMITS.products },
    }),
  ]);

  return {
    categories: categories
      .filter((c) => categoryIds.has(c.id))
      .map((c) => ({ id: c.id, title: c.title, kind: "category" as const, categoryId: c.id })),
    products: products
      .filter((p) => productIds.has(p.id))
      .map((p) => ({ id: p.id, title: p.title, kind: "product" as const, categoryId: p.categoryId })),
  };
}
