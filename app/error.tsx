"use client";

import { useEffect } from "react";
import Link from "next/link";
import ErrorScene from "@/components/site/ErrorScene";
import { ROUTES } from "@/lib/navigation";

/**
 * Segment-level error boundary (the site's "500"). Client component per the
 * App Router contract; `reset()` re-renders the failed segment.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the failure for monitoring; swap for your logger of choice.
    console.error(error);
  }, [error]);

  return (
    <ErrorScene
      code="500"
      eyebrow="Timeout on the floor"
      title="Play was stopped by an error."
      message="Something on our side gave way mid-rally. Try the point again, or head back to the home court while we clean up."
      accent="#5E93FF"
    >
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-[#181A20] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#00687F]"
      >
        Try again
      </button>
      <Link
        href={ROUTES.home}
        className="rounded-full border border-[#181A20]/25 px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-[#181A20] no-underline transition-colors hover:border-[#181A20] hover:bg-[#181A20]/[0.04]"
      >
        Back to home →
      </Link>
      {error.digest && (
        <p className="mt-2 w-full font-mono text-[11px] tracking-[0.14em] text-[#181A20]/40">
          REF · {error.digest}
        </p>
      )}
    </ErrorScene>
  );
}
