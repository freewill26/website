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
            src={item.cover}
            alt={item.coverAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="absolute inset-0 object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <DocumentIcon size={48} />
          </span>
        )}
        <span className="absolute left-3.5 top-3.5 rounded-full bg-brand px-3 py-[7px] text-[10px] font-bold tracking-[0.14em] text-white">
          PDF{item.size ? ` · ${item.size}` : ""}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-[26px]">
        <h3 className="m-0 mb-3 font-display text-[20px] uppercase leading-[1.12] text-[#181A20] sm:text-[23px]">
          {item.title}
        </h3>
        {item.description && (
          <p className="m-0 mb-5 text-sm leading-[1.75] text-[#181A20]/[0.62]">
            {item.description}
          </p>
