/**
 * App-wide constants. Configuration values, magic numbers and tunables live
 * here so they're defined once and easy to find.
 */

/**
 * Base URL of the FreeWill Service Application (NestJS API). Server-only
 * (`API_BASE_URL`) with a public fallback, defaulting to the local dev server
 * that `npm run dev` starts in the service app.
 */
export const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:3000";

/**
 * Default ISR window (seconds) for public content. Pages are server rendered
 * and the data is revalidated in the background at most once per window.
 */
export const DEFAULT_REVALIDATE = 300;

/**
 * How many records each home-page section requests / renders. `fetch` limits
 * are generous enough to cover the design; `*Show` values cap what's displayed.
 */
export const HOME_LIMITS = {
  /** Category tiles rendered in the "What we build" bento. */
  categories: 5,
  milestones: 50,
  events: 50,
  /** Countries listed beside the "Global Reach" globe. */
  regions: 3,
  /** Product gallery images shown in the gallery grid. */
  galleryImages: 7,
  /** Products scanned to collect enough gallery images. */
  galleryProducts: 20,
  testimonials: 20,
  /** Partner logos pulled for the brand marquee (both categories combined). */
  brands: 40,
  /** Latest-news cards. */
  news: 3,
} as const;

/**
 * How many records each About-page section requests. Team is split into
 * founders / wider team client-side, so one generous fetch covers both.
 */
export const ABOUT_LIMITS = {
  /** Team members pulled for the founders + "our people" grids. */
  team: 50,
} as const;

/**
 * How many records the Products index / catalogue autocomplete request.
 * Generous limits since every category and product feeds the "surface /
 * product" enquiry-form autocomplete, not just what's visible on screen.
 */
export const PRODUCTS_LIMITS = {
  categories: 50,
  products: 300,
} as const;

/**
 * Gallery feed pagination. The full catalogue (categories + products) is
 * fetched once — cheap thanks to ISR caching — flattened into one ordered
 * image list, then sliced `imagesPerPage` at a time so every infinite-scroll
 * batch is exactly that many images, regardless of how images are distributed
 * across products.
 */
/** How many records the News / Blog index pages request — generous since both are single unpaginated feeds. */
export const NEWS_LIMITS = {
  list: 100,
} as const;

export const BLOG_LIMITS = {
  list: 100,
} as const;

export const GALLERY_LIMITS = {
  /** Category images shown once, ahead of the product feed. */
  categories: 50,
  /** Products scanned to build the full flattened image list. */
  products: 300,
  /** Images returned per infinite-scroll page. */
  imagesPerPage: 10,
  /** Chips shown in the collapsed filter row, incl. "All" and "Load More". */
  chipRow: 10,
  /** Max results shown in the inline searchbar dropdown. */
  searchResults: 8,
} as const;
