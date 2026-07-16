"use client";

import Link from "next/link";
import Image from "next/image";
import { HEADER_NAV } from "@/lib/siteNav";
import { CloseIcon } from "@/components/ui/icons";

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

/** Full-screen cream navigation overlay for the redesigned light pages. */
export default function SiteMobileMenu({ open, onClose, email, phone }: SiteMobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[900] box-border flex flex-col bg-cream p-6 sm:p-10">
      <div className="flex items-center justify-between">
        <Image src="/assets/logo-freewill.svg" alt="Freewill" width={140} height={32} className="h-8 w-auto" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-12 w-12 items-center justify-center rounded-full border"
          style={{ borderColor: "rgba(24,26,32,0.3)" }}
        >
          <CloseIcon size={20} color="181A20" />
        </button>
      </div>

      <nav className="mt-10 flex flex-col gap-1.5">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="font-display text-[clamp(36px,11vw,60px)] uppercase leading-[1.1] text-[#181A20] no-underline"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/products"
          onClick={onClose}
          className="fw-anim-shimmer mt-[18px] inline-flex items-center gap-2.5 self-start rounded-full px-[22px] py-3.5 text-base font-extrabold tracking-[0.06em] no-underline"
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
      </nav>

      <div className="mt-auto text-[13px] leading-[1.7] text-[#181A20]/55">
        {email}
        <br />
        {phone}
      </div>
    </div>
  );
}
