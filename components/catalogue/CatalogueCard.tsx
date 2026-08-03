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
export default function CatalogueCard({ item }: { item: CatalogueItemVM }) {
  return (
    <a
      href={item.fileUrl}
      download={item.downloadName}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#181A20]/[0.08] bg-white no-underline transition-colors hover:border-brand/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "#DCD3BE" }}>
        {item.cover ? (
          <Image
