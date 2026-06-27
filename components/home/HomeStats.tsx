import Counter from "@/components/site/Counter";
import { STATS } from "@/lib/homeContent";

/** Four headline metrics with count-up, framed by the cream band. */
export default function HomeStats() {
  return (
    <section
      className="bg-cream"
      style={{
        borderTop: "1px solid rgba(24,26,32,0.12)",
        borderBottom: "1px solid rgba(24,26,32,0.12)",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col gap-3.5 px-10 py-14"
            style={{
              borderLeft:
                i === 0 ? "none" : "1px solid rgba(24,26,32,0.12)",
            }}
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
