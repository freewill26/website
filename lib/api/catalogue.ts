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
