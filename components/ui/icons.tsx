import type { CSSProperties, ReactNode } from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/** Accept both "181A20" and "#181A20" for the `color` prop. */
function hex(color: string) {
  return color.startsWith("#") ? color : `#${color}`;
}

interface SvgProps {
  size: number;
  className: string;
  children: ReactNode;
  /** Stroke colour (line icons). */
  stroke?: string;
  /** Fill colour (solid icons). */
  fill?: string;
  strokeWidth?: number;
  viewBox?: string;
  style?: CSSProperties;
}

/** Shared inline-SVG wrapper — no external requests, works offline. */
function Svg({
  size,
  className,
  children,
  stroke,
  fill = "none",
  strokeWidth = 2,
  viewBox = "0 0 24 24",
}: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      {children}
    </svg>
  );
}

export function CheckIcon({ size = 18, color = "5FD0E0", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} stroke={hex(color)}>
      <path d="M20 6 9 17l-5-5" />
    </Svg>
  );
}

export function StarIcon({ size = 16, color = "5FD0E0", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} fill={hex(color)} strokeWidth={0}>
      <path d="M12 2.5l2.9 5.88 6.5.95-4.7 4.58 1.11 6.47L12 17.9 6.19 20.9l1.11-6.47-4.7-4.58 6.5-.95z" />
    </Svg>
  );
}

export function MenuIcon({ size = 20, color = "F6F4EC", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} stroke={hex(color)}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </Svg>
  );
}

export function CloseIcon({ size = 20, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} stroke={hex(color)}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Svg>
  );
}

export function WhatsAppIcon({ size = 28, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} fill={hex(color)} strokeWidth={0}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.05 1.6 5.77L2 22l4.45-1.16a9.86 9.86 0 0 0 5.58 1.6h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.75 14.02c-.24.68-1.42 1.31-1.95 1.36-.5.05-.98.24-3.32-.7-2.81-1.11-4.6-3.98-4.74-4.16-.14-.18-1.13-1.5-1.13-2.86s.72-2.03.97-2.31c.26-.28.56-.35.75-.35.19 0 .37.01.53.02.17.01.4-.06.62.48.24.55.81 1.9.88 2.04.07.14.12.3.02.48-.09.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.28-.12.55.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.16-.18.69-.8.87-1.08.18-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.32.07.12.07.65-.17 1.33z" />
    </Svg>
  );
}

export function ImagePlaceholderIcon({ size = 26, color = "888888", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} stroke={hex(color)} strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </Svg>
  );
}

export function EditIcon({ size = 15, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} stroke={hex(color)}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
    </Svg>
  );
}

export function ArrowUpRightIcon({ size = 15, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} stroke={hex(color)}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Svg>
  );
}

export function ArrowRightIcon({ size = 20, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} stroke={hex(color)}>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </Svg>
  );
}

export function ArrowLeftIcon({ size = 20, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} stroke={hex(color)}>
      <path d="M20 12H4M11 5l-7 7 7 7" />
    </Svg>
  );
}

export function PlayIcon({ size = 22, color = "00687F", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} fill={hex(color)} strokeWidth={0}>
      <path d="M7 4.5v15l12-7.5z" />
    </Svg>
  );
}

export function PauseIcon({ size = 22, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} fill={hex(color)} strokeWidth={0}>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </Svg>
  );
}

export function ChevronLeftIcon({ size = 20, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} stroke={hex(color)}>
      <path d="M15 18l-6-6 6-6" />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 20, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} stroke={hex(color)}>
      <path d="M9 18l6-6-6-6" />
    </Svg>
  );
}

export function XTwitterIcon({ size = 16, color = "181A20", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} fill={hex(color)} strokeWidth={0}>
      <path d="M18.9 1.5h3.68l-8.04 9.19L24 22.5h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.5h7.6l5.24 6.93zm-1.29 18.79h2.04L6.48 3.6H4.29z" />
    </Svg>
  );
}

export function LinkedInIcon({ size = 16, color = "181A20", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} fill={hex(color)} strokeWidth={0}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.24 8h4.52v14H.24V8zM8.34 8h4.33v1.92h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V22h-4.52v-6.6c0-1.57-.03-3.6-2.19-3.6-2.19 0-2.53 1.71-2.53 3.48V22H8.34V8z" />
    </Svg>
  );
}

export function FacebookIcon({ size = 16, color = "181A20", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} fill={hex(color)} strokeWidth={0}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </Svg>
  );
}

export function LinkIcon({ size = 16, color = "181A20", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} stroke={hex(color)}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </Svg>
  );
}

export function GalleryIcon({ size = 34, color = "00687F", className = "" }: IconProps) {
  return (
    <Svg size={size} className={className} stroke={hex(color)} strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </Svg>
  );
}
