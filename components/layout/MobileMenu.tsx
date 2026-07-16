"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/navigation";
import { CloseIcon } from "@/components/ui/icons";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** How long the overlay stays mounted after `open` flips false so the exit
 * animation can play. Must match `fw-menu-out` in globals.css. */
const EXIT_MS = 260;

/** Stagger timing for the nav-link reveal (ms). */
const LINK_STAGGER_BASE = 140;
const LINK_STAGGER_STEP = 55;

/**
 * Full-screen navigation overlay shown on small screens when the burger is
 * tapped. Rendered above everything (z-900) and dismissed via the close button,
 * the Escape key, or by following a link. The panel fades/settles in, the links
 * reveal with a staggered slide out of overflow-hidden masks, and the whole
 * overlay fades back out before unmounting.
 */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  // "closing" keeps the overlay mounted while the exit animation plays.
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed");

  useEffect(() => {
    if (open) {
      setPhase("open");
    } else {
      setPhase((prev) => (prev === "open" ? "closing" : prev));
    }
  }, [open]);

  useEffect(() => {
    if (phase !== "closing") return;
    const timer = window.setTimeout(() => setPhase("closed"), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // Lock page scroll and let Escape dismiss while the menu is up.
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

  if (phase === "closed") return null;

  const closing = phase === "closing";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className={`fixed inset-0 z-[900] flex flex-col overflow-y-auto bg-ink p-6 sm:p-10 ${
        closing ? "fw-menu-exit" : "fw-menu-enter"
      }`}
    >
      <div className={`flex items-center justify-between ${closing ? "" : "fw-menu-chrome"}`}>
        <Image src="/assets/logo-freewill-white.svg" alt="Freewill" width={140} height={32} className="h-8 w-auto" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-brand-accent hover:text-brand-accent active:scale-95"
        >
          <CloseIcon size={20} />
        </button>
      </div>

      <nav className="mt-10 flex flex-col gap-1.5">
        {NAV_ITEMS.map((item, index) => (
          <div key={item.label} className="overflow-hidden">
            <Link
              href={item.href}
              onClick={onClose}
              className={`block font-display text-[clamp(32px,9vw,54px)] uppercase leading-[1.12] text-cream transition-colors hover:text-brand-accent active:text-brand-accent ${
                closing ? "" : "fw-menu-link"
              }`}
              style={
                closing
                  ? undefined
                  : { animationDelay: `${LINK_STAGGER_BASE + index * LINK_STAGGER_STEP}ms` }
              }
            >
              {item.label}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
