/**
 * Advertising data layer — the CMS-managed promo slots that live in the site
 * chrome rather than on any one page: the header pill, the footer "Solutions"
 * column and the scrolling credentials ribbon.
 *
 * Every accessor funnels through {@link getAdvertisements}, which fetches the
 * whole (small) active set in one request. Next.js dedupes the underlying
 * `fetch`, so a page rendering the header, the ribbon and the footer still
 * costs one API call.
 *
 * Each accessor degrades to the copy the site shipped hardcoded, so an API
 * outage leaves the chrome intact rather than blanking the nav.
 */
import { safeList } from "./http";
import { API_ENDPOINTS } from "@/utils/apis";

type AdPlacement = "HEADER_BUTTON" | "FOOTER_SOLUTION" | "MARQUEE_ITEM";

interface ApiAdvertisement {
  id: string;
  label: string;
  link: string | null;
  badge: string | null;
  placement: AdPlacement;
  isActive: boolean;
  order: number;
}

/** A promo with a destination — the header button and each footer solution. */
export interface AdLink {
  label: string;
  /** Internal path or absolute URL. Always opens in the same tab. */
  href: string;
  /** Optional pill next to the label (header only); `null` hides it. */
  badge: string | null;
}

const HEADER_BUTTON_DEFAULT: AdLink = {
  label: "Pickleball",
  href: "/products",
  badge: "NEW",
};

const FOOTER_SOLUTIONS_DEFAULT: AdLink[] = [
  { label: "Sports Flooring", href: "/products", badge: null },
  { label: "Stadium Seating", href: "/products", badge: null },
  { label: "Sports Equipment", href: "/products", badge: null },
  { label: "Gymnastics", href: "/products", badge: null },
  { label: "Pickleball Courts", href: "/products", badge: null },
];

const MARQUEE_ITEMS_DEFAULT: string[] = [
  "33+ YEARS BUILDING INDIA'S ARENAS",
  "EXCLUSIVE PARTNER — GERFLOR · CONNOR SPORTS · SPORT COURT · SPIETH",
  "TRUSTED BY KHELO INDIA & THE NATIONAL GAMES SINCE 1992",
  "FIBA · FIVB · FIG CERTIFIED SYSTEMS",
];

/** Active adverts across every placement, already in CMS display order. */
async function getAdvertisements(): Promise<ApiAdvertisement[]> {
  return safeList<ApiAdvertisement>(API_ENDPOINTS.advertisements, {
    searchParams: { isActive: "true", limit: 100 },
  });
}

/** Adverts for one placement that carry a usable link. */
function linksFor(ads: ApiAdvertisement[], placement: AdPlacement): AdLink[] {
  return ads
    .filter((ad) => ad.placement === placement && ad.link)
    .map((ad) => ({ label: ad.label, href: ad.link as string, badge: ad.badge }));
}

/**
 * The accent pill in the header. The CMS allows several `HEADER_BUTTON` rows,
 * but only one can render — the first in display order wins.
 */
export async function getHeaderButton(): Promise<AdLink> {
  const ads = await getAdvertisements();
  return linksFor(ads, "HEADER_BUTTON")[0] ?? HEADER_BUTTON_DEFAULT;
}

/** The footer's "Solutions" column. */
export async function getFooterSolutions(): Promise<AdLink[]> {
  const ads = await getAdvertisements();
  const solutions = linksFor(ads, "FOOTER_SOLUTION");
  return solutions.length > 0 ? solutions : FOOTER_SOLUTIONS_DEFAULT;
}

/** Credential strings for the scrolling ribbon above the header. */
export async function getMarqueeItems(): Promise<string[]> {
  const ads = await getAdvertisements();
  const items = ads
    .filter((ad) => ad.placement === "MARQUEE_ITEM")
    .map((ad) => ad.label);
  return items.length > 0 ? items : MARQUEE_ITEMS_DEFAULT;
}
