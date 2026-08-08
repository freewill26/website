import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import VideosClient from "@/components/videos/VideosClient";
import { getVideosPageContent, getVideosFeedPage } from "@/lib/api/videos";

/** SEO/OG metadata for `/videos` sourced from the CMS "videos" page. */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getVideosPageContent();
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
    },
  };
}

/**
 * Freewill Videos — an async Server Component. The hero copy comes from the
 * CMS; the feed's first page is fetched server-side so it's in the initial
 * HTML, and `VideosClient` takes over paging further pages client-side.
 * Reached from the footer only, not the header nav.
 */
export default async function VideosPage() {
  const [content, firstPage] = await Promise.all([
    getVideosPageContent(),
    getVideosFeedPage(1),
  ]);
  const headlineLines = content.hero.headline.split("\n").map((line) => line.trim());
