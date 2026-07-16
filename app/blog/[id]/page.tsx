import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import BlogPostView from "@/components/blog/BlogPostView";
import { POSTS, getPost, relatedPosts } from "@/lib/blogContent";

interface BlogSinglePageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render one static page per post. */
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: BlogSinglePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found · Freewill" };

  return {
    title: `${post.title} · Freewill Blog`,
    description: post.excerpt,
  };
}

/** Freewill Blog (single) — one evergreen article. */
export default async function BlogSinglePage({ params }: BlogSinglePageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const related = relatedPosts(slug);

  return (
    <div className="overflow-x-clip bg-cream text-[#181A20]">
      <SiteHeader solid />
      <main>
        <BlogPostView post={post} related={related} />
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
