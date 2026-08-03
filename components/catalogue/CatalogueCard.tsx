import Image from "next/image";
import type { CatalogueItemVM } from "@/lib/api/catalogue";
import { DocumentIcon, DownloadIcon } from "@/components/ui/icons";

/**
 * One brochure: cover, title, blurb and a direct download.
 *
 * The whole card is the download link — `download` asks the browser to save
 * rather than navigate, and the new tab is the fallback for cross-origin
 * storage URLs, where the attribute is ignored and the PDF opens in the
 * viewer instead.
 */
