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
