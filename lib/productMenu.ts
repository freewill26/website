/**
 * Items shown in the header "Products" hover mega-menu — a quick-pick of
 * flagship surfaces, mirroring the design's `productGridItems`.
 */
import { productTypeHref } from "@/lib/navigation";

export interface ProductMenuItem {
  name: string;
  cat: string;
  tag: string;
  swatch: string;
  href: string;
}

export const PRODUCT_MENU: ProductMenuItem[] = [
  { name: "Sport M Performance", cat: "Indoor · Taraflex", tag: "TFX", swatch: "#C9442E", href: productTypeHref("TFX-01") },
  { name: "Sport M Comfort", cat: "Indoor · Taraflex", tag: "TFX", swatch: "#00687F", href: productTypeHref("TFX-02") },
  { name: "Evolution", cat: "Indoor · Taraflex", tag: "TFX", swatch: "#1FA95B", href: productTypeHref("TFX-03") },
  { name: "Pickleball Court", cat: "Sports Court", tag: "PKB", swatch: "#8FBD1A", href: "/products#fw-cat-4" },
  { name: "Synthetic Grass", cat: "Outdoor Surface", tag: "SGS", swatch: "#2D6A3F", href: "/products#fw-cat-2" },
  { name: "See All Products →", cat: "View full catalogue", tag: "→", swatch: "#00687F", href: "/products" },
];
