import Counter from "@/components/site/Counter";
import type { HomeStatVM } from "@/lib/api/home";

/** Four headline metrics with count-up, framed by the cream band. */
export default function HomeStats({ stats }: { stats: HomeStatVM[] }) {
  return (
    <section
      className="bg-cream"
      style={{
        borderTop: "1px solid rgba(24,26,32,0.12)",
        borderBottom: "1px solid rgba(24,26,32,0.12)",
      }}
    >
      <div className="grid grid-cols-1 gap-px bg-[#181A20]/[0.12] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-3.5 bg-cream px-6 py-10 sm:px-10 sm:py-14"
          >
            <div
              className="font-display leading-none text-[#181A20]"
              style={{ fontSize: "clamp(44px,4vw,68px)" }}
            >
              <Counter target={s.n} locale />
              <span className="text-brand">{s.suffix}</span>
            </div>
            <div className="max-w-[220px] text-[13px] font-medium leading-[1.6] text-[#181A20]/60">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
