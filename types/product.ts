/** A single key/value figure shown in the hero stats panel. */
export interface KeyStat {
  label: string;
  value: string;
}

/** A product highlight card (icon + tag + title + detail). */
export interface Highlight {
  tag: string;
  title: string;
  detail: string;
}

/** A row in the technical datasheet. */
export interface Spec {
  label: string;
  value: string;
}

/** A compact "related type" card shown at the bottom of the page. */
export interface RelatedType {
  code: string;
  name: string;
  desc: string;
  spec: string;
  swatch: string;
}

/** Full product-type record rendered on the detail page. */
export interface Product {
  code: string;
  category: string;
  /** Full display name, e.g. "Sport M Performance". */
  name: string;
  /** Hero headline, split across two lines. */
  nameL1: string;
  nameL2: string;
  /** Accent colour for swatches/headline emphasis. */
  swatch: string;
  tagline: string;
  description: string;
  description2: string;
  keyStats: KeyStat[];
  highlights: Highlight[];
  specs: Spec[];
  certs: string[];
}
