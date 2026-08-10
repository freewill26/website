/**
 * Gallery-page data layer, mirroring `lib/api/products.ts`. There's no
 * dedicated gallery endpoint, so the full catalogue (all categories, products
 * and product types) is fetched once — cheap, since the underlying
 * `/categories`, `/products` and `/product-types` calls are ISR-cached —
 * flattened into one ordered image list, and sliced
 * `GALLERY_LIMITS.imagesPerPage` at a time. This guarantees every
 * infinite-scroll batch is exactly that many images, regardless of how many
 * gallery photos any one product has.
 */
import { safeGet, safeList } from "./http";
import { API_ENDPOINTS, API_ROUTES } from "@/utils/apis";
import { GALLERY_LIMITS } from "@/utils/constants";
import type {
  ApiCategory,
  ApiField,
  ApiPage,
  ApiProduct,
  ApiProductTypeListItem,
  ApiProductVariantListItem,
} from "./types";

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
  kind: "product" | "category" | "productType" | "productVariant";
  /** The category this image belongs to (its own id for a category image, the product's category otherwise). */
  categoryId: string | null;
  /**
   * The product this image belongs to, or `null` for a category image. Types
   * and variants inherit their ancestor product's id, so filtering by a product
   * returns its own photos *and* everything below it.
   */
  productId: string | null;
  /**
   * The product type this image belongs to, or `null` above that level. A
   * variant's images inherit their parent type's id for the same reason.
   */
  productTypeId: string | null;
  /** The product variant this image belongs to, or `null` for any other image. */
  productVariantId: string | null;
}

export interface GalleryFeedPage {
  items: GalleryFeedItemVM[];
  /** Whether the flattened image list has more images beyond this page. */
  hasMore: boolean;
}

/**
 * Narrows the feed to any one level of the hierarchy — a category (with
 * everything under it), a product (with its types and their variants), a type
 * (with its variants), or a single variant.
 */
export interface GalleryFeedFilter {
  categoryId?: string;
  productId?: string;
  productTypeId?: string;
  productVariantId?: string;
}

/** One selectable filter in the searchbar / chip row / browse sheet. */
export interface GalleryFilterOptionVM {
  id: string;
  title: string;
  kind: "category" | "product" | "productType" | "productVariant";
  /** For everything below a category: which category it sits under (so the sheet can group it). */
  categoryId: string | null;
  /** For types and variants: which product they sit under (so the sheet can nest them). */
  productId: string | null;
  /** For variants: which type they sit under (so the sheet can nest them one deeper). */
  productTypeId: string | null;
}

/**
 * The category → product → type → variant taxonomy that drives the gallery's
 * filter UI.
 */
export interface GalleryTaxonomyVM {
  categories: GalleryFilterOptionVM[];
  products: GalleryFilterOptionVM[];
  productTypes: GalleryFilterOptionVM[];
  productVariants: GalleryFilterOptionVM[];
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
 * image first, then every product's main image + gallery images, then every
 * product type's, in listing order. Built fresh per call, but cheap — the
 * underlying list fetches are ISR-cached (`DEFAULT_REVALIDATE`), so repeated
 * calls across pages/requests don't hit the service API each time.
 *
 * A type's images carry its parent product's id and category as well as its
 * own id, so they surface under the product's filter *and* under their own.
 */
async function getFullGalleryFeed(): Promise<GalleryFeedItemVM[]> {
  const [categories, products, productTypes, productVariants] = await Promise.all([
    safeList<ApiCategory>(API_ENDPOINTS.categories, {
      searchParams: { limit: GALLERY_LIMITS.categories },
    }),
    safeList<ApiProduct>(API_ENDPOINTS.products, {
      searchParams: { limit: GALLERY_LIMITS.products },
    }),
    safeList<ApiProductTypeListItem>(API_ENDPOINTS.productTypes, {
      searchParams: { limit: GALLERY_LIMITS.productTypes },
    }),
    safeList<ApiProductVariantListItem>(API_ENDPOINTS.productVariants, {
      searchParams: { limit: GALLERY_LIMITS.productVariants },
    }),
  ]);

  const items: GalleryFeedItemVM[] = [];
  for (const c of categories) {
    if (c.image) {
      items.push({ id: `category-${c.id}`, src: c.image, title: c.title, kind: "category", categoryId: c.id, productId: null, productTypeId: null, productVariantId: null });
    }
  }
  for (const p of products) {
    if (p.image) {
      items.push({ id: `product-${p.id}-main`, src: p.image, title: p.title, kind: "product", categoryId: p.categoryId, productId: p.id, productTypeId: null, productVariantId: null });
    }
    for (let i = 0; i < p.images.length; i++) {
      items.push({ id: `product-${p.id}-${i}`, src: p.images[i], title: p.title, kind: "product", categoryId: p.categoryId, productId: p.id, productTypeId: null, productVariantId: null });
    }
  }
  for (const t of productTypes) {
    const categoryId = t.product?.categoryId ?? null;
    if (t.image) {
      items.push({ id: `type-${t.id}-main`, src: t.image, title: t.title, kind: "productType", categoryId, productId: t.productId, productTypeId: t.id, productVariantId: null });
    }
    for (let i = 0; i < t.images.length; i++) {
      items.push({ id: `type-${t.id}-${i}`, src: t.images[i], title: t.title, kind: "productType", categoryId, productId: t.productId, productTypeId: t.id, productVariantId: null });
    }
  }
  for (const v of productVariants) {
    const categoryId = v.productType?.product?.categoryId ?? null;
    const productId = v.productType?.productId ?? null;
    if (v.image) {
      items.push({ id: `variant-${v.id}-main`, src: v.image, title: v.title, kind: "productVariant", categoryId, productId, productTypeId: v.productTypeId, productVariantId: v.id });
    }
    for (let i = 0; i < v.images.length; i++) {
      items.push({ id: `variant-${v.id}-${i}`, src: v.images[i], title: v.title, kind: "productVariant", categoryId, productId, productTypeId: v.productTypeId, productVariantId: v.id });
    }
  }
  return items;
}

/**
 * One page of the gallery feed — always exactly `GALLERY_LIMITS.imagesPerPage`
 * images (or fewer on the last page). `page` is 1-indexed. An optional filter
 * narrows the flattened list to one type, one product (with its types), or one
 * category (with its products and their types) before slicing — so paging
 * works identically within a filtered set. Narrowest filter wins.
 */
export async function getGalleryFeedPage(
  page: number,
  filter?: GalleryFeedFilter,
): Promise<GalleryFeedPage> {
  const all = await getFullGalleryFeed();
  const scoped = filter?.productVariantId
    ? all.filter((i) => i.productVariantId === filter.productVariantId)
    : filter?.productTypeId
      ? all.filter((i) => i.productTypeId === filter.productTypeId)
      : filter?.productId
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
 * The category → product → type lists that drive the filter UI (searchbar,
 * chip row, browse sheet). Only entries that actually contribute at least one
 * gallery image are included, so no filter can ever resolve to an empty feed.
 */
export async function getGalleryTaxonomy(): Promise<GalleryTaxonomyVM> {
  const feed = await getFullGalleryFeed();
  const categoryIds = new Set(feed.map((i) => i.categoryId).filter((id): id is string => Boolean(id)));
  const productIds = new Set(feed.map((i) => i.productId).filter((id): id is string => Boolean(id)));
  const productTypeIds = new Set(feed.map((i) => i.productTypeId).filter((id): id is string => Boolean(id)));
  const productVariantIds = new Set(feed.map((i) => i.productVariantId).filter((id): id is string => Boolean(id)));

  const [categories, products, productTypes, productVariants] = await Promise.all([
    safeList<ApiCategory>(API_ENDPOINTS.categories, {
      searchParams: { limit: GALLERY_LIMITS.categories },
    }),
    safeList<ApiProduct>(API_ENDPOINTS.products, {
      searchParams: { limit: GALLERY_LIMITS.products },
    }),
    safeList<ApiProductTypeListItem>(API_ENDPOINTS.productTypes, {
      searchParams: { limit: GALLERY_LIMITS.productTypes },
    }),
    safeList<ApiProductVariantListItem>(API_ENDPOINTS.productVariants, {
      searchParams: { limit: GALLERY_LIMITS.productVariants },
    }),
  ]);

  return {
    categories: categories
      .filter((c) => categoryIds.has(c.id))
      .map((c) => ({ id: c.id, title: c.title, kind: "category" as const, categoryId: c.id, productId: null, productTypeId: null })),
    products: products
      .filter((p) => productIds.has(p.id))
      .map((p) => ({ id: p.id, title: p.title, kind: "product" as const, categoryId: p.categoryId, productId: null, productTypeId: null })),
    productTypes: productTypes
      .filter((t) => productTypeIds.has(t.id))
      .map((t) => ({
        id: t.id,
        title: t.title,
        kind: "productType" as const,
        categoryId: t.product?.categoryId ?? null,
        productId: t.productId,
        productTypeId: null,
      })),
    productVariants: productVariants
      .filter((v) => productVariantIds.has(v.id))
      .map((v) => ({
        id: v.id,
        title: v.title,
        kind: "productVariant" as const,
        categoryId: v.productType?.product?.categoryId ?? null,
        productId: v.productType?.productId ?? null,
        productTypeId: v.productTypeId,
      })),
  };
}
