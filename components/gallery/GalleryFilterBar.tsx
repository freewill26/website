"use client";

import { useMemo, useState } from "react";
import type { GalleryTaxonomyVM } from "@/lib/api/gallery";
import { GALLERY_LIMITS } from "@/utils/constants";
import { SearchIcon, SlidersIcon } from "@/components/ui/icons";
import {
  ALL_SELECTION,
  selectionFromOption,
  selectionKey,
  type GallerySelection,
} from "./gallerySelection";

interface GalleryFilterBarProps {
  taxonomy: GalleryTaxonomyVM;
  selection: GallerySelection;
  onSelect: (selection: GallerySelection) => void;
  onOpenBrowse: () => void;
}

/**
 * Sticky gallery filter toolbar: a smart searchbar (type to find any category
 * or product), a chip row of category filters capped at
 * {@link GALLERY_LIMITS.chipRow} (with an inline "Load More" toggle), and a
 * "Browse" button that opens the full searchable picker sheet.
 */
export default function GalleryFilterBar({
  taxonomy,
  selection,
  onSelect,
  onOpenBrowse,
}: GalleryFilterBarProps) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [chipsExpanded, setChipsExpanded] = useState(false);

  const activeKey = selectionKey(selection);

  // Searchbar results: categories + products matched by title.
  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return [];
    return [...taxonomy.categories, ...taxonomy.products]
      .filter((o) => o.title.toLowerCase().includes(q))
      .slice(0, GALLERY_LIMITS.searchResults);
  }, [taxonomy, q]);

  // Chip row: "All" + a quick-pick of category and product filters (categories
  // first), capped so the collapsed row shows exactly chipRow chips
  // (All + N + "Load More"); expanding reveals the rest.
  const filters = useMemo(
    () => [...taxonomy.categories, ...taxonomy.products],
    [taxonomy.categories, taxonomy.products],
  );
  const collapsedCount = Math.max(0, GALLERY_LIMITS.chipRow - 2); // reserve All + Load More
  const needsToggle = filters.length + 1 > GALLERY_LIMITS.chipRow;
  const visibleFilters =
    needsToggle && !chipsExpanded ? filters.slice(0, collapsedCount) : filters;

  const applySearch = (option: (typeof results)[number]) => {
    onSelect(selectionFromOption(option));
    setQuery("");
    setSearchOpen(false);
  };

  return (
    <div
      className="sticky top-0 z-[120] box-border px-[6vw] py-[clamp(12px,1.6vw,18px)] backdrop-blur-md"
      style={{
        background: "rgba(241,234,216,0.88)",
        borderTop: "1px solid rgba(24,26,32,0.08)",
        borderBottom: "1px solid rgba(24,26,32,0.08)",
      }}
    >
      {/* Smart searchbar */}
      <div className="relative mb-3 max-w-[560px]">
        <div
          className="flex items-center gap-2.5 rounded-full px-4 py-2.5"
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(24,26,32,0.14)",
          }}
        >
          <SearchIcon size={17} color="6B6F76" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 120)}
            placeholder="Search categories & products…"
            aria-label="Search categories and products"
            className="w-full bg-transparent text-[15px] text-[#181A20] outline-none placeholder:text-black/40"
          />
        </div>

        {searchOpen && results.length > 0 && (
          <ul
            className="absolute left-0 right-0 top-full z-10 mt-1.5 max-h-72 overflow-y-auto rounded-2xl bg-white py-1.5 shadow-lg"
            style={{ border: "1px solid rgba(24,26,32,0.12)" }}
          >
            {results.map((o) => (
              <li key={`${o.kind}-${o.id}`}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applySearch(o)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[14px] text-[#181A20] hover:bg-black/[0.04]"
                >
                  <span>{o.title}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#181A20]/40">
                    {o.kind}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chip row + Browse button */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Chip
            label="All"
            active={activeKey === "all"}
            onClick={() => onSelect(ALL_SELECTION)}
          />
          {visibleFilters.map((o) => (
            <Chip
              key={`${o.kind}-${o.id}`}
              label={o.title}
              active={activeKey === `${o.kind}:${o.id}`}
              onClick={() => onSelect(selectionFromOption(o))}
            />
          ))}
          {needsToggle && (
            <Chip
              label={chipsExpanded ? "Less" : "Load More"}
              active={false}
              onClick={() => setChipsExpanded((v) => !v)}
            />
          )}
        </div>

        <button
          type="button"
          onClick={onOpenBrowse}
          className="flex flex-none items-center gap-2 rounded-full px-4 py-[11px] text-[12.5px] font-bold uppercase tracking-[0.06em] text-[#111820] transition-colors hover:border-brand hover:text-brand"
          style={{
            border: "1px solid rgba(24,26,32,0.2)",
            background: "transparent",
          }}
        >
          <SlidersIcon size={16} color="181A20" />
          <span className="hidden sm:inline">Browse</span>
        </button>
      </div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-none whitespace-nowrap rounded-full px-5 py-[11px] text-[12.5px] font-bold uppercase tracking-[0.06em] transition-colors"
      style={{
        border: `1px solid ${active ? "#00687F" : "rgba(24,26,32,0.2)"}`,
        background: active ? "#00687F" : "transparent",
        color: active ? "#FFFFFF" : "rgba(24,26,32,0.72)",
      }}
    >
      {label}
    </button>
  );
}
