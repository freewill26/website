import { FwReveal } from "@/components/site/FwReveal";
import CatalogueCard from "@/components/catalogue/CatalogueCard";
import { DocumentIcon } from "@/components/ui/icons";
import type { CatalogueItemVM } from "@/lib/api/catalogue";

/** Catalogue index body — a three-up grid of downloadable brochures. */
export default function CatalogueGrid({ items }: { items: CatalogueItemVM[] }) {
  return (
    <section
      className="box-border bg-cream px-[6vw]"
      style={{ paddingBlock: "0 clamp(72px,9vw,140px)" }}
    >
      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <FwReveal key={item.id} className="h-full">
              <CatalogueCard item={item} />
            </FwReveal>
          ))}
        </div>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-[18px] py-[clamp(56px,8vw,120px)] text-center">
      <div
        className="flex h-[84px] w-[84px] items-center justify-center rounded-full"
        style={{ background: "rgba(0,104,127,0.08)", border: "1px solid rgba(0,104,127,0.2)" }}
      >
        <DocumentIcon size={34} />
      </div>
      <h3
        className="m-0 font-display uppercase text-[#111820]"
        style={{ fontSize: "clamp(24px,3vw,40px)" }}
      >
        Nothing to download yet.
      </h3>
      <p className="m-0 max-w-[380px] text-[15px] text-[#181A20]/60">
        We haven&apos;t published our brochures here yet — get in touch and
        we&apos;ll send the range you need.
      </p>
    </div>
  );
