"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/ui/icons";

interface NewsletterProps {
  eyebrow?: string;
  heading?: string;
  copy?: string;
}

/**
 * Inline newsletter sign-up band — the "subscribe for updates" call common to
 * editorial pages. Client-side only (no backend wired); shows a success state
 * on submit so the interaction reads as complete.
 */
export default function Newsletter({
  eyebrow = "STAY IN THE LOOP",
  heading = "New projects, in your inbox",
  copy = "Occasional updates on completed arenas, new systems and where Freewill is building next. No spam.",
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <div
      className="overflow-hidden rounded-[22px] bg-[#181A20] px-[clamp(28px,5vw,64px)] py-[clamp(36px,5vw,64px)]"
    >
      <div className="mx-auto flex max-w-[920px] flex-col items-center gap-7 text-center">
        <div>
          <div className="mb-3 text-[11px] font-bold tracking-[0.3em] text-brand-accent">
            {eyebrow}
          </div>
          <h2 className="m-0 font-display text-[clamp(28px,3.6vw,48px)] uppercase leading-[1.02] text-white">
            {heading}
          </h2>
          <p className="m-0 mx-auto mt-4 max-w-[520px] text-[15px] leading-[1.7] text-white/55">
            {copy}
          </p>
        </div>

        {done ? (
          <div className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-3.5 text-sm font-semibold text-white">
            <CheckIcon size={18} color="C3F53C" />
            You&rsquo;re on the list — thanks for subscribing.
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="flex w-full max-w-[480px] flex-col gap-2.5 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-[15px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-brand-accent"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#004E5F]"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
