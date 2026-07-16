import Link from "next/link";
import { FwReveal } from "@/components/site/FwReveal";
import { getContactChannels } from "@/lib/api/contact";

/** Closing teal call-to-action band. */
export default async function HomeCta() {
  const { email, phone } = await getContactChannels();
  return (
    <section
      id="fw-cta"
      className="box-border bg-brand px-[6vw] text-[#071027]"
      style={{ paddingBlock: "clamp(72px,10vw,150px)" }}
    >
      <FwReveal>
        <div className="mb-5 text-xs font-bold tracking-[0.28em] text-[#071027]/65">
          NEW PROJECT · RETROFIT · CONSULTATION
        </div>
        <h2
          className="m-0 mb-10 font-display uppercase leading-[0.94] text-[#071027]"
          style={{ fontSize: "clamp(36px,8.4vw,150px)", textWrap: "balance" }}
        >
          Let&apos;s build your arena.
        </h2>
        <div className="flex flex-wrap items-center gap-7">
          <Link
            href="/#fw-contact"
            className="rounded-full bg-[#071027] px-[38px] py-5 text-[13px] font-bold tracking-[0.1em] text-white no-underline transition-colors hover:bg-[#0E1B45]"
          >
            START A PROJECT
          </Link>
          <span className="text-[15px] font-semibold text-[#071027]/80">
            {email} &nbsp;·&nbsp; {phone}
          </span>
        </div>
      </FwReveal>
    </section>
  );
}
