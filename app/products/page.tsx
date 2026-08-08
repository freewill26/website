import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import ProductsHero from "@/components/products/ProductsHero";
import ProductsCategory from "@/components/products/ProductsCategory";
import ProductsContact from "@/components/products/ProductsContact";
import { getProductsPageContent, getCategoriesWithProducts, getCatalogOptions } from "@/lib/api/products";

/** SEO/OG metadata for `/products` sourced from the CMS "products" page. */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getProductsPageContent();
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
 * Freewill Products index — an async Server Component. Hero copy comes from
 * the CMS; categories and their products come straight from the service API,
 * grouped client-side (there's no combined endpoint).
 */
export default async function ProductsPage() {
  const [content, categories, catalogOptions] = await Promise.all([
    getProductsPageContent(),
    getCategoriesWithProducts(),
    getCatalogOptions(),
  ]);

  return (
    <div className="overflow-x-clip bg-cream text-[#111820]">
      <SiteHeader solid />
      <main>
        <ProductsHero hero={content.hero} />
        {categories.map((category, i) => (
          <ProductsCategory
            key={category.id}
            category={category}
            index={i}
            tone={i % 2 === 0 ? "cream" : "white"}
          />
        ))}
        <ProductsContact options={catalogOptions} />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
