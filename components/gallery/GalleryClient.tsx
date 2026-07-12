"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryFeedItemVM, GalleryFeedPage, GalleryTaxonomyVM } from "@/lib/api/gallery";
import PhotoLightbox from "@/components/ui/PhotoLightbox";
import { GalleryIcon } from "@/components/ui/icons";
import GalleryFilterBar from "./GalleryFilterBar";
import GalleryBrowseSheet from "./GalleryBrowseSheet";
import { ALL_SELECTION, selectionKey, selectionQuery, type GallerySelection } from "./gallerySelection";

interface GalleryClientProps {
  initialItems: GalleryFeedItemVM[];
  initialHasMore: boolean;
  taxonomy: GalleryTaxonomyVM;
}

const GALLERY_ANIM_BATCH = 12;

/**
 * Instagram-feed-style gallery with a category/product filter. The square grid
 * loads the next page automatically as the user nears the bottom
 * (IntersectionObserver on a sentinel). The filter bar / browse sheet drive a
 * `selection`; changing it refetches page 1 for that filter and the infinite
 * scroll continues within the filtered set. Tapping a tile opens the shared
 * {@link PhotoLightbox}.
 */
export default function GalleryClient({ initialItems, initialHasMore, taxonomy }: GalleryClientProps) {
  const [selection, setSelection] = useState<GallerySelection>(ALL_SELECTION);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [viewer, setViewer] = useState(-1);
  const nextPage = useRef(2);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const didMount = useRef(false);

  const selKey = selectionKey(selection);

  // Refetch page 1 whenever the filter changes. Skip the very first render —
  // it already has the SSR'd "all" page 1.
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    let cancelled = false;
    loadingRef.current = true;
    setLoading(true);
    setViewer(-1);
    setItems([]);
    fetch(`/api/gallery/feed?page=1${selectionQuery(selection)}`)
      .then((r) => r.json() as Promise<GalleryFeedPage>)
      .then((data) => {
        if (cancelled) return;
        setItems(data.items);
        setHasMore(data.hasMore);
        nextPage.current = 2;
      })
      .finally(() => {
        if (!cancelled) {
          loadingRef.current = false;
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selKey]);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch(`/api/gallery/feed?page=${nextPage.current}${selectionQuery(selection)}`);
      const data: GalleryFeedPage = await res.json();
      nextPage.current += 1;
      setHasMore(data.hasMore);
      if (data.items.length > 0) setItems((prev) => [...prev, ...data.items]);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [hasMore, selection]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore]);

  const open = viewer >= 0 && viewer < items.length;
  const showEmpty = !loading && items.length === 0;

  return (
    <>
      <GalleryFilterBar
        taxonomy={taxonomy}
        selection={selection}
        onSelect={setSelection}
        onOpenBrowse={() => setBrowseOpen(true)}
      />

      <section
        id="fw-gallery"
        className="box-border bg-cream px-[6vw] pb-[clamp(56px,7vw,96px)] pt-[clamp(28px,3.4vw,52px)]"
        style={{ minHeight: "60vh" }}
      >
        {showEmpty ? (
          <EmptyState filtered={selection.type !== "all"} />
        ) : (
          <div key={selKey} className="grid grid-cols-3 gap-1 sm:gap-3 md:grid-cols-4">
            {items.map((g, i) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setViewer(i)}
                className="group relative aspect-square w-full overflow-hidden rounded-lg border-0 p-0 text-left transition-transform duration-200 active:scale-[0.97] sm:rounded-2xl md:active:scale-100"
                style={{
                  background: "#DCD3BE",
                  boxShadow: "0 2px 12px rgba(24,26,32,0.08)",
                  animation: "fw-card-in 0.5s ease both",
                  animationDelay: `${(i % GALLERY_ANIM_BATCH) * 0.04}s`,
                }}
              >
                <Image
                  src={g.src}
                  alt={g.title}
                  fill
                  sizes="(max-width: 768px) 33vw, 25vw"
                  className="absolute inset-0 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-[#0A0E1C]/0 transition-colors duration-300 group-hover:bg-[#0A0E1C]/25" />
                <span className="pointer-events-none absolute inset-x-3 bottom-3 hidden text-[13px] font-semibold uppercase tracking-[0.04em] text-white opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100 sm:block">
                  {g.title}
                </span>
              </button>
            ))}
          </div>
        )}

        {(hasMore || loading) && !showEmpty && (
          <div ref={sentinelRef} className="mt-8 flex justify-center">
            {loading && (
              <span
                className="block h-[22px] w-[22px] rounded-full"
                style={{
                  border: "2px solid rgba(0,104,127,0.25)",
                  borderTopColor: "#00687F",
                  animation: "fw-spin-fast 0.8s linear infinite",
                }}
              />
            )}
          </div>
        )}
      </section>

      <GalleryBrowseSheet
        open={browseOpen}
        onClose={() => setBrowseOpen(false)}
        taxonomy={taxonomy}
        selection={selection}
        onSelect={setSelection}
      />

      {open && (
        <PhotoLightbox
          slides={items.map((g) => ({ id: g.id, src: g.src, title: g.title }))}
          initialIndex={viewer}
          onClose={() => setViewer(-1)}
        />
      )}
    </>
  );
}

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-[18px] py-[clamp(56px,8vw,120px)] text-center">
      <div
        className="flex h-[84px] w-[84px] items-center justify-center rounded-full"
        style={{ background: "rgba(0,104,127,0.08)", border: "1px solid rgba(0,104,127,0.2)" }}
      >
        <GalleryIcon size={34} />
      </div>
      <h3 className="m-0 font-display uppercase text-[#111820]" style={{ fontSize: "clamp(24px,3vw,40px)" }}>
        Nothing here yet.
      </h3>
      <p className="m-0 max-w-[380px] text-[15px] text-[#181A20]/60">
        {filtered
          ? "No photos published for this filter yet — try another category or product."
          : "We haven't published photos for the catalogue yet — check back soon, or get in touch for project references."}
      </p>
    </div>
  );
}
