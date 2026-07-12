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
