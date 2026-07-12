/**
 * Site navigation model.
 *
 * The original design links to flat `.html` files; in this Next.js port those
 * become route paths. Pages that aren't built yet point at `#` so the nav stays
 * complete without dead-ending the build.
 */
export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "#" },
  { label: "Projects", href: "#" },
  { label: "News", href: "/#fw-news" },
  { label: "Catalogues", href: "#" },
  { label: "Contact", href: "/#fw-contact" },
];

/** Frequently-referenced single routes. */
export const ROUTES = {
  home: "/",
  products: "/products",
  about: "/about",
  contact: "/#fw-contact",
} as const;

/** The product family browsed by default (the only one with detail pages yet). */
export const DEFAULT_FAMILY = "taraflex";

/** Build the route for a product family overview page (Freewill Product). */
export function familyHref(family: string = DEFAULT_FAMILY): string {
  return `/products/${family}`;
}

/** Build the route for a single product-type detail page (Product Type). */
export function productTypeHref(code: string, family: string = DEFAULT_FAMILY): string {
  return `/products/${family}/${code}`;
}

/** Build the route for a real, DB-backed product's detail page. */
export function productHref(id: string): string {
  return `/products/item/${id}`;
}
