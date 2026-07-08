"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ImageSlot from "@/components/site/ImageSlot";
import { TESTIMONIALS } from "@/lib/homeContent";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";

/** Auto-playing partner-testimonial carousel with manual prev/next + dots. */
export default function HomeTestimonials() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % count);
    }, 5200);
    return () => clearInterval(timer);
  }, [count]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <section
      id="fw-testi"
      className="box-border overflow-hidden bg-white px-[6vw]"
      style={{ paddingBlock: "clamp(72px,8vw,128px)" }}
    >
      <div className="mb-[clamp(32px,4vw,52px)] flex items-end justify-between gap-5">
        <div className="flex items-center gap-3">
          <span className="block h-0.5 w-7 bg-brand" />
          <span className="text-xs font-bold tracking-[0.28em] text-brand">
            WHAT PARTNERS SAY
          </span>
        </div>
        <div className="flex gap-3">
          {([[-1, "Previous"], [1, "Next"]] as const).map(([d, label]) => (
            <button
              key={d}
              type="button"
              onClick={() => go(d)}
              aria-label={label}
              className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white transition-colors hover:border-brand"
              style={{ border: "1px solid rgba(24,26,32,0.28)" }}
            >
              {d === -1 ? <ArrowLeftIcon size={19} color="181A20" /> : <ArrowRightIcon size={19} color="181A20" />}
            </button>
          ))}
        </div>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        <div
          className="flex transition-transform duration-700"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transitionTimingFunction: "cubic-bezier(0.7,0,0.2,1)",
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="box-border w-full flex-none p-1.5">
              <div
                className="mx-auto flex max-w-[920px] flex-col gap-7 rounded-[20px] p-[clamp(32px,5vw,64px)]"
                style={{ background: "#F6F1E6", border: "1px solid rgba(24,26,32,0.08)" }}
              >
                <div className="font-display text-[64px] leading-[0.5] text-brand">
                  &ldquo;
                </div>
                <p
                  className="m-0 font-display leading-[1.3] tracking-[0.01em] text-[#181A20]"
                  style={{ fontSize: "clamp(22px,2.6vw,36px)", textTransform: "none" }}
                >
                  {t.quote}
                </p>
                <div className="flex items-center gap-4">
                  {t.avatar ? (
                    <div className="relative h-[62px] w-[62px] flex-none overflow-hidden rounded-full border border-[#181A20]/10">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="62px"
                        className="object-cover object-center"
                      />
                    </div>
                  ) : (
                    <ImageSlot shape="circle" className="h-[62px] w-[62px] flex-none" />
                  )}
                  <div>
                    <div className="text-[15px] font-bold text-[#181A20]">{t.name}</div>
                    <div className="text-[13px] leading-[1.5] text-[#181A20]/55">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2.5">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className="h-[9px] rounded-full transition-all duration-300"
            style={{
              width: i === index ? "26px" : "9px",
              background: i === index ? "#00687F" : "rgba(24,26,32,0.22)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
