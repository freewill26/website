import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import ProductDetailBreadcrumb, {
  type BreadcrumbCrumb,
} from "@/components/productDetail/ProductDetailBreadcrumb";
import ProductDetailHero from "@/components/productDetail/ProductDetailHero";
import ProductDetailAbout from "@/components/productDetail/ProductDetailAbout";
import ProductDetailFeatures from "@/components/productDetail/ProductDetailFeatures";
import ProductDetailSpecBlocks from "@/components/productDetail/ProductDetailSpecBlocks";
import ProductDetailSpecs from "@/components/productDetail/ProductDetailSpecs";
import ProductDetailGallery from "@/components/productDetail/ProductDetailGallery";
import ProductDetailContact from "@/components/productDetail/ProductDetailContact";
import { getProductVariant } from "@/lib/api/productVariants";
import { getCatalogOptions } from "@/lib/api/products";

interface ProductVariantPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductVariantPageProps): Promise<Metadata> {
  const { id } = await params;
  const variant = await getProductVariant(id);
  if (!variant) return { title: "Product variant not found · Freewill" };

  return {
    title: variant.seoTitle || `${variant.title} · Freewill`,
    description: variant.seoDescription || variant.description,
    openGraph: {
      title: variant.ogTitle || variant.title,
      description: variant.ogDescription || variant.description,
      ...(variant.ogImage ? { images: [variant.ogImage] } : {}),
    },
  };
}

/**
 * Product variant detail page — the leaf of the catalogue, reached from the
 * "Variants" cards on a product type page. Authored with the same sections as
 * the two levels above it, so it reuses the same components; it has no
 * children grid because nothing sits below it. Every section degrades
 * gracefully when its CMS field is empty.
 */
export default async function ProductVariantPage({ params }: ProductVariantPageProps) {
  const { id } = await params;
  const [variant, catalogOptions] = await Promise.all([
    getProductVariant(id),
    getCatalogOptions(),
  ]);

  if (!variant) notFound();

  const type = variant.productType;
  const product = type?.product;

  // Built up a level at a time so a missing ancestor drops just its own crumb
  // rather than breaking the trail.
  const crumbs: BreadcrumbCrumb[] = [
    { label: "Products", href: "/products" },
    ...(product ? [{ label: product.title, href: `/products/item/${product.id}` }] : []),
    ...(type ? [{ label: type.title, href: `/products/type/${type.id}` }] : []),
    { label: variant.title },
  ];

  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <SiteHeader solid />
      <main>
        <ProductDetailHero
          title={variant.title}
          // Falls back to the parent type, then the product, so a visitor
          // landing here from search always sees where this sits.
          tag={variant.tag || type?.title || product?.title || null}
          description={variant.broadDescription || variant.description}
          image={variant.image}
          imageAlt={variant.imageAlt ?? variant.title}
        />
        <ProductDetailBreadcrumb crumbs={crumbs} />
        <ProductDetailAbout
          title={variant.aboutTitle}
          description={variant.aboutDescription}
          image={variant.aboutImage}
        />
        <ProductDetailFeatures
          features={variant.features ?? []}
          productTitle={variant.title}
        />
        <ProductDetailSpecBlocks blocks={variant.specifications ?? []} />
        <ProductDetailSpecs html={variant.blueprintHtml} productTitle={variant.title} />
        <ProductDetailGallery images={variant.images} alt={variant.title} />
        <ProductDetailContact productTitle={variant.title} options={catalogOptions} />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
