"use client";

import { useRef } from "react";
import Link from "next/link";
import { FwReveal } from "@/components/site/FwReveal";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import ImageSlot from "@/components/site/ImageSlot";
import { productHref } from "@/lib/navigation";
import type { CategoryWithProductsVM } from "@/lib/api/products";

/**
 * One category from the API: header + prev/next controls and a full-bleed,
 * snap-scrolling card rail. Each card links to the product's detail page.
 */
export default function ProductsCategory({
  category,
  index,
  tone,
}: {
  category: CategoryWithProductsVM;
  index: number;
  tone: "cream" | "white";
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (dir: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector<HTMLElement>("[data-rail-card]");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id={`fw-cat-${index + 1}`}
      className="box-border"
      style={{
        background: tone === "cream" ? "#F1EAD8" : "#FFFFFF",
        paddingBlock: "clamp(64px,7vw,108px)",
        scrollMarginTop: "104px",
      }}
    >
      <FwReveal className="flex flex-wrap items-end justify-between gap-6 px-[6vw] pb-[clamp(36px,4vw,56px)]">
        <div className="max-w-[640px]">
          <div className="mb-[18px] flex items-center gap-3.5">
            <span className="font-display text-[15px] text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="block h-0.5 w-[26px] bg-brand" />
            <span className="text-xs font-bold tracking-[0.28em] text-brand">
              CATEGORY
            </span>
          </div>
          <h2
            className="m-0 mb-[18px] font-display uppercase leading-[0.98] text-[#111820]"
            style={{ fontSize: "clamp(38px,4.6vw,76px)" }}
          >
            {category.title}
          </h2>
          <p className="m-0 text-base leading-[1.8] text-[#181A20]/[0.66]">
            {category.description}
          </p>
        </div>
        <div className="flex gap-3">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollRail(dir)}
              aria-label={dir === -1 ? "Previous" : "Next"}
              className="flex h-[54px] w-[54px] items-center justify-center rounded-full border bg-transparent text-xl text-[#111820] transition-colors hover:border-brand hover:text-brand"
              style={{ borderColor: "rgba(24,26,32,0.28)" }}
            >
              {dir === -1 ? <ArrowLeftIcon size={18} color="111820" /> : <ArrowRightIcon size={18} color="111820" />}
            </button>
          ))}
        </div>
      </FwReveal>

      <div
        ref={railRef}
        className="flex gap-5 overflow-x-auto px-[6vw] pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {category.products.map((p) => (
          <article
            key={p.id}
            data-rail-card
            className="flex w-[min(400px,82vw)] flex-none flex-col overflow-hidden rounded-2xl bg-white"
            style={{
              scrollSnapAlign: "start",
              border: "1px solid rgba(24,26,32,0.08)",
              boxShadow: "0 18px 40px rgba(24,26,32,0.08)",
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "#DCD3BE" }}>
              <ImageSlot
                label={p.title}
                src={p.image ?? undefined}
                className="absolute inset-0 h-full w-full"
                sizes="(max-width: 768px) 82vw, 400px"
              />
            </div>
            <div className="flex flex-1 flex-col px-6 pb-[26px] pt-6">
              <h3 className="m-0 mb-2.5 font-display text-2xl uppercase leading-[1.12] text-[#111820]">
                {p.title}
              </h3>
              <p className="m-0 mb-[22px] text-sm leading-[1.7] text-[#181A20]/[0.62]">
                {p.description}
              </p>
              <Link
                href={productHref(p.id)}
                className="group mt-auto flex items-center justify-between pt-4 no-underline"
                style={{ borderTop: "1px solid rgba(24,26,32,0.1)" }}
              >
                <span className="text-xs font-bold tracking-[0.14em] text-brand">
                  VIEW DETAILS
                </span>
                <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#111820] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRightIcon size={16} />
                </span>
              </Link>
            </div>
          </article>
        ))}
        <div className="w-px flex-none" />
      </div>
    </section>
  );
}
