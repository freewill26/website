import { FwReveal } from "@/components/site/FwReveal";
import { sanitizeRichText } from "@/utils/sanitizeHtml";

/** "Specifications" — CMS rich text (the product's blueprint/spec sheet). Renders nothing when empty. */
export default function ProductDetailSpecs({ html }: { html: string | null }) {
  if (!html) return null;

  return (
    <section
      className="box-border px-[6vw] text-[#EAF8FB]"
      style={{ background: "#0A1024", paddingBlock: "clamp(64px,8vw,120px)" }}
    >
      <FwReveal className="mb-[18px] flex items-center gap-3">
        <span className="block h-0.5 w-7" style={{ background: "#5FD0E0" }} />
        <span className="font-mono text-xs font-medium tracking-[0.24em] text-[#9FE4EF]">
          SPECIFICATIONS
        </span>
      </FwReveal>
      <FwReveal as="div" className="max-w-[760px]">
        <div
          className="text-[15px] leading-[1.9] text-[#DFF6FA]/85 [&_strong]:text-[#5FD0E0] [&_b]:text-[#5FD0E0]"
          dangerouslySetInnerHTML={{ __html: sanitizeRichText(html) }}
        />
      </FwReveal>
    </section>
  );
}
