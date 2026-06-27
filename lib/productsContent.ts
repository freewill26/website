/**
 * Content for the "Freewill Products" index (Page A) — four product categories,
 * each a horizontal rail of cards. Every card links through to a Product family
 * overview (Freewill Product), whose type cards then open a Product Type detail
 * (Page B). Only the Taraflex family has detail pages today, so every card
 * points there.
 */
import { DEFAULT_FAMILY } from "@/lib/navigation";

export interface RailCard {
  title: string;
  desc: string;
  tag: string;
  isVideo?: boolean;
  ph: string;
  /** Product family this card opens (`/products/[family]`). */
  family: string;
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

const card = (
  title: string,
  desc: string,
  tag: string,
  ph: string,
  isVideo = false,
): RailCard => ({ title, desc, tag, ph, isVideo, family: DEFAULT_FAMILY });

export const CATEGORIES: ProductCategory[] = [
  {
    n: 1,
    idx: "01",
    kicker: "INDOOR SURFACES",
    title: "Indoor Surfaces",
    tone: "cream",
    lead: "Competition-grade indoor flooring — the exact systems specified for Olympic and world-championship halls, delivered and installed across India.",
    cards: [
      card("Taraflex Sports Vinyl", "Gerflor Taraflex — the official surface of Olympic volleyball, handball and badminton. Shock-absorbing, FIBA/FIVB certified.", "FLAGSHIP", "Taraflex court"),
      card("Floating Maple Courts", "Connor Sports floating hardwood maple — the NBA-grade basketball surface, sprung for performance and player safety.", "HARDWOOD", "Maple court"),
      card("Multi-Sport Halls", "Combination systems engineered for schools and academies — one floor, many sports, line-marked to spec.", "MULTI-USE", "Multi-sport hall", true),
      card("Acoustic & Sub-floors", "Engineered sub-floor and underlay systems for vibration, acoustics and moisture control beneath any court.", "SYSTEMS", "Sub-floor"),
      card("Dance & Studio Floors", "Roll-out performance and studio surfaces with the right grip and give for training spaces.", "STUDIO", "Studio floor"),
    ],
  },
  {
    n: 2,
    idx: "02",
    kicker: "OUTDOOR SURFACES",
    title: "Outdoor Surfaces",
    tone: "white",
    lead: "All-weather outdoor systems built to endure the Indian climate — from synthetic athletics tracks to multisport turf and modular court tiles.",
    cards: [
      card("Synthetic Athletics Tracks", "IAAF-grade running tracks — full-pour and prefabricated, engineered for grip, drainage and longevity.", "TRACK", "Athletics track"),
      card("JutaGrass Artificial Turf", "End-to-end turf for hockey, football and multisport — supply, base works and installation included.", "TURF", "Artificial turf"),
      card("Modular Court Tiles", "Interlocking sport-court tiles for outdoor basketball, tennis and pickleball — fast to lay, easy to maintain.", "MODULAR", "Court tiles", true),
      card("Acrylic Hard Courts", "Cushioned and standard acrylic systems for tennis and basketball, colour-coded to competition standards.", "ACRYLIC", "Acrylic court"),
      card("Drainage & Base Works", "Civil base, sub-base and drainage packages that keep outdoor surfaces playable in every season.", "CIVIL", "Base works"),
    ],
  },
  {
    n: 3,
    idx: "03",
    kicker: "SEATING & STRUCTURES",
    title: "Seating & Structures",
    tone: "cream",
    lead: "Spectator seating and arena structures manufactured in Pune — over 100,000 seats installed, plus the structures that frame the field of play.",
    cards: [
      card("Telescopic Seating", "Retractable telescopic grandstands that fold away to free the floor — engineered and installed in-house.", "RETRACTABLE", "Telescopic seating"),
      card("Tip-Up Stadium Seats", "Durable UV-stable tip-up seating in club and VIP grades, colour-matched to your brand.", "SEATING", "Stadium seats"),
      card("Climbing Walls", "IFSC-spec lead, speed and bouldering walls — design, fabrication and certified installation.", "VERTICAL", "Climbing wall", true),
      card("Grandstand Structures", "Modular spectator structures and canopies for outdoor venues and temporary events.", "STRUCTURE", "Grandstand"),
      card("Dividers & Netting", "Retractable hall dividers, safety netting and curtain systems for multi-court venues.", "FIT-OUT", "Hall divider"),
    ],
  },
  {
    n: 4,
    idx: "04",
    kicker: "EQUIPMENT & PICKLEBALL",
    title: "Equipment & Pickleball",
    tone: "white",
    lead: "Competition apparatus and field equipment — FIG-approved gymnastics gear, aluminium goal systems, scoreboards, and our new dedicated pickleball division.",
    cards: [
      card("Pickleball Courts", "India's complete pickleball package — cushioned surface, net systems and line-marking, install included.", "NEW", "Pickleball court"),
      card("Gymnastics Apparatus", "FIG-approved Spieth and Janssen-Fritsen competition apparatus for academies and championship halls.", "FIG", "Gymnastics apparatus"),
      card("Goal Posts & Field Gear", "India's first international-grade aluminium goal posts, plus field equipment for hockey and football.", "FIELD", "Goal posts", true),
      card("Scoreboards & Timing", "Bodet display and timing systems — from training clocks to full competition scoreboards.", "TIMING", "Scoreboard"),
      card("Court Equipment", "Hoops, posts, nets and referee systems for basketball, volleyball and badminton.", "INDOOR", "Court equipment"),
    ],
  },
];
