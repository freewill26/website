import Link from "next/link";
import { ROUTES } from "@/lib/navigation";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-[6vw] text-center">
      <span className="font-mono text-xs tracking-[0.22em] text-brand-light">
        404 · NOT FOUND
      </span>
      <h1 className="m-0 font-display text-[clamp(48px,10vw,140px)] uppercase leading-[0.9] text-surface">
        Off the court
      </h1>
      <p className="max-w-md text-mist/60">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        href={ROUTES.products}
        className="rounded-full border border-brand-accent/45 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:border-brand-accent hover:bg-brand-accent/10"
      >
        Browse Products →
      </Link>
    </section>
  );
}
