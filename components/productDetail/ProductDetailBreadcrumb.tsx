import Link from "next/link";

export interface BreadcrumbCrumb {
  label: string;
  /** Omitted on the final crumb — the page you're already on. */
  href?: string;
}

/**
 * Trail down the catalogue hierarchy (Products → product → type → variant),
 * sitting between the hero and the first content section on the type and
 * variant pages. The last crumb is the current page and is not a link.
 *
 * Emits BreadcrumbList JSON-LD alongside the visible trail so search results
 * show the same hierarchy — worth having precisely because these deep pages
 * are the ones most likely to be landed on directly from search.
 */
export default function ProductDetailBreadcrumb({
  crumbs,
}: {
  crumbs: BreadcrumbCrumb[];
}) {
  if (!crumbs.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: c.href } : {}),
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="box-border bg-cream px-[6vw] pt-[clamp(20px,3vw,36px)] text-[#181A20]"
    >
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-[12.5px] leading-[1.5]">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className="text-[#181A20]/55 no-underline transition-colors hover:text-brand"
                >
                  {c.label}
                </Link>
              ) : (
                // The current page: announced to screen readers, and the only
                // crumb carrying full-strength colour.
                <span
                  aria-current={last ? "page" : undefined}
                  className={last ? "font-bold text-[#181A20]" : "text-[#181A20]/55"}
                >
                  {c.label}
                </span>
              )}
              {!last && (
                <span aria-hidden className="text-[#181A20]/30">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
