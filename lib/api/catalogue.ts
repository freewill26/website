/**
 * Catalogue-page data layer, mirroring `lib/api/gallery.ts`.
 *
 * `getCataloguePageContent` reads the CMS "catalogue" page (slug `catalogue`)
 * for the hero copy + SEO, each field degrading independently to
 * {@link CATALOGUE_CONTENT_DEFAULTS}. The brochures themselves are not CMS page
 * content — they're `Catalogue` records fetched from `/catalogues`.
 */
import { safeGet, safeList } from "./http";
import { API_ENDPOINTS, API_ROUTES } from "@/utils/apis";
import { CATALOGUE_LIMITS } from "@/utils/constants";
import type { ApiCatalogue, ApiField, ApiPage } from "./types";

/* ------------------------------------------------------------------ *
 * View models
 * ------------------------------------------------------------------ */

export interface CataloguePageContent {
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

/** One downloadable brochure card. */
export interface CatalogueItemVM {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  cover: string | null;
  coverAlt: string;
  /** Pre-formatted size ("2.4 MB"), or null when the size isn't known. */
  size: string | null;
  /** Filename suggested to the browser when downloading. */
  downloadName: string;
}

const CATALOGUE_CONTENT_DEFAULTS: CataloguePageContent = {
  seo: {
    title: "Catalogue · Freewill",
    description:
      "Download Freewill product catalogues and brochures — sports flooring, stadium seating, gymnastics apparatus and outdoor surfaces.",
    ogTitle: "Catalogue · Freewill",
    ogDescription:
      "Download Freewill product catalogues and brochures — sports flooring, stadium seating, gymnastics apparatus and outdoor surfaces.",
    ogImage: null,
  },
  hero: {
    title: "The Catalogue",
    headline: "Everything we build,\non paper.",
    description:
      "Product ranges, technical specifications and certifications — download the brochure you need, or take the lot.",
  },
};

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function fieldValue(fields: ApiField[] | undefined, key: string): string | undefined {
  const value = fields?.find((f) => f.key === key)?.value;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/** Human-readable file size; null when the API didn't record one. */
function formatSize(bytes: number | null): string | null {
  if (!bytes || bytes <= 0) return null;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * A safe `download` filename derived from the title, so a saved brochure isn't
 * called `9f2c-…-uuid.pdf`. Only honoured for same-origin downloads; on a
 * cross-origin storage URL the browser keeps the server's name, which is fine.
 */
function downloadName(title: string): string {
  const slug =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || "catalogue";
  return `${slug}.pdf`;
}

/* ------------------------------------------------------------------ *
 * Fetchers
 * ------------------------------------------------------------------ */

/** Catalogue CMS page (`slug: "catalogue"`) → hero copy + SEO metadata. */
export async function getCataloguePageContent(): Promise<CataloguePageContent> {
  const page = await safeGet<ApiPage | null>(API_ROUTES.page("catalogue"), null);
  const hero = page?.sections?.find((s) => s.key === "hero_section")?.fields;
  const d = CATALOGUE_CONTENT_DEFAULTS;

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

/**
 * The published brochures, in the order set in the CMS. `isActive=true` keeps
 * unpublished rows off the site; anything without a file URL is dropped so a
 * half-filled record can't render a dead download button.
 */
export async function getCatalogues(): Promise<CatalogueItemVM[]> {
  const rows = await safeList<ApiCatalogue>(API_ENDPOINTS.catalogues, {
    searchParams: { limit: CATALOGUE_LIMITS.list, isActive: true },
  });

