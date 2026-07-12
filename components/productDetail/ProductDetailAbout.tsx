import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";

interface ProductDetailAboutProps {
  title: string | null;
  description: string | null;
  image: string | null;
}

/** "About the product" — CMS copy beside a detail photo. Renders nothing when there's no copy to show. */
export default function ProductDetailAbout({ title, description, image }: ProductDetailAboutProps) {
  if (!title && !description) return null;

  return (
    <section className="box-border bg-white px-[6vw] text-[#181A20]" style={{ paddingBlock: "clamp(72px,9vw,150px)" }}>
      <div className="grid items-center gap-[clamp(40px,6vw,96px)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div>
          <FwReveal className="mb-6 flex items-center gap-3">
            <span className="block h-0.5 w-7" style={{ background: "#2F6BFF" }} />
            <span className="text-xs font-bold tracking-[0.28em]" style={{ color: "#2F6BFF" }}>
              ABOUT THE PRODUCT
            </span>
          </FwReveal>
          {title && (
            <MaskedHeading
              className="m-0 mb-7 font-display uppercase leading-none text-[#181A20]"
              style={{ fontSize: "clamp(34px,4.2vw,68px)" }}
              lines={[title]}
            />
          )}
          {description && (
            <FwReveal as="p" className="m-0 max-w-[520px] text-base leading-[1.8] text-[#181A20]/70">
              {description}
            </FwReveal>
          )}
        </div>

        <FwReveal className="relative aspect-[4/5] overflow-hidden rounded-[14px]">
          {image ? (
            <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center" />
          ) : (
            <ImageSlot label="Product detail" shape="rounded" className="absolute inset-0 h-full w-full" />
          )}
        </FwReveal>
      </div>
    </section>
  );
}
