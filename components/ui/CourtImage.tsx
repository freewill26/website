interface CourtImageProps {
  /** Accent colour woven into the gradient (usually the product swatch). */
  swatch?: string;
  /** Varies the gradient angle/tone so repeated tiles look distinct. */
  variant?: number;
  className?: string;
}

/**
 * Lightweight stand-in for a sports-surface photograph: a themed gradient with
 * a faint court-line motif. Keeps the build asset-free and on-brand.
 *
 * To use real photography, drop files in /public/assets and replace usages of
 * this component with next/image.
 */
export default function CourtImage({
  swatch = "#5FD0E0",
  variant = 0,
  className = "",
}: CourtImageProps) {
  const angle = 120 + variant * 35;

  return (
    <div
      className={`absolute inset-0 ${className}`.trim()}
      style={{
        background: `
          linear-gradient(${angle}deg, #0E1730 0%, #111827 55%, #05080F 100%),
          radial-gradient(circle at ${20 + variant * 18}% 30%, ${swatch}22 0%, transparent 45%)
        `,
        backgroundBlendMode: "screen",
      }}
    >
      {/* Faint court markings */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke={swatch}
        strokeWidth="1.5"
      >
        <rect x="24" y="24" width="352" height="252" rx="2" />
        <line x1="200" y1="24" x2="200" y2="276" />
        <circle cx="200" cy="150" r="46" />
        <rect x="24" y="96" width="64" height="108" />
        <rect x="312" y="96" width="64" height="108" />
      </svg>
    </div>
  );
}
