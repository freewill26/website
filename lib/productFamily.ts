/**
 * Product family overviews — the "Freewill Product" screen (the middle page
 * between the Products index and a Product Type detail). Each family bundles a
 * hero, an "about" blurb and the set of types it contains. Types link through to
 * the Product Type detail pages (`/products/[family]/[code]`).
 */

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
    types: [
      { code: "TFX-01", name: "Sport M Performance", desc: "Cushioned competition surface for elite indoor sport.", spec: "9.0 mm · 53% SA", swatch: "#C9442E" },
      { code: "TFX-02", name: "Sport M Comfort", desc: "Higher comfort build for training halls and academies.", spec: "7.0 mm · 45% SA", swatch: "#2F6BFF" },
      { code: "TFX-03", name: "Evolution", desc: "All-round surface balancing grip, comfort and durability.", spec: "6.2 mm · 35% SA", swatch: "#1FA95B" },
      { code: "TFX-04", name: "Badminton", desc: "BWF-approved shuttle-specific build for dedicated courts.", spec: "7.5 mm · BWF L1", swatch: "#E08A1E" },
      { code: "TFX-05", name: "Bateco", desc: "Heavy-traffic multi-use hall build with indent resistance.", spec: "8.0 mm · ≥38% SA", swatch: "#8FBD1A" },
      { code: "TFX-06", name: "Decibel Acoustic", desc: "Acoustic build cutting impact sound in stacked venues.", spec: "19 dB reduction", swatch: "#5FD0E0" },
    ],
  },
};

export const DEFAULT_FAMILY_SLUG = "taraflex";

export function getFamily(slug: string): ProductFamily | undefined {
  return FAMILIES[slug];
}

export function getAllFamilySlugs(): string[] {
  return Object.keys(FAMILIES);
}
