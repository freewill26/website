import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import ProductDetailHero from "@/components/productDetail/ProductDetailHero";
import ProductDetailAbout from "@/components/productDetail/ProductDetailAbout";
import ProductDetailFeatures from "@/components/productDetail/ProductDetailFeatures";
import ProductDetailSpecBlocks from "@/components/productDetail/ProductDetailSpecBlocks";
import ProductDetailSpecs from "@/components/productDetail/ProductDetailSpecs";
import ProductDetailGallery from "@/components/productDetail/ProductDetailGallery";
import ProductDetailContact from "@/components/productDetail/ProductDetailContact";
import { getProduct, getCatalogOptions } from "@/lib/api/products";

interface ProductItemPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductItemPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product not found · Freewill" };

  return {
    title: product.seoTitle || `${product.title} · Freewill`,
    description: product.seoDescription || product.description,
    openGraph: {
      title: product.ogTitle || product.title,
      description: product.ogDescription || product.description,
      ...(product.ogImage ? { images: [product.ogImage] } : {}),
    },
  };
}

/**
 * Real, DB-backed product detail page — reached from a category card on the
 * Products index (`/products/item/[id]`). Every section degrades gracefully:
 * About/Specs/Gallery render nothing when the CMS field is empty.
 */
export default async function ProductItemPage({ params }: ProductItemPageProps) {
  const { id } = await params;
  const [product, catalogOptions] = await Promise.all([getProduct(id), getCatalogOptions()]);

  if (!product) notFound();

  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <SiteHeader solid />
      <main>
        <ProductDetailHero
          title={product.title}
          tag={product.tag}
          description={product.broadDescription || product.description}
          image={product.image}
          imageAlt={product.imageAlt ?? product.title}
        />
        <ProductDetailAbout
          title={product.aboutTitle}
          description={product.aboutDescription}
          image={product.aboutImage}
        />
        <ProductDetailFeatures
          features={product.features ?? []}
          productTitle={product.title}
        />
        <ProductDetailSpecBlocks blocks={product.specifications ?? []} />
        <ProductDetailSpecs html={product.blueprintHtml} productTitle={product.title} />
        <ProductDetailGallery images={product.images} alt={product.title} />
        <ProductDetailContact productTitle={product.title} options={catalogOptions} />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
