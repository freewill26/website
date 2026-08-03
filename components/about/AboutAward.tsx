import Image from "next/image";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import type { AboutAwardVM } from "@/lib/api/about";

/**
 * Recognition panel on the dark navy band — one award: an image beside a
 * heading and a short description, all authored in the CMS
 * (About page → "Award Section").
 */
export default function AboutAward({ award }: { award: AboutAwardVM }) {
  return (
    <section
      id="fw-award"
      className="box-border px-[6vw] text-[#F6F4EC]"
      style={{ background: "#11162A", paddingBlock: "clamp(80px,9vw,150px)" }}
    >
      <div className="flex flex-col items-center gap-[clamp(32px,5vw,72px)] md:flex-row">
        <FwReveal className="w-full md:w-[46%]">
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
            style={{ background: "#1B2238" }}
          >
            <Image
              src={award.image}
