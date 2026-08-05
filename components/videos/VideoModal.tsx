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
