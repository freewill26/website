import type { GalleryFilterOptionVM } from "@/lib/api/gallery";

/**
 * The active gallery filter: everything, or any one level of the catalogue —
 * each level including the images of everything beneath it.
 */
export type GallerySelection =
  | { type: "all" }
  | { type: "category"; id: string; title: string }
  | { type: "product"; id: string; title: string }
  | { type: "productType"; id: string; title: string }
  | { type: "productVariant"; id: string; title: string };

export const ALL_SELECTION: GallerySelection = { type: "all" };

/** Build a selection from a taxonomy option (chip / search result / sheet row). */
export function selectionFromOption(o: GalleryFilterOptionVM): GallerySelection {
  return { type: o.kind, id: o.id, title: o.title };
}

/** Stable identity for a selection, for equality checks and query keys. */
export function selectionKey(s: GallerySelection): string {
  return s.type === "all" ? "all" : `${s.type}:${s.id}`;
}

/** Query string the feed route understands for this selection (`""` for All). */
export function selectionQuery(s: GallerySelection): string {
  if (s.type === "category") return `&categoryId=${encodeURIComponent(s.id)}`;
  if (s.type === "product") return `&productId=${encodeURIComponent(s.id)}`;
  if (s.type === "productType") return `&productTypeId=${encodeURIComponent(s.id)}`;
  if (s.type === "productVariant") return `&productVariantId=${encodeURIComponent(s.id)}`;
  return "";
}
