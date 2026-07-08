/**
 * Product family overviews — the "Freewill Product" screen (the middle page
 * between the Products index and a Product Type detail). Each family bundles a
 * hero, an "about" blurb and the set of types it contains. Types link through to
 * the Product Type detail pages (`/products/[family]/[code]`).
 */

import productsData from "@/data/products.json";

export interface FamilyType {
  code: string;
  name: string;
  desc: string;
  spec: string;
  swatch: string;
}

export interface ProductFamily {
  slug: string;
  /** Breadcrumb / parent category label shown in the hero. */
  parent: string;
  index: string;
  nameLead: string;
  /** Trailing accent mark rendered after the name (e.g. ®). */
  mark?: string;
  tagline: string;
  heroStats: { value: string; unit: string; label: string }[];
  aboutTitle: string[];
  about: string[];
  aboutChips: string[];
  blueprintCaption: string;
  blueprintStats: { value: string; label: string }[];
  rangeLead: string;
  types: FamilyType[];
  heroImage?: string;
  aboutImage?: string;
  inPlayMatchImage?: string;
  inPlayDetailImage?: string;
}

export const FAMILIES: Record<string, ProductFamily> = {
  taraflex: {
    slug: "taraflex",
    parent: "INDOOR SURFACES",
    index: "PRODUCT 01",
    nameLead: "Taraflex",
    mark: "®",
    tagline:
      "The point-elastic vinyl surface played at every Olympic Games since 1976 — engineered for grip, shock absorption and player safety, now installed across India by Freewill.",
    heroStats: [
      { value: "9.0", unit: "mm", label: "THICKNESS" },
      { value: "53", unit: "%", label: "SHOCK ABS." },
    ],
    aboutTitle: ["A surface that", "gives back."],
    about: [
      "Taraflex is a point-elastic system: it deflects precisely where the foot lands, absorbing impact to protect joints while returning energy for explosive movement. The textured wear-layer delivers controlled grip — never sticky, never slick.",
      "From school multi-sport halls to championship arenas, every roll is delivered from Indian stock and installed by Freewill's own certified crews.",
    ],
    aboutChips: [
      "Point-elastic P1",
      "FIBA · FIVB · BWF",
      "Antibacterial",
      "Low VOC",
      "Made for India climate",
    ],
    blueprintCaption:
      "Every Freewill install begins as a drawing — court geometry, sub-floor build-up and surface spec, set out to international standards before a single roll is laid.",
    blueprintStats: [
      { value: "18×9", label: "COURT (m)" },
      { value: "≥53%", label: "SHOCK ABS." },
      { value: "P1", label: "POINT-ELASTIC" },
    ],
    rangeLead:
      "Six surface builds across the Taraflex family — from cushioned competition to high-traffic multi-use.",
    heroImage: "/assets/product-taraflex.png",
    aboutImage: "/assets/home-about-install.png",
    inPlayMatchImage: "/assets/milestone-1992-taraflex.png",
    inPlayDetailImage: "/assets/home-about-arena.png",
    types: [
      { code: "TFX-01", name: "Sport M Performance", desc: "Cushioned competition surface for elite indoor sport.", spec: "9.0 mm · 53% SA", swatch: "#C9442E" },
      { code: "TFX-02", name: "Sport M Comfort", desc: "Higher comfort build for training halls and academies.", spec: "7.0 mm · 45% SA", swatch: "#2F6BFF" },
      { code: "TFX-03", name: "Evolution", desc: "All-round surface balancing grip, comfort and durability.", spec: "6.2 mm · 35% SA", swatch: "#1FA95B" },
      { code: "TFX-04", name: "Badminton", desc: "BWF-approved shuttle-specific build for dedicated courts.", spec: "7.5 mm · BWF L1", swatch: "#E08A1E" },
      { code: "TFX-05", name: "Bateco", desc: "Heavy-traffic multi-use hall build with indent resistance.", spec: "8.0 mm · ≥38% SA", swatch: "#8FBD1A" },
      { code: "TFX-06", name: "Decibel Acoustic", desc: "Acoustic build cutting impact sound in stacked venues.", spec: "19 dB reduction", swatch: "#5FD0E0" },
    ],
  },
  seating: {
    slug: "seating",
    parent: "SEATING & STADIUM",
    index: "PRODUCT 02",
    nameLead: "Seating Systems",
    mark: "®",
    tagline:
      "Fixed, tip-up and retractable telescopic bleacher seating systems manufactured in Pune — engineered for spectator sightlines, safety and maximum hall flexibility.",
    heroStats: [
      { value: "100K", unit: "+", label: "SEATS INSTALLED" },
      { value: "EN", unit: "13200", label: "SAFETY SPEC" },
    ],
    aboutTitle: ["Built for the", "spectator experience."],
    about: [
      "From foldable bleachers and tip-up stadium chairs to motorized telescopic grandstands, Freewill seating systems combine ergonomic comfort with structural endurance.",
      "Manufactured in Pune with UV-stable polymer shells and hot-dip galvanized steel framing, every installation is custom-engineered for optimal venue sightlines and emergency egress.",
    ],
    aboutChips: [
      "Fixed & Tip-Up",
      "Foldable Bleachers",
      "Telescopic Retractable",
      "UV-Stable Polymer",
      "EN 13200 Certified",
    ],
    blueprintCaption:
      "Telescopic and foldable bleacher engineering — row rise, tread depth, load distribution and motorized retraction mechanisms customized to your venue's structural footprint.",
    blueprintStats: [
      { value: "850", label: "ROW DEPTH (mm)" },
      { value: "350", label: "RISER HEIGHT (mm)" },
      { value: "EN13200", label: "STRUCTURAL SPEC" },
    ],
    rangeLead:
      "Complete spectator seating options from products.json — fixed chairs, foldable bleachers, dugouts and telescopic systems.",
    heroImage: "/assets/product-seating.png",
    aboutImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    inPlayMatchImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    inPlayDetailImage: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1200&q=80",
    types: [
      { code: "ST-01", name: "Foldable Bleacher", desc: "Foldable stepped seating for flexible multi-purpose halls.", spec: "Stepped Foldable · UV Shell", swatch: "#2F6BFF" },
      { code: "ST-02", name: "Fixed Seating System", desc: "Permanent fixed stadium chair seating system.", spec: "Permanent Mount · Ergonomic", swatch: "#C9442E" },
      { code: "ST-03", name: "Demountable Grand Stand", desc: "Modular temporary grandstand seating for outdoor events.", spec: "Demountable · Galvanized Steel", swatch: "#1FA95B" },
      { code: "ST-04", name: "Tip Up Seating System", desc: "Auto-return tip-up seats for spectator arenas.", spec: "Spring Return · VIP Spec", swatch: "#E08A1E" },
      { code: "ST-05", name: "Telescopic Seating System", desc: "Motorized retractable grandstand for multi-court halls.", spec: "Retractable · Motorized", swatch: "#8FBD1A" },
      { code: "ST-06", name: "Player Dugout", desc: "Weather-shielded player dugout benches for sports grounds.", spec: "Polycarbonate Roof · Steel Frame", swatch: "#5FD0E0" },
    ],
  },
  "foldable-bleacher": {
    slug: "foldable-bleacher",
    parent: "SEATING & STADIUM",
    index: "PRODUCT 02",
    nameLead: "Foldable Bleachers",
    mark: "®",
    tagline:
      "Retractable stepped bleacher seating systems manufactured in Pune — engineered for rapid venue transformation, spectator sightlines, and EN 13200 safety compliance.",
    heroStats: [
      { value: "850", unit: "mm", label: "TREAD DEPTH" },
      { value: "EN", unit: "13200", label: "SAFETY SPEC" },
    ],
    aboutTitle: ["Flexible seating", "when you need it."],
    about: [
      "Freewill foldable bleachers allow indoor multi-sport halls to transform from 1,000+ seat spectator arenas into open practice floors in minutes. The smooth nested telescopic mechanism rolls back effort-free against venue walls.",
      "Custom-crafted in Pune with high-impact UV-stable polymer seats, heavy-duty structural steel frames, and non-marking polyurethane wheels that protect indoor sports floors.",
    ],
    aboutChips: [
      "Foldable & Retractable",
      "Motorized Drive Option",
      "EN 13200 Safety Certified",
      "UV-Stable Polymer Seats",
      "Floor-Protective Wheels",
    ],
    blueprintCaption:
      "Telescopic foldable bleacher engineering schematic — row rise, tread depth, structural load distribution, and wall-nesting clearance customized to your venue footprint.",
    blueprintStats: [
      { value: "850", label: "ROW DEPTH (mm)" },
      { value: "350", label: "RISER HEIGHT (mm)" },
      { value: "EN13200", label: "STRUCTURAL SPEC" },
    ],
    rangeLead:
      "Foldable bleacher configurations from products.json — manual push-back banks, motorized arena seating, VIP padded tiers, and outdoor aluminum options.",
    heroImage: "/assets/product-seating.png",
    aboutImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    inPlayMatchImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    inPlayDetailImage: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1200&q=80",
    types: [
      { code: "FLDB-01", name: "Standard Stepped Bleacher", desc: "Manual push-back 4-12 tier bleacher bank.", spec: "Manual Push-Back · 850mm Tread", swatch: "#2F6BFF" },
      { code: "FLDB-02", name: "Motorized Power Bleacher", desc: "Push-button automated telescopic bleacher system.", spec: "Motorized Drive · Auto-Lock", swatch: "#C9442E" },
      { code: "FLDB-03", name: "VIP Padded Bleacher", desc: "Plush upholstered tip-up seats on folding tiers.", spec: "Upholstered Seats · VIP Grade", swatch: "#E08A1E" },
      { code: "FLDB-04", name: "Outdoor Aluminum Bleacher", desc: "Weatherproof aluminum stepped bleachers for fields.", spec: "Anodized Aluminum · All-Weather", swatch: "#1FA95B" },
      { code: "FLDB-05", name: "Recessed Wall Bleacher", desc: "Bleachers that fold flush into wall alcoves when closed.", spec: "Flush Wall Recess · Zero Footprint", swatch: "#5FD0E0" },
    ],
  },
};

export const DEFAULT_FAMILY_SLUG = "taraflex";

export function getFamily(slug: string): ProductFamily | undefined {
  if (FAMILIES[slug]) return FAMILIES[slug];

  const lowerSlug = slug.toLowerCase();
  for (const group of productsData) {
    for (const cat of group.categories) {
      const catSlug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const kickerSlug = cat.kicker.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const titleSlug = cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      if (
        lowerSlug.includes(catSlug) ||
        lowerSlug.includes(kickerSlug) ||
        lowerSlug.includes(titleSlug) ||
        lowerSlug.includes("seating") ||
        lowerSlug.includes("bleacher")
      ) {
        return {
          slug,
          parent: group.title.toUpperCase(),
          index: `PRODUCT ${group.id}`,
          nameLead: cat.title,
          mark: "®",
          tagline: `${cat.categoryDescription} — engineered to international standards and delivered nationwide by Freewill.`,
          heroStats: [
            { value: String(cat.items.length), unit: "+", label: "SYSTEM TYPES" },
            { value: "ISO", unit: "9001", label: "QUALITY CERT" },
          ],
          aboutTitle: ["Engineered for", "elite performance."],
          about: [
            cat.categoryDescription,
            "Supplied directly from ready stocks in India and installed by certified Freewill technical teams.",
          ],
          aboutChips: [cat.kicker, "Made in India", "Competition Spec", "Certified Install"],
          blueprintCaption: `Custom technical schematic and specification for ${cat.name} systems — engineered for durability and athlete performance.`,
          blueprintStats: [
            { value: String(cat.items.length), label: "VARIANTS" },
            { value: "ISO", label: "CERTIFIED" },
            { value: "INDIA", label: "DELIVERY" },
          ],
          rangeLead: `Explore the complete ${cat.name} product range from products.json.`,
          heroImage: "/assets/product-seating.png",
          aboutImage: "/assets/product-seating.png",
          inPlayMatchImage: "/assets/home-about-arena.png",
          inPlayDetailImage: "/assets/home-about-install.png",
          types: cat.items.map((item, idx) => ({
            code: `${cat.kicker.slice(0, 3)}-0${idx + 1}`,
            name: item.name,
            desc: item.spec,
            spec: item.spec,
            swatch: idx % 2 === 0 ? "#2F6BFF" : "#C9442E",
          })),
        };
      }
    }
  }

  return FAMILIES["taraflex"];
}

export function getAllFamilySlugs(): string[] {
  const slugs = new Set<string>(Object.keys(FAMILIES));
  slugs.add("seating");
  slugs.add("bleachers");
  for (const group of productsData) {
    for (const cat of group.categories) {
      slugs.add(cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    }
  }
  return Array.from(slugs);
}
