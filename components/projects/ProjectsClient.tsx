"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FwReveal } from "@/components/site/FwReveal";
import { ArrowRightIcon, GalleryIcon } from "@/components/ui/icons";
import type { ProjectGroupVM, ProjectVM } from "@/lib/api/projects";

interface Props {
  groups: ProjectGroupVM[];
  /** Every line of work across the roster, most-used first. */
  works: Array<{ id: string; title: string; count: number }>;
}

/**
 * The projects index: a sector filter bar over cards, plus a second row of
 * work-type chips.
 *
 * The two filters are deliberately independent — "which kind of site" and
 * "what did we build there" are different questions, and a visitor who came
 * looking for scoreboards wants them across every sector at once. Both are
 * client-side: the whole roster is server-rendered in one pass (see
 * `getProjects`), so narrowing never costs a request.
 */
export default function ProjectsClient({ groups, works }: Props) {
  const [sector, setSector] = useState<string>("ALL");
  const [work, setWork] = useState<string>("ALL");

  const total = useMemo(
    () => groups.reduce((n, g) => n + g.projects.length, 0),
    [groups],
  );

  const shown = useMemo(() => {
    return groups
      .filter((g) => sector === "ALL" || g.sector === sector)
      .map((g) => ({
        ...g,
        projects:
          work === "ALL"
            ? g.projects
            : g.projects.filter((p) => p.works.some((w) => w.id === work)),
      }))
      .filter((g) => g.projects.length > 0);
  }, [groups, sector, work]);

  const shownCount = shown.reduce((n, g) => n + g.projects.length, 0);

  /** How many projects a sector tab would show under the current work filter. */
  const countFor = (group: ProjectGroupVM) =>
    work === "ALL"
      ? group.projects.length
      : group.projects.filter((p) => p.works.some((w) => w.id === work)).length;

  return (
    <section className="box-border bg-cream px-[6vw] pb-[clamp(64px,8vw,110px)]">
      {/* Filter bars ----------------------------------------------------- */}
      <FwReveal
        className="sticky top-[72px] z-30 -mx-[6vw] mb-[clamp(32px,4vw,52px)] space-y-2.5 border-y bg-cream/95 px-[6vw] py-3.5 backdrop-blur"
        style={{ borderColor: "rgba(24,26,32,0.1)" }}
      >
        <div
          role="tablist"
          aria-label="Filter projects by sector"
          className="flex snap-x gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-wrap lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          <FilterChip
            label="All sectors"
            count={total}
            selected={sector === "ALL"}
            onSelect={() => setSector("ALL")}
          />
          {groups.map((g) => (
            <FilterChip
              key={g.sector}
              label={g.label}
              count={countFor(g)}
              selected={sector === g.sector}
              onSelect={() => setSector(g.sector)}
            />
          ))}
        </div>

        {works.length > 0 && (
          <div
            role="tablist"
            aria-label="Filter projects by work done"
            className="flex snap-x items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-wrap lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            <span className="flex-none pr-1 text-[10px] font-bold tracking-[0.2em] text-[#181A20]/35">
              WORK
            </span>
            <WorkChip label="Any" selected={work === "ALL"} onSelect={() => setWork("ALL")} />
            {works.map((w) => (
              <WorkChip
                key={w.id}
                label={w.title}
                count={w.count}
                selected={work === w.id}
                onSelect={() => setWork(work === w.id ? "ALL" : w.id)}
              />
            ))}
          </div>
        )}
      </FwReveal>

      {shownCount === 0 ? (
        <EmptyState onReset={() => { setSector("ALL"); setWork("ALL"); }} />
      ) : (
        <div className="flex flex-col gap-[clamp(44px,5vw,72px)]">
          {shown.map((group) => (
            <div key={group.sector} role="tabpanel" aria-label={group.label}>
              <FwReveal className="mb-[clamp(18px,2vw,28px)] flex items-baseline gap-3.5">
                <span className="block h-0.5 w-7 flex-none bg-brand" />
                <h2
                  className="m-0 font-display uppercase leading-none text-[#111820]"
                  style={{ fontSize: "clamp(20px,2.2vw,34px)" }}
                >
                  {group.label}
                </h2>
                <span className="font-mono text-[11px] tracking-[0.18em] text-[#181A20]/40">
                  {String(group.projects.length).padStart(2, "0")}
                </span>
              </FwReveal>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} highlight={work} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
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

/** Lighter than {@link FilterChip} — the work row is a refinement, not the spine. */
function WorkChip({
  label,
  count,
  selected,
  onSelect,
}: {
  label: string;
  count?: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      className={`flex flex-none snap-start items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] transition-colors ${
        selected
          ? "border-brand bg-brand/10 font-semibold text-brand"
          : "border-[rgba(24,26,32,0.14)] text-[#181A20]/55 hover:border-brand/50 hover:text-brand"
      }`}
    >
      {label}
      {count !== undefined && <span className="text-[10px] opacity-60">{count}</span>}
    </button>
  );
}

/**
 * One project card. The work tags sit on the card rather than only on the
 * detail page — they're the thing a visitor is scanning for, and hiding them
 * behind a click would make the work filter above look like it did nothing.
 */
function ProjectCard({ project, highlight }: { project: ProjectVM; highlight: string }) {
  const meta = [project.location, project.completedYear?.toString()]
    .filter(Boolean)
    .join(" · ");

  return (
    <FwReveal
      className="group/card overflow-hidden rounded-xl bg-white transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(24,26,32,0.09)]"
      style={{ border: "1px solid rgba(24,26,32,0.08)" }}
    >
      <Link href={`/projects/${project.id}`} className="flex h-full flex-col no-underline">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#DCD3BE]">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover/card:scale-105"
            />
          ) : (
            <span className="flex h-full items-center justify-center opacity-30">
              <GalleryIcon size={34} />
            </span>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-brand">
            {project.sectorLabel.toUpperCase()}
          </span>
          {project.photos.length > 0 && (
            <span className="absolute bottom-3 right-3 rounded-full bg-[#0A0E1C]/70 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-white">
              {project.photos.length} PHOTO{project.photos.length === 1 ? "" : "S"}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-4">
          <h3
            className="m-0 font-display uppercase leading-[1.12] text-[#111820]"
            style={{ fontSize: "clamp(17px,1.5vw,22px)" }}
          >
            {project.title}
          </h3>
          {meta && (
            <p className="m-0 font-mono text-[11px] tracking-[0.14em] text-[#181A20]/40">
              {meta.toUpperCase()}
            </p>
          )}
          <p className="m-0 line-clamp-2 text-[14px] leading-[1.6] text-[#181A20]/60">
            {project.description}
          </p>

          {project.works.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
              {project.works.map((w) => (
                <span
                  key={w.id}
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] ${
                    highlight === w.id
                      ? "bg-brand text-cream"
                      : "bg-[rgba(0,104,127,0.08)] text-brand"
                  }`}
                >
                  {w.title}
                </span>
              ))}
            </div>
          )}

          <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-brand">
            VIEW PROJECT <ArrowRightIcon size={12} color="00687F" />
          </span>
        </div>
      </Link>
    </FwReveal>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-[18px] py-[clamp(56px,8vw,120px)] text-center">
      <div
        className="flex h-[84px] w-[84px] items-center justify-center rounded-full"
        style={{ background: "rgba(0,104,127,0.08)", border: "1px solid rgba(0,104,127,0.2)" }}
      >
        <GalleryIcon size={34} />
      </div>
      <h3
        className="m-0 font-display uppercase text-[#111820]"
        style={{ fontSize: "clamp(24px,3vw,40px)" }}
      >
        Nothing here yet.
      </h3>
      <p className="m-0 max-w-[380px] text-[15px] text-[#181A20]/60">
        No projects match that combination — try another sector or line of work.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full border border-brand px-5 py-2.5 text-[11px] font-bold tracking-[0.14em] text-brand transition-colors hover:bg-brand hover:text-cream"
      >
        CLEAR FILTERS
      </button>
    </div>
  );
}
