import Link from "next/link";
import { FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";
import ArticleBody from "@/components/site/ArticleBody";
import BlogCard from "@/components/blog/BlogCard";
import ReadingProgress from "@/components/site/ReadingProgress";
import ShareBar from "@/components/site/ShareBar";
import TableOfContents from "@/components/site/TableOfContents";
import Newsletter from "@/components/site/Newsletter";
import type { BlogArticleVM, BlogCardVM } from "@/lib/api/blogs";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";

interface BlogPostViewProps {
  post: BlogArticleVM;
  related: BlogCardVM[];
}

/** Single blog post screen — editorial layout with sticky share/TOC rail. */
export default function BlogPostView({ post, related }: BlogPostViewProps) {
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
              <Link href="/blog" className="no-underline transition-colors hover:text-brand">
                BLOG
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="max-w-[52vw] truncate text-[#181A20]/70 sm:max-w-none">
              {post.topic}
            </li>
          </ol>
        </FwReveal>

        <FwReveal className="mb-5 mt-7 flex items-center gap-3">
          <span className="rounded-full bg-brand px-3 py-[7px] text-[10px] font-bold tracking-[0.14em] text-white">
            {post.topic}
          </span>
          <span className="text-xs font-semibold tracking-[0.1em] text-[#181A20]/50">
            {post.date}
          </span>
          <span className="block h-1 w-1 rounded-full bg-[#181A20]/25" />
          <span className="text-xs font-semibold tracking-[0.1em] text-[#181A20]/50">
            {post.readMins} MIN READ
          </span>
        </FwReveal>

        <FwReveal
          as="h1"
          className="m-0 max-w-[940px] font-display uppercase leading-[0.96] text-[#181A20]"
          style={{ fontSize: "clamp(38px,5.4vw,86px)", textWrap: "balance" }}
        >
          {post.title}
        </FwReveal>

        <FwReveal
          as="p"
          className="m-0 mt-6 max-w-[760px] font-medium leading-[1.55] text-[#181A20]/[0.62]"
          style={{ fontSize: "clamp(18px,1.9vw,23px)" }}
        >
          {post.excerpt}
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
              FW
            </span>
            <div className="leading-tight">
              <div className="text-[14px] font-bold text-[#181A20]">Freewill Team</div>
              <div className="mt-0.5 text-[12px] text-[#181A20]/50">{post.date}</div>
            </div>
          </div>
          <ShareBar title={post.title} />
        </FwReveal>
      </section>

      {/* Hero image */}
      <section className="box-border bg-cream px-[6vw]">
        <FwReveal>
          <figure className="m-0">
            <ImageSlot
              label={post.imageAlt}
              src={post.image ?? undefined}
              shape="rounded"
              className="aspect-[16/8] w-full"
              style={{ borderRadius: "18px" }}
            />
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
            <ArticleBody html={post.bodyHtml} />

            {/* Foot share */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/blog"
                className="text-xs font-bold tracking-[0.12em] text-brand no-underline transition-colors hover:text-[#004E5F]"
              >
                <span className="inline-flex items-center gap-2"><ArrowLeftIcon size={12} color="00687F" /> BACK TO BLOG</span>
              </Link>
              <ShareBar title={post.title} />
            </div>
          </FwReveal>

          {/* Sticky aside: TOC + CTA */}
          <FwReveal as="aside" className="lg:pt-2">
            <div className="flex flex-col gap-7 lg:sticky lg:top-[124px]">
              {post.toc.length > 0 && (
                <div
                  className="hidden rounded-[18px] bg-white p-7 lg:block"
                  style={{ border: "1px solid rgba(24,26,32,0.08)" }}
                >
                  <TableOfContents items={post.toc} />
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
              More from the blog
            </h2>
            <Link
              href="/blog"
              className="rounded-full border px-[26px] py-3.5 text-[13px] font-bold tracking-[0.1em] text-[#181A20] no-underline transition-colors hover:border-brand hover:text-brand"
              style={{ borderColor: "rgba(24,26,32,0.32)" }}
            >
              <span className="inline-flex items-center gap-2">ALL ARTICLES <ArrowRightIcon size={13} color="181A20" /></span>
            </Link>
          </FwReveal>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <FwReveal key={r.id} className="h-full">
                <BlogCard post={r} />
              </FwReveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
