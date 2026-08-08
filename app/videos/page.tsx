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

