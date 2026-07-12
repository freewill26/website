import Counter from "@/components/site/Counter";
import { FwReveal } from "@/components/site/FwReveal";
import type { AboutStatVM } from "@/lib/api/about";

/** Four founding-era metrics on the dark band. */
export default function AboutStats({ stats }: { stats: AboutStatVM[] }) {
  return (
    <section
      id="fw-stats"
      className="box-border px-[6vw] text-[#F6F4EC]"
      style={{ background: "#0A0E1C", paddingBlock: "clamp(72px,9vw,140px)" }}
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-[clamp(32px,4vw,56px)]">
        {stats.map((s) => (
          <FwReveal key={s.label}>
            <div
              className="flex items-start font-display leading-[0.9] text-[#F6F4EC]"
              style={{ fontSize: "clamp(46px,5.5vw,96px)" }}
            >
              <Counter target={s.target} duration={2000} />
              <span style={{ color: "#5FD0E0" }}>{s.suffix}</span>
            </div>
            <div className="my-[18px] mb-3.5 h-0.5 w-[42px] bg-brand" />
            <div className="text-[13px] font-semibold leading-[1.5] tracking-[0.06em] text-[#F6F4EC]/[0.62]">
              {s.label}
            </div>
          </FwReveal>
        ))}
      </div>
    </section>
  );
}
