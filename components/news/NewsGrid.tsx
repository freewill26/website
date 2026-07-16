import { FwReveal } from "@/components/site/FwReveal";
import NewsCard from "@/components/news/NewsCard";
import type { NewsCardVM } from "@/lib/api/news";

/** News index body — a featured lead story above a three-up card grid. */
export default function NewsGrid({ articles }: { articles: NewsCardVM[] }) {
  const [lead, ...rest] = articles;

  return (
    <section
      className="box-border bg-cream px-[6vw]"
      style={{ paddingBlock: "0 clamp(72px,9vw,140px)" }}
    >
      {lead && (
        <FwReveal className="pb-5">
          <NewsCard article={lead} variant="feature" />
        </FwReveal>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((article) => (
          <FwReveal key={article.id} className="h-full">
            <NewsCard article={article} />
          </FwReveal>
        ))}
      </div>
    </section>
  );
}
