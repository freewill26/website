/** Primary navigation for the redesigned marketing chrome (Home + About). */
export interface SiteNavItem {
  label: string;
  href: string;
  /** Listed in the footer only — kept out of the header / mobile menu. */
  footerOnly?: boolean;
}

export const SITE_NAV: SiteNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "News", href: "/news", footerOnly: true },
  { label: "Blog", href: "/blog", footerOnly: true },
  { label: "Contact", href: "/contact" },
];

/** Header / mobile-menu links — excludes footer-only entries. */
export const HEADER_NAV: SiteNavItem[] = SITE_NAV.filter((i) => !i.footerOnly);
