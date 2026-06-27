/**
 * Static content for the Blog index + Blog single screens. Distinct from the
 * Newsroom (`lib/newsContent.ts`): News covers dated company announcements,
 * while the Blog is evergreen guidance — how-tos, buyer's guides and insight
 * from the team. Lives here as typed data so the pages stay fully static.
 */

export interface BlogPost {
  /** URL slug — `/blog/[slug]`. */
  slug: string;
  /** Editorial topic (vs News' announcement category). */
  topic: string;
  date: string;
  /** Used to order — most recent first. */
  iso: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  readMins: number;
  /** Placeholder caption for the hero image slot. */
  imageLabel: string;
  /** Body — an ordered list of heading/paragraph blocks. */
  body: { heading?: string; paragraphs: string[] }[];
  /** Optional takeaway list rendered as a callout. */
  takeaways?: string[];
  tags?: string[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "how-to-choose-an-indoor-sports-surface",
    topic: "BUYER'S GUIDE",
    date: "JUN 2026",
    iso: "2026-06-10",
    title: "How to choose the right indoor sports surface",
    excerpt:
      "Vinyl, maple or modular? A practical framework for matching a surface to your sport, budget and maintenance reality.",
    author: "Freewill Technical Team",
    authorRole: "Surface Specialists",
    readMins: 6,
    imageLabel: "Indoor surface",
    tags: ["Flooring", "Indoor", "Guide"],
    takeaways: [
      "Match the surface to the dominant sport, not the exception.",
      "Factor maintenance and recoat cycles into total cost, not just install price.",
      "Always moisture-test the sub-floor before specifying any system.",
    ],
    body: [
      {
        paragraphs: [
          "Choosing an indoor sports surface is one of the highest-stakes decisions in a facility build — it shapes player safety, the sports you can host, and the maintenance bill for the next decade. This guide walks through the trade-offs the way our specifiers do on site.",
        ],
      },
      {
        heading: "Start with the dominant sport",
        paragraphs: [
          "A surface tuned for basketball behaves differently from one built for volleyball or multi-sport community use. Define the sport that will be played most often and specify for it; treat the occasional exception as a compromise, not the brief.",
          "Vinyl systems like Taraflex® offer consistent ball response and shock absorption for the indoor court sports. Floating maple suits premium basketball and show courts. Modular tiles favour fast-turnaround multi-use halls.",
        ],
      },
      {
        heading: "Cost is a cycle, not a number",
        paragraphs: [
          "The install price is only the first payment. Recoat intervals, cleaning regimes and repairability all feed into the true cost of ownership. A cheaper surface that needs frequent refinishing can cost more across ten years than a premium system laid once.",
        ],
      },
      {
        heading: "Never skip the sub-floor",
        paragraphs: [
          "Most surface failures trace back to the base. Moisture testing and a proper sub-floor assessment are non-negotiable — they determine whether a system bonds and performs, regardless of how good the top layer is.",
        ],
      },
    ],
  },
  {
    slug: "maintaining-taraflex-courts",
    topic: "MAINTENANCE",
    date: "MAY 2026",
    iso: "2026-05-05",
    title: "Maintaining a Taraflex® court so it plays like new",
    excerpt:
      "A simple daily, weekly and seasonal routine that protects shock absorption and ball response for years.",
    author: "Freewill Service Desk",
    authorRole: "After-care Team",
    readMins: 4,
    imageLabel: "Court cleaning",
    tags: ["Maintenance", "Taraflex®", "Flooring"],
    takeaways: [
      "Dust-mop daily; damp-clean weekly with a neutral pH cleaner.",
      "Never use solvent or abrasive cleaners — they strip the wear layer.",
      "Re-mark and inspect seams seasonally.",
    ],
    body: [
      {
        paragraphs: [
          "A competition vinyl court rewards a light, consistent routine far more than occasional deep cleans. Here's the rhythm we hand over with every install.",
        ],
      },
      {
        heading: "Daily and weekly",
        paragraphs: [
          "Dust-mop the floor daily to lift grit that would otherwise abrade the wear layer underfoot. Once a week, damp-clean with a neutral pH cleaner and a well-wrung mop — water pooling at seams is the enemy.",
        ],
      },
      {
        heading: "What to avoid",
        paragraphs: [
          "Solvent-based and abrasive cleaners strip the protective top layer and dull both grip and appearance. Keep wheeled equipment and sharp loads off the surface, and use protective sheeting under temporary seating or staging.",
        ],
      },
    ],
  },
  {
    slug: "designing-a-multi-sport-hall",
    topic: "INSIGHT",
    date: "APR 2026",
    iso: "2026-04-02",
    title: "Designing a multi-sport hall that actually flexes",
    excerpt:
      "Line-marking strategy, equipment storage and surface choice — the three decisions that make or break a shared venue.",
    author: "Freewill Projects Desk",
    authorRole: "Design & Build",
    readMins: 5,
    imageLabel: "Multi-sport hall",
    tags: ["Design", "Multi-sport", "Indoor"],
    takeaways: [
      "Plan line-marking colour hierarchy before you lay a single line.",
      "Storage and rigging dictate how fast you can switch sports.",
      "One forgiving surface beats three compromised zones.",
    ],
    body: [
      {
        paragraphs: [
          "A multi-sport hall promises flexibility but often delivers a cluttered floor nobody enjoys playing on. The difference is in three early decisions.",
        ],
      },
      {
        heading: "Line-marking is a system, not an afterthought",
        paragraphs: [
          "When four sports share a floor, line legibility decides usability. Establish a colour hierarchy up front so the primary sport reads cleanly and secondary markings recede. Removable markings let a venue reconfigure without repainting.",
        ],
      },
      {
        heading: "Storage and rigging set the switch time",
        paragraphs: [
          "How quickly staff can convert the hall depends on equipment access and overhead rigging. Designing storage and net systems into the build — rather than bolting them on later — turns a half-day changeover into minutes.",
        ],
      },
    ],
  },
];

/** Most-recent-first ordering for the index grid. */
export const POSTS_SORTED = [...POSTS].sort((a, b) => b.iso.localeCompare(a.iso));

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Up to three other posts, for the "more reading" rail on the single page. */
export function relatedPosts(slug: string, count = 3): BlogPost[] {
  return POSTS_SORTED.filter((p) => p.slug !== slug).slice(0, count);
}
