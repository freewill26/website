"use client";

import { useEffect, useState } from "react";

/**
 * Bottom-right anchor for the floating actions, which tucks itself away while
 * the footer's legal row is on screen — otherwise the pill sits on top of the
 * social links in that row.
 *
 * Pages that render no footer simply never trip the observer and keep the
 * actions visible throughout.
 */
export default function FloatingDock({ children }: { children: React.ReactNode }) {
  const [tucked, setTucked] = useState(false);

  useEffect(() => {
    const legalRow = document.querySelector("[data-footer-legal]");
    if (!legalRow) return;

    const observer = new IntersectionObserver(([entry]) => setTucked(entry.isIntersecting));
    observer.observe(legalRow);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-[clamp(16px,3vw,32px)] z-[800] flex flex-col items-end gap-3 transition-[opacity,transform] duration-300 ease-out sm:bottom-[clamp(16px,3vw,32px)] ${
        tucked ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"
      }`}
      aria-hidden={tucked}
    >
      {children}
    </div>
  );
}
