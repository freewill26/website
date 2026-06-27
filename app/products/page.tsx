import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import ProductsHero from "@/components/products/ProductsHero";
import ProductsCategory from "@/components/products/ProductsCategory";
import ProductsContact from "@/components/products/ProductsContact";
import { CATEGORIES } from "@/lib/productsContent";

export const metadata: Metadata = {
  title: "Products & Systems · Freewill",
  description:
    "Everything the game is played on — Olympic vinyl, floating maple, all-weather turf, telescopic seating and competition equipment, indoor to outdoor.",
};

/** Freewill Products (Page A) — the "Freewill Products.dc.html" design. */
export default function ProductsPage() {
  return (
    <div className="overflow-x-clip bg-cream text-[#111820]">
      <SiteHeader solid />
      <main>
        <ProductsHero />
        {CATEGORIES.map((category) => (
          <ProductsCategory key={category.n} category={category} />
        ))}
        <ProductsContact />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
