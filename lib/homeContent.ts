/**
 * Static content for the redesigned Home page. In production this would come
 * from a CMS; it lives here as typed data so the page stays fully static and
 * mirrors the design source one-to-one.
 */

export interface Stat {
  n: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { n: 33, suffix: "+", label: "Years building India's sports infrastructure" },
  { n: 100, suffix: "K+", label: "Stadium seats manufactured & installed" },
  { n: 28, suffix: "", label: "National & international games served" },
  { n: 12, suffix: "", label: "Exclusive global brand partnerships" },
];

export interface ProductCard {
  no: string;
  kicker: string;
  title: string;
  sub: string;
  /** Bento span: hero (2×2), wide (2×1) or single. */
  span: "hero" | "wide" | "";
  ph: string;
}

export const PRODUCTS: ProductCard[] = [
  { kicker: "TARAFLEX®", title: "Sports Flooring", sub: "Olympic vinyl indoor surfaces", span: "hero", ph: "Taraflex court" },
  { kicker: "HARDWOOD", title: "Maple Courts", sub: "Floating timber systems", span: "", ph: "Maple court" },
  { kicker: "SEATING", title: "Stadium Seating", sub: "Tip-up & telescopic", span: "", ph: "Seating" },
  { kicker: "FIG-APPROVED", title: "Gymnastics Equipment", sub: "Competition apparatus", span: "wide", ph: "Gymnastics" },
  { kicker: "INDOOR", title: "Court Equipment", sub: "Hoops, nets & posts", span: "", ph: "Equipment" },
  { kicker: "TRACK", title: "Athletics Surfaces", sub: "Synthetic running tracks", span: "", ph: "Track" },
  { kicker: "VERTICAL", title: "Climbing Walls", sub: "IFSC-spec structures", span: "wide", ph: "Climbing wall" },
  { kicker: "JUTAGRASS", title: "Artificial Turf", sub: "Hockey, football & multisport", span: "wide", ph: "Turf" },
  { kicker: "MODULAR", title: "Court Tiles", sub: "Outdoor sport-court systems", span: "", ph: "Court tile" },
  { kicker: "FIELD", title: "Goal Posts", sub: "Aluminium field equipment", span: "", ph: "Goalpost" },
  { kicker: "BODET", title: "Scoreboards & Timing", sub: "Display & timing systems", span: "wide", ph: "Scoreboard" },
].map((p, i) => ({ ...p, no: String(i + 1).padStart(2, "0") })) as ProductCard[];

export interface Milestone {
  tag: string;
  year: string;
  title: string;
  body: string;
}

export const MILESTONES: Milestone[] = [
  { tag: "01 — PARTNERSHIP", year: "1992", title: "Gerflor Taraflex arrives in India", body: "The Gerflor Taraflex × Freewill partnership for India begins — the surface of Olympic volleyball and handball, now on Indian courts." },
  { tag: "02 — EQUIPMENT", year: "1992", title: "Janssen & Fritsen join the roster", body: "FIG-approved Janssen & Fritsen gymnastics equipment introduced to India for the first time." },
  { tag: "03 — FLOORING", year: "2005", title: "World's best maple flooring lands", body: "Floating hardwood maple flooring systems begin delivery from ready stocks held in India." },
  { tag: "04 — SEATING", year: "2016", title: "100,000+ seats installed", body: "Stadium seating manufacturing and design established in Pune — a hundred thousand spectators seated and counting." },
  { tag: "05 — MAKE IN INDIA", year: "2017", title: "Made in India initiative", body: "Made-in-India sports equipment and seating development designs go into production." },
  { tag: "06 — BEYOND THE COURT", year: "2022", title: "Diversifying the portfolio", body: "India's first international-grade aluminium goal posts, delivered for the Hockey World Cup practice grounds — plus end-to-end turf solutions with JutaGrass." },
];

export interface ReferenceRaw {
  year: string;
  title: string;
  loc: string;
}

const REFERENCES_RAW: ReferenceRaw[] = [
  { year: "1994", title: "XXVIII National Games", loc: "Maharashtra" },
  { year: "1997", title: "XXIX National Games", loc: "Karnataka" },
  { year: "1999", title: "XXX National Games", loc: "Manipur" },
  { year: "2001", title: "XXXI National Games", loc: "Punjab" },
  { year: "2007", title: "XXXII National Games", loc: "Hyderabad" },
  { year: "2007", title: "XXXIII National Games", loc: "Guwahati" },
  { year: "2007", title: "World Military Games", loc: "Hyderabad" },
  { year: "2008", title: "Commonwealth Games", loc: "Pune" },
  { year: "2009", title: "FIVB Men's Junior Championship", loc: "Pune" },
  { year: "2009", title: "FIBA Asia Women's Championship", loc: "Chennai" },
  { year: "2010", title: "Commonwealth Games", loc: "Delhi" },
  { year: "2011", title: "XXXIV National Games", loc: "Ranchi" },
  { year: "2014", title: "Lusofonia Games", loc: "Goa" },
  { year: "2015", title: "XXXV National Games", loc: "Kerala" },
  { year: "2016", title: "South Asian Games", loc: "Guwahati" },
  { year: "2018", title: "Men's Hockey World Cup", loc: "Odisha" },
  { year: "2019", title: "Khelo India Youth Games", loc: "Pune" },
  { year: "2020", title: "Khelo India Youth Games", loc: "Guwahati" },
  { year: "2022", title: "Khelo India Youth Games", loc: "Bhopal" },
  { year: "2022", title: "National Games", loc: "Ahmedabad, Gujarat" },
  { year: "2023", title: "Prime Volleyball League", loc: "Bangalore & Hyderabad" },
  { year: "2023", title: "XXXVII National Games", loc: "Goa" },
  { year: "2023", title: "Men's FIH Hockey World Cup", loc: "Odisha" },
  { year: "2023", title: "Volleyball Club Men's World Championship", loc: "Bangalore" },
  { year: "2024", title: "Khelo India Youth Games", loc: "Chennai" },
  { year: "2025", title: "XXXVIII National Games", loc: "Uttarakhand" },
];

export interface ReferenceDetail {
  cat: string;
  about: string;
  role: string;
  supplied: string[];
  metrics: { v: string; k: string }[];
}

export interface Reference extends ReferenceRaw {
  idx: string;
  /** Hover-preview / case-study image (placeholder photography). */
  img: string;
  detail: ReferenceDetail;
}

/** Derive a category-appropriate case-study detail, matching the design logic. */
function detailFor(r: ReferenceRaw): ReferenceDetail {
  const t = r.title.toLowerCase();
  if (t.includes("hockey")) {
    return {
      cat: "FIELD HOCKEY",
      about: `${r.title} brought the world's best to ${r.loc}, contested on pitches built to international FIH standard.`,
      role: "Freewill prepared the competition and training arenas — laying World Cup-grade hockey turf, setting aluminium goal systems and seating the stands, all handed over match-ready before the opening fixture.",
      supplied: ["JutaGrass hockey turf", "Aluminium goal posts", "Stadium seating", "Pitch line-marking"],
      metrics: [{ v: "2", k: "Arenas turfed" }, { v: "8,000+", k: "Seats installed" }, { v: "FIH", k: "Certified surface" }],
    };
  }
  if (t.includes("volleyball") || t.includes("fivb")) {
    return {
      cat: "VOLLEYBALL",
      about: `${r.title} was staged in ${r.loc} on competition-spec indoor courts demanded by the international game.`,
      role: "We laid Gerflor Taraflex® competition flooring, installed FIVB-approved net and officials' systems, and seated the galleries for a tournament-ready hall.",
      supplied: ["Taraflex® flooring", "FIVB net systems", "Officials' equipment", "Tip-up seating"],
      metrics: [{ v: "6", k: "Courts surfaced" }, { v: "Taraflex®", k: "Olympic vinyl" }, { v: "FIVB", k: "Approved systems" }],
    };
  }
  if (t.includes("fiba")) {
    return {
      cat: "BASKETBALL",
      about: `${r.title} brought elite continental basketball to ${r.loc}, played on a surface built for the professional game.`,
      role: "Freewill installed a sprung competition court, goal systems and Bodet scoring & timing displays, with spectator seating wrapped around the show court.",
      supplied: ["Competition court", "Basketball systems", "Bodet scoreboards", "Stadium seating"],
      metrics: [{ v: "1", k: "Show court" }, { v: "4,000+", k: "Seats installed" }, { v: "FIBA", k: "Match spec" }],
    };
  }
  return {
    cat: "MULTI-SPORT GAMES",
    about: `The ${r.title} in ${r.loc} spanned dozens of disciplines across multiple venues — one of the calendar's biggest sporting undertakings.`,
    role: "From indoor courts to athletics surfaces and spectator stands, Freewill surfaced, seated and equipped venues to national-games standard — delivered on time for the opening ceremony.",
    supplied: ["Sports flooring", "Stadium seating", "Court & gym equipment", "Athletics surfaces"],
    metrics: [{ v: "12+", k: "Venues served" }, { v: "Multi", k: "Disciplines" }, { v: "On time", k: "For opening day" }],
  };
}

export const REFERENCES: Reference[] = REFERENCES_RAW.map((r, i) => ({
  ...r,
  idx: String(i + 1).padStart(2, "0"),
  img: `https://picsum.photos/seed/freewill${i + 1}/520/660`,
  detail: detailFor(r),
}));

export interface Region {
  name: string;
  role: string;
}

export const REGIONS: Region[] = [
  { name: "India", role: "HQ · Pune · nationwide delivery & install" },
  { name: "Nepal", role: "Cross-border projects & supply" },
  { name: "Australia", role: "Sourcing & manufacturing partners" },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { quote: "Freewill resurfaced our indoor stadium ahead of the National Games — a flawless Taraflex install, delivered a week early.", name: "R. Deshmukh", role: "Director, State Sports Authority" },
  { quote: "The seating and flooring package was handled end to end. 8,000 seats, zero snags on handover day.", name: "A. Iyer", role: "Project Lead, Municipal Arena" },
  { quote: "Their team understands competition spec better than anyone in the country. Our gymnastics hall is FIG-ready.", name: "P. Sharma", role: "Coach, National Academy" },
  { quote: "From site survey to final line-marking, the professionalism was unmatched. The court plays world-class.", name: "K. Menon", role: "GM, Sports Complex" },
];

export interface NewsItem {
  cat: string;
  date: string;
  title: string;
  excerpt: string;
}

export const NEWS: NewsItem[] = [
  { cat: "PROJECT", date: "MAY 2026", title: "New 6-court Taraflex hall opens in Pune", excerpt: "A multi-sport indoor facility built and surfaced end to end, ready for state-level competition." },
  { cat: "PARTNERSHIP", date: "APR 2026", title: "Pickleball division launches nationwide", excerpt: "Dedicated cushioned pickleball court systems now available across India, install included." },
  { cat: "AWARD", date: "FEB 2026", title: "Recognised for sports-tech excellence", excerpt: "Freewill honoured for innovation in modular seating and Made-in-India equipment design." },
];

export interface GalleryTile {
  isVideo: boolean;
  ph?: string;
}

export const GALLERY: GalleryTile[] = [
  { isVideo: true },
  { isVideo: false, ph: "Court" },
  { isVideo: false, ph: "Arena" },
  { isVideo: false, ph: "Seating" },
  { isVideo: true },
  { isVideo: false, ph: "Gym" },
  { isVideo: false, ph: "Turf" },
];
