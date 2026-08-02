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
