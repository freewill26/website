/** Separator between credentials; also trails the last one so the loop is seamless. */
const SEPARATOR = " · ";

interface MarqueeRibbonProps {
  /** CMS-managed credentials. Falls back to the shipped copy when empty. */
  items?: string[];
}

const ITEMS_DEFAULT = [
  "FREEWILL",
  "SPORTS INFRASTRUCTURE SINCE 1990",
  "NATIONAL GAMES",
  "COMMONWEALTH YOUTH GAMES",
  "SOUTH ASIAN GAMES",
  "ASSOCHAM BEST SPORTS TECHNOLOGY 2019",
];

/**
 * The thin teal marquee that scrolls credentials across the top of the page.
 * The text is duplicated so the -50% keyframe loops seamlessly.
 */
export default function MarqueeRibbon({ items }: MarqueeRibbonProps) {
  const credentials = items && items.length > 0 ? items : ITEMS_DEFAULT;
  const text = credentials.map((item) => `${item}${SEPARATOR}`).join("");

  return (
    <div className="flex h-9 items-center overflow-hidden bg-brand">
      <div className="inline-flex w-max animate-ribbon-scroll whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="pr-12 text-[11px] font-bold tracking-[0.18em] text-white"
          >
            {text}&nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
