import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import ProductDetailBreadcrumb from "@/components/productDetail/ProductDetailBreadcrumb";
import ProductDetailHero from "@/components/productDetail/ProductDetailHero";
import ProductDetailAbout from "@/components/productDetail/ProductDetailAbout";
import ProductDetailChildren from "@/components/productDetail/ProductDetailChildren";
import ProductDetailFeatures from "@/components/productDetail/ProductDetailFeatures";
import ProductDetailSpecBlocks from "@/components/productDetail/ProductDetailSpecBlocks";
import ProductDetailSpecs from "@/components/productDetail/ProductDetailSpecs";
import ProductDetailGallery from "@/components/productDetail/ProductDetailGallery";
import ProductDetailContact from "@/components/productDetail/ProductDetailContact";
import { getProductType } from "@/lib/api/productTypes";
import { getCatalogOptions } from "@/lib/api/products";

interface ProductTypePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductTypePageProps): Promise<Metadata> {
  const { id } = await params;
  const type = await getProductType(id);
  if (!type) return { title: "Product type not found · Freewill" };

  return {
    title: type.seoTitle || `${type.title} · Freewill`,
    description: type.seoDescription || type.description,
    openGraph: {
      title: type.ogTitle || type.title,
      description: type.ogDescription || type.description,
      ...(type.ogImage ? { images: [type.ogImage] } : {}),
    },
  };
}

/**
 * Product type detail page — the middle level of the catalogue, reached from
 * the "Product Types" cards on a product page. A type is authored with the
 * same sections as a product, so it reuses the same components, and lists its
 * own variants where a product lists its types. Every section degrades
 * gracefully when its CMS field is empty.
 */
export default async function ProductTypePage({ params }: ProductTypePageProps) {
  const { id } = await params;
  const [type, catalogOptions] = await Promise.all([
    getProductType(id),
    getCatalogOptions(),
  ]);

  if (!type) notFound();

  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <SiteHeader solid />
      <main>
        <ProductDetailHero
          title={type.title}
          // The parent product doubles as the eyebrow when no tag is set, so a
          // visitor arriving from search still sees which range this belongs to.
          tag={type.tag || type.product?.title || null}
          description={type.broadDescription || type.description}
          image={type.image}
          imageAlt={type.imageAlt ?? type.title}
        />
        <ProductDetailBreadcrumb
          crumbs={[
            { label: "Products", href: "/products" },
            // The parent is dropped rather than linked blind if the API ever
            // returns a type without one.
            ...(type.product
              ? [{ label: type.product.title, href: `/products/item/${type.product.id}` }]
              : []),
            { label: type.title },
          ]}
        />
        <ProductDetailAbout
          title={type.aboutTitle}
          description={type.aboutDescription}
          image={type.aboutImage}
        />
        <ProductDetailChildren
          items={type.variants ?? []}
          eyebrow="VARIANTS"
          hrefBase="/products/variant"
        />
        <ProductDetailFeatures
          features={type.features ?? []}
          productTitle={type.title}
        />
        <ProductDetailSpecBlocks blocks={type.specifications ?? []} />
        <ProductDetailSpecs html={type.blueprintHtml} productTitle={type.title} />
        <ProductDetailGallery images={type.images} alt={type.title} />
        <ProductDetailContact productTitle={type.title} options={catalogOptions} />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
