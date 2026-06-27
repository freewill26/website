"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

/**
 * Sticky "in this article" navigation with scroll-spy highlighting — a staple
 * of long-form editorial pages. Smooth-scrolls to each section heading and
 * tracks which one is currently in view.
 */
export default function TableOfContents({ items }: TableOfContentsProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const onClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <nav aria-label="In this article">
      <div className="mb-4 text-[11px] font-bold tracking-[0.22em] text-[#181A20]/45">
        IN THIS ARTICLE
      </div>
      <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
        {items.map((it) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => onClick(e, it.id)}
                className="flex gap-3 border-l-2 py-1.5 pl-3 text-[13px] leading-[1.4] no-underline transition-colors"
                style={{
                  borderColor: on ? "#00687F" : "rgba(24,26,32,0.12)",
                  color: on ? "#00687F" : "rgba(24,26,32,0.55)",
                  fontWeight: on ? 700 : 500,
                }}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
