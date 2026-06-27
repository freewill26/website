/**
 * Static content for the News index + News single screens. In production this
 * would come from a CMS; it lives here as typed data so the pages stay fully
 * static and mirror the design system one-to-one.
 */

export interface NewsArticle {
  /** URL slug — `/news/[slug]`. */
  slug: string;
  cat: string;
  date: string;
  /** Used to order — most recent first. */
  iso: string;
  title: string;
  excerpt: string;
  author: string;
  readMins: number;
  location: string;
  /** Placeholder caption for the hero image slot. */
  imageLabel: string;
  /** Body — an ordered list of heading/paragraph blocks. */
  body: { heading?: string; paragraphs: string[] }[];
  /** Pull-quote rendered mid-article. */
  quote?: { text: string; attribution: string };
  /** Optional key facts rail. */
  facts?: { k: string; v: string }[];
  /** Topic tags shown at the foot of the article. */
  tags?: string[];
}

export const ARTICLES: NewsArticle[] = [
  {
    slug: "new-6-court-taraflex-hall-pune",
    cat: "PROJECT",
    date: "MAY 2026",
    iso: "2026-05-18",
    title: "New 6-court Taraflex hall opens in Pune",
    excerpt:
      "A multi-sport indoor facility built and surfaced end to end, ready for state-level competition.",
    author: "Freewill Projects Desk",
    readMins: 4,
    location: "Pune, Maharashtra",
    imageLabel: "Taraflex hall",
    facts: [
      { k: "Courts", v: "6" },
      { k: "Surface", v: "Taraflex®" },
      { k: "Built in", v: "11 weeks" },
      { k: "Standard", v: "FIVB" },
    ],
    tags: ["Indoor", "Taraflex®", "Multi-sport", "Pune"],
    body: [
      {
        paragraphs: [
          "Freewill has handed over a six-court multi-sport indoor hall in Pune — surfaced, line-marked and competition-ready in a single continuous programme. The facility is built to host volleyball, basketball, badminton and handball at state level, with the flexibility to reconfigure for training camps and academy use between events.",
        ],
      },
      {
        heading: "One partner, the whole arena",
        paragraphs: [
          "From sub-floor assessment to final line-marking, every stage was delivered by Freewill's own certified crews. The team laid Gerflor Taraflex® — the Olympic vinyl surface used at the highest level of the indoor game — over a prepared, moisture-tested base, then set goal systems, nets and officials' equipment.",
          "Working as a single supplier kept the schedule tight: the hall went from bare slab to match-ready in eleven weeks, handed over a week ahead of the client's opening fixture.",
        ],
      },
      {
        heading: "Built to keep playing",
        paragraphs: [
          "Taraflex® is engineered for shock absorption and consistent ball response, reducing player load across long tournament days. With removable court markings for each discipline, the venue can switch sports in hours rather than days — exactly the brief for a facility that has to earn its keep year-round.",
        ],
      },
    ],
    quote: {
      text:
        "From the first site survey to the final line, it was one team, one standard. The court plays world-class.",
      attribution: "Venue Director, State Sports Authority",
    },
  },
  {
    slug: "pickleball-division-launches-nationwide",
    cat: "PARTNERSHIP",
    date: "APR 2026",
    iso: "2026-04-09",
    title: "Pickleball division launches nationwide",
    excerpt:
      "Dedicated cushioned pickleball court systems now available across India, install included.",
    author: "Freewill Newsroom",
    readMins: 3,
    location: "Nationwide",
    imageLabel: "Pickleball court",
    facts: [
      { k: "Sport", v: "Pickleball" },
      { k: "System", v: "Cushioned acrylic" },
      { k: "Coverage", v: "All India" },
      { k: "Install", v: "Included" },
    ],
    tags: ["Pickleball", "New division", "Acrylic", "Nationwide"],
    body: [
      {
        paragraphs: [
          "Freewill has launched a dedicated pickleball division, bringing cushioned, competition-grade court systems to the fastest-growing racquet sport in the country. Supply and installation are handled end to end, with nationwide coverage from the company's existing project network.",
        ],
      },
      {
        heading: "A system built for the game",
        paragraphs: [
          "The new courts use a multi-layer cushioned acrylic build over a prepared base, tuned for the lower bounce and quick footwork pickleball demands. Each court is delivered with regulation line-marking, net posts and perimeter detailing — ready to play on handover.",
          "Indoor and outdoor specifications are both available, with colour schemes selectable to match club branding or facility identity.",
        ],
      },
      {
        heading: "From clubs to community parks",
        paragraphs: [
          "The division is aimed at private clubs, residential developments, schools and municipal sports parks looking to add pickleball without compromising on surface quality. Freewill's crews handle the full programme — survey, base preparation, surfacing and finishing — under one accountable contract.",
        ],
      },
    ],
    quote: {
      text:
        "Demand for proper pickleball surfaces outran supply. We built a division to close that gap, install and all.",
      attribution: "Head of New Sports, Freewill",
    },
  },
  {
    slug: "recognised-for-sports-tech-excellence",
    cat: "AWARD",
    date: "FEB 2026",
    iso: "2026-02-21",
    title: "Recognised for sports-tech excellence",
    excerpt:
      "Freewill honoured for innovation in modular seating and Made-in-India equipment design.",
    author: "Freewill Newsroom",
    readMins: 3,
    location: "Mumbai, Maharashtra",
    imageLabel: "Award ceremony",
    facts: [
      { k: "Category", v: "Sports-tech" },
      { k: "For", v: "Seating & equipment" },
      { k: "Origin", v: "Made in India" },
      { k: "Year", v: "2026" },
    ],
    tags: ["Award", "Seating", "Made in India", "Equipment"],
    body: [
      {
        paragraphs: [
          "Freewill has been recognised for excellence in sports infrastructure, with judges citing the company's modular stadium seating and its Made-in-India competition equipment programme as standout work in a fast-maturing sector.",
        ],
      },
      {
        heading: "Designed and made in India",
        paragraphs: [
          "Over the past decade Freewill has moved an increasing share of its seating and equipment design and manufacturing to its own facilities in Pune. The shift has shortened lead times, tightened quality control and put internationally specified products within reach of domestic budgets.",
          "The award specifically noted the company's tip-up and telescopic seating systems and its aluminium field equipment, both developed to international standard but built locally.",
        ],
      },
      {
        heading: "What it changes",
        paragraphs: [
          "Recognition is welcome, but the team frames it as a milestone rather than a destination — a signal that home-grown sports infrastructure can compete on spec, not just on price. The focus now turns to scaling that capacity for the next cycle of national and international events.",
        ],
      },
    ],
    quote: {
      text:
        "We set out to prove world-class sports infrastructure could be designed and made in India. This says it can.",
      attribution: "Founder, Freewill",
    },
  },
  {
    slug: "world-cup-grade-hockey-turf-delivered",
    cat: "PROJECT",
    date: "JAN 2026",
    iso: "2026-01-15",
    title: "World Cup-grade hockey turf delivered ahead of schedule",
    excerpt:
      "Two competition pitches turfed, goal-set and handed over match-ready before the opening fixture.",
    author: "Freewill Projects Desk",
    readMins: 5,
    location: "Bhubaneswar, Odisha",
    imageLabel: "Hockey pitch",
    facts: [
      { k: "Arenas", v: "2" },
      { k: "Surface", v: "JutaGrass turf" },
      { k: "Seats", v: "8,000+" },
      { k: "Standard", v: "FIH" },
    ],
    tags: ["Hockey", "JutaGrass", "FIH", "Bhubaneswar"],
    body: [
      {
        paragraphs: [
          "Freewill has completed two FIH-standard field-hockey pitches, laying World Cup-grade turf, setting aluminium goal systems and seating the stands — all handed over match-ready ahead of the opening fixture.",
        ],
      },
      {
        heading: "The full match envelope",
        paragraphs: [
          "Beyond the playing surface, the scope covered everything that surrounds it: spectator seating for more than eight thousand, perimeter systems and pitch line-marking to competition tolerance. Delivering the complete envelope under one programme removed the coordination risk that comes with multiple suppliers on a fixed event deadline.",
        ],
      },
      {
        heading: "Engineered for the world stage",
        paragraphs: [
          "JutaGrass hockey turf is built for the speed and consistency the international game requires, with an irrigation-ready base for true ball roll. India's first international-grade aluminium goal posts — a Freewill development — completed the field-of-play package.",
        ],
      },
    ],
    quote: {
      text:
        "Two arenas, eight thousand seats, FIH-certified turf — delivered before opening day with room to spare.",
      attribution: "Project Lead, Freewill",
    },
  },
  {
    slug: "100000-stadium-seats-milestone",
    cat: "MILESTONE",
    date: "DEC 2025",
    iso: "2025-12-02",
    title: "Past 100,000 stadium seats installed across India",
    excerpt:
      "A decade of seating manufacturing in Pune passes a six-figure milestone, snag-free on handover.",
    author: "Freewill Newsroom",
    readMins: 3,
    location: "Pune, Maharashtra",
    imageLabel: "Stadium seating",
    facts: [
      { k: "Seats", v: "100,000+" },
      { k: "Since", v: "2016" },
      { k: "Made in", v: "Pune" },
      { k: "Types", v: "Tip-up · telescopic" },
    ],
    tags: ["Milestone", "Seating", "Manufacturing", "Pune"],
    body: [
      {
        paragraphs: [
          "Freewill has passed a hundred thousand stadium seats manufactured and installed across India — a milestone reached a decade after the company established seating design and manufacturing in Pune.",
        ],
      },
      {
        heading: "A capability built at home",
        paragraphs: [
          "From a standing start in 2016, the seating line now spans tip-up, telescopic and bench systems, supplied to arenas, municipal grounds and academies nationwide. Manufacturing locally lets the team control finish, lead time and the install crews who fit it.",
          "The figure is cumulative across hundreds of venues — but the team is quick to point to the handover record behind it: large seating packages delivered with zero snags on opening day.",
        ],
      },
    ],
    quote: {
      text:
        "A hundred thousand seats, and the number that matters most is still zero — the snags on handover day.",
      attribution: "Head of Seating, Freewill",
    },
  },
];

/** Most-recent-first ordering for the index grid. */
export const ARTICLES_SORTED = [...ARTICLES].sort((a, b) =>
  b.iso.localeCompare(a.iso),
);

export function getArticle(slug: string): NewsArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Up to three other articles, for the "more news" rail on the single page. */
export function relatedArticles(slug: string, count = 3): NewsArticle[] {
  return ARTICLES_SORTED.filter((a) => a.slug !== slug).slice(0, count);
}
