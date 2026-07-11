/**
 * Home-page data layer.
 *
 * Each function fetches one section from the service API and maps the raw
 * response into the small, presentational "view model" its component consumes.
 * Keeping the mapping here means the components stay dumb and the API contract
 * lives in one place. Every fetch degrades to an empty result on failure so the
 * server-rendered page always responds.
 */
import { safeGet, safeList } from "./http";
import { API_ENDPOINTS, API_ROUTES } from "@/utils/apis";
import { HOME_LIMITS } from "@/utils/constants";
import type {
  ApiCategory,
  ApiEvent,
  ApiField,
  ApiGlobalReach,
  ApiMilestone,
  ApiNews,
  ApiPage,
  ApiProduct,
  ApiTestimonial,
} from "./types";

/* ------------------------------------------------------------------ *
 * View models (the props each Home* component receives)
 * ------------------------------------------------------------------ */

export interface CategoryTile {
  id: string;
  no: string;
  kicker: string;
  title: string;
  description: string;
  image: string | null;
  imageAlt: string;
}

export interface MilestoneVM {
  id: string;
  tag: string;
  year: string;
  title: string;
  body: string;
  image: string | null;
  imageAlt: string;
}

export interface EventMetric {
  v: string;
  k: string;
}

export interface EventDetail {
  cat: string;
  about: string;
  role: string;
  supplied: string[];
  metrics: EventMetric[];
}

export interface EventVM {
  id: string;
  idx: string;
  year: string;
  title: string;
  loc: string;
  img: string;
  detail: EventDetail;
}

export interface RegionVM {
  id: string;
  name: string;
  role: string;
}

export interface GalleryImageVM {
  id: string;
  img: string;
  label: string;
}

export interface TestimonialVM {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string | null;
}

export interface NewsCardVM {
  id: string;
  cat: string;
  date: string;
  title: string;
  excerpt: string;
  image: string | null;
}

export interface HomeStatVM {
  n: number;
  suffix: string;
  label: string;
}

export interface HomePageContent {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string | null;
  };
  hero: {
    description: string;
    button1Label: string;
    button1Link: string;
    button2Label: string;
    button2Link: string;
  };
  heroMeta1: { headline: string; description: string };
  heroMeta2: { headline: string; description: string };
  stats: HomeStatVM[];
  about: {
    headline: string;
    paragraph1: string;
    paragraph2: string;
    buttonLabel: string;
    buttonLink: string;
    image1: string;
    image2: string;
  };
  showreel: { youtubeId: string };
  products: { headline: string; paragraph: string };
  timeline: { headline: string };
  references: { headline: string; description: string };
  globe: { headline: string; description: string };
  gallery: { headline: string; paragraph: string };
}

/** Fallback copy used whenever the CMS page/section/field is missing. */
const HOME_CONTENT_DEFAULTS: HomePageContent = {
  seo: {
    title: "Freewill · Sports Infrastructure Since 1990",
    description:
      "Taraflex® vinyl sports flooring — competition surfaces specified by FIBA, FIVB and BWF. The ground India plays on.",
    ogTitle: "Freewill · Sports Infrastructure Since 1990",
    ogDescription:
      "Taraflex® vinyl sports flooring — competition surfaces specified by FIBA, FIVB and BWF. The ground India plays on.",
    ogImage: null,
  },
  hero: {
    description:
      "World-class flooring, seating and equipment — behind every National Games since 1992. The ground India plays on.",
    button1Label: "EXPLORE PRODUCTS",
    button1Link: "/products",
    button2Label: "TALK TO US",
    button2Link: "/#fw-contact",
  },
  heroMeta1: {
    headline: "100,000+ seats installed.",
    description: "Every National Games since 1992 has been played on ground Freewill built.",
  },
  heroMeta2: {
    headline: "From court to podium.",
    description: "Surfaces, seating and equipment certified by FIBA, FIVB and FIG.",
  },
  stats: [
    { n: 33, suffix: "+", label: "Years building India's sports infrastructure" },
    { n: 100, suffix: "K+", label: "Stadium seats manufactured & installed" },
    { n: 28, suffix: "", label: "National & international games served" },
    { n: 12, suffix: "", label: "Exclusive global brand partnerships" },
  ],
  about: {
    headline: "World-class grounds, built in India.",
    paragraph1:
      "For 33 years, Freewill has built the ground India plays on — sports flooring, stadium seating and competition equipment for the country's biggest stages, from the National Games to the Hockey World Cup.",
    paragraph2:
      "As the exclusive Indian partner of Gerflor, Connor Sports, Sport Court and Spieth Gymnastics, we bring Olympic-grade systems to every court, hall and arena we touch.",
    buttonLabel: "MORE ABOUT US",
    buttonLink: "/about",
    image1: "/assets/home-about-arena.png",
    image2: "/assets/home-about-install.png",
  },
  showreel: { youtubeId: "StguKQPzkEs" },
  products: {
    headline: "Every surface. Every category.",
    paragraph:
      "From Olympic-grade flooring to stadium seating and field equipment — one partner for the entire arena.",
  },
  timeline: { headline: "Three decades on the ground." },
  references: {
    headline: "Built for India's biggest stages.",
    description:
      "From the National Games to World Cups — three decades of surfaces, seating and equipment trusted at the events that matter most.",
  },
  globe: {
    headline: "Built here. Sourced worldwide.",
    description:
      "From our base in Pune, Freewill delivers and installs across the subcontinent and beyond — partnering with the world's leading manufacturers to bring Olympic-grade systems to every arena.",
  },
  gallery: {
    headline: "The gallery.",
    paragraph: "Courts, halls and arenas across India — captured the day they opened to play.",
  },
};

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

const pad2 = (n: number) => String(n + 1).padStart(2, "0");

/** "12 MAY 2026" style label used across the editorial cards. */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-GB", { month: "short", year: "numeric" })
    .toUpperCase();
}

/** Reads a field's raw value by key from a section, or `undefined` if absent/empty. */
function fieldValue(fields: ApiField[] | undefined, key: string): string | undefined {
  const value = fields?.find((f) => f.key === key)?.value;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/** Splits a count-box value like `"100K+"` into its animated number and trailing suffix. */
function parseCount(value: string | undefined, fallback: HomeStatVM): Pick<HomeStatVM, "n" | "suffix"> {
  const match = value?.match(/^(\d+)(.*)$/);
  if (!match) return { n: fallback.n, suffix: fallback.suffix };
  return { n: Number(match[1]), suffix: match[2] };
}

/** Pulls the `v=` video id out of a YouTube URL, or `undefined` if it doesn't parse. */
function extractYouTubeId(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).searchParams.get("v") ?? undefined;
  } catch {
    return undefined;
  }
}

/**
 * Home CMS page (`slug: "home"`) → every static section's copy, images and SEO
 * metadata. Every field falls back independently to {@link HOME_CONTENT_DEFAULTS}
 * so a missing section/field (or a down API) never blanks the page.
 */
export async function getHomePageContent(): Promise<HomePageContent> {
  const page = await safeGet<ApiPage | null>(API_ROUTES.page("home"), null);
  const section = (key: string) => page?.sections?.find((s) => s.key === key)?.fields;
  const hero = section("hero_section_card");
  const heroMeta1 = section("hero_meta_card_1");
  const heroMeta2 = section("hero_meta_card_2");
  const counts = section("counts_section");
  const about = section("about_section");
  const video = section("video_section");
  const products = section("category_section");
  const timeline = section("milestone_section");
  const references = section("events_section");
  const globe = section("global_reach_section");
  const gallery = section("gallery_section");
  const d = HOME_CONTENT_DEFAULTS;

  return {
    seo: {
      title: page?.seoTitle || d.seo.title,
      description: page?.seoDescription || d.seo.description,
      ogTitle: page?.ogTitle || d.seo.ogTitle,
      ogDescription: page?.ogDescription || d.seo.ogDescription,
      ogImage: page?.ogImage || d.seo.ogImage,
    },
    hero: {
      description: fieldValue(hero, "description") ?? d.hero.description,
      button1Label: fieldValue(hero, "button_1_label")?.toUpperCase() ?? d.hero.button1Label,
      button1Link: fieldValue(hero, "button_1_link") ?? d.hero.button1Link,
      button2Label: fieldValue(hero, "button_2_label")?.toUpperCase() ?? d.hero.button2Label,
      button2Link: fieldValue(hero, "button_2_link") ?? d.hero.button2Link,
    },
    heroMeta1: {
      headline: fieldValue(heroMeta1, "headline") ?? d.heroMeta1.headline,
      description: fieldValue(heroMeta1, "description") ?? d.heroMeta1.description,
    },
    heroMeta2: {
      headline: fieldValue(heroMeta2, "headline") ?? d.heroMeta2.headline,
      description: fieldValue(heroMeta2, "description") ?? d.heroMeta2.description,
    },
    stats: d.stats.map((fallback, i) => ({
      ...parseCount(fieldValue(counts, `count_${i + 1}_number`), fallback),
      label: fieldValue(counts, `count_${i + 1}_description`) ?? fallback.label,
    })),
    about: {
      headline: fieldValue(about, "headline") ?? d.about.headline,
      paragraph1: fieldValue(about, "paragraph_1") ?? d.about.paragraph1,
      paragraph2: fieldValue(about, "paragraph_2") ?? d.about.paragraph2,
      buttonLabel: fieldValue(about, "button_label")?.toUpperCase() ?? d.about.buttonLabel,
      buttonLink: fieldValue(about, "button_link") ?? d.about.buttonLink,
      image1: fieldValue(about, "image_1") ?? d.about.image1,
      image2: fieldValue(about, "image_2") ?? d.about.image2,
    },
    showreel: {
      youtubeId: extractYouTubeId(fieldValue(video, "youtube_url")) ?? d.showreel.youtubeId,
    },
    products: {
      headline: fieldValue(products, "headline") ?? d.products.headline,
      paragraph: fieldValue(products, "paragraph") ?? d.products.paragraph,
    },
    timeline: {
      headline: fieldValue(timeline, "headline") ?? d.timeline.headline,
    },
    references: {
      headline: fieldValue(references, "headline") ?? d.references.headline,
      description: fieldValue(references, "description") ?? d.references.description,
    },
    globe: {
      headline: fieldValue(globe, "headline") ?? d.globe.headline,
      description: fieldValue(globe, "description") ?? d.globe.description,
    },
    gallery: {
      headline: fieldValue(gallery, "headline") ?? d.gallery.headline,
      paragraph: fieldValue(gallery, "paragraph") ?? d.gallery.paragraph,
    },
  };
}

/* ------------------------------------------------------------------ *
 * Section fetchers
 * ------------------------------------------------------------------ */

/** Categories → "What we build" bento (the grid renders the first 5). */
export async function getCategories(
  limit = HOME_LIMITS.categories,
): Promise<CategoryTile[]> {
  const categories = await safeList<ApiCategory>(API_ENDPOINTS.categories, {
    searchParams: { limit },
  });
  return categories.map((c, i) => ({
    id: c.id,
    no: pad2(i),
    kicker: c.isFeatured ? "FEATURED" : "CATEGORY",
    title: c.title,
    description: c.description,
    image: c.image,
    imageAlt: c.imageAlt ?? c.title,
  }));
}

/** Milestones → horizontal scroll timeline (already ordered by the API). */
export async function getMilestones(): Promise<MilestoneVM[]> {
  const milestones = await safeList<ApiMilestone>(API_ENDPOINTS.milestones, {
    searchParams: { limit: HOME_LIMITS.milestones },
  });
  return milestones.map((m, i) => ({
    id: m.id,
    tag: m.tag ?? `${pad2(i)} — MILESTONE`,
    year: String(m.year),
    title: m.title,
    body: m.description,
    image: m.imageUrl || null,
    imageAlt: m.imageAlt ?? m.title,
  }));
}

/** Events → "References & Events" index list + case-study overlay. */
export async function getEvents(): Promise<EventVM[]> {
  const events = await safeList<ApiEvent>(API_ENDPOINTS.events, {
    searchParams: { limit: HOME_LIMITS.events },
  });
  return events.map((e, i) => ({
    id: e.id,
    idx: pad2(i),
    year: String(e.year),
    title: e.title,
    loc: e.location,
    img: e.bannerImage,
    detail: {
      cat: (e.tags[0] ?? "Event").toUpperCase(),
      about: e.broadDescription,
      role: e.ourRole,
      supplied: e.tags,
      // The API carries no numeric metrics, so the overlay derives a couple of
      // honest facts from the record and hides the block when there's nothing.
      metrics: [
        { v: e.year ? String(e.year) : "", k: "Year" },
        ...(e.location ? [{ v: e.location, k: "Location" }] : []),
      ].filter((m) => m.v),
    },
  }));
}

/** Global Reach → the region list beside the 3D globe. */
export async function getRegions(): Promise<RegionVM[]> {
  const reach = await safeList<ApiGlobalReach>(API_ENDPOINTS.globalReach, {
    searchParams: { limit: HOME_LIMITS.regions },
  });
  return reach.map((r) => ({ id: r.id, name: r.country, role: r.description }));
}

/**
 * Products gallery → the 7 image tiles. There's no dedicated gallery endpoint;
 * gallery photos live on products (`images[]`), so we flatten across products
 * and take the first `limit` (default 7).
 */
export async function getGalleryImages(
  limit = HOME_LIMITS.galleryImages,
): Promise<GalleryImageVM[]> {
  const products = await safeList<ApiProduct>(API_ENDPOINTS.products, {
    searchParams: { limit: HOME_LIMITS.galleryProducts },
  });

  const tiles: GalleryImageVM[] = [];
  for (const product of products) {
    for (let i = 0; i < product.images.length; i++) {
      tiles.push({
        id: `${product.id}-${i}`,
        img: product.images[i],
        label: product.title,
      });
      if (tiles.length >= limit) return tiles;
    }
  }
  return tiles;
}

/** Testimonials → carousel (already ordered by the API). */
export async function getTestimonials(): Promise<TestimonialVM[]> {
  const testimonials = await safeList<ApiTestimonial>(API_ENDPOINTS.testimonials, {
    searchParams: { limit: HOME_LIMITS.testimonials },
  });
  return testimonials.map((t) => ({
    id: t.id,
    quote: t.testimonial,
    name: t.name,
    role: t.occupation,
    avatar: t.imageUrl,
  }));
}

/** News → the 3 latest editorial cards. */
export async function getNews(limit = HOME_LIMITS.news): Promise<NewsCardVM[]> {
  const news = await safeList<ApiNews>(API_ENDPOINTS.news, {
    searchParams: { limit },
  });
  return news
    .filter((n) => n.isActive)
    .slice(0, limit)
    .map((n) => ({
      id: n.id,
      cat: (n.tag ?? "News").toUpperCase(),
      date: formatDate(n.publishedDate),
      title: n.title,
      excerpt: n.description,
      image: n.bannerImageUrl || null,
    }));
}
