/**
 * Contact-page data layer, mirroring `lib/api/products.ts`. Reads the CMS
 * "contact" page (hero copy + contact channels) and derives the `mailto:` /
 * `tel:` / `wa.me` links from the raw values, degrading to defaults on failure.
 */
import { safeGet } from "./http";
import { API_ROUTES } from "@/utils/apis";
import type { ApiField, ApiPage } from "./types";

/* ------------------------------------------------------------------ *
 * View model
 * ------------------------------------------------------------------ */

export interface ContactPageContent {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string | null;
  };
  /** Eyebrow above the hero heading. */
  title: string;
  headline: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  /** Google Maps URL for the office (office channel + "Find us" map band). */
  mapUrl: string;
}

const CONTACT_CONTENT_DEFAULTS: ContactPageContent = {
  seo: {
    title: "Contact Us · Freewill",
    description:
      "Request a quote or a site visit. Freewill responds within one working day — sports flooring, stadium seating and competition equipment since 1990.",
    ogTitle: "Contact Us · Freewill",
    ogDescription:
      "Request a quote or a site visit. Freewill responds within one working day — sports flooring, stadium seating and competition equipment since 1990.",
    ogImage: null,
  },
  title: "Get in touch",
  headline: "Let's build your arena.",
  description:
    "New build, retrofit or a quick consultation — tell us about your project and our team responds within one working day.",
  address: "6, Premier Plaza-II, Mumbai–Pune Highway, Chinchwad, Pune 411019",
  email: "info@freewill.co.in",
  phone: "+91 20661 14215",
  whatsapp: "+91 20661 14215",
  mapUrl: "https://maps.google.com/?q=Premier+Plaza+II+Chinchwad+Pune",
};

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function fieldValue(fields: ApiField[] | undefined, key: string): string | undefined {
  const value = fields?.find((f) => f.key === key)?.value;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/** `tel:` href from a display phone number (keeps digits and a leading `+`). */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** `wa.me` href from a WhatsApp number (digits only). */
export function whatsappHref(whatsapp: string): string {
  return `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
}

/** `mailto:` href from an email address. */
export function mailHref(email: string): string {
  return `mailto:${email}`;
}

/** Only allow an http(s) map URL through as an href; otherwise fall back. */
export function safeMapUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : CONTACT_CONTENT_DEFAULTS.mapUrl;
}

/**
 * No-API-key Google Maps embed src for the "Find us" iframe. Reuses the `q=`
 * search query off the CMS map URL when present (the shape our default and
 * the CMS editor both produce), otherwise falls back to geocoding the office
 * address text directly.
 */
export function mapEmbedUrl(mapUrl: string, address: string): string {
  let query = address;
  try {
    const q = new URL(mapUrl).searchParams.get("q");
    if (q) query = q;
  } catch {
    // Not a parseable URL — fall back to the address.
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

/* ------------------------------------------------------------------ *
 * Shared contact channels
 * ------------------------------------------------------------------ */

/** The CMS-managed contact details reused across the site (footers, CTA bands, enquiry blocks). */
export interface ContactChannels {
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  mapUrl: string;
}

/**
 * Contact channels for any component outside `/contact` that shows contact
 * details. Same CMS fetch as {@link getContactPageContent} — Next.js dedupes
 * the underlying `fetch`, so scattering this across footers/CTAs costs one
 * API call per render.
 */
export async function getContactChannels(): Promise<ContactChannels> {
  const { address, email, phone, whatsapp, mapUrl } = await getContactPageContent();
  return { address, email, phone, whatsapp, mapUrl };
}

/* ------------------------------------------------------------------ *
 * Page content
 * ------------------------------------------------------------------ */

/** Contact CMS page (`slug: "contact"`) → hero copy, channels and SEO metadata. */
export async function getContactPageContent(): Promise<ContactPageContent> {
  const page = await safeGet<ApiPage | null>(API_ROUTES.page("contact"), null);
  const c = page?.sections?.find((s) => s.key === "contact_section")?.fields;
  const d = CONTACT_CONTENT_DEFAULTS;

  return {
    seo: {
      title: page?.seoTitle || d.seo.title,
      description: page?.seoDescription || d.seo.description,
      ogTitle: page?.ogTitle || d.seo.ogTitle,
      ogDescription: page?.ogDescription || d.seo.ogDescription,
      ogImage: page?.ogImage || d.seo.ogImage,
    },
    title: fieldValue(c, "title") ?? d.title,
    headline: fieldValue(c, "headline") ?? d.headline,
    description: fieldValue(c, "description") ?? d.description,
    address: fieldValue(c, "office_address") ?? d.address,
    email: fieldValue(c, "email") ?? d.email,
    phone: fieldValue(c, "phone") ?? d.phone,
    whatsapp: fieldValue(c, "whatsapp") ?? d.whatsapp,
    mapUrl: safeMapUrl(fieldValue(c, "map_url") ?? d.mapUrl),
  };
}
