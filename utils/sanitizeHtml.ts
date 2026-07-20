/**
 * Sanitizes CMS-authored rich text before it is rendered via
 * `dangerouslySetInnerHTML`. Runs in both the SSR (Node) and browser passes
 * through `isomorphic-dompurify`.
 *
 * The rich text our CMS produces is only ever coloured/emphasised inline copy,
 * so we allow a tight set of formatting tags plus `style`/`class` (DOMPurify
 * still filters the CSS itself). Everything else — scripts, event handlers,
 * `javascript:` URLs, arbitrary tags — is stripped.
 */
import DOMPurify from "isomorphic-dompurify";
import { slugify } from "@/lib/utils";

const ALLOWED_ATTR = ["style", "class"];
// No links/media in this content, so forbid URL-bearing attributes outright.
const FORBID_ATTR = ["href", "src", "srcset"];

export function sanitizeRichText(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["span", "b", "strong", "i", "em", "u", "mark", "br", "p"],
    ALLOWED_ATTR,
    FORBID_ATTR,
  });
}

/**
 * Like {@link sanitizeRichText} but for single-line contexts (headings) where a
 * block tag like `<p>` would be invalid markup. Block tags are dropped —
 * DOMPurify keeps their text/inline content — leaving only inline formatting.
 */
export function sanitizeInlineRichText(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["span", "b", "strong", "i", "em", "u", "mark", "br"],
    ALLOWED_ATTR,
    FORBID_ATTR,
  });
}

/**
 * Sanitizes short rich-text bodies that need block structure — product
 * specification blocks, whose copy is mostly bullet lists. Wider than
 * {@link sanitizeRichText} (which allows inline emphasis only), narrower than
 * {@link sanitizeArticleHtml}: no images, tables or anchors, since these blocks
 * render inside a fixed column beside their own illustration.
 */
export function sanitizeBlockHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p", "br", "span", "strong", "b", "em", "i", "u", "s", "mark",
      "ul", "ol", "li", "h3", "h4", "blockquote",
    ],
    ALLOWED_ATTR: ["style", "class"],
    FORBID_ATTR: ["href", "src", "srcset"],
  });
}

export interface ArticleHeading {
  id: string;
  label: string;
}

// The CMS editor offers every heading level, so all six must be allowed —
// a stripped tag keeps its text but loses the styling, rendering as body copy.
const ARTICLE_ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "span", "figure", "figcaption",
  "strong", "b", "em", "i", "u", "s", "mark",
  "ul", "ol", "li", "a", "img", "blockquote", "hr", "code", "pre",
  "table", "thead", "tbody", "tr", "th", "td",
];
const ARTICLE_ALLOWED_ATTR = ["style", "class", "id", "href", "target", "rel", "src", "alt"];

/**
 * Sanitizes News/Blog article HTML (the CMS `content` field) for full-body
 * rendering — a wider tag set than {@link sanitizeRichText}, since articles
 * come from a full Tiptap editor (headings, lists, links, images, tables),
 * not just inline emphasis. Also assigns slug `id`s to the top-level headings
 * and returns them as a table of contents: the editor emits none of its own,
 * and the reading-progress rail needs anchors to scroll to. h4–h6 are skipped
 * as too granular for the rail.
 */
const TOC_HEADINGS = new Set(["H1", "H2", "H3"]);

export function sanitizeArticleHtml(html: string): { html: string; headings: ArticleHeading[] } {
  const headings: ArticleHeading[] = [];
  const seen = new Set<string>();

  const assignHeadingId = (node: Node) => {
    const el = node as Element;
    if (!TOC_HEADINGS.has(el.tagName)) return;
    const text = el.textContent?.trim();
    if (!text) return;
    const base = slugify(text);
    let id = base;
    let n = 2;
    while (seen.has(id)) id = `${base}-${n++}`;
    seen.add(id);
    el.setAttribute("id", id);
    headings.push({ id, label: text });
  };

  DOMPurify.addHook("uponSanitizeElement", (node) => assignHeadingId(node));
  const cleanHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ARTICLE_ALLOWED_TAGS,
    ALLOWED_ATTR: ARTICLE_ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^https?:\/\//i,
  });
  DOMPurify.removeHook("uponSanitizeElement");

  return { html: cleanHtml, headings };
}
