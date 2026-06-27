import Link from "next/link";
import { FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";
import NewsCard from "@/components/news/NewsCard";
import ReadingProgress from "@/components/site/ReadingProgress";
import ShareBar from "@/components/site/ShareBar";
import TableOfContents, { type TocItem } from "@/components/site/TableOfContents";
import Newsletter from "@/components/site/Newsletter";
import { slugify } from "@/lib/utils";
import type { NewsArticle as Article } from "@/lib/newsContent";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";

interface NewsArticleProps {
  article: Article;
  related: Article[];
}

/** Initials for the byline avatar, e.g. "Freewill Projects Desk" → "FP". */
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Single news article screen — editorial layout with sticky share/TOC rail. */
export default function NewsArticle({ article, related }: NewsArticleProps) {
  // Build anchor targets + table-of-contents entries from the body headings.
  const toc: TocItem[] = article.body
    .filter((b) => b.heading)
    .map((b) => ({ id: slugify(b.heading as string), label: b.heading as string }));

  return (
    <>
      <ReadingProgress />

      {/* Header */}
      <section
        className="box-border bg-cream px-[6vw]"
        style={{ paddingBlock: "clamp(120px,13vw,180px) clamp(28px,4vw,52px)", scrollMarginTop: "104px" }}
      >
        {/* Breadcrumb */}
        <FwReveal as="nav" aria-label="Breadcrumb">
          <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-[11px] font-semibold tracking-[0.1em] text-[#181A20]/45">
            <li>
              <Link href="/" className="no-underline transition-colors hover:text-brand">
                HOME
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/news" className="no-underline transition-colors hover:text-brand">
                NEWS
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="max-w-[52vw] truncate text-[#181A20]/70 sm:max-w-none">
              {article.cat}
            </li>
          </ol>
        </FwReveal>

        <FwReveal className="mb-5 mt-7 flex items-center gap-3">
          <span className="rounded-full bg-brand px-3 py-[7px] text-[10px] font-bold tracking-[0.14em] text-white">
            {article.cat}
          </span>
          <span className="text-xs font-semibold tracking-[0.1em] text-[#181A20]/50">
            {article.date}
          </span>
          <span className="block h-1 w-1 rounded-full bg-[#181A20]/25" />
          <span className="text-xs font-semibold tracking-[0.1em] text-[#181A20]/50">
            {article.readMins} MIN READ
          </span>
        </FwReveal>

        <FwReveal
          as="h1"
          className="m-0 max-w-[940px] font-display uppercase leading-[0.96] text-[#181A20]"
          style={{ fontSize: "clamp(38px,5.4vw,86px)", textWrap: "balance" }}
        >
          {article.title}
        </FwReveal>

        <FwReveal
          as="p"
          className="m-0 mt-6 max-w-[760px] font-medium leading-[1.55] text-[#181A20]/[0.62]"
          style={{ fontSize: "clamp(18px,1.9vw,23px)" }}
        >
          {article.excerpt}
        </FwReveal>

        {/* Byline + share */}
        <FwReveal
          className="mt-9 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t pt-6"
          style={{ borderColor: "rgba(24,26,32,0.1)" }}
        >
          <div className="flex items-center gap-3.5">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-[13px] font-bold tracking-[0.04em] text-white"
              aria-hidden
            >
              {initials(article.author)}
            </span>
            <div className="leading-tight">
              <div className="text-[14px] font-bold text-[#181A20]">
                {article.author}
              </div>
              <div className="mt-0.5 text-[12px] text-[#181A20]/50">
                {article.location} · {article.date}
              </div>
            </div>
          </div>
          <ShareBar title={article.title} />
        </FwReveal>
      </section>

      {/* Hero image */}
      <section className="box-border bg-cream px-[6vw]">
        <FwReveal>
          <figure className="m-0">
            <ImageSlot
              label={article.imageLabel}
              shape="rounded"
              className="aspect-[16/8] w-full"
              style={{ borderRadius: "18px" }}
            />
            <figcaption className="mt-3 text-[12px] italic leading-[1.5] text-[#181A20]/45">
              {article.imageLabel} — {article.location}. Photography: Freewill.
            </figcaption>
          </figure>
        </FwReveal>
      </section>

      {/* Body */}
      <section
        className="box-border bg-cream px-[6vw]"
        style={{ paddingBlock: "clamp(40px,5vw,72px) clamp(64px,8vw,120px)" }}
      >
        <div className="mx-auto grid max-w-[1100px] gap-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
          <FwReveal as="article" className="min-w-0">
            {article.body.map((block, i) => (
              <div
                key={i}
                id={block.heading ? slugify(block.heading) : undefined}
                className="mb-9"
                style={{ scrollMarginTop: "120px" }}
              >
                {block.heading && (
                  <h2 className="m-0 mb-4 font-display text-[clamp(22px,2.4vw,32px)] uppercase leading-[1.1] text-[#181A20]">
                    {block.heading}
                  </h2>
                )}
                {block.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className={`m-0 mb-5 text-[17px] leading-[1.85] text-[#181A20]/[0.74] ${
                      i === 0 && j === 0
                        ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[64px] first-letter:leading-[0.78] first-letter:text-brand"
                        : ""
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}

            {article.quote && (
              <blockquote
                className="my-12 border-l-2 pl-7"
                style={{ borderColor: "#00687F" }}
              >
                <p className="m-0 mb-4 font-display text-[clamp(24px,3vw,38px)] uppercase leading-[1.15] text-[#181A20]">
                  &ldquo;{article.quote.text}&rdquo;
                </p>
                <cite className="text-xs font-bold not-italic tracking-[0.16em] text-brand">
                  — {article.quote.attribution}
                </cite>
              </blockquote>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div
                className="mt-10 flex flex-wrap items-center gap-2.5 border-t pt-7"
                style={{ borderColor: "rgba(24,26,32,0.1)" }}
              >
                <span className="mr-1 text-[11px] font-bold tracking-[0.18em] text-[#181A20]/45">
                  TAGS
                </span>
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-3.5 py-1.5 text-[12px] font-semibold text-[#181A20]/70"
                    style={{ borderColor: "rgba(24,26,32,0.16)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Foot share */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/news"
                className="text-xs font-bold tracking-[0.12em] text-brand no-underline transition-colors hover:text-[#004E5F]"
              >
                <span className="inline-flex items-center gap-2"><ArrowLeftIcon size={12} color="00687F" /> BACK TO NEWS</span>
              </Link>
              <ShareBar title={article.title} />
            </div>
          </FwReveal>

          {/* Sticky aside: TOC, key facts, CTA */}
          <FwReveal as="aside" className="lg:pt-2">
            <div className="flex flex-col gap-7 lg:sticky lg:top-[120px]">
              {toc.length > 0 && (
                <div
                  className="hidden rounded-[18px] bg-white p-7 lg:block"
                  style={{ border: "1px solid rgba(24,26,32,0.08)" }}
                >
                  <TableOfContents items={toc} />
                </div>
              )}

              {article.facts && article.facts.length > 0 && (
                <div
                  className="rounded-[18px] bg-white p-7"
                  style={{ border: "1px solid rgba(24,26,32,0.08)" }}
                >
                  <div className="mb-5 text-[11px] font-bold tracking-[0.22em] text-[#181A20]/45">
                    KEY FACTS
                  </div>
                  <dl className="m-0 flex flex-col gap-4">
                    {article.facts.map((f) => (
                      <div
                        key={f.k}
                        className="flex items-baseline justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                        style={{ borderColor: "rgba(24,26,32,0.08)" }}
                      >
                        <dt className="text-[13px] text-[#181A20]/55">{f.k}</dt>
                        <dd className="m-0 text-right font-display text-[20px] uppercase leading-none text-[#181A20]">
                          {f.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <Link
                href="/contact"
                className="block rounded-[18px] bg-brand p-7 no-underline transition-colors hover:bg-[#004E5F]"
              >
                <div className="font-display text-[22px] uppercase leading-[1.05] text-white">
                  Start your project
                </div>
                <span className="mt-3 inline-block text-xs font-bold tracking-[0.12em] text-white/85">
                  <span className="inline-flex items-center gap-2">GET A FREE ESTIMATE <ArrowRightIcon size={12} /></span>
                </span>
              </Link>
            </div>
          </FwReveal>
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="box-border bg-cream px-[6vw]"
        style={{ paddingBlock: "0 clamp(64px,8vw,110px)" }}
      >
        <FwReveal>
          <Newsletter />
        </FwReveal>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section
          className="box-border bg-white px-[6vw]"
          style={{ paddingBlock: "clamp(64px,8vw,120px)" }}
        >
          <FwReveal className="mb-[clamp(28px,4vw,48px)] flex flex-wrap items-end justify-between gap-5">
            <h2 className="m-0 font-display text-[clamp(28px,3.4vw,52px)] uppercase leading-none text-[#181A20]">
              More from the newsroom
            </h2>
            <Link
              href="/news"
              className="rounded-full border px-[26px] py-3.5 text-[13px] font-bold tracking-[0.1em] text-[#181A20] no-underline transition-colors hover:border-brand hover:text-brand"
              style={{ borderColor: "rgba(24,26,32,0.32)" }}
            >
              <span className="inline-flex items-center gap-2">ALL NEWS <ArrowRightIcon size={13} color="181A20" /></span>
            </Link>
          </FwReveal>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <FwReveal key={r.slug} className="h-full">
                <NewsCard article={r} />
              </FwReveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
