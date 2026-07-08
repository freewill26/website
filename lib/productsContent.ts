/**
 * Content for the "Freewill Products" index (Page A) — four product categories,
 * each a horizontal rail of cards. Every card links through to a Product family
 * overview (Freewill Product), whose type cards then open a Product Type detail
 * (Page B). Only the Taraflex family has detail pages today, so every card
 * points there.
 */
import productsData from "@/data/products.json";

export interface RailCard {
  title: string;
  desc: string;
  tag: string;
  isVideo?: boolean;
  ph: string;
  /** Product family this card opens (`/products/[family]`). */
  family: string;
  image?: string;
}

export interface ProductCategory {
  n: number;
  idx: string;
  kicker: string;
  title: string;
  /** Alternating section background. */
  tone: "cream" | "white";
  lead: string;
  cards: RailCard[];
}

function getImageForItem(itemName: string, catName: string, kicker: string): string {
  const name = (itemName + " " + catName + " " + kicker).toLowerCase();
  if (name.includes("taraflex") || name.includes("vinyl")) return "/assets/product-taraflex.png";
  if (name.includes("maple") || name.includes("wood") || name.includes("junckers") || name.includes("connor") || name.includes("hardwood")) return "/assets/product-maple.png";
  if (name.includes("seat") || name.includes("bleacher") || name.includes("dugout") || name.includes("grandstand") || name.includes("stadium")) return "/assets/product-seating.png";
  if (name.includes("gymnastic") || name.includes("pe") || name.includes("bar") || name.includes("beam") || name.includes("mat") || name.includes("trampoline") || name.includes("vault")) return "/assets/product-gymnastics.png";
  if (name.includes("track") || name.includes("cricket") || name.includes("pumptrack") || name.includes("athletics")) return "/assets/product-track.png";
  if (name.includes("turf") || name.includes("goal") || name.includes("football") || name.includes("hockey") || name.includes("fence")) return "/assets/product-turf.png";
  if (name.includes("climb") || name.includes("vertical") || name.includes("mozaik")) return "/assets/product-climbing.png";
  if (name.includes("pickleball") || name.includes("tile") || name.includes("court") || name.includes("muga") || name.includes("squash")) return "/assets/product-pickleball.png";
  if (name.includes("score") || name.includes("timing") || name.includes("audio") || name.includes("sound") || name.includes("curtain") || name.includes("clock") || name.includes("trolley")) return "/assets/product-scoreboard.png";
  return "/assets/product-taraflex.png";
}

export const CATEGORIES: ProductCategory[] = productsData.map((group, groupIdx) => {
  const leads: Record<string, string> = {
    "01": "Competition-grade indoor flooring — Olympic vinyl, floating maple hardwood, combi-floors and safety sub-systems.",
    "02": "Spectator seating and stadium systems manufactured in Pune — fixed chairs, foldable bleachers, telescopic grandstands and player dugouts.",
    "03": "FIG-approved competition gymnastics apparatus and physical education equipment for championship halls and academies.",
    "04": "Standard and competition ball-sports equipment — hoops, net systems, posts and ceiling-suspended basketball backstops.",
    "05": "Specialized athletic surfaces — cricket pitches, IFSC-spec climbing walls, and all-weather outdoor court tiles.",
    "06": "Sports mats, squash court wall systems, modular pumptracks and multi-utility games arenas (MUGA).",
    "07": "Venue infrastructure — Bodet digital scoreboards, PA audio systems, motorized divider curtains, perimeter fencing and storage trolleys.",
  };

  const cards: RailCard[] = group.categories.flatMap((cat) =>
    cat.items.map((item) => {
      const familySlug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return {
        title: item.name,
        desc: item.spec,
        tag: cat.kicker,
        ph: item.name,
        family: familySlug,
        image: getImageForItem(item.name, cat.name, cat.kicker),
        isVideo: item.name.toLowerCase().includes("climbing") || item.name.toLowerCase().includes("combi") || item.name.toLowerCase().includes("telescopic"),
      };
    })
  );

  return {
    n: groupIdx + 1,
    idx: group.id,
    kicker: group.title.toUpperCase(),
    title: group.title,
    tone: groupIdx % 2 === 0 ? "cream" : "white",
    lead: leads[group.id] || "Professional sports systems engineered for high-performance venues.",
    cards,
  };
});
