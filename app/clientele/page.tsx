import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import ClienteleClient from "@/components/clientele/ClienteleClient";
import { getClientelePageContent, getClienteleGroups } from "@/lib/api/clientele";

/** SEO/OG metadata for `/clientele` sourced from the CMS "clientele" page. */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getClientelePageContent();
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
    },
  };
}

/**
 * Freewill Clientele — an async Server Component. Hero copy comes from the
 * CMS; the roster is fetched server-side in one pass and grouped into sectors,
 * so the whole wall ships in the initial HTML and `ClienteleClient` only owns
 * the filtering. Reached from the footer only, not the header nav.
 */
export default async function ClientelePage() {
  const [content, groups] = await Promise.all([
    getClientelePageContent(),
    getClienteleGroups(),
  ]);
  const headlineLines = content.hero.headline.split("\n").map((line) => line.trim());
  const total = groups.reduce((n, g) => n + g.clients.length, 0);

  return (
    <div className="overflow-x-clip bg-cream text-[#111820]">
      <SiteHeader solid />
      <main>
        {/* Intro band */}
        <section className="box-border bg-cream px-[6vw] pb-[clamp(28px,3vw,44px)] pt-[clamp(148px,12vw,180px)]">
          <div className="flex flex-wrap items-end justify-between gap-6 sm:gap-8">
            <div className="min-w-0">
              <FwReveal className="mb-3.5 flex items-center gap-3">
                <span className="block h-0.5 w-7 bg-brand" />
                <span className="text-xs font-bold tracking-[0.28em] text-brand">
                  {content.hero.title.toUpperCase()}
                </span>
              </FwReveal>
              <MaskedHeading
                as="h1"
                className="m-0 break-words font-display uppercase leading-[1.02] text-[#111820] sm:leading-[0.94]"
                style={{ fontSize: "clamp(34px,6.4vw,108px)" }}
                lines={headlineLines}
              />
            </div>
            <FwReveal
              as="p"
              className="m-0 max-w-[380px] leading-[1.7] text-[#181A20]/[0.62]"
              style={{ fontSize: "clamp(15px,1.4vw,18px)" }}
            >
              {content.hero.description}
            </FwReveal>
          </div>

          {total > 0 && (
            <FwReveal
              className="mt-[clamp(28px,3vw,44px)] flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-5 text-[11px] font-bold tracking-[0.22em] text-[#181A20]/45"
              style={{ borderColor: "rgba(24,26,32,0.12)" }}
            >
              <span>
                <span className="font-display text-brand">{total}</span> CLIENTS
              </span>
              <span>
                <span className="font-display text-brand">{groups.length}</span> SECTORS
              </span>
              <span className="hidden sm:inline">EST. 1990 — PUNE, INDIA</span>
            </FwReveal>
          )}
        </section>

        {groups.length > 0 ? (
          <ClienteleClient groups={groups} />
        ) : (
          <section className="box-border px-[6vw] pb-[clamp(64px,8vw,110px)]">
            <p className="m-0 text-[15px] leading-[1.7] text-[#181A20]/50">
              Our client list is being updated. Please check back shortly.
            </p>
          </section>
        )}

        {/* CTA banner */}
        <section className="box-border bg-brand px-[6vw] py-[clamp(60px,8vw,100px)] text-center text-cream">
          <FwReveal>
            <h3
              className="m-0 mb-4 font-display uppercase leading-[1.1]"
              style={{ fontSize: "clamp(32px,4vw,64px)" }}
            >
              Join the list.
            </h3>
            <p className="mx-auto mb-7 max-w-[560px] text-base leading-[1.7] text-cream/[0.72]">
              From a single court to a national-games complex — let&apos;s build
              the ground you&apos;ll play on.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-cream px-[30px] py-4 text-[13px] font-bold tracking-[0.1em] text-brand no-underline transition-colors hover:bg-cream/90"
            >
              GET A FREE ESTIMATE <ArrowRightIcon size={14} color="00687F" />
            </Link>
          </FwReveal>
        </section>
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
