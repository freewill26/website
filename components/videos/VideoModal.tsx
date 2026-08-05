"use client";

import { useCallback, useEffect, useRef } from "react";
import type { VideoItemVM } from "@/lib/api/videos";
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

interface VideoModalProps {
  /** The full loaded feed, so the viewer can step through it. */
  videos: VideoItemVM[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /**
   * Called when the viewer reaches the last loaded video while more exist, so
   * the feed can page in the next batch and navigation can keep going.
   */
  onReachEnd?: () => void;
  /** Whether the feed has more videos beyond the ones loaded. */
  hasMore?: boolean;
}

/**
 * Full-screen player popup with prev/next navigation across the feed.
 *
 * The grid cards deliberately render a still rather than an iframe — a page of
 * live embeds is heavy and every one would be its own player — so playback only
 * ever happens here, in a single iframe. It's keyed on the video id so stepping
 * to another video tears the old player down (stopping its audio) and mounts a
 * fresh, autoplaying one.
 *
 * Navigation doesn't wrap, matching {@link PhotoLightbox}.
 */
export default function VideoModal({
  videos,
  index,
  onIndexChange,
  onClose,
  onReachEnd,
  hasMore = false,
}: VideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const current = videos[index];
  const hasPrev = index > 0;
  // The next video may not be loaded yet; the feed pages it in on demand.
  const hasNext = index < videos.length - 1 || hasMore;

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= videos.length) return;
      onIndexChange(next);
    },
    [videos.length, onIndexChange],
  );

  // Pull the next batch in as soon as the viewer lands on the last loaded
  // video, so "next" is ready by the time it's pressed rather than dead-ending
  // at the first page.
  useEffect(() => {
    if (hasMore && index >= videos.length - 1) onReachEnd?.();
  }, [hasMore, index, videos.length, onReachEnd]);

  // Mount-only: lock body scroll and move focus onto the close button so
  // keyboard users don't land behind the iframe.
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

