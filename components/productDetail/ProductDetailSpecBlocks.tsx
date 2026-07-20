import Image from "next/image";
import { FwReveal } from "@/components/site/FwReveal";
import { sanitizeBlockHtml } from "@/utils/sanitizeHtml";
import type { ApiProductSpecBlock } from "@/lib/api/types";

/**
 * The numbered component breakdown — "1. Structure", "2. Glass panels", … —
 * each block pairing CMS rich text with its illustration. Blocks sit two-up on
 * desktop and stack on mobile; the numbering follows the CMS order. Renders
 * nothing when the product has no blocks.
 */
export default function ProductDetailSpecBlocks({
  blocks,
}: {
  blocks: ApiProductSpecBlock[];
}) {
  if (!blocks?.length) return null;

  return (
    <section
      className="box-border bg-white px-[6vw] text-[#181A20]"
      style={{ paddingBlock: "clamp(64px,8vw,120px)" }}
    >
      <FwReveal className="mb-[clamp(32px,4vw,56px)] flex items-center gap-3">
        <span className="block h-0.5 w-7" style={{ background: "#2F6BFF" }} />
        <span className="text-xs font-bold tracking-[0.28em]" style={{ color: "#2F6BFF" }}>
          SPECIFICATIONS
        </span>
      </FwReveal>

      <ol className="m-0 grid list-none grid-cols-1 gap-x-[clamp(32px,4vw,72px)] gap-y-[clamp(40px,5vw,72px)] p-0 lg:grid-cols-2">
        {blocks.map((block, i) => (
          <FwReveal
            as="li"
            key={`${block.title}-${i}`}
            className="grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-start"
          >
            <div className="min-w-0">
              <h3
                className="m-0 mb-4 font-display uppercase leading-tight"
                style={{ fontSize: "clamp(17px,1.5vw,22px)", color: "#16305C" }}
              >
                <span className="mr-2 tabular-nums" style={{ color: "#2F6BFF" }}>
                  {i + 1}.
                </span>
                {block.title}
              </h3>
              {block.content && (
                <div
                  className="text-[15px] leading-[1.85] text-[#181A20]/75 [&_h3]:mt-4 [&_h3]:font-semibold [&_h4]:mt-4 [&_h4]:font-semibold [&_li]:mb-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_strong]:text-[#16305C] [&_ul]:list-disc [&_ul]:pl-5"
                  dangerouslySetInnerHTML={{ __html: sanitizeBlockHtml(block.content) }}
                />
              )}
            </div>

            {block.image && (
              <div className="relative aspect-square w-full overflow-hidden rounded-[10px] bg-[#F4F6F9] sm:w-[150px]">
                <Image
                  src={block.image}
                  alt={block.imageAlt || block.title}
                  fill
                  sizes="150px"
                  className="object-contain object-center p-2"
                />
              </div>
            )}
          </FwReveal>
        ))}
      </ol>
    </section>
  );
}
