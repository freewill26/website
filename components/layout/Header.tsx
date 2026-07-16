"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, ROUTES } from "@/lib/navigation";
import Logo from "@/components/ui/Logo";
import MarqueeRibbon from "@/components/layout/MarqueeRibbon";
import MobileMenu from "@/components/layout/MobileMenu";
import { MenuIcon } from "@/components/ui/icons";

// Desktop nav omits "Catalogues" (it lives in the mobile menu and footer only).
const DESKTOP_NAV = NAV_ITEMS.filter((item) => item.label !== "Catalogues");

interface HeaderProps {
  /** CMS-managed ribbon credentials, fetched by the page (this is a client component). */
  marqueeItems?: string[];
}

/**
 * Fixed site header: marquee ribbon + primary navigation, with a burger menu
 * on small screens. Highlights the active route in teal.
 */
export default function Header({ marqueeItems }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > lastScrollY.current + 10) {
            // Scrolling down
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current - 10) {
            // Scrolling up
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href !== "#" && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-[200] transition-transform duration-300 ease-out"
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <MarqueeRibbon items={marqueeItems} />

        <header className="flex items-center justify-between gap-4 border-b border-brand-accent/15 bg-ink/[0.88] px-[6vw] py-4 backdrop-blur-md">
          <Logo />

          <nav className="hidden items-center gap-[22px] min-[981px]:flex">
            {DESKTOP_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-brand-accent ${
                  isActive(item.href) ? "text-brand-accent" : "text-cream/60"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href={ROUTES.contact}
            className="hidden whitespace-nowrap rounded-full border border-brand-accent/45 px-[22px] py-3 text-xs font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:border-brand-accent hover:bg-brand-accent/10 min-[981px]:inline-block"
          >
            Get a Quote
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.18] bg-white/5 min-[981px]:hidden"
          >
            <MenuIcon size={22} />
          </button>
        </header>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
