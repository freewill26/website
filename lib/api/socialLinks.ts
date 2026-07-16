/**
 * Social-links data layer — the CMS "Social Links" module rows (platform
 * name + profile URL) rendered along the footer's bottom strip.
 *
 * Degrades to the four platform names the site shipped hardcoded, without
 * hrefs, so an API outage keeps the strip intact instead of dropping it.
 */
import { safeList } from "./http";
import { API_ENDPOINTS } from "@/utils/apis";

interface ApiSocialLink {
  id: string;
  app: string;
  link: string;
}

/** A footer social entry; `href` is `null` when there is no usable URL. */
export interface SocialLink {
  app: string;
  href: string | null;
}

const SOCIAL_LINKS_DEFAULT: SocialLink[] = [
  { app: "Facebook", href: null },
  { app: "Instagram", href: null },
  { app: "LinkedIn", href: null },
  { app: "YouTube", href: null },
];

/**
 * CMS social links with a safe absolute URL. Rows whose link isn't http(s)
 * are dropped; an empty result falls back to the unlinked platform names.
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  const rows = await safeList<ApiSocialLink>(API_ENDPOINTS.socialLinks, {
    searchParams: { limit: 20 },
  });
  const links = rows
    .filter((row) => /^https?:\/\//i.test(row.link))
    .map((row) => ({ app: row.app, href: row.link }));
  return links.length > 0 ? links : SOCIAL_LINKS_DEFAULT;
}
