import { FwReveal } from "@/components/site/FwReveal";
import BlogCard from "@/components/blog/BlogCard";
import { POSTS_SORTED } from "@/lib/blogContent";

/** Blog index body — a featured lead post above a three-up card grid. */
export default function BlogGrid() {
  const [lead, ...rest] = POSTS_SORTED;

  return (
    <section
      className="box-border bg-cream px-[6vw]"
      style={{ paddingBlock: "0 clamp(72px,9vw,140px)" }}
    >
      {lead && (
        <FwReveal className="pb-5">
          <BlogCard post={lead} variant="feature" />
        </FwReveal>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <FwReveal key={post.slug} className="h-full">
            <BlogCard post={post} />
          </FwReveal>
        ))}
      </div>
    </section>
  );
}
