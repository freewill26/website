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
