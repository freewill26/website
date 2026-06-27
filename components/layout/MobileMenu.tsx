"use client";

import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/navigation";
import { CloseIcon } from "@/components/ui/icons";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen navigation overlay shown on small screens when the burger is
 * tapped. Rendered above everything (z-900) and dismissed via the close button
 * or by following a link.
 */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[900] flex flex-col bg-ink p-6 sm:p-10">
      <div className="flex items-center justify-between">
        <Image src="/assets/logo-freewill-white.svg" alt="Freewill" width={140} height={32} className="h-8 w-auto" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25"
        >
          <CloseIcon size={20} />
        </button>
      </div>

      <nav className="mt-10 flex flex-col gap-1.5">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="font-display text-[clamp(32px,9vw,54px)] uppercase leading-[1.12] text-cream"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
