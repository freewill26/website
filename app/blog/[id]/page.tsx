import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import BlogPostView from "@/components/blog/BlogPostView";
import { getBlogArticle, getRelatedBlogs } from "@/lib/api/blogs";

interface BlogSinglePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BlogSinglePageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogArticle(id);
  if (!post) return { title: "Post not found · Freewill" };

  return {
    title: post.seo.title,
    description: post.seo.description,
    openGraph: {
      title: post.seo.ogTitle,
      description: post.seo.ogDescription,
      ...(post.seo.ogImage ? { images: [post.seo.ogImage] } : {}),
    },
  };
}

/**
 * Real, DB-backed blog post — reached from a card on the Blog index
 * (`/blog/[id]`). Both the post and its related rail come straight from the
 * service API.
 */
export default async function BlogSinglePage({ params }: BlogSinglePageProps) {
  const { id } = await params;
  const post = await getBlogArticle(id);

  if (!post) notFound();

  const related = await getRelatedBlogs(id);

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
