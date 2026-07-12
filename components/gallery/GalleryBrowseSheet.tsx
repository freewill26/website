"use client";

import { useEffect, useMemo, useState } from "react";
import type { GalleryFilterOptionVM, GalleryTaxonomyVM } from "@/lib/api/gallery";
import { CheckIcon, CloseIcon, SearchIcon } from "@/components/ui/icons";
import {
  ALL_SELECTION,
  selectionFromOption,
  selectionKey,
  type GallerySelection,
} from "./gallerySelection";

interface GalleryBrowseSheetProps {
  open: boolean;
  onClose: () => void;
  taxonomy: GalleryTaxonomyVM;
  selection: GallerySelection;
  onSelect: (selection: GallerySelection) => void;
}

const UNCATEGORISED = "__uncategorised__";

/**
 * Searchable filter picker: a centered dialog on desktop, a bottom sheet on
 * mobile. Each category is a selectable header with its own products listed
 * beneath it; picking a category, a product, or "All media" applies the filter
 * and closes.
 */
export default function GalleryBrowseSheet({
  open,
  onClose,
  taxonomy,
  selection,
  onSelect,
}: GalleryBrowseSheetProps) {
  const [query, setQuery] = useState("");

  // Reset the search each time the sheet opens, and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const q = query.trim().toLowerCase();

  // Products bucketed by their category, so each category renders with its own
  // product list nested under it.
  const productsByCategory = useMemo(() => {
    const map = new Map<string, GalleryFilterOptionVM[]>();
    for (const p of taxonomy.products) {
      const key = p.categoryId ?? UNCATEGORISED;
      const bucket = map.get(key);
      if (bucket) bucket.push(p);
      else map.set(key, [p]);
    }
    return map;
  }, [taxonomy.products]);

  // Category groups honouring the search: a category shows if its own title
  // matches (then all its products come along) or if any of its products match
  // (then only the matching ones show).
  const groups = useMemo(() => {
    return taxonomy.categories
      .map((cat) => {
        const catMatches = cat.title.toLowerCase().includes(q);
        const all = productsByCategory.get(cat.id) ?? [];
        const products = q === "" || catMatches ? all : all.filter((p) => p.title.toLowerCase().includes(q));
        return { cat, products };
      })
      .filter(({ cat, products }) => q === "" || cat.title.toLowerCase().includes(q) || products.length > 0);
  }, [taxonomy.categories, productsByCategory, q]);

  const uncategorised = useMemo(() => {
    const all = productsByCategory.get(UNCATEGORISED) ?? [];
    return q === "" ? all : all.filter((p) => p.title.toLowerCase().includes(q));
  }, [productsByCategory, q]);

  if (!open) return null;

  const activeKey = selectionKey(selection);
  const pick = (next: GallerySelection) => {
    onSelect(next);
    onClose();
  };
  const nothingToShow = groups.length === 0 && uncategorised.length === 0;

  return (
    <div
      className="fixed inset-0 z-[900] flex items-end justify-center sm:items-center"
      style={{ background: "rgba(10,14,28,0.55)", animation: "fade 0.2s ease both" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="box-border flex max-h-[82vh] w-full flex-col overflow-hidden rounded-t-[22px] bg-cream sm:max-h-[70vh] sm:max-w-[520px] sm:rounded-[22px]"
        style={{ animation: "fw-card-in 0.28s ease both", border: "1px solid rgba(24,26,32,0.1)" }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between px-6 pt-5 pb-3">
          <h3 className="m-0 font-display text-[22px] uppercase leading-none text-[#111820]">
            Browse
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full border"
            style={{ borderColor: "rgba(24,26,32,0.22)" }}
          >
            <CloseIcon size={17} color="181A20" />
          </button>
        </div>

        {/* Search */}
        <div className="shrink-0 px-6 pb-3">
          <div
            className="flex items-center gap-2.5 rounded-full px-4 py-3"
            style={{ background: "#FFFFFF", border: "1px solid rgba(24,26,32,0.14)" }}
          >
            <SearchIcon size={17} color="6B6F76" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search categories & products…"
              className="w-full bg-transparent text-[15px] text-[#181A20] outline-none placeholder:text-black/40"
            />
          </div>
        </div>

        {/* Options — each category header + its nested products */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-[max(20px,env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch]">
          {q === "" && (
            <CategoryRow label="All media" active={activeKey === "all"} onClick={() => pick(ALL_SELECTION)} />
          )}

          {groups.map(({ cat, products }) => (
            <div key={cat.id} className="pt-1">
              <CategoryRow
                label={cat.title}
                active={activeKey === `category:${cat.id}`}
                onClick={() => pick(selectionFromOption(cat))}
              />
              {products.map((p) => (
                <ProductRow
                  key={p.id}
                  label={p.title}
                  active={activeKey === `product:${p.id}`}
                  onClick={() => pick(selectionFromOption(p))}
                />
              ))}
            </div>
          ))}

          {uncategorised.length > 0 && (
            <div className="pt-1">
              <div className="px-4 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#181A20]/45">
                Other products
              </div>
              {uncategorised.map((p) => (
                <ProductRow
                  key={p.id}
                  label={p.title}
                  active={activeKey === `product:${p.id}`}
                  onClick={() => pick(selectionFromOption(p))}
                />
              ))}
            </div>
          )}

          {nothingToShow && (
            <p className="px-4 py-8 text-center text-sm text-[#181A20]/55">
              No categories or products match “{query}”.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Category header row — bold, selectable (filters to the whole category). */
function CategoryRow({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-[15px] font-bold transition-colors hover:bg-black/[0.04]"
      style={{ color: active ? "#00687F" : "#111820" }}
    >
      <span>{label}</span>
      {active && <CheckIcon size={17} color="00687F" />}
    </button>
  );
}

/** Product row — indented under its category, selectable (filters to it). */
function ProductRow({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 rounded-xl py-2 pl-8 pr-4 text-left text-[14px] transition-colors hover:bg-black/[0.04]"
      style={{ color: active ? "#00687F" : "rgba(24,26,32,0.78)", fontWeight: active ? 700 : 400 }}
    >
      <span>{label}</span>
      {active && <CheckIcon size={16} color="00687F" />}
    </button>
  );
}
