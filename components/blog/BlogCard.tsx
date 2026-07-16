import Link from "next/link";
import ImageSlot from "@/components/site/ImageSlot";
import type { BlogCardVM } from "@/lib/api/blogs";
import { ArrowRightIcon } from "@/components/ui/icons";

interface BlogCardProps {
  post: BlogCardVM;
  /** `feature` renders a larger horizontal lead card. */
  variant?: "default" | "feature";
}

/** Editorial blog card linking through to the single post screen. */
export default function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const feature = variant === "feature";

  return (
    <Link
      href={`/blog/${post.id}`}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-white no-underline transition-colors hover:border-brand/50 ${
        feature ? "md:flex-row" : ""
      }`}
      style={{ border: "1px solid rgba(24,26,32,0.08)" }}
    >
      <div
        className={`relative overflow-hidden ${
          feature ? "aspect-[16/10] md:aspect-auto md:w-[54%]" : "aspect-[16/10]"
        }`}
      >
        <ImageSlot
          label={post.imageAlt}
          src={post.image ?? undefined}
          className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-brand px-3 py-[7px] text-[10px] font-bold tracking-[0.14em] text-white">
          {post.topic}
        </span>
      </div>
      <div className={`flex flex-1 flex-col ${feature ? "p-[clamp(28px,3vw,44px)]" : "p-[26px]"}`}>
        <div className="mb-3 flex items-center gap-3 text-xs font-semibold tracking-[0.1em] text-[#181A20]/50">
          <span>{post.date}</span>
          <span className="block h-1 w-1 rounded-full bg-[#181A20]/25" />
          <span>{post.readMins} MIN READ</span>
        </div>
        <h3
          className={`m-0 mb-3 font-display uppercase leading-[1.12] text-[#181A20] ${
            feature ? "text-[clamp(26px,3vw,40px)]" : "text-[23px]"
          }`}
        >
          {post.title}
        </h3>
        <p
          className={`m-0 mb-5 leading-[1.75] text-[#181A20]/[0.62] ${
            feature ? "max-w-[460px] text-[15px]" : "text-sm"
          }`}
        >
          {post.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-brand">
          READ ARTICLE <ArrowRightIcon size={12} color="00687F" />
        </span>
      </div>
    </Link>
  );
}
