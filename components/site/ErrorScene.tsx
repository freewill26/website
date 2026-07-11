"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

interface ErrorSceneProps {
  /** Big status number rendered as the court scoreboard (e.g. "404", "500"). */
  code: string;
  /** Small mono kicker above the scoreboard. */
  eyebrow: string;
  /** Anton headline. */
  title: string;
  /** Supporting sentence. */
  message: string;
  /** Accent used for the live digit + glow. Defaults to the lime court accent. */
  accent?: string;
  /** Action row (buttons / links). */
  children?: ReactNode;
}

/**
 * Full-screen, self-contained error scene styled after the Freewill marketing
 * pages: cream court, faint boundary lines, a scoreboard with one "live" digit
 * and a ball bouncing across the baseline. No external media — safe to render
 * even when the app is failing (used by not-found / error / global-error).
 */
export default function ErrorScene({
  code,
  eyebrow,
  title,
  message,
  accent = "#C3F53C",
  children,
}: ErrorSceneProps) {
  const chars = code.split("");
  // Light up the middle glyph as the "live" score.
  const liveIndex = Math.floor((chars.length - 1) / 2);

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#F6F4EC] text-[#181A20]">
      {/* Court boundary lines + centre circle */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full text-[#181A20]/[0.06]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1000 1000"
        fill="none"
      >
        <rect x="60" y="60" width="880" height="880" stroke="currentColor" strokeWidth="2" />
        <line x1="500" y1="60" x2="500" y2="940" stroke="currentColor" strokeWidth="2" />
        <circle cx="500" cy="500" r="150" stroke="currentColor" strokeWidth="2" />
        <line x1="60" y1="500" x2="940" y2="500" stroke="currentColor" strokeWidth="2" />
      </svg>

      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[90px]"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
      />

      {/* Brand mark */}
      <header className="relative z-10 flex items-center justify-between px-[6vw] py-6">
        <Link href="/" className="inline-flex" aria-label="Freewill — home">
          <Image
            src="/assets/logo-freewill.svg"
            alt="Freewill"
            width={600}
            height={125}
            className="h-7 w-auto"
            priority
          />
        </Link>
        <span className="hidden font-mono text-[11px] font-bold tracking-[0.28em] text-[#181A20]/45 sm:block">
          INFRA FOR SPORTS
        </span>
      </header>

      {/* Centre content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-[6vw] py-10 text-center">
        <span className="mb-6 inline-flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#004E5F]">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: accent, animation: "fw-ping 1.8s ease-out infinite" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#004E5F]" />
          </span>
          {eyebrow}
        </span>

        {/* Scoreboard */}
        <div className="flex select-none items-center justify-center gap-[0.04em] font-display leading-[0.8]">
          {chars.map((ch, i) =>
            i === liveIndex ? (
              <span
                key={i}
                className="relative inline-flex items-center justify-center"
                style={{ fontSize: "clamp(96px,26vw,320px)" }}
              >
                {/* centre-circle ring behind the live digit */}
                <span
                  aria-hidden
                  className="absolute rounded-full border-[6px]"
                  style={{
                    width: "0.9em",
                    height: "0.9em",
                    borderColor: accent,
                    animation: "fw-spin 14s linear infinite",
                    boxShadow: `0 0 40px ${accent}88`,
                  }}
                />
                <span className="relative" style={{ color: accent }}>
                  {ch}
                </span>
              </span>
            ) : (
              <span
                key={i}
                style={{ fontSize: "clamp(96px,26vw,320px)" }}
                className="text-[#181A20]"
              >
                {ch}
              </span>
            ),
          )}
        </div>

        {/* Baseline + bouncing ball */}
        <div className="relative mt-2 h-8 w-[min(420px,70vw)]">
          <div className="absolute bottom-0 left-0 h-px w-full bg-[#181A20]/20" />
          <span
            aria-hidden
            className="absolute bottom-1 h-4 w-4 rounded-full"
            style={{
              background: accent,
              boxShadow: `inset -2px -2px 4px rgba(0,0,0,0.25)`,
              animation: "fw-bounce 0.9s ease-in-out infinite, error-roll 6s linear infinite",
            }}
          />
        </div>

        <h1
          className="mt-9 max-w-3xl font-display uppercase leading-[0.92]"
          style={{ fontSize: "clamp(30px,5vw,64px)", textWrap: "balance" }}
        >
          {title}
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#181A20]/65">
          {message}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">{children}</div>
      </div>

      {/* Brand ribbon */}
      <div className="relative z-10 overflow-hidden border-t border-[#181A20]/10 bg-[#00687F] py-3">
        <div className="flex w-max whitespace-nowrap fw-anim-ribbon">
          {Array.from({ length: 2 }).map((_, k) => (
            <span
              key={k}
              className="flex shrink-0 items-center font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#EAF8FB]/80"
            >
              {"FIBA · FIVB · FIG CERTIFIED SYSTEMS  ✦  33+ YEARS BUILDING INDIA'S ARENAS  ✦  THE GROUND INDIA PLAYS ON  ✦  ".repeat(
                2,
              )}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes error-roll {
          0%   { left: 0%;   transform: translateX(0); }
          50%  { left: 100%; transform: translateX(-100%); }
          100% { left: 0%;   transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="error-roll"], [style*="fw-spin"], [style*="fw-ping"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
