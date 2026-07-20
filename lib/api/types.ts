/**
 * Response shapes returned by the FreeWill Service Application, mirroring the
 * Prisma models exposed by the public (`Required Auth: No`) GET endpoints.
 * Only the fields the website consumes are typed here.
 */

/** Every list endpoint that takes `page`/`limit` returns this envelope. */
export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ApiCategory {
  id: string;
  title: string;
  description: string;
  image: string | null;
  imageAlt: string | null;
  broadDescription: string | null;
  isFeatured: boolean;
}

/** `GET /products` flattens the gallery relation into `images: string[]`. */
export interface ApiProduct {
  id: string;
  title: string;
  description: string;
  image: string | null;
  imageAlt: string | null;
  images: string[];
  categoryId: string | null;
}

/** One row of a product's feature strip, authored in the CMS. */
export interface ApiProductFeature {
  image: string;
  imageAlt?: string | null;
  title: string;
  description: string;
}

/** One numbered component block on a product detail page. */
export interface ApiProductSpecBlock {
  title: string;
  image: string;
  imageAlt?: string | null;
  /** rich-text HTML */
  content: string;
}

/** `GET /products/:id` — the full record, for the product detail page. */
export interface ApiProductDetail extends ApiProduct {
  broadDescription: string;
  tag: string | null;
  aboutTitle: string | null;
  aboutDescription: string | null;
  aboutImage: string | null;
  blueprintHtml: string | null;
  features: ApiProductFeature[];
  specifications: ApiProductSpecBlock[];
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export interface ApiMilestone {
  id: string;
  imageUrl: string;
  imageAlt: string | null;
  tag: string | null;
  year: number;
  title: string;
  description: string;
  order: number;
}

export interface ApiEvent {
  id: string;
  year: number;
  title: string;
  location: string;
  bannerImage: string;
  bannerImageAlt: string | null;
  broadDescription: string;
  ourRole: string;
  tags: string[];
  order: number;
}

export interface ApiGlobalReach {
  id: string;
  country: string;
  description: string;
}

/** `GET /brands` — partner organisations and product brands for the marquee. */
export interface ApiBrand {
  id: string;
  title: string;
  description: string;
  image: string | null;
  imageAlt: string | null;
  category: "ORGANISATION" | "BRAND";
  order: number;
}

/** `GET /team-members` — founders and wider team, split client-side by `type`. */
export interface ApiTeamMember {
  id: string;
  name: string;
  occupation: string;
  description: string | null;
  testimonial: string | null;
  image: string;
  imageAlt: string;
  linkedinLink: string | null;
  twitterLink: string | null;
  type: "FOUNDER" | "TEAM_MEMBER";
  order: number;
}

export interface ApiTestimonial {
  id: string;
  testimonial: string;
  imageUrl: string | null;
  name: string;
  occupation: string;
  order: number;
}

/**
 * The CMS `keyvalue` field submits `{ key, value }`, but some seeded records
 * predate that convention and stored `{ label, value }` instead — tolerate
 * both rather than dropping the fact.
 */
export interface ApiKeyFact {
  key?: string;
  label?: string;
  value: string;
}

/** `GET /news` and `GET /news/:id` return the same shape — no list-projection on this resource. */
export interface ApiNews {
  id: string;
  bannerImageUrl: string;
  bannerImageAlt: string | null;
  tag: string | null;
  publishedDate: string;
  title: string;
  description: string;
  /** Full article body (HTML), authored via the CMS rich-text editor. */
  content: string;
  keyFacts: ApiKeyFact[];
  isActive: boolean;
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

/** `GET /blogs` and `GET /blogs/:id` — same shape, no list-projection on this resource. */
export interface ApiBlog {
  id: string;
  bannerImageUrl: string;
  bannerImageAlt: string | null;
  tag: string | null;
  publishedDate: string;
  title: string;
  description: string;
  /** Full post body (HTML), authored via the CMS rich-text editor. */
  content: string;
  isActive: boolean;
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

/** CMS `Field.type`; `value` shape depends on it (plain string, or `{ url, alt }` for images). */
export interface ApiField {
  id: string;
  key: string;
  label: string;
  type: string;
  value: unknown;
  sortOrder: number;
}

export interface ApiSection {
  id: string;
  key: string;
  name: string;
  sortOrder: number;
  fields: ApiField[];
}

/** `GET /cms/pages/:slug` — a CMS page with its ordered sections and fields. */
export interface ApiPage {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  sections: ApiSection[];
}
