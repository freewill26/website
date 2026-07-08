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
  image?: string;
}

export const MILESTONES: Milestone[] = [
  { tag: "01 — PARTNERSHIP", year: "1992", title: "Gerflor Taraflex arrives in India", body: "The Gerflor Taraflex × Freewill partnership for India begins — the surface of Olympic volleyball and handball, now on Indian courts.", image: "/assets/milestone-1992-taraflex.png" },
  { tag: "02 — EQUIPMENT", year: "1992", title: "Janssen & Fritsen join the roster", body: "FIG-approved Janssen & Fritsen gymnastics equipment introduced to India for the first time.", image: "/assets/milestone-1992-gymnastics.png" },
  { tag: "03 — FLOORING", year: "2005", title: "World's best maple flooring lands", body: "Floating hardwood maple flooring systems begin delivery from ready stocks held in India.", image: "/assets/milestone-2005-maple.png" },
  { tag: "04 — SEATING", year: "2016", title: "100,000+ seats installed", body: "Stadium seating manufacturing and design established in Pune — a hundred thousand spectators seated and counting.", image: "/assets/milestone-2016-seating.png" },
  { tag: "05 — MAKE IN INDIA", year: "2017", title: "Made in India initiative", body: "Made-in-India sports equipment and seating development designs go into production.", image: "/assets/milestone-2017-madeinindia.png" },
  { tag: "06 — BEYOND THE COURT", year: "2022", title: "Diversifying the portfolio", body: "India's first international-grade aluminium goal posts, delivered for the Hockey World Cup practice grounds — plus end-to-end turf solutions with JutaGrass.", image: "/assets/milestone-2022-hockey.png" },
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

const BASKETBALL_IMAGES = [
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=520&h=660&q=80",
];

const VOLLEYBALL_IMAGES = [
  "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1592656094267-764a450201c5?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1588616147427-ec30e46b2839?auto=format&fit=crop&w=520&h=660&q=80",
];

const HOCKEY_IMAGES = [
  "https://images.unsplash.com/photo-1580748141579-7104b60f384d?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?auto=format&fit=crop&w=520&h=660&q=80",
];

const MULTI_SPORT_IMAGES = [
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1521537634199-673cb821227b?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1594470115953-ce27a8581e28?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=520&h=660&q=80",
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=520&h=660&q=80",
];

function imageFor(cat: string, index: number): string {
  if (cat === "BASKETBALL") {
    return BASKETBALL_IMAGES[index % BASKETBALL_IMAGES.length];
  }
  if (cat === "VOLLEYBALL") {
    return VOLLEYBALL_IMAGES[index % VOLLEYBALL_IMAGES.length];
  }
  if (cat === "FIELD HOCKEY") {
    return HOCKEY_IMAGES[index % HOCKEY_IMAGES.length];
  }
  return MULTI_SPORT_IMAGES[index % MULTI_SPORT_IMAGES.length];
}

export const REFERENCES: Reference[] = REFERENCES_RAW.map((r, i) => {
  const detail = detailFor(r);
  return {
    ...r,
    idx: String(i + 1).padStart(2, "0"),
    img: imageFor(detail.cat, i),
    detail,
  };
});

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
  avatar?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { quote: "Freewill resurfaced our indoor stadium ahead of the National Games — a flawless Taraflex install, delivered a week early.", name: "R. Deshmukh", role: "Director, State Sports Authority", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" },
  { quote: "The seating and flooring package was handled end to end. 8,000 seats, zero snags on handover day.", name: "A. Iyer", role: "Project Lead, Municipal Arena", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80" },
  { quote: "Their team understands competition spec better than anyone in the country. Our gymnastics hall is FIG-ready.", name: "P. Sharma", role: "Coach, National Academy", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80" },
  { quote: "From site survey to final line-marking, the professionalism was unmatched. The court plays world-class.", name: "K. Menon", role: "GM, Sports Complex", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80" },
];

export interface NewsItem {
  cat: string;
  date: string;
  title: string;
  excerpt: string;
  image?: string;
}

export const NEWS: NewsItem[] = [
  { cat: "PROJECT", date: "MAY 2026", title: "New 6-court Taraflex hall opens in Pune", excerpt: "A multi-sport indoor facility built and surfaced end to end, ready for state-level competition.", image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=600&h=375&q=80" },
  { cat: "PARTNERSHIP", date: "APR 2026", title: "Pickleball division launches nationwide", excerpt: "Dedicated cushioned pickleball court systems now available across India, install included.", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&h=375&q=80" },
  { cat: "AWARD", date: "FEB 2026", title: "Recognised for sports-tech excellence", excerpt: "Freewill honoured for innovation in modular seating and Made-in-India equipment design.", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&h=375&q=80" },
];

export interface GalleryTile {
  isVideo: boolean;
  ph?: string;
  img?: string;
}

export const GALLERY: GalleryTile[] = [
  { isVideo: true },
  { isVideo: false, ph: "Court", img: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=600&h=600&q=80" },
  { isVideo: false, ph: "Arena", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&h=600&q=80" },
  { isVideo: false, ph: "Seating", img: "https://images.unsplash.com/photo-1521537634199-673cb821227b?auto=format&fit=crop&w=600&h=600&q=80" },
  { isVideo: true },
  { isVideo: false, ph: "Gym", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&h=600&q=80" },
  { isVideo: false, ph: "Turf", img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&h=600&q=80" },
];
