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
