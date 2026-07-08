import Link from "next/link";
import Image from "next/image";
import { FwReveal } from "@/components/site/FwReveal";
import ImageSlot from "@/components/site/ImageSlot";
import { GALLERY } from "@/lib/homeContent";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Full-bleed gallery grid mixing photo tiles and "live" motion tiles. */
export default function HomeGallery() {
  return (
    <section id="fw-gallery" className="bg-cream pt-[clamp(64px,7vw,110px)]">
      <FwReveal className="flex flex-wrap items-end justify-between gap-5 px-[6vw] pb-[clamp(32px,4vw,52px)]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-0.5 w-7 bg-brand" />
            <span className="text-xs font-bold tracking-[0.28em] text-brand">
              FROM THE GROUND
            </span>
          </div>
          <h2
            className="m-0 font-display uppercase leading-none text-[#181A20]"
            style={{ fontSize: "clamp(36px,4.6vw,72px)" }}
          >
            The gallery.
          </h2>
        </div>
        <p className="m-0 max-w-[360px] text-[15px] leading-[1.8] text-[#181A20]/60">
          Courts, halls and arenas across India — captured the day they opened
          to play.
        </p>
      </FwReveal>

      <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
        {GALLERY.map((g, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden"
            style={{ background: "#DCD3BE" }}
          >
            {g.isVideo ? (
              <>
                <video
                  src="/assets/lulu.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-white z-10"
                  style={{ background: "rgba(11,16,32,0.6)" }}
                >
                  <span className="block h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#C3F53C" }} />
                  LIVE
                </div>
              </>
            ) : (
              g.img ? (
                <Image
                  src={g.img}
                  alt={g.ph || "Gallery"}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="absolute inset-0 object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <ImageSlot label={g.ph} className="absolute inset-0 h-full w-full" />
              )
            )}
          </div>
        ))}

        <Link
          href="#fw-gallery"
          className="group relative flex aspect-square flex-col justify-between overflow-hidden bg-[#181A20] p-6 text-[#F6F4EC] no-underline transition-colors hover:bg-brand"
        >
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#F6F4EC]/60">
            96 PROJECTS
          </span>
          <div className="flex items-end justify-between gap-3">
            <span
              className="font-display uppercase leading-[0.98]"
              style={{ fontSize: "clamp(28px,2.4vw,40px)" }}
            >
              View
              <br />
              all
            </span>
            <span
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full transition-transform group-hover:translate-x-1"
              style={{ background: "rgba(255,255,255,0.16)" }}
            >
              <ArrowRightIcon size={18} />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
