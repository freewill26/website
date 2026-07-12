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
