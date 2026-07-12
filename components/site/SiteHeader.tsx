"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SiteMobileMenu from "@/components/site/SiteMobileMenu";
import { HEADER_NAV } from "@/lib/siteNav";
import { PRODUCT_MENU } from "@/lib/productMenu";

const RIBBON_TEXT =
  "33+ YEARS BUILDING INDIA'S ARENAS  ✦  EXCLUSIVE PARTNER — GERFLOR · CONNOR SPORTS · SPORT COURT · SPIETH  ✦  TRUSTED BY KHELO INDIA & THE NATIONAL GAMES SINCE 1992  ✦  FIBA · FIVB · FIG CERTIFIED SYSTEMS  ✦  ";

interface SiteHeaderProps {
  /** Force the cream/blur bar (used over dark heroes like About). */
  solid?: boolean;
}

/**
 * Redesigned light site header: teal credentials ribbon + cream navigation bar
 * that fades in a blur/shadow once scrolled. Shared by the Home and About pages.
 */
export default function SiteHeader({ solid = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  // Hide the header when scrolling down, reveal it when scrolling up.
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      if (y < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mega-menu on route change, and clean up its timer.
  useEffect(() => setProductsOpen(false), [pathname]);
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };
  // Small delay so moving from the trigger to the panel doesn't dismiss it.
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setProductsOpen(false), 180);
  };

  const isSolid = solid || scrolled;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : href.startsWith("/") && pathname.startsWith(href);

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-[200] transition-transform duration-300 ease-in-out"
        style={{
          transform:
            hidden && !menuOpen && !productsOpen ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        {/* Credentials ribbon */}
        <div className="flex h-9 items-center overflow-hidden bg-brand">
          <div className="inline-flex w-max whitespace-nowrap fw-anim-ribbon">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="pr-12 text-[11px] font-bold tracking-[0.18em] text-white"
              >
                {RIBBON_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* Nav bar */}
        <header
          className="box-border flex items-center justify-between gap-[18px] px-[6vw] py-4 transition-[background,box-shadow,backdrop-filter] duration-300"
          style={{
            background: isSolid ? "rgba(241,234,216,0.92)" : "rgba(241,234,216,0)",
            backdropFilter: isSolid ? "blur(12px)" : "none",
            WebkitBackdropFilter: isSolid ? "blur(12px)" : "none",
            boxShadow: isSolid
              ? "0 1px 0 rgba(24,26,32,0.12), 0 10px 30px rgba(24,26,32,0.06)"
              : "none",
          }}
        >
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Image src="/assets/logo-freewill.svg" alt="Freewill" width={600} height={125} className="h-8 w-auto" priority />
          </Link>

          <nav className="hidden items-center gap-[26px] min-[981px]:flex">
            {HEADER_NAV.map((item) =>
              item.label === "Products" ? (
                <div
                  key={item.label}
                  className="relative inline-flex items-center"
                  onMouseEnter={openMenu}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] no-underline transition-colors hover:text-brand"
                    style={{ color: isActive(item.href) || productsOpen ? "#00687F" : "rgba(24,26,32,0.7)" }}
                  >
                    {item.label}
                    <svg
                      width="9"
                      height="5"
                      viewBox="0 0 9 5"
                      fill="none"
                      className="transition-transform duration-200"
                      style={{ transform: productsOpen ? "rotate(180deg)" : "none" }}
                    >
                      <path d="M0.5 0.5L4.5 4.5L8.5 0.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-semibold uppercase tracking-[0.16em] no-underline transition-colors hover:text-brand"
                  style={{ color: isActive(item.href) ? "#00687F" : "rgba(24,26,32,0.7)" }}
                >
                  {item.label}
                </Link>
              ),
            )}

            {/* Pickleball — signature accent pill */}
            <Link
              href="/products"
              className="fw-anim-pill inline-flex items-center gap-[9px] rounded-full py-[9px] pl-3 pr-4 text-xs font-extrabold uppercase tracking-[0.1em] no-underline"
              style={{
                background: "linear-gradient(120deg,#1FA95B,#C3F53C,#1FA95B)",
                backgroundSize: "200% 100%",
                color: "#0A2A14",
              }}
            >
              <span
                className="fw-anim-bounce block h-[15px] w-[15px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #F4FFC4, #C3F53C 58%, #8FCE20)",
                  boxShadow: "inset -1px -1px 2px rgba(0,0,0,0.18)",
                }}
              />
              Pickleball
              <span
                className="rounded-full px-1.5 py-0.5 text-[8px] font-extrabold tracking-[0.12em]"
                style={{ background: "#0A2A14", color: "#C3F53C" }}
              >
                NEW
              </span>
            </Link>
          </nav>

          <Link
            href="/#fw-contact"
            className="hidden whitespace-nowrap rounded-full border px-[22px] py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#181A20] no-underline transition-colors hover:border-brand hover:bg-brand/10 hover:text-brand min-[981px]:inline-block"
            style={{ borderColor: "rgba(24,26,32,0.32)" }}
          >
            Get a Quote
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-xl border min-[981px]:hidden"
            style={{
              background: "rgba(24,26,32,0.05)",
              borderColor: "rgba(24,26,32,0.22)",
            }}
          >
            <span className="block h-0.5 w-5 bg-[#181A20]" />
            <span className="block h-0.5 w-5 bg-[#181A20]" />
            <span className="block h-0.5 w-5 bg-[#181A20]" />
          </button>
        </header>

        {/* Products mega-menu (desktop hover) */}
        {productsOpen && (
          <div
            className="absolute inset-x-0 top-full z-[250] hidden overflow-hidden min-[981px]:block"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
            style={{
              background: "#111820",
              borderTop: "2px solid #00687F",
              boxShadow: "0 28px 60px rgba(24,26,32,0.3)",
              animation: "fw-megamenu-in 0.22s ease-out",
            }}
          >
            <div className="grid grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.07)" }}>
              {PRODUCT_MENU.slice(0, 5).map((pg) => (
                <Link
                  key={pg.name}
                  href={pg.href}
                  onClick={() => setProductsOpen(false)}
                  className="group relative flex min-h-[288px] flex-col justify-end overflow-hidden no-underline transition-opacity hover:opacity-85"
                  style={{ background: pg.swatch }}
                >
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(0deg,rgba(0,0,0,0.68) 0%,rgba(0,0,0,0) 55%)" }}
                  />
                  <div
                    className="absolute left-3.5 top-3 font-display text-[11px] tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.22)" }}
                  >
                    {pg.tag}
                  </div>
                  <div className="relative z-[1] px-3.5 pb-3.5">
                    <div className="text-xs font-semibold leading-[1.25] text-white">{pg.name}</div>
                    <div className="mt-[3px] text-[9.5px] tracking-[0.04em] text-white/[0.56]">
                      {pg.cat}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <SiteMobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
