import { FwReveal } from "@/components/site/FwReveal";
import BlueprintFrame from "./BlueprintFrame";

/**
 * The product's blueprint document, uploaded in the CMS as a self-contained
 * `.html` file and embedded here in a sandboxed iframe.
 *
 * The frame itself is full-bleed — the uploaded document brings its own layout,
 * so it spans the full viewport width with no padding or rounding. Only the
 * eyebrow label is inset, so it doesn't collide with the viewport edge.
 * Renders nothing when no blueprint has been uploaded.
 */
export default function ProductDetailSpecs({
  html,
  productTitle,
}: {
  html: string | null;
  productTitle: string;
}) {
  if (!html) return null;

  return (
    <section className="w-full" style={{ background: "#0A1024" }}>
      <FwReveal className="flex items-center gap-3 px-[6vw] pb-[clamp(18px,2.5vw,32px)] pt-[clamp(40px,5vw,72px)]">
        <span className="block h-0.5 w-7" style={{ background: "#5FD0E0" }} />
        <span className="font-mono text-xs font-medium tracking-[0.24em] text-[#9FE4EF]">
          BLUEPRINT
        </span>
      </FwReveal>
      <BlueprintFrame html={html} title={`${productTitle} blueprint`} />
    </section>
  );
}
