import Image from "next/image";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

function icons8Url(name: string, size: number, color: string, style = "ios-filled") {
  return `https://img.icons8.com/${style}/${size}/${color}/${name}.png`;
}

export function CheckIcon({ size = 18, color = "5FD0E0", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("checkmark", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function StarIcon({ size = 16, color = "5FD0E0", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("star", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function MenuIcon({ size = 20, color = "F6F4EC", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("menu", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function CloseIcon({ size = 20, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("close", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function WhatsAppIcon({ size = 28, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("whatsapp", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function ImagePlaceholderIcon({ size = 26, color = "888888", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("image", size * 2, color, "ios")}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function EditIcon({ size = 15, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("edit", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function ArrowUpRightIcon({ size = 15, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("external-link", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function ArrowRightIcon({ size = 20, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("right", size * 2, color, "ios")}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function ArrowLeftIcon({ size = 20, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("left", size * 2, color, "ios")}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function PlayIcon({ size = 22, color = "00687F", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("play", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function PauseIcon({ size = 22, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("pause", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function ChevronLeftIcon({ size = 20, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("chevron-left", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function ChevronRightIcon({ size = 20, color = "FFFFFF", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("chevron-right", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function XTwitterIcon({ size = 16, color = "181A20", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("twitterx", size * 2, color, "ios-filled")}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function LinkedInIcon({ size = 16, color = "181A20", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("linkedin", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function FacebookIcon({ size = 16, color = "181A20", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("facebook", size * 2, color)}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function LinkIcon({ size = 16, color = "181A20", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("link", size * 2, color, "ios")}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function GalleryIcon({ size = 34, color = "00687F", className = "" }: IconProps) {
  return (
    <Image
      src={icons8Url("image-gallery", size * 2, color, "ios")}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}
