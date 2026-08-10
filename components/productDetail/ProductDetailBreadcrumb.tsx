import { Fragment } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";

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

  const last = crumbs.length - 1;
  // A variant trail is four crumbs of product names — far wider than a phone.
  // Everything between the first and the current page collapses to an ellipsis
  // below `sm`. Done in CSS rather than by slicing, so every crumb stays in the
  // DOM for the JSON-LD and for anyone widening the window.
  const collapses = crumbs.length > 2;

  return (
    <nav
      aria-label="Breadcrumb"
      className="box-border border-b border-[#181A20]/10 bg-cream px-[6vw] py-[clamp(14px,1.7vw,20px)] text-[#181A20]"
    >
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-1 gap-y-1 p-0 text-[13px] leading-[1.5]">
        {crumbs.map((c, i) => {
          const isLast = i === last;
          // Hidden on phones when the trail is long enough to need collapsing;
          // the ellipsis below stands in for the whole run.
          const collapsed = collapses && i > 0 && i < last;

          return (
            <Fragment key={`${c.label}-${i}`}>
              <li
                className={`${collapsed ? "hidden sm:flex" : "flex"} items-center gap-1`}
              >
                {i > 0 && (
                  <ChevronRightIcon
                    size={13}
                    color="181A20"
                    className="mx-0.5 shrink-0 opacity-25"
                  />
                )}
                {c.href && !isLast ? (
                  <Link
                    href={c.href}
                    className="rounded-[3px] px-0.5 text-[#181A20]/55 decoration-brand/40 underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                  >
                    {c.label}
                  </Link>
                ) : (
                  // The current page: announced to screen readers, and the only
                  // crumb carrying full-strength colour.
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={
                      isLast
                        ? "px-0.5 font-semibold text-[#181A20]"
                        : "px-0.5 text-[#181A20]/55"
                    }
                  >
                    {c.label}
                  </span>
                )}
              </li>

              {collapses && i === 0 && (
                // Phone-only stand-in for the crumbs hidden between here and the
                // current page. Inert by design — every level it replaces is
                // reachable from the page itself.
                <li aria-hidden className="flex items-center gap-1 sm:hidden">
                  <ChevronRightIcon
                    size={13}
                    color="181A20"
                    className="mx-0.5 shrink-0 opacity-25"
                  />
                  <span className="px-0.5 text-[#181A20]/40">…</span>
                </li>
              )}
            </Fragment>
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
