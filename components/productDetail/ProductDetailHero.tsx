import Image from "next/image";
import Link from "next/link";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { ROUTES } from "@/lib/navigation";

interface ProductDetailHeroProps {
  title: string;
  tag: string | null;
  description: string;
  image: string | null;
  imageAlt: string;
}

/** Product detail hero — dark arena backdrop, product name and lead description. */
export default function ProductDetailHero({ title, tag, description, image, imageAlt }: ProductDetailHeroProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden"
      style={{ background: "#0F1428", scrollMarginTop: "104px" }}
    >
      {image ? (
        <Image
          src={image}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-center opacity-40"
        />
      ) : (
        <ImageSlot tone="light" label={imageAlt} className="absolute inset-0 h-full w-full" />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,20,40,0.6) 0%, rgba(15,20,40,0.2) 38%, rgba(15,20,40,0.88) 100%)",
        }}
      />

      <div className="relative box-border px-[6vw] pb-[clamp(56px,7vw,104px)]">
        <FwReveal className="mb-[26px] flex flex-wrap items-center gap-3.5">
          <Link
            href={ROUTES.products}
            className="text-xs font-bold tracking-[0.2em] text-[#9FC0FF] no-underline transition-colors hover:text-white"
          >
            <span className="inline-flex items-center gap-2">
              <ArrowLeftIcon size={12} color="9FC0FF" /> PRODUCTS
            </span>
          </Link>
          {tag && (
            <span className="text-xs font-bold tracking-[0.2em] text-[#F6F4EC]/40">
              / {tag.toUpperCase()}
            </span>
          )}
        </FwReveal>

        <MaskedHeading
          as="h1"
          className="m-0 max-w-[16ch] font-display uppercase leading-[0.94] text-[#F6F4EC]"
          style={{ fontSize: "clamp(40px,8vw,140px)" }}
          lines={[title]}
        />

        <FwReveal
          as="p"
          className="m-0 mt-7 max-w-[620px] leading-[1.7] text-[#F6F4EC]/85"
          style={{ fontSize: "clamp(16px,1.6vw,21px)" }}
        >
          {description}
        </FwReveal>
      </div>
    </section>
  );
}
