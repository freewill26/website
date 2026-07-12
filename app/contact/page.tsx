import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import ContactHero from "@/components/contact/ContactHero";
import ContactBody from "@/components/contact/ContactBody";
import { getCatalogOptions } from "@/lib/api/products";

export const metadata: Metadata = {
  title: "Contact Us · Freewill",
  description:
    "Request a quote or a site visit. Freewill responds within one working day — sports flooring, stadium seating and competition equipment since 1990.",
};

/** Freewill Contact Us screen. */
export default async function ContactPage() {
  const catalogOptions = await getCatalogOptions();

  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <SiteHeader solid />
      <main>
        <ContactHero />
        <ContactBody options={catalogOptions} />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
