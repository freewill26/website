import { FwReveal } from "@/components/site/FwReveal";

/** Product image gallery. Renders nothing when there are no gallery images. */
export default function ProductDetailGallery({ images, alt }: { images: string[]; alt: string }) {
  if (images.length === 0) return null;

  return (
    <section className="box-border bg-cream px-[6vw]" style={{ paddingBlock: "clamp(56px,7vw,100px)" }}>
      <FwReveal className="mb-7 flex items-center gap-3">
        <span className="block h-0.5 w-7 bg-brand" />
        <span className="text-xs font-bold tracking-[0.28em] text-brand">GALLERY</span>
      </FwReveal>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {images.map((src, i) => (
          <FwReveal key={src} className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
            <img src={src} alt={`${alt} ${i + 1}`} className="absolute inset-0 h-full w-full object-cover" />
          </FwReveal>
        ))}
      </div>
    </section>
  );
}
