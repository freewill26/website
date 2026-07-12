import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import ContactHero from "@/components/contact/ContactHero";
import ContactBody from "@/components/contact/ContactBody";
import { getCatalogOptions } from "@/lib/api/products";
import { getContactPageContent } from "@/lib/api/contact";

/** SEO/OG metadata for `/contact` sourced from the CMS "contact" page. */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContactPageContent();
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

/** Freewill Contact Us screen — hero copy and contact channels come from the CMS. */
export default async function ContactPage() {
  const [content, catalogOptions] = await Promise.all([
    getContactPageContent(),
    getCatalogOptions(),
  ]);

  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <SiteHeader solid />
      <main>
        <ContactHero
          title={content.title}
          headline={content.headline}
          description={content.description}
        />
        <ContactBody
          options={catalogOptions}
          address={content.address}
          email={content.email}
          phone={content.phone}
          whatsapp={content.whatsapp}
          mapUrl={content.mapUrl}
        />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
