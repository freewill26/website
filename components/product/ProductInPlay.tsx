import { FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";

/** "In play" — a pair of editorial image grids with a live video tile. */
export default function ProductInPlay() {
  return (
    <section
      id="fw-inplay"
      className="box-border bg-cream px-[6vw] text-[#181A20]"
      style={{ paddingBlock: "clamp(64px,7vw,120px)" }}
    >
      <FwReveal className="mb-[clamp(32px,4vw,52px)] flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-0.5 w-7" style={{ background: "#2F6BFF" }} />
            <span className="text-xs font-bold tracking-[0.28em]" style={{ color: "#2F6BFF" }}>
              03 — IN PLAY
            </span>
          </div>
          <h2
            className="m-0 font-display uppercase leading-none text-[#181A20]"
            style={{ fontSize: "clamp(36px,4.6vw,76px)" }}
          >
            On the court.
          </h2>
        </div>
        <p className="m-0 max-w-[380px] text-[15px] leading-[1.8] text-[#181A20]/60">
          Taraflex installed and in play across India — every frame surfaced and
          handed over by Freewill.
        </p>
      </FwReveal>

      {/* Grid 1: tall video (2 rows) + two images */}
      <div
        className="mb-4 grid grid-cols-2 gap-4"
        style={{ gridAutoRows: "clamp(190px,23vw,310px)" }}
      >
        <div className="relative row-span-2 overflow-hidden rounded-[14px]" style={{ background: "#0E1730" }}>
          <video
            src="/assets/lulu.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span
            className="absolute left-3.5 top-3.5 z-[2] inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-white"
            style={{ background: "rgba(11,16,32,0.6)" }}
          >
            <span className="block h-1.5 w-1.5 rounded-full" style={{ background: "#C3F53C" }} />
            LIVE
          </span>
        </div>
        <ImageSlot label="Match" className="overflow-hidden rounded-[14px]" />
        <ImageSlot label="Detail" className="overflow-hidden rounded-[14px]" />
      </div>

      {/* Grid 2: wide image + three images */}
      <div
        className="grid grid-cols-3 gap-4"
        style={{ gridAutoRows: "clamp(190px,23vw,320px)" }}
      >
        <ImageSlot label="Wide arena" className="col-span-3 overflow-hidden rounded-[14px]" />
        <ImageSlot label="Court" className="overflow-hidden rounded-[14px]" />
        <ImageSlot label="Crowd" className="overflow-hidden rounded-[14px]" />
        <ImageSlot label="Install" className="overflow-hidden rounded-[14px]" />
      </div>
    </section>
  );
}
