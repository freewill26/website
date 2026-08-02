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

