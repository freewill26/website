/**
 * Endpoint paths for the FreeWill Service Application, kept in one place so
 * routes aren't scattered as string literals across the data layer. Paths are
 * relative to {@link API_BASE_URL} (see `utils/constants`).
 */

/** Static list/collection endpoints (public, no auth). */
export const API_ENDPOINTS = {
  categories: "/categories",
  categoriesFeatured: "/categories/featured",
  products: "/products",
  blogs: "/blogs",
  news: "/news",
  events: "/events",
  testimonials: "/testimonials",
  brands: "/brands",
  milestones: "/milestones",
  globalReach: "/global-reach",
  socialLinks: "/social-links",
  teamMembers: "/team-members",
  advertisements: "/advertisements",
} as const;

/** Builders for single-resource / nested endpoints that take a parameter. */
export const API_ROUTES = {
  category: (id: string) => `/categories/${id}`,
  product: (id: string) => `/products/${id}`,
  productsByCategory: (categoryId: string) => `/products/category/${categoryId}`,
  news: (id: string) => `/news/${id}`,
  event: (id: string) => `/events/${id}`,
  blog: (id: string) => `/blogs/${id}`,
  /** CMS page by slug, e.g. `page("home")` → `/cms/pages/home`. */
  page: (slug: string) => `/cms/pages/${slug}`,
} as const;
