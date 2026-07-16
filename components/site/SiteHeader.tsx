import SiteHeaderClient from "@/components/site/SiteHeaderClient";
import { getCategories } from "@/lib/api/home";
import { getContactChannels } from "@/lib/api/contact";
import { getHeaderButton, getMarqueeItems } from "@/lib/api/advertising";

interface SiteHeaderProps {
  /** Force the cream/blur bar (used over dark heroes like About). */
  solid?: boolean;
}

/**
 * Server wrapper for the site header — fetches the 5 categories shown as
 * cards in the "Products" hover mega-menu plus the CMS-managed advertising
 * slots (accent pill, credentials ribbon), then hands off to the client
 * component for the interactive scroll/hover behaviour.
 */
export default async function SiteHeader({ solid = false }: SiteHeaderProps) {
  const [categories, { email, phone }, headerButton, marqueeItems] = await Promise.all([
    getCategories(5),
    getContactChannels(),
    getHeaderButton(),
    getMarqueeItems(),
  ]);
  return (
    <SiteHeaderClient
      solid={solid}
      categories={categories}
      email={email}
      phone={phone}
      headerButton={headerButton}
      marqueeItems={marqueeItems}
    />
  );
}
