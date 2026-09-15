/**
 * Clientele-page data layer, mirroring `lib/api/videos.ts`.
 *
 * `getClientelePageContent` reads the CMS "clientele" page (slug `clientele`)
 * for the hero copy + SEO. The roster itself is `Client` records off
 * `/clients`, fetched in one pass and partitioned into the six sectors the
 * page groups them under — the same shape as `getBrands()` in `lib/api/home.ts`.
 */
import { safeList, safeGet } from "./http";
import { API_ENDPOINTS, API_ROUTES } from "@/utils/apis";
import { CLIENTELE_LIMITS } from "@/utils/constants";
import type { ApiClient, ApiClientCategory, ApiField, ApiPage } from "./types";

/* ------------------------------------------------------------------ *
 * View models
 * ------------------------------------------------------------------ */

export interface ClientelePageContent {
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

export interface ClientVM {
  id: string;
  /** Null while a legacy logo is still unidentified. */
  name: string | null;
  logo: string;
  logoAlt: string;
  link: string | null;
}

export interface ClientGroupVM {
  category: ApiClientCategory;
  /** Human label for the filter tab and the section heading. */
  label: string;
  clients: ClientVM[];
}

/**
 * Display labels and running order for the six sectors, matching the tabs the
 * legacy site used. Order here is the order they appear on the page.
 */
export const CLIENT_CATEGORY_LABELS: Array<{
  category: ApiClientCategory;
  label: string;
}> = [
  { category: "HOTELS_RESORTS_CLUBS", label: "Hotels, Resorts & Clubs" },
  { category: "EDUCATIONAL_ACADEMIES", label: "Educational Academies" },
  { category: "BUILDERS", label: "Builders" },
  { category: "PRIVATE", label: "Private" },
  { category: "GOVERNMENT_SECTOR", label: "Government Sector" },
  { category: "INDIAN_INTERNATIONAL_EVENTS", label: "Indian International Events" },
];

const CLIENTELE_CONTENT_DEFAULTS: ClientelePageContent = {
  seo: {
    title: "Clientele · Freewill",
    description:
      "The hotels, academies, builders, corporates, government bodies and international events Freewill has built sports infrastructure for across India.",
    ogTitle: "Clientele · Freewill",
    ogDescription:
      "Six sectors, one standard. The organisations Freewill has surfaced, seated and equipped.",
    ogImage: null,
  },
  hero: {
    title: "Our Clientele",
    headline: "The people\nwho asked first.",
    description:
      "Hotels and clubs, schools and universities, builders, corporates, state sports bodies and the international events India has hosted — the organisations that have trusted us with their floors, seats and equipment.",
  },
};

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function fieldValue(fields: ApiField[] | undefined, key: string): string | undefined {
  const value = fields?.find((f) => f.key === key)?.value;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function toVM(row: ApiClient): ClientVM | null {
  // A client with no logo has nothing to render on a logo wall, so it's
  // dropped rather than leaving a hole in the grid.
  if (!row.logo) return null;
  return {
    id: row.id,
    name: row.name?.trim() || null,
    logo: row.logo,
    logoAlt: row.logoAlt?.trim() || (row.name?.trim() ? `${row.name.trim()} logo` : "Client logo"),
    link: row.link?.trim() || null,
  };
}

/* ------------------------------------------------------------------ *
 * Fetchers
 * ------------------------------------------------------------------ */

/** Clientele CMS page (`slug: "clientele"`) → hero copy + SEO metadata. */
export async function getClientelePageContent(): Promise<ClientelePageContent> {
  const page = await safeGet<ApiPage | null>(API_ROUTES.page("clientele"), null);
  const hero = page?.sections?.find((s) => s.key === "hero_section")?.fields;
  const d = CLIENTELE_CONTENT_DEFAULTS;

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
 * The full roster, partitioned into the six sectors in display order. Sectors
 * with no listed clients are dropped so the page never renders an empty tab.
 */
export async function getClienteleGroups(): Promise<ClientGroupVM[]> {
  const records = await safeList<ApiClient>(API_ENDPOINTS.clients, {
    searchParams: { limit: CLIENTELE_LIMITS.clients, isActive: true },
  });

  return CLIENT_CATEGORY_LABELS.map(({ category, label }) => ({
    category,
    label,
    clients: records
      .filter((r) => r.category === category)
      .map(toVM)
      .filter((c): c is ClientVM => c !== null),
  })).filter((g) => g.clients.length > 0);
}
