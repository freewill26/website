import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import CatalogueGrid from "@/components/catalogue/CatalogueGrid";
import { getCataloguePageContent, getCatalogues } from "@/lib/api/catalogue";

/** SEO/OG metadata for `/catalogue` sourced from the CMS "catalogue" page. */
export async function generateMetadata(): Promise<Metadata> {
