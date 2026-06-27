import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  withTagline?: boolean;
  className?: string;
  color?: "brand" | "white" | "dark";
}

export default function Logo({ withTagline = false, className = "", color = "brand" }: LogoProps) {
  const src =
    color === "white"
      ? "/assets/logo-freewill-white.svg"
      : color === "dark"
        ? "/assets/logo-freewill-dark.svg"
        : "/assets/logo-freewill.svg";

  return (
    <Link href="/" className={`inline-flex flex-col leading-none ${className}`.trim()}>
      <Image src={src} alt="Freewill" width={600} height={125} className="h-8 w-auto" priority />
      {withTagline && (
        <span className="mt-1 text-[9px] font-bold tracking-[0.34em] text-brand-accent">
          INFRA FOR SPORTS
        </span>
      )}
    </Link>
  );
}
