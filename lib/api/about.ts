/**
 * About-page data layer — mirrors `lib/api/home.ts`.
 *
 * `getAboutPageContent` reads the CMS "about" page (slug `about`) and maps each
 * section's fields into the small view model its component consumes; every
 * field falls back independently to {@link ABOUT_CONTENT_DEFAULTS} so a missing
 * section/field (or a down API) never blanks the page. `getTeam` and
 * `getAboutBrands` fetch the two collection-backed sections.
 */
import { safeGet, safeList } from "./http";
import { API_ENDPOINTS, API_ROUTES } from "@/utils/apis";
import { ABOUT_LIMITS } from "@/utils/constants";
import { sanitizeRichText, sanitizeInlineRichText } from "@/utils/sanitizeHtml";
import {
  ABOUT_STATS,
  MANIFESTO_WORDS,
  BRAND_PARTNERS,
} from "@/lib/aboutContent";
import type { ApiBrand, ApiField, ApiPage, ApiTeamMember } from "./types";

/* ------------------------------------------------------------------ *
 * View models (the props each About* component receives)
 * ------------------------------------------------------------------ */

export interface AboutStatVM {
  target: number;
  suffix: string;
  label: string;
}

/** One word of the "Who we are" manifesto, with its CMS-authored colour. */
export interface ManifestoWordVM {
  text: string;
  color: string;
}

/** One alternating story row (About Section 1/2/3). */
export interface AboutStoryVM {
  image: string;
  /** Headline text; a `\n` splits it into stacked lines. */
  headline: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
}

export interface AboutPageContent {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string | null;
  };
  hero: {
    /** Eyebrow line above the wordmark. */
    title: string;
    /** Rich-text headline (sanitized); `<strong>` renders in the brand gradient. */
    headlineHtml: string;
    description: string;
    /** Full-bleed background photo behind the navy gradients. */
    backgroundImage: string;
  };
  /** "Who we are" manifesto — parsed into coloured words for the scroll reveal. */
  whoWeAre: { words: ManifestoWordVM[] };
  stats: AboutStatVM[];
  about1: AboutStoryVM;
  about2: AboutStoryVM;
  about3: AboutStoryVM;
  testimonial: { html: string; author: string; occupation: string };
}

export interface FounderVM {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string | null;
  quote: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export interface TeamPersonVM {
  id: string;
  name: string;
  role: string;
  image: string | null;
}

export interface AboutTeamVM {
  founders: FounderVM[];
  people: TeamPersonVM[];
}

/* ------------------------------------------------------------------ *
 * Defaults (the current hard-coded About copy, used when the CMS is empty)
 * ------------------------------------------------------------------ */

const DEFAULT_TESTIMONIAL_HTML =
  "Growth means nothing if it doesn't raise the standard " +
  'for the <span style="color:#5FD0E0">athletes</span> who play on what we build.';

const ABOUT_CONTENT_DEFAULTS: AboutPageContent = {
  seo: {
    title: "About Freewill · Sports Infrastructure Since 1990",
    description:
      "The most innovative sports infrastructure company in India — building the ground a billion people play on since 1990.",
    ogTitle: "About Freewill · Sports Infrastructure Since 1990",
    ogDescription:
      "The most innovative sports infrastructure company in India — building the ground a billion people play on since 1990.",
    ogImage: null,
  },
  hero: {
    title: "Est. 1990 · Pune, India",
    headlineHtml: "Welcome to <strong>Freewill</strong>",
    description:
      "The Most Innovative Sports Infrastructure Company in India — building the ground a billion people play on.",
    backgroundImage: "/assets/splash-stadium.jpg",
  },
  whoWeAre: { words: MANIFESTO_WORDS.map((w) => ({ text: w.text, color: w.color })) },
  stats: ABOUT_STATS.map((s) => ({ target: s.target, suffix: s.suffix, label: s.label })),
  about1: {
    image: "/assets/about-story-surface.png",
    headline: "The Ground\nIndia Plays On.",
    description:
      "From school multi-sport halls to championship arenas, Freewill supplies and installs indoor vinyl, synthetic grass, PU courts and athletics tracks — all laid by our own certified crews.",
    buttonLabel: "View Products →",
    buttonLink: "/products",
  },
  about2: {
    image: "/assets/about-story-install.png",
    headline: "Built to Last,\nBuilt to Perform.",
    description:
      "Every surface follows a rigorous process — sub-floor assessment, preparation, surface lay and final line marking — backed by 35 years of expertise and trained to international standards.",
    buttonLabel: "Get a Quote →",
    buttonLink: "/#fw-contact",
  },
  about3: {
    image: "/assets/about-story-innovation.png",
    headline: "Pioneer of\nInnovation.",
    description:
      "Today Freewill is the pioneer in optimising and introducing sports infrastructure with innovative technology — dynamic marking, acoustic flooring, synchronised clocks and smart scoreboards.",
    buttonLabel: "Talk to Us →",
    buttonLink: "/#fw-contact",
  },
  testimonial: {
    html: DEFAULT_TESTIMONIAL_HTML,
    author: "Rajesh Kharabanda",
    occupation: "Chairman, Freewill Group",
  },
};

/** Founders shown when the team endpoint returns nothing. */
const DEFAULT_FOUNDERS: FounderVM[] = [
  {
    id: "default-rajesh-kharabanda",
    name: "Rajesh Kharabanda",
    role: "Chairman, Freewill Group",
    bio: "With decades of strategic leadership in sports and business, Rajesh provides the vision that has made Freewill a trusted name across every tier of Indian sport.",
    image: "/assets/team/rajesh-kharabanda.png",
    quote: "Growth means nothing if it doesn't raise the standard for the athletes who play on what we build.",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "default-liyakat-shaikh",
    name: "Liyakat Shaikh",
    role: "Managing Director",
    bio: "A pioneer in Indian sports infrastructure, Liyakat has led Freewill's growth from a sports equipment supplier into India's most innovative sports infrastructure company over 35 years.",
    image: "/assets/team/liyakat-shaikh.png",
    quote: "Every court we've built carries the same promise we started with in 1990 — bring the world's best to Indian sport.",
    linkedin: "#",
    twitter: "#",
  },
];

const DEFAULT_PEOPLE: TeamPersonVM[] = [
  { id: "default-sales-lead", name: "Sales Lead", role: "Business Development", image: "/assets/team/sales-lead.png" },
  { id: "default-technical-head", name: "Technical Head", role: "Installation & Quality", image: "/assets/team/technical-head.png" },
  { id: "default-design-lead", name: "Design Lead", role: "Court & Venue Design", image: "/assets/team/design-lead.png" },
  { id: "default-project-manager", name: "Project Manager", role: "Operations", image: "/assets/team/project-manager.png" },
];

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

const DEFAULT_WORD_COLOR = "#111820";

/**
 * Parses the "who we are" rich-text HTML (already sanitized) into a flat list of
 * `{ text, colour }` words for the scroll-reveal animation. Each top-level
 * `<span style="color:…">` colours the words inside it; bare text takes the
 * default ink colour. The `color` capture stops at `;`/quotes, so no extra CSS
 * can ride along.
 */
function parseColoredWords(html: string): ManifestoWordVM[] {
  const words: ManifestoWordVM[] = [];
  const token = /<span\b([^>]*)>([\s\S]*?)<\/span>|([^<]+)/gi;
  let m: RegExpExecArray | null;
  while ((m = token.exec(html)) !== null) {
    const isSpan = m[3] === undefined;
    const text = (isSpan ? m[2] : m[3] ?? "").replace(/<[^>]+>/g, "");
    let color = DEFAULT_WORD_COLOR;
    if (isSpan) {
      const cm = /color\s*:\s*([^;"']+)/i.exec(m[1] ?? "");
      if (cm) color = cm[1].trim();
    }
    for (const w of text.split(/\s+/)) {
      if (w) words.push({ text: w, color });
    }
  }
  return words;
}

/** Reads a field's raw value by key from a section, or `undefined` if absent/empty. */
function fieldValue(fields: ApiField[] | undefined, key: string): string | undefined {
  const value = fields?.find((f) => f.key === key)?.value;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/**
 * Reads an image field's URL. The CMS stores image values two ways: a plain URL
 * string (as seeded) or a `{ url, alt }` object (as produced when an editor
 * uploads through the CMS). This reads either, so uploaded images aren't
 * silently dropped.
 */
function fieldImage(fields: ApiField[] | undefined, key: string): string | undefined {
  const value = fields?.find((f) => f.key === key)?.value;
  if (typeof value === "string" && value.length > 0) return value;
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const url = (value as { url?: unknown }).url;
    if (typeof url === "string" && url.length > 0) return url;
  }
  return undefined;
}

/** Splits a stat value like `"1000+"` into its animated number and trailing suffix. */
function parseStat(value: string | undefined, fallback: AboutStatVM): Pick<AboutStatVM, "target" | "suffix"> {
  const match = value?.match(/^(\d+)(.*)$/);
  if (!match) return { target: fallback.target, suffix: fallback.suffix };
  return { target: Number(match[1]), suffix: match[2].trim() };
}

/** Reads one About Section (image/headline/description/button) with fallbacks. */
function readStory(fields: ApiField[] | undefined, d: AboutStoryVM): AboutStoryVM {
  return {
    image: fieldImage(fields, "image") ?? d.image,
    headline: fieldValue(fields, "headline") ?? d.headline,
    description: fieldValue(fields, "description") ?? d.description,
    buttonLabel: fieldValue(fields, "button_label") ?? d.buttonLabel,
    buttonLink: fieldValue(fields, "button_link") ?? d.buttonLink,
  };
}

/* ------------------------------------------------------------------ *
 * Fetchers
 * ------------------------------------------------------------------ */

/**
 * About CMS page (`slug: "about"`) → every static section's copy, images and
 * SEO metadata, each field degrading independently to
 * {@link ABOUT_CONTENT_DEFAULTS}.
 */
export async function getAboutPageContent(): Promise<AboutPageContent> {
  const page = await safeGet<ApiPage | null>(API_ROUTES.page("about"), null);
  const section = (key: string) => page?.sections?.find((s) => s.key === key)?.fields;
  const hero = section("hero_section");
  const whoWeAre = section("who_we_are_section");
  const numbers = section("numbers_section");
  const about1 = section("about_section_1");
  const about2 = section("about_section_2");
  const about3 = section("about_section_3");
  const testimonial = section("testimonial_section");
  const d = ABOUT_CONTENT_DEFAULTS;

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
      headlineHtml: sanitizeInlineRichText(
        fieldValue(hero, "headline") ?? d.hero.headlineHtml,
      ),
      description: fieldValue(hero, "description") ?? d.hero.description,
      backgroundImage: fieldImage(hero, "background_image") ?? d.hero.backgroundImage,
    },
    whoWeAre: {
      words: (() => {
        const raw = fieldValue(whoWeAre, "headline");
        return raw ? parseColoredWords(sanitizeRichText(raw)) : d.whoWeAre.words;
      })(),
    },
    stats: d.stats.map((fallback, i) => ({
      ...parseStat(fieldValue(numbers, `stat_${i + 1}_value`), fallback),
      label: fieldValue(numbers, `stat_${i + 1}_label`) ?? fallback.label,
    })),
    about1: readStory(about1, d.about1),
    about2: readStory(about2, d.about2),
    about3: readStory(about3, d.about3),
    testimonial: {
      html: sanitizeRichText(fieldValue(testimonial, "testimonial") ?? d.testimonial.html),
      author: fieldValue(testimonial, "author") ?? d.testimonial.author,
      occupation: fieldValue(testimonial, "occupation") ?? d.testimonial.occupation,
    },
  };
}

/**
 * Team → the founders (large cards) and wider team (compact grid), split by the
 * record's `type`. Falls back to the design's placeholder people when the
 * endpoint returns nothing.
 */
export async function getTeam(): Promise<AboutTeamVM> {
  const members = await safeList<ApiTeamMember>(API_ENDPOINTS.teamMembers, {
    searchParams: { limit: ABOUT_LIMITS.team },
  });
  if (members.length === 0) {
    return { founders: DEFAULT_FOUNDERS, people: DEFAULT_PEOPLE };
  }

  const founders: FounderVM[] = members
    .filter((m) => m.type === "FOUNDER")
    .map((m) => ({
      id: m.id,
      name: m.name,
      role: m.occupation,
      bio: m.description ?? "",
      image: m.image || null,
      quote: m.testimonial || null,
      linkedin: m.linkedinLink,
      twitter: m.twitterLink,
    }));

  const people: TeamPersonVM[] = members
    .filter((m) => m.type === "TEAM_MEMBER")
    .map((m) => ({
      id: m.id,
      name: m.name,
      role: m.occupation,
      image: m.image || null,
    }));

  return {
    founders: founders.length ? founders : DEFAULT_FOUNDERS,
    people: people.length ? people : DEFAULT_PEOPLE,
  };
}

/** The two brand rows: partner organisations and the product brands we carry. */
export interface AboutBrandsVM {
  /** Federations/institutions → "Trusted by India's Leading Organizations". */
  organisations: string[];
  /** Product brands (Taraflex®, Gerflor, …) → the ✦ marquee ribbon. */
  brands: string[];
}

const DEFAULT_ABOUT_BRANDS: AboutBrandsVM = {
  organisations: [...BRAND_PARTNERS],
  brands: ["Taraflex®", "Gerflor", "Connor Sports", "Sport Court", "Spieth", "Junckers"],
};

/**
 * Brands → the two About marquees, split by the record's `category`
 * (ORGANISATION vs BRAND). Each row falls back to the design's static list when
 * the API returns nothing for it.
 */
export async function getAboutBrands(): Promise<AboutBrandsVM> {
  const records = await safeList<ApiBrand>(API_ENDPOINTS.brands, {
    searchParams: { limit: ABOUT_LIMITS.brands },
  });
  if (records.length === 0) return DEFAULT_ABOUT_BRANDS;

  const organisations = records
    .filter((b) => b.category === "ORGANISATION")
    .map((b) => b.title);
  const brands = records.filter((b) => b.category === "BRAND").map((b) => b.title);

  return {
    organisations: organisations.length ? organisations : DEFAULT_ABOUT_BRANDS.organisations,
    brands: brands.length ? brands : DEFAULT_ABOUT_BRANDS.brands,
  };
}
