import { API_BASE_URL, DEFAULT_REVALIDATE } from "@/utils/constants";
import type { Paginated } from "./types";

interface GetOptions {
  /** Query-string params; `undefined`/`null` values are skipped. */
  searchParams?: Record<string, string | number | boolean | undefined | null>;
  /** ISR window in seconds. Defaults to {@link DEFAULT_REVALIDATE}. */
  revalidate?: number;
  /** Cache tags for on-demand revalidation (`revalidateTag`). */
  tags?: string[];
}

function buildUrl(
  path: string,
  searchParams?: GetOptions["searchParams"],
): string {
  const url = new URL(path.replace(/^\//, ""), `${API_BASE_URL.replace(/\/$/, "")}/`);
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

/**
 * Server-side GET against the service API. Runs during SSR (React Server
 * Components), so the browser never sees the API host or an intermediate
 * loading state. Throws on a non-2xx response — callers decide whether to
 * degrade gracefully (see {@link safeGet}).
 */
export async function apiGet<T>(path: string, options: GetOptions = {}): Promise<T> {
  const { searchParams, revalidate = DEFAULT_REVALIDATE, tags } = options;

  const res = await fetch(buildUrl(path, searchParams), {
    headers: { Accept: "application/json" },
    next: { revalidate, ...(tags ? { tags } : {}) },
  });

  if (!res.ok) {
    throw new Error(`GET ${path} failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

/**
 * Like {@link apiGet} but never throws: on any network/API error it logs and
 * returns `fallback`. Used by the home page so one failing section can't blank
 * the whole server-rendered page.
 */
export async function safeGet<T>(
  path: string,
  fallback: T,
  options: GetOptions = {},
): Promise<T> {
  try {
    return await apiGet<T>(path, options);
  } catch (error) {
    console.error(`[api] ${path}:`, error instanceof Error ? error.message : error);
    return fallback;
  }
}

/** Convenience wrapper for paginated list endpoints that degrades to `[]`. */
export async function safeList<T>(
  path: string,
  options: GetOptions = {},
): Promise<T[]> {
  const empty: Paginated<T> = { data: [], total: 0, page: 1, limit: 0, pages: 0 };
  const result = await safeGet<Paginated<T>>(path, empty, options);
  return result.data;
}
