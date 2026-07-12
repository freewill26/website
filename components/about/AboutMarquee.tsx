/** Oversized teal marquee of the product brands we carry. */
export default function AboutMarquee({ items }: { items: string[] }) {
  // `✦`-separated ribbon; trailing separator keeps the loop seamless.
  const text = items.length ? items.join(" ✦ ") + " ✦ " : "";
  return (
    <div
      className="overflow-hidden bg-brand py-5"
      style={{ borderTop: "2px solid #004E5F", borderBottom: "2px solid #004E5F" }}
    >
      <div className="inline-flex w-max whitespace-nowrap fw-anim-ribbon">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="pr-[42px] font-display uppercase tracking-[0.02em] text-cream"
            style={{ fontSize: "clamp(26px,3.6vw,52px)" }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
