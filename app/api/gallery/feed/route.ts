import { NextRequest, NextResponse } from "next/server";
import { getGalleryFeedPage } from "@/lib/api/gallery";

/**
 * Backs the gallery's infinite scroll: the client can't read the server-only
 * `API_BASE_URL`, so it pages through this same-origin route instead of
 * calling the service API directly. `?page=` is 1-indexed; optional
 * `?categoryId=` / `?productId=` narrow the feed to one category or product.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = Math.max(1, Number(params.get("page")) || 1);
  const categoryId = params.get("categoryId") || undefined;
  const productId = params.get("productId") || undefined;
  const feed = await getGalleryFeedPage(page, { categoryId, productId });
  return NextResponse.json(feed);
}
