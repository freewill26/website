import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/navigation";

const PRODUCT_LINKS = [
  "Taraflex® Indoor Surfaces",
  "Synthetic Grass",
  "PU & Acrylic Courts",
  "Stadium Seating",
];

const SOCIALS = ["Facebook", "Instagram", "LinkedIn", "YouTube"];

/** Site footer: brand blurb, page/product/contact columns and a watermark. */
export default function Footer() {
  return (
    <footer className="border-t border-brand-accent/12 bg-ink px-[6vw] pb-8 pt-14 text-cream sm:pt-20 lg:pt-24">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
        {/* Brand */}
        <div>
          <Image src="/assets/logo-freewill-white.svg" alt="Freewill" width={140} height={32} className="h-8 w-auto" />
          <div className="mb-5 mt-1 text-[9px] font-bold tracking-[0.34em] text-brand-accent">
            INFRA FOR SPORTS
          </div>
          <p className="max-w-[300px] text-[13px] leading-[1.8] text-mist/50">
            The ground India plays on. Sports flooring, stadium seating and
            competition equipment since 1990.
          </p>
        </div>

        {/* Pages */}
        <FooterColumn title="Pages">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium text-mist/60 transition-colors hover:text-brand-accent"
            >
              {item.label}
            </Link>
          ))}
        </FooterColumn>

        {/* Products */}
        <FooterColumn title="Products">
          {PRODUCT_LINKS.map((label) => (
            <span key={label} className="text-[13px] text-mist/60">
              {label}
            </span>
          ))}
        </FooterColumn>

        {/* Contact */}
        <FooterColumn title="Contact">
          <span className="text-[13px] leading-[1.7] text-mist/60">
            6, Premier Plaza-II, Mumbai–Pune Highway, Chinchwad, Pune 411019
          </span>
          <span className="text-[13px] text-mist/60">info@freewill.co.in</span>
          <span className="text-[13px] text-mist/60">+91 20661 14215</span>
        </FooterColumn>
      </div>

      {/* Oversized watermark */}
      <div className="mt-16 select-none text-center font-display text-[clamp(64px,17vw,300px)] leading-[0.8] text-mist/[0.04]">
        FREEWILL
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-brand-accent/12 pt-6 text-[11px] tracking-[0.08em] text-mist/30">
        <span>© 2026 FREEWILL INFRASTRUCTURES PVT LTD.</span>
        <span className="flex flex-wrap gap-6">
          {SOCIALS.map((s) => (
            <span key={s} className="uppercase">
              {s}
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="mb-1.5 text-[11px] font-bold tracking-[0.26em] text-mist/30">
        {title.toUpperCase()}
      </div>
      {children}
    </div>
  );
}
