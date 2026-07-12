import { FwReveal } from "@/components/site/FwReveal";

/** Looping marquee of trusted organisations on the teal band. */
export default function AboutBrands({ brands }: { brands: string[] }) {
  const row = [...brands, ...brands];
  return (
    <section
      id="fw-brands"
      className="box-border overflow-hidden bg-brand text-cream"
      style={{ paddingBlock: "clamp(56px,7vw,120px)" }}
    >
      <div className="mb-[clamp(32px,5vw,56px)] text-center">
        <FwReveal
          as="h2"
          className="m-0 font-display uppercase leading-[1.1] text-cream"
          style={{ fontSize: "clamp(28px,4vw,52px)" }}
        >
          Trusted by India&apos;s Leading Organizations
        </FwReveal>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max gap-[clamp(32px,5vw,64px)] whitespace-nowrap px-[clamp(32px,5vw,64px)] fw-anim-ribbon">
          {row.map((brand, i) => (
            <div
              key={i}
              className="flex min-w-[160px] flex-none items-center justify-center rounded-xl px-[clamp(20px,3vw,32px)] py-[clamp(12px,2vw,20px)]"
              style={{
                background: "rgba(241,234,216,0.1)",
                border: "1px solid rgba(241,234,216,0.2)",
              }}
            >
              <span
                className="font-display uppercase tracking-[0.08em] text-cream"
                style={{ fontSize: "clamp(13px,1.3vw,16px)" }}
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
