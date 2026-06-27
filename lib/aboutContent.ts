/** Static content for the redesigned About page ("Freewill About.dc.html"). */

export interface ManifestoWord {
  text: string;
  color: string;
}

export const MANIFESTO_WORDS: ManifestoWord[] = [
  { text: "Freewill", color: "#00687F" }, { text: "is", color: "#111820" }, { text: "the", color: "#111820" },
  { text: "most", color: "#111820" }, { text: "innovative", color: "#00687F" }, { text: "sports", color: "#111820" },
  { text: "infrastructure", color: "#111820" }, { text: "company", color: "#111820" }, { text: "in", color: "#111820" },
  { text: "India,", color: "#1FA95B" }, { text: "making", color: "#111820" }, { text: "a", color: "#111820" },
  { text: "difference", color: "#00687F" }, { text: "in", color: "#111820" }, { text: "the", color: "#111820" },
  { text: "Indian", color: "#111820" }, { text: "sports", color: "#111820" }, { text: "field", color: "#111820" },
  { text: "since", color: "#111820" }, { text: "1990.", color: "#1FA95B" },
];

export interface AboutStat {
  target: number;
  suffix: string;
  label: string;
}

export const ABOUT_STATS: AboutStat[] = [
  { target: 1990, suffix: "", label: "Founded in Pune, India" },
  { target: 35, suffix: "+", label: "Years of expertise" },
  { target: 1000, suffix: "+", label: "Courts & venues delivered" },
  { target: 2019, suffix: "", label: "ASSOCHAM award winner" },
];

export const BRAND_PARTNERS = [
  "BCCI", "IPL", "ISL", "Pro Kabaddi", "SAI", "Sports Authority of India", "AIFF",
  "National Games", "CWG", "Asian Games", "Olympic Council of India", "Indian Badminton Association",
];

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export const ABOUT_TIMELINE: TimelineItem[] = [
  { year: "1990", title: "Freewill is Born", desc: "Liyakat Shaikh and Rajesh Kharabanda join hands with one mission — to bring the world's best sports infrastructure to India." },
  { year: "1992", title: "On the World Stage", desc: "Freewill associates with India's biggest events — the National Games, Commonwealth Youth Games and South Asian Games." },
  { year: "1996", title: "Made in India", desc: "Domestic manufacturing of stadium seating and sports fencing begins, setting new benchmarks for Indian venues." },
  { year: "2001", title: "India's Surface Leader", desc: "Freewill becomes the leading supplier of international-standard surfaces for indoor and outdoor games nationwide." },
  { year: "2008", title: "A Landmark Decade", desc: "500+ courts and facilities installed, trusted by national federations and elite training centres." },
  { year: "2015", title: "Taraflex® Comes to India", desc: "Freewill becomes the exclusive Taraflex® partner in India — the Olympic-standard surface since 1976." },
  { year: "2019", title: "Best Sports Technology", desc: "ASSOCHAM honours Freewill for its outstanding contribution to sports infrastructure in India." },
];

export interface Award {
  year: string;
  title: string;
  org: string;
}

export const AWARDS: Award[] = [
  { year: "2019", title: "Best Sports Technology", org: "ASSOCHAM National Award" },
  { year: "1992→", title: "National Games", org: "Sports Infrastructure Partner" },
  { year: "—", title: "Commonwealth Youth Games", org: "Surfaces & Stadium Seating" },
  { year: "—", title: "South Asian Games", org: "Sports Infrastructure" },
];

export interface Founder {
  name: string;
  role: string;
  bio: string;
}

export const FOUNDERS: Founder[] = [
  { name: "Liyakat Shaikh", role: "Managing Director", bio: "A pioneer in Indian sports infrastructure, Liyakat has led Freewill's growth from a sports equipment supplier into India's most innovative sports infrastructure company over 35 years." },
  { name: "Rajesh Kharabanda", role: "Chairman, Freewill Group", bio: "With decades of strategic leadership in sports and business, Rajesh provides the vision that has made Freewill a trusted name across every tier of Indian sport." },
];

export interface Employee {
  name: string;
  role: string;
}

export const EMPLOYEES: Employee[] = [
  { name: "Sales Lead", role: "Business Development" },
  { name: "Technical Head", role: "Installation & Quality" },
  { name: "Design Lead", role: "Court & Venue Design" },
  { name: "Project Manager", role: "Operations" },
];
