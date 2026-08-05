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
