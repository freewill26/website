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
