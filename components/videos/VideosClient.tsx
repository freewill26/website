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
