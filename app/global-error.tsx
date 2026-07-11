"use client";

import { useEffect } from "react";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import ErrorScene from "@/components/site/ErrorScene";
import "./globals.css";

// global-error replaces the root layout, so it must supply <html>/<body> and
// re-declare the font variables the design system relies on.
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-archivo", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-jetbrains", display: "swap" });

/**
 * Root-level error boundary — catches failures in the root layout itself.
 * Renders a standalone document since no layout wraps it.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={`${archivo.variable} ${anton.variable} ${mono.variable}`}>
      <body>
        <ErrorScene
          code="500"
          eyebrow="Court closed"
          title="The whole arena went dark."
          message="A fault took the entire page down. Reload to bring the lights back up — if it keeps happening, our team is already on it."
          accent="#5E93FF"
        >
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-[#181A20] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#00687F]"
          >
            Reload page
          </button>
          <a
            href="/"
            className="rounded-full border border-[#181A20]/25 px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-[#181A20] no-underline transition-colors hover:border-[#181A20] hover:bg-[#181A20]/[0.04]"
          >
            Back to home →
          </a>
          {error.digest && (
            <p className="mt-2 w-full font-mono text-[11px] tracking-[0.14em] text-[#181A20]/40">
              REF · {error.digest}
            </p>
          )}
        </ErrorScene>
      </body>
    </html>
  );
}
