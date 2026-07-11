import Link from "next/link";
import ErrorScene from "@/components/site/ErrorScene";
import { ROUTES } from "@/lib/navigation";

export default function NotFound() {
  return (
    <ErrorScene
      code="404"
      eyebrow="Out of bounds"
      title="This play went off the court."
      message="The page you're looking for was moved, retired, or never lined up. Let's get you back onto the floor."
    >
      <Link
        href={ROUTES.home}
        className="rounded-full bg-[#181A20] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white no-underline transition-colors hover:bg-[#00687F]"
      >
        Back to home
      </Link>
      <Link
        href={ROUTES.products}
        className="rounded-full border border-[#181A20]/25 px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-[#181A20] no-underline transition-colors hover:border-[#181A20] hover:bg-[#181A20]/[0.04]"
      >
        Browse products →
      </Link>
    </ErrorScene>
  );
}
