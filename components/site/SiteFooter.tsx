import Link from "next/link";
import Image from "next/image";
import { SITE_NAV } from "@/lib/siteNav";
import { getContactChannels } from "@/lib/api/contact";
import { getFooterSolutions } from "@/lib/api/advertising";
import { getSocialLinks } from "@/lib/api/socialLinks";

/** Redesigned light footer (cream) shared by the Home and About pages. */
export default async function SiteFooter() {
  const [{ address, email, phone }, solutions, socials] = await Promise.all([
    getContactChannels(),
    getFooterSolutions(),
    getSocialLinks(),
  ]);
  return (
    <footer
      className="box-border px-[6vw] pb-8 pt-14 text-[#181A20] sm:pt-20 lg:pt-[104px]"
      style={{ background: "#EAE1CD" }}
    >
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <Image src="/assets/logo-freewill.svg" alt="Freewill" width={600} height={125} className="h-8 w-auto" />
          <div className="mb-5 mt-1 text-[9px] font-bold tracking-[0.34em] text-brand">
            INFRA FOR SPORTS
          </div>
          <p className="m-0 max-w-[300px] text-[13px] leading-[1.8] text-[#181A20]/60">
            The ground India plays on. Sports flooring, stadium seating and
            competition equipment since 1990.
          </p>
        </div>

        <FooterColumn title="Pages">
          {SITE_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium text-[#181A20]/70 no-underline transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Solutions">
          {solutions.map((solution) => (
            <Link
              key={solution.label}
              href={solution.href}
              className="text-[13px] text-[#181A20]/70 no-underline transition-colors hover:text-brand"
            >
              {solution.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Contact">
          <span className="text-[13px] leading-[1.7] text-[#181A20]/70">{address}</span>
          <span className="text-[13px] text-[#181A20]/70">{email}</span>
          <span className="text-[13px] text-[#181A20]/70">{phone}</span>
        </FooterColumn>
      </div>

      <div className="mt-16 select-none">
        <Image
          src="/assets/logo-freewill-dark.svg"
          alt=""
          aria-hidden
          width={600}
          height={125}
          className="h-auto w-full opacity-[0.06]"
        />
      </div>

      <div
        className="mt-6 flex flex-wrap justify-between gap-4 border-t pt-6 text-[11px] tracking-[0.08em] text-[#181A20]/45"
        style={{ borderColor: "rgba(24,26,32,0.12)" }}
      >
        <span>© 2026 FREEWILL INFRASTRUCTURES PVT LTD.</span>
        <span className="flex flex-wrap gap-6">
          {socials.map((s) =>
            s.href ? (
              <a
                key={s.app}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase text-inherit no-underline transition-colors hover:text-brand"
              >
                {s.app}
              </a>
            ) : (
              <span key={s.app} className="uppercase">
                {s.app}
              </span>
            ),
          )}
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
      <div className="mb-1.5 text-[11px] font-bold tracking-[0.26em] text-[#181A20]/45">
        {title.toUpperCase()}
      </div>
      {children}
    </div>
  );
}
