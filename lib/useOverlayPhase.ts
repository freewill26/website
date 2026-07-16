"use client";

import { useEffect, useState } from "react";

export type OverlayPhase = "closed" | "open" | "closing";

/**
 * Drives the mount → animate → unmount lifecycle of a full-screen overlay.
 *
 * Returns "open" while the overlay should show its enter animation and
 * "closing" while the exit animation plays; the caller unmounts on "closed".
 * While open, page scroll is locked and Escape invokes `onClose`.
 *
 * `exitMs` must match the overlay's exit-animation duration in CSS.
 */
export default function useOverlayPhase(
  open: boolean,
  onClose: () => void,
  exitMs: number,
): OverlayPhase {
  const [phase, setPhase] = useState<OverlayPhase>("closed");

  useEffect(() => {
    if (open) {
      setPhase("open");
    } else {
      setPhase((prev) => (prev === "open" ? "closing" : prev));
    }
  }, [open]);

  useEffect(() => {
    if (phase !== "closing") return;
    const timer = window.setTimeout(() => setPhase("closed"), exitMs);
    return () => window.clearTimeout(timer);
  }, [phase, exitMs]);

  useEffect(() => {
    if (phase !== "open") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase, onClose]);

  return phase;
}
