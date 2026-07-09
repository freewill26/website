import type { CSSProperties } from "react";
import { ImagePlaceholderIcon } from "@/components/ui/icons";

interface ImageSlotProps {
  /** Caption shown in the empty-state, mirroring the design's placeholder text. */
  label?: string;
  /** `dark` for cream/light surrounds, `light` for navy surrounds. */
  tone?: "dark" | "light";
  shape?: "rect" | "rounded" | "circle";
  className?: string;
  style?: CSSProperties;
  /** When provided, renders the real photo instead of the placeholder. */
  src?: string;
}

/**
 * Stand-in for the design's `<image-slot>` custom element. Real photography
 * isn't bundled with this port, so each slot renders a branded placeholder with
 * the original drop-hint copy and a subtle "frame" treatment.
 */
export default function ImageSlot({
  label = "Image",
  tone = "dark",
  shape = "rect",
  className = "",
  style,
  src,
}: ImageSlotProps) {
  const radius =
    shape === "circle" ? "9999px" : shape === "rounded" ? "6px" : "0";

  if (src) {
    return (
      <div
        className={`relative overflow-hidden ${className}`.trim()}
        style={{ borderRadius: radius, ...style }}
      >
        <img
          src={src}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  const background =
    tone === "dark"
      ? "linear-gradient(155deg,#E3DAC6,#CFC5AC)"
      : "linear-gradient(155deg,#1B2447,#10162E)";
  const fg = tone === "dark" ? "rgba(24,26,32,0.42)" : "rgba(246,244,236,0.5)";

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`.trim()}
      style={{ background, borderRadius: radius, ...style }}
    >
      <div
        className="flex flex-col items-center gap-2 px-4 text-center"
        style={{ color: fg }}
      >
        <ImagePlaceholderIcon
          size={26}
          color={tone === "dark" ? "181A20" : "F6F4EC"}
        />
        {shape !== "circle" && (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
