/**
 * Renders CMS-authored News/Blog content. The HTML is sanitized upstream by
 * `sanitizeArticleHtml` (see `lib/api/news.ts` / `lib/api/blogs.ts`), which
 * strips scripts, event handlers and non-http URLs before it reaches here.
 * Typography lives in the `.fw-article` block in `app/globals.css`.
 */
export default function ArticleBody({ html }: { html: string }) {
  return <div className="fw-article" dangerouslySetInnerHTML={{ __html: html }} />;
}
