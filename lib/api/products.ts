/**
 * Products-page data layer, mirroring `lib/api/home.ts` and `lib/api/about.ts`:
 * each function fetches from the service API and maps the response into the
 * small view model its component consumes, degrading to defaults on failure.
 */
import { safeGet, safeList } from "./http";
import { API_ENDPOINTS, API_ROUTES } from "@/utils/apis";
import { PRODUCTS_LIMITS } from "@/utils/constants";
import type { ApiCategory, ApiField, ApiPage, ApiProduct, ApiProductDetail } from "./types";

/* ------------------------------------------------------------------ *
 * View models
 * ------------------------------------------------------------------ */

export interface ProductsPageContent {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string | null;
  };
  hero: {
    title: string;
    headline: string;
    description: string;
    backgroundImage: string;
  };
}

export interface ProductCardVM {
  id: string;
  title: string;
  description: string;
  image: string | null;
  imageAlt: string;
}

export interface CategoryWithProductsVM {
  id: string;
  title: string;
  description: string;
  products: ProductCardVM[];
}

/** Fallback copy used whenever the CMS page/section/field is missing. */
const PRODUCTS_CONTENT_DEFAULTS: ProductsPageContent = {
  seo: {
    title: "Products & Systems · Freewill",
    description:
      "Everything the game is played on — Olympic vinyl, floating maple, all-weather turf, telescopic seating and competition equipment, indoor to outdoor.",
    ogTitle: "Products & Systems · Freewill",
    ogDescription:
      "Everything the game is played on — Olympic vinyl, floating maple, all-weather turf, telescopic seating and competition equipment, indoor to outdoor.",
    ogImage: null,
  },
  hero: {
    title: "Products & Systems",
    headline: "Everything the game is played on.",
    description:
      "From Olympic vinyl and floating maple to all-weather turf, telescopic seating and competition equipment — one partner for the complete arena, indoor to outdoor.",
    backgroundImage: "/assets/splash-stadium.jpg",
  },
};

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

/** Reads a field's raw value by key from a section, or `undefined` if absent/empty. */
function fieldValue(fields: ApiField[] | undefined, key: string): string | undefined {
  const value = fields?.find((f) => f.key === key)?.value;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/** Reads an image field's value, handling both the seeded plain-string shape and the CMS-upload `{url,alt}` shape. */
function fieldImage(fields: ApiField[] | undefined, key: string): string | undefined {
  const value = fields?.find((f) => f.key === key)?.value;
  if (typeof value === "string" && value.length > 0) return value;
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const url = (value as { url?: unknown }).url;
    if (typeof url === "string" && url.length > 0) return url;
  }
  return undefined;
}

/* ------------------------------------------------------------------ *
 * Page content
 * ------------------------------------------------------------------ */

/**
 * Products CMS page (`slug: "products"`) → hero copy + SEO metadata. Every
 * field falls back independently to {@link PRODUCTS_CONTENT_DEFAULTS} so a
 * missing section/field (or a down API) never blanks the page.
 */
export async function getProductsPageContent(): Promise<ProductsPageContent> {
  const page = await safeGet<ApiPage | null>(API_ROUTES.page("products"), null);
  const hero = page?.sections?.find((s) => s.key === "hero_section")?.fields;
  const d = PRODUCTS_CONTENT_DEFAULTS;

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
      backgroundImage: fieldImage(hero, "background_image") ?? d.hero.backgroundImage,
    },
  };
}

/* ------------------------------------------------------------------ *
 * Catalogue
 * ------------------------------------------------------------------ */

/**
 * Categories with their products nested, for the index page's category rails.
 * There's no combined endpoint, so we fetch both flat lists and group products
 * by `categoryId` client-side (same approach as `getBrands`/`getGalleryImages`
 * in the Home data layer). Categories with no products are omitted — nothing
 * to show and no product to link to.
 */
export async function getCategoriesWithProducts(): Promise<CategoryWithProductsVM[]> {
  const [categories, products] = await Promise.all([
    safeList<ApiCategory>(API_ENDPOINTS.categories, {
      searchParams: { limit: PRODUCTS_LIMITS.categories },
    }),
    safeList<ApiProduct>(API_ENDPOINTS.products, {
      searchParams: { limit: PRODUCTS_LIMITS.products },
    }),
  ]);

  const toCard = (p: ApiProduct): ProductCardVM => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    imageAlt: p.imageAlt ?? p.title,
  });

  return categories
    .map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      products: products.filter((p) => p.categoryId === c.id).map(toCard),
    }))
    .filter((c) => c.products.length > 0);
}

/**
 * Every category + product title, for the "surface / product" enquiry-form
 * autocomplete. Categories first (broader), then products, de-duplicated.
 */
export async function getCatalogOptions(): Promise<string[]> {
  const [categories, products] = await Promise.all([
    safeList<ApiCategory>(API_ENDPOINTS.categories, {
      searchParams: { limit: PRODUCTS_LIMITS.categories },
    }),
    safeList<ApiProduct>(API_ENDPOINTS.products, {
      searchParams: { limit: PRODUCTS_LIMITS.products },
    }),
  ]);

  const titles = [...categories.map((c) => c.title), ...products.map((p) => p.title)];
  return Array.from(new Set(titles.filter((t) => t.length > 0)));
}

/** A single product for the detail page, or `null` if it doesn't exist. */
export async function getProduct(id: string): Promise<ApiProductDetail | null> {
  return safeGet<ApiProductDetail | null>(API_ROUTES.product(id), null);
}
