import SiteHeaderClient from "@/components/site/SiteHeaderClient";
import { getCategories } from "@/lib/api/home";
import { getContactChannels } from "@/lib/api/contact";

interface SiteHeaderProps {
  /** Force the cream/blur bar (used over dark heroes like About). */
  solid?: boolean;
}

/**
 * Server wrapper for the site header — fetches the 5 categories shown as
 * cards in the "Products" hover mega-menu, then hands off to the client
 * component for the interactive scroll/hover behaviour.
 */
export default async function SiteHeader({ solid = false }: SiteHeaderProps) {
  const [categories, { email, phone }] = await Promise.all([
    getCategories(5),
    getContactChannels(),
  ]);
  return (
    <SiteHeaderClient solid={solid} categories={categories} email={email} phone={phone} />
  );
}
