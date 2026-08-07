import { NextRequest, NextResponse } from "next/server";
import { getVideosFeedPage } from "@/lib/api/videos";

/**
 * Backs the Videos screen's infinite scroll: the client can't read the
 * server-only `API_BASE_URL`, so it pages through this same-origin route
 * instead of calling the service API directly. `?page=` is 1-indexed.
 */
export async function GET(request: NextRequest) {
  const page = Math.max(1, Number(request.nextUrl.searchParams.get("page")) || 1);
  const feed = await getVideosFeedPage(page);
  return NextResponse.json(feed);
}
