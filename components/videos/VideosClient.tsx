"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { VideoItemVM, VideosFeedPage } from "@/lib/api/videos";
import { PlayIcon } from "@/components/ui/icons";
import VideoModal from "./VideoModal";

interface VideosClientProps {
  initialItems: VideoItemVM[];
  initialHasMore: boolean;
}

const VIDEO_ANIM_BATCH = 12;

/**
 * The Videos feed: a card grid that loads the next page automatically as the
 * user nears the bottom (IntersectionObserver on a sentinel), mirroring the
 * gallery's infinite scroll. Cards show YouTube's poster still, never a live
 * embed — tapping one opens {@link VideoModal}, which is the only place a
 * player ever mounts and which can step through the rest of the feed from there.
 */
export default function VideosClient({ initialItems, initialHasMore }: VideosClientProps) {
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  // Index into `items` of the video being played; -1 when the viewer is closed.
  const [playing, setPlaying] = useState(-1);
  const nextPage = useRef(2);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch(`/api/videos/feed?page=${nextPage.current}`);
      const data: VideosFeedPage = await res.json();
      nextPage.current += 1;
      setHasMore(data.hasMore);
      if (data.items.length > 0) setItems((prev) => [...prev, ...data.items]);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [hasMore]);

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

  const showEmpty = !loading && items.length === 0;

  return (
    <>
      <section
        id="fw-videos"
        className="box-border bg-cream px-[6vw] pb-[clamp(72px,9vw,140px)] pt-[clamp(28px,3.4vw,52px)]"
        style={{ minHeight: "60vh" }}
      >
        {showEmpty ? (
          <EmptyState />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((video, i) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setPlaying(i)}
                aria-label={`Play “${video.title}”`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white p-0 text-left transition-colors hover:border-brand/50"
                style={{
                  border: "1px solid rgba(24,26,32,0.08)",
                  animation: "fw-card-in 0.5s ease both",
                  animationDelay: `${(i % VIDEO_ANIM_BATCH) * 0.04}s`,
                }}
              >
                <div
                  className="relative aspect-video w-full overflow-hidden"
                  style={{ background: "#DCD3BE" }}
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="absolute inset-0 object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-[#0A0E1C]/10 transition-colors duration-300 group-hover:bg-[#0A0E1C]/30" />
                  <span
                    className="pointer-events-none absolute left-1/2 top-1/2 flex h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "rgba(255,255,255,0.92)" }}
                  >
                    {/* Nudged right so the triangle looks optically centred. */}
                    <PlayIcon size={24} className="ml-[3px]" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-[26px]">
                  <h3 className="m-0 mb-3 font-display text-[20px] uppercase leading-[1.12] text-[#181A20] sm:text-[23px]">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="m-0 line-clamp-3 text-sm leading-[1.75] text-[#181A20]/[0.62]">
                      {video.description}
                    </p>
                  )}
                </div>
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
