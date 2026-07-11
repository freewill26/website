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

export interface ApiTestimonial {
  id: string;
  testimonial: string;
  imageUrl: string | null;
  name: string;
  occupation: string;
  order: number;
}

export interface ApiNews {
  id: string;
  bannerImageUrl: string;
  bannerImageAlt: string | null;
  tag: string | null;
  publishedDate: string;
  title: string;
  description: string;
  isActive: boolean;
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
