"use client";

import Link from "next/link";
import Image from "next/image";
import { HEADER_NAV } from "@/lib/siteNav";
import { CloseIcon } from "@/components/ui/icons";
import useOverlayPhase from "@/lib/useOverlayPhase";

interface SiteMobileMenuProps {
  open: boolean;
  onClose: () => void;
  /** CMS contact channels shown at the foot of the menu. */
  email: string;
  phone: string;
}

const MENU_ITEMS = [
  ...HEADER_NAV,
  { label: "Projects", href: "#" },
  { label: "Catalogues", href: "#" },
];

/** How long the overlay stays mounted after `open` flips false so the exit
 * animation can play. Must match `fw-menu-out` in globals.css. */
const EXIT_MS = 260;

/** Stagger timing for the reveal cascade (ms). */
const LINK_STAGGER_BASE = 140;
const LINK_STAGGER_STEP = 55;

/**
 * Full-screen cream navigation overlay for the redesigned light pages.
 * The panel fades/settles in, the links reveal with a staggered slide out of
 * overflow-hidden masks (the CTA pill and contact block join the cascade),
 * and the whole overlay fades back out before unmounting. Dismissed via the
 * close button, the Escape key, or by following a link.
 */
export default function SiteMobileMenu({ open, onClose, email, phone }: SiteMobileMenuProps) {
  const phase = useOverlayPhase(open, onClose, EXIT_MS);
  if (phase === "closed") return null;

  const closing = phase === "closing";
  const linkDelay = (index: number) =>
    closing ? undefined : { animationDelay: `${LINK_STAGGER_BASE + index * LINK_STAGGER_STEP}ms` };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className={`fixed inset-0 z-[900] box-border flex flex-col overflow-y-auto bg-cream p-6 sm:p-10 ${
        closing ? "fw-menu-exit" : "fw-menu-enter"
      }`}
    >
      <div className={`flex items-center justify-between ${closing ? "" : "fw-menu-chrome"}`}>
        <Image src="/assets/logo-freewill.svg" alt="Freewill" width={140} height={32} className="h-8 w-auto" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-12 w-12 items-center justify-center rounded-full border transition-colors hover:border-brand hover:text-brand active:scale-95"
          style={{ borderColor: "rgba(24,26,32,0.3)" }}
        >
          <CloseIcon size={20} color="181A20" />
        </button>
      </div>

      <nav className="mt-10 flex flex-col gap-1.5">
        {MENU_ITEMS.map((item, index) => (
          <div key={item.label} className="overflow-hidden">
            <Link
              href={item.href}
              onClick={onClose}
              className={`block font-display text-[clamp(36px,11vw,60px)] uppercase leading-[1.1] text-[#181A20] no-underline transition-colors hover:text-brand active:text-brand ${
                closing ? "" : "fw-menu-link"
              }`}
              style={linkDelay(index)}
            >
              {item.label}
            </Link>
          </div>
        ))}

        {/* The reveal lives on a wrapper so it doesn't override the pill's own
            shimmer animation (both are `animation` properties). */}
        <div className="mt-[18px] self-start overflow-hidden">
          <div className={closing ? "" : "fw-menu-link"} style={linkDelay(MENU_ITEMS.length)}>
            <Link
              href="/products"
              onClick={onClose}
              className="fw-anim-shimmer inline-flex items-center gap-2.5 rounded-full px-[22px] py-3.5 text-base font-extrabold tracking-[0.06em] no-underline"
              style={{
                background: "linear-gradient(120deg,#1FA95B,#C3F53C,#1FA95B)",
                backgroundSize: "200% 100%",
                color: "#0A2A14",
              }}
            >
              <span
                className="fw-anim-bounce block h-[18px] w-[18px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #F4FFC4, #C3F53C 58%, #8FCE20)",
                }}
              />
              PICKLEBALL · NEW
            </Link>
          </div>
        </div>
      </nav>

      <div
        className={`mt-auto text-[13px] leading-[1.7] text-[#181A20]/55 ${closing ? "" : "fw-menu-chrome"}`}
        style={linkDelay(MENU_ITEMS.length + 1)}
      >
        {email}
        <br />
        {phone}
      </div>
    </div>
  );
}
