/**
 * Videos-page data layer, mirroring `lib/api/catalogue.ts`.
 *
 * `getVideosPageContent` reads the CMS "videos" page (slug `videos`) for the
 * hero copy + SEO. The feed itself is not CMS page content — it's `Video`
 * records paged straight off `/videos`, one infinite-scroll batch per call.
 */
import { safeGet } from "./http";
import { API_ENDPOINTS, API_ROUTES } from "@/utils/apis";
import { VIDEO_LIMITS } from "@/utils/constants";
import type { ApiField, ApiPage, ApiVideo, Paginated } from "./types";

/* ------------------------------------------------------------------ *
 * View models
 * ------------------------------------------------------------------ */

export interface VideosPageContent {
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

/** One video card. */
export interface VideoItemVM {
  id: string;
  title: string;
  description: string | null;
  /** YouTube video id, used for both the poster and the modal embed. */
  youtubeId: string;
  /** Poster image — the CMS override when set, else YouTube's own still. */
  thumbnail: string;
  /** Privacy-preserving embed URL, autoplaying inside the modal. */
  embedUrl: string;
  /** Canonical watch page, offered as the "Watch on YouTube" fallback. */
  watchUrl: string;
}

export interface VideosFeedPage {
  items: VideoItemVM[];
  /** Whether the API has more videos beyond this page. */
  hasMore: boolean;
}

const VIDEOS_CONTENT_DEFAULTS: VideosPageContent = {
  seo: {
    title: "Videos · Freewill",
    description:
      "Installations, walkthroughs and venue films from Freewill — the sports infrastructure we build across India, on camera.",
    ogTitle: "Videos · Freewill",
    ogDescription:
      "Installations, walkthroughs and venue films from Freewill — the sports infrastructure we build across India, on camera.",
    ogImage: null,
  },
  hero: {
    title: "Watch",
    headline: "The work,\nin motion.",
    description:
      "Installations, walkthroughs and venue films from the courts, tracks and arenas we have built.",
  },
};

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function fieldValue(fields: ApiField[] | undefined, key: string): string | undefined {
  const value = fields?.find((f) => f.key === key)?.value;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/**
 * Pulls the 11-character video id out of any YouTube link shape the CMS
 * accepts — watch (`?v=`), share (`youtu.be/`), shorts, live and embed.
 * Returns null for anything unrecognised so the row can be dropped rather than
 * rendering a broken player.
 */
export function youtubeIdFrom(url: string): string | null {
  const match =
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i.exec(
      url,
    );
  return match ? match[1] : null;
}

function toVideoVM(row: ApiVideo): VideoItemVM | null {
  const youtubeId = youtubeIdFrom(row.youtubeUrl);
  if (!youtubeId) return null;

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    youtubeId,
    // hqdefault exists for every video (maxres doesn't), so posters never 404.
    thumbnail: row.thumbnail || `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    // youtube-nocookie + autoplay: the card is the play affordance, so by the
    // time this URL is mounted the visitor has already asked for playback.
    embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`,
    watchUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
  };
}

/* ------------------------------------------------------------------ *
 * Fetchers
 * ------------------------------------------------------------------ */

/** Videos CMS page (`slug: "videos"`) → hero copy + SEO metadata. */
export async function getVideosPageContent(): Promise<VideosPageContent> {
  const page = await safeGet<ApiPage | null>(API_ROUTES.page("videos"), null);
  const hero = page?.sections?.find((s) => s.key === "hero_section")?.fields;
  const d = VIDEOS_CONTENT_DEFAULTS;

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
