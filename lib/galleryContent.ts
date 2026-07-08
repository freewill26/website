/**
 * Content for the Gallery screen — a filterable masonry of project photos and
 * films. Real media isn't bundled with this port, so each item renders a
 * branded placeholder; video items reuse the `lulu.mp4` stand-in.
 */

export type GalleryType = "image" | "video";

export interface GalleryItem {
  id: number;
  category: string;
  type: GalleryType;
  title: string;
  location: string;
  /** Masonry tile height (varies for a staggered column layout). */
  height: number;
  /** Video runtime label, e.g. "1:24". */
  duration?: string;
  videoSrc?: string;
  image?: string;
}

const VIDEO = "/assets/lulu.mp4";

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, category: "Multi-Sport Facilities", type: "image", title: "Shiv Chhatrapati Complex", location: "Balewadi, Pune", height: 340, image: "/assets/home-about-arena.png" },
  { id: 2, category: "Basketball Courts", type: "video", title: "Maple Pro Install", location: "Bengaluru, Karnataka", height: 420, duration: "1:24", videoSrc: VIDEO, image: "/assets/product-maple.png" },
  { id: 3, category: "Synthetic Tracks", type: "image", title: "8-Lane Athletics Track", location: "Guwahati, Assam", height: 300, image: "/assets/product-track.png" },
  { id: 4, category: "Acrylic Courts", type: "image", title: "Acrylic Hard Court", location: "Chennai, Tamil Nadu", height: 380, image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80" },
  { id: 5, category: "Tennis Courts", type: "image", title: "Centre Court Resurface", location: "New Delhi", height: 300, image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80" },
  { id: 6, category: "Indoor Sports Flooring", type: "video", title: "Taraflex Roll-Out", location: "Mumbai, Maharashtra", height: 360, duration: "0:48", videoSrc: VIDEO, image: "/assets/product-taraflex.png" },
  { id: 7, category: "Pickleball Courts", type: "image", title: "Cushioned Pickleball", location: "Hyderabad, Telangana", height: 430, image: "/assets/product-pickleball.png" },
  { id: 8, category: "Basketball Courts", type: "image", title: "FIBA Show Court", location: "Pune, Maharashtra", height: 320, image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80" },
  { id: 9, category: "Multi-Sport Facilities", type: "image", title: "Indoor Arena Fit-Out", location: "Kochi, Kerala", height: 300, image: "/assets/product-seating.png" },
  { id: 10, category: "Acrylic Courts", type: "video", title: "PU Court Line Marking", location: "Ahmedabad, Gujarat", height: 380, duration: "1:02", videoSrc: VIDEO, image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80" },
  { id: 11, category: "Tennis Courts", type: "image", title: "Clay-Look Acrylic", location: "Jaipur, Rajasthan", height: 340, image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80" },
  { id: 12, category: "Synthetic Tracks", type: "image", title: "Warm-Up Track", location: "Bhubaneswar, Odisha", height: 300, image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80" },
  { id: 13, category: "Indoor Sports Flooring", type: "image", title: "Badminton Wood-Look", location: "Lucknow, UP", height: 410, image: "/assets/milestone-1992-taraflex.png" },
  { id: 14, category: "Pickleball Courts", type: "image", title: "Rooftop Pickleball", location: "Gurugram, Haryana", height: 320, image: "/assets/product-pickleball.png" },
  { id: 15, category: "Multi-Sport Facilities", type: "image", title: "University Sports Hub", location: "Manipal, Karnataka", height: 360, image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80" },
];

/** Filter order shown in the chip bar ("All" first). */
export const GALLERY_CATEGORIES = [
  "All",
  "Acrylic Courts",
  "Synthetic Tracks",
  "Basketball Courts",
  "Tennis Courts",
  "Pickleball Courts",
  "Indoor Sports Flooring",
  "Multi-Sport Facilities",
];

const DOTS: Record<string, string> = {
  "Multi-Sport Facilities": "#00687F",
  "Basketball Courts": "#C9442E",
  "Synthetic Tracks": "#8FBD1A",
  "Acrylic Courts": "#2D6A3F",
  "Tennis Courts": "#1FA95B",
  "Indoor Sports Flooring": "#5FD0E0",
  "Pickleball Courts": "#E08A1E",
};

/** Accent dot colour for a category. */
export function dotFor(category: string): string {
  return DOTS[category] ?? "#00687F";
}

/** Count of items in a category ("All" = everything). */
export function countFor(category: string): number {
  return category === "All"
    ? GALLERY_ITEMS.length
    : GALLERY_ITEMS.filter((i) => i.category === category).length;
}
