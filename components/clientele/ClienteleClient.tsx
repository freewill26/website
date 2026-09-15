"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { FwReveal } from "@/components/site/FwReveal";
import type { ClientGroupVM, ClientVM } from "@/lib/api/clientele";

/**
 * The clientele wall: a sector filter bar over a grid of logo cards.
 *
 * The legacy page showed bare logos in an Elementor lightbox gallery with no
 * names and wildly varying artwork sizes. Here every logo sits in a fixed,
 * evenly-sized card so the grid reads as one wall rather than a ransom note,
 * and each card carries the client's name underneath — the piece the old page
 * never had.
 *
 * "All" keeps the sectors as labelled bands so the page still reads top to
 * bottom; picking a sector narrows to just that band.
 */
export default function ClienteleClient({ groups }: { groups: ClientGroupVM[] }) {
  const [active, setActive] = useState<string>("ALL");

  const total = useMemo(
    () => groups.reduce((n, g) => n + g.clients.length, 0),
    [groups],
  );

  const shown = active === "ALL" ? groups : groups.filter((g) => g.category === active);

  return (
    <section className="box-border bg-cream px-[6vw] pb-[clamp(64px,8vw,110px)]">
      {/* Filter bar ------------------------------------------------------ */}
      <FwReveal
        className="sticky top-[72px] z-30 -mx-[6vw] mb-[clamp(32px,4vw,52px)] border-y bg-cream/95 px-[6vw] py-3.5 backdrop-blur"
        style={{ borderColor: "rgba(24,26,32,0.1)" }}
      >
        {/* Scrolls on narrow screens, wraps once there's room — six sector
            names are just wide enough to clip at desktop widths otherwise. */}
        <div
          role="tablist"
          aria-label="Filter clientele by sector"
          className="flex snap-x gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-wrap lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          <FilterChip
            label="All"
            count={total}
            selected={active === "ALL"}
            onSelect={() => setActive("ALL")}
          />
          {groups.map((g) => (
            <FilterChip
              key={g.category}
              label={g.label}
              count={g.clients.length}
              selected={active === g.category}
              onSelect={() => setActive(g.category)}
            />
          ))}
        </div>
      </FwReveal>

      {/* Sector bands ---------------------------------------------------- */}
      <div className="flex flex-col gap-[clamp(44px,5vw,72px)]">
        {shown.map((group) => (
          <div key={group.category} role="tabpanel" aria-label={group.label}>
            <FwReveal className="mb-[clamp(18px,2vw,28px)] flex items-baseline gap-3.5">
              <span className="block h-0.5 w-7 flex-none bg-brand" />
              <h2
                className="m-0 font-display uppercase leading-none text-[#111820]"
                style={{ fontSize: "clamp(20px,2.2vw,34px)" }}
              >
                {group.label}
              </h2>
              <span className="font-mono text-[11px] tracking-[0.18em] text-[#181A20]/40">
                {String(group.clients.length).padStart(2, "0")}
              </span>
            </FwReveal>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {group.clients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FilterChip({
  label,
  count,
  selected,
  onSelect,
}: {
  label: string;
  count: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      className={`flex flex-none snap-start items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-[11px] font-bold tracking-[0.14em] transition-colors ${
        selected
          ? "border-brand bg-brand text-cream"
          : "border-[rgba(24,26,32,0.18)] bg-transparent text-[#181A20]/70 hover:border-brand hover:text-brand"
      }`}
    >
      {label.toUpperCase()}
      <span className={selected ? "text-cream/60" : "text-[#181A20]/35"}>{count}</span>
    </button>
  );
}

/**
 * One logo card. The logo is contained rather than cropped so wordmarks and
 * roundels both sit correctly.
 *
 * Only partly desaturated at rest, unlike the home page's brand ribbon: this
 * page exists to be recognised, and a wall of 73 fully grey marks reads as
 * dead weight. Enough is taken out to hold the grid together, and hover
 * restores the mark in full.
 */
function ClientCard({ client }: { client: ClientVM }) {
  const logo = (
    <>
      <div className="flex h-[clamp(84px,9vw,116px)] items-center justify-center px-4">
        <Image
          src={client.logo}
          alt={client.logoAlt}
          width={200}
          height={116}
          // The logos are all shapes; CSS drives the box, so both axes are
          // handed back to `auto` to keep Next from warning about a modified
          // aspect ratio.
          style={{ width: "auto", height: "auto" }}
          className="max-h-full w-auto object-contain opacity-90 grayscale-[0.55] transition-[filter,opacity] duration-500 group-hover/card:opacity-100 group-hover/card:grayscale-0"
        />
      </div>
      <div
        className="mt-auto border-t px-3 py-2.5 text-center text-[11px] leading-[1.4] text-[#181A20]/55 transition-colors group-hover/card:text-[#181A20]/80"
        style={{ borderColor: "rgba(24,26,32,0.07)" }}
      >
        {/* A handful of legacy logos are still unidentified; the card stays in
            the wall but says so plainly rather than showing a filename. */}
        {client.name ?? <span className="italic text-[#181A20]/30">Unnamed</span>}
      </div>
    </>
  );

  const shell =
    "group/card flex h-full flex-col overflow-hidden rounded-xl bg-white transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(24,26,32,0.09)]";
  const border = { border: "1px solid rgba(24,26,32,0.08)" };

  if (!client.link) {
    return (
      <FwReveal className={shell} style={border}>
        {logo}
      </FwReveal>
    );
  }

  return (
    <FwReveal className={shell} style={border}>
      <a
        href={client.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${client.name ?? "Client"} (opens in a new tab)`}
        className="flex h-full flex-col no-underline"
      >
        {logo}
      </a>
    </FwReveal>
  );
}
