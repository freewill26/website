/**
 * Projects data layer, mirroring `lib/api/clientele.ts`.
 *
 * `getProjectsPageContent` reads the CMS "projects" page (slug `projects`) for
 * the hero copy + SEO. The roster itself is `Project` records off `/projects`,
 * fetched in one pass — each already carries its tagged photo set, so the
 * index's covers and a detail page's mosaic come from the same shape.
 */
import { safeList, safeGet } from "./http";
import { API_ENDPOINTS, API_ROUTES } from "@/utils/apis";
import { PROJECT_LIMITS } from "@/utils/constants";
import type { ApiField, ApiPage, ApiProject, ApiProjectSector } from "./types";

/* ------------------------------------------------------------------ *
 * View models
 * ------------------------------------------------------------------ */

export interface ProjectsPageContent {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string | null;
  };
  hero: {
    title: string;
    /** `\n`-delimited — one stacked heading line per entry. */
    headline: string;
    description: string;
  };
}

/** One tagged photograph, ready to render. */
export interface ProjectPhotoVM {
  id: string;
  src: string;
  alt: string;
  /** Lines of work this photo shows. Empty when the editor left it untagged. */
  works: { id: string; title: string }[];
}

export interface ProjectVM {
  id: string;
  title: string;
  description: string;
  broadDescription: string | null;
  location: string | null;
  client: string | null;
  completedYear: number | null;
  sector: ApiProjectSector;
  sectorLabel: string;
  /** Cover image — the explicit one, else the first photo. Null when neither. */
  cover: string | null;
  coverAlt: string;
  /** Every line of work done on this site, from the union of its photo tags. */
  works: { id: string; title: string }[];
  photos: ProjectPhotoVM[];
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string | null;
  };
}

export interface ProjectGroupVM {
  sector: ApiProjectSector;
  /** Human label for the filter tab and the section heading. */
  label: string;
  projects: ProjectVM[];
}

/**
 * Display labels and running order for the sectors. Order here is the order
 * they appear on the page.
 */
export const PROJECT_SECTOR_LABELS: Array<{
  sector: ApiProjectSector;
  label: string;
}> = [
  { sector: "SPORTS_STADIUM", label: "Sports Stadiums" },
  { sector: "SCHOOL", label: "Schools & Academies" },
  { sector: "BUILDER", label: "Builders & Developers" },
  { sector: "CORPORATE", label: "Corporate" },
  { sector: "GOVERNMENT", label: "Government" },
  { sector: "HOSPITALITY", label: "Hotels, Resorts & Clubs" },
];

const SECTOR_LABEL = new Map(
  PROJECT_SECTOR_LABELS.map(({ sector, label }) => [sector, label]),
);

const PROJECTS_CONTENT_DEFAULTS: ProjectsPageContent = {
  seo: {
    title: "Projects · Freewill",
    description:
      "Schools, stadiums and residential developments across India — the courts, floors, seating and scoreboards Freewill has built, photographed on site.",
    ogTitle: "Projects · Freewill",
    ogDescription:
      "The grounds we've finished. Flooring, seating systems and scoreboards, installed and photographed.",
    ogImage: null,
  },
  hero: {
    title: "Our Projects",
    headline: "The ground\nalready played on.",
    description:
      "Every photograph here is a site we handed over — school halls, stadium bowls and residential clubhouses. Each one is tagged with the work we did there, so you can look up flooring, seating or scoreboards on their own.",
  },
};

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function fieldValue(fields: ApiField[] | undefined, key: string): string | undefined {
  const value = fields?.find((f) => f.key === key)?.value;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function toVM(row: ApiProject): ProjectVM {
  const photos: ProjectPhotoVM[] = (row.images ?? [])
    .filter((img) => Boolean(img.url))
    .map((img) => ({
      id: img.id,
      src: img.url,
      alt: img.alt?.trim() || row.title,
      works: img.categories ?? [],
    }));

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    broadDescription: row.broadDescription?.trim() || null,
    location: row.location?.trim() || null,
    client: row.client?.trim() || null,
    completedYear: row.completedYear ?? null,
    sector: row.sector,
    sectorLabel: SECTOR_LABEL.get(row.sector) ?? row.sector,
    cover: row.image || photos[0]?.src || null,
    coverAlt: row.imageAlt?.trim() || row.title,
    works: row.categories ?? [],
    photos,
    seo: {
      title: row.seoTitle || `${row.title} · Freewill`,
      description: row.seoDescription || row.description,
      ogTitle: row.ogTitle || row.title,
      ogDescription: row.ogDescription || row.description,
      ogImage: row.ogImage || row.image || photos[0]?.src || null,
    },
  };
}

/* ------------------------------------------------------------------ *
 * Fetchers
 * ------------------------------------------------------------------ */

/** Projects CMS page (`slug: "projects"`) → hero copy + SEO metadata. */
export async function getProjectsPageContent(): Promise<ProjectsPageContent> {
  const page = await safeGet<ApiPage | null>(API_ROUTES.page("projects"), null);
  const hero = page?.sections?.find((s) => s.key === "hero_section")?.fields;
  const d = PROJECTS_CONTENT_DEFAULTS;

  return {
    seo: {
      title: page?.seoTitle || d.seo.title,
      description: page?.seoDescription || d.seo.description,
      ogTitle: page?.ogTitle || d.seo.ogTitle,
      ogDescription: page?.ogDescription || d.seo.ogDescription,
      ogImage: page?.ogImage || d.seo.ogImage,
    },
    hero: {
      title: fieldValue(hero, "title") ?? d.hero.title,
      headline: fieldValue(hero, "headline") ?? d.hero.headline,
      description: fieldValue(hero, "description") ?? d.hero.description,
    },
  };
}

/** Every published project, in the order set in the CMS. */
export async function getProjects(): Promise<ProjectVM[]> {
  const records = await safeList<ApiProject>(API_ENDPOINTS.projects, {
    searchParams: { limit: PROJECT_LIMITS.list, isActive: true },
  });
  return records.map(toVM);
}

/**
 * The roster partitioned into sectors in display order. Sectors with no
 * published projects are dropped so the page never renders an empty tab.
 */
export function groupBySector(projects: ProjectVM[]): ProjectGroupVM[] {
  return PROJECT_SECTOR_LABELS.map(({ sector, label }) => ({
    sector,
    label,
    projects: projects.filter((p) => p.sector === sector),
  })).filter((g) => g.projects.length > 0);
}

/**
 * Every line of work represented across the roster, with how many projects
 * show it — the "we did flooring on 24 sites" chips on the index.
 */
export function workTotals(
  projects: ProjectVM[],
): Array<{ id: string; title: string; count: number }> {
  const tally = new Map<string, { id: string; title: string; count: number }>();
  for (const project of projects) {
    for (const work of project.works) {
      const row = tally.get(work.id);
      if (row) row.count += 1;
      else tally.set(work.id, { ...work, count: 1 });
    }
  }
  return Array.from(tally.values()).sort((a, b) => b.count - a.count);
}

/** One project by id, or null when it isn't published. */
export async function getProject(id: string): Promise<ProjectVM | null> {
  const row = await safeGet<ApiProject | null>(API_ROUTES.project(id), null);
  if (!row || row.isActive === false) return null;
  return toVM(row);
}

/**
 * A short rail of other projects for the foot of a detail page — same sector
 * first, then anything else, so a stadium suggests stadiums where it can.
 */
export async function getRelatedProjects(
  id: string,
  sector: ApiProjectSector,
): Promise<ProjectVM[]> {
  const all = (await getProjects()).filter((p) => p.id !== id);
  const sameSector = all.filter((p) => p.sector === sector);
  const rest = all.filter((p) => p.sector !== sector);
  return [...sameSector, ...rest].slice(0, PROJECT_LIMITS.related);
}
