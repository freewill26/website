import Link from "next/link";
import { ROUTES } from "@/lib/navigation";
import Reveal from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Closing call-to-action band on the brand teal. */
export default function CtaSection() {
  return (
    <section className="bg-brand px-[6vw] py-16 text-center sm:py-20 lg:py-24">
      <Reveal>
        <h3 className="m-0 mb-4 font-display text-[clamp(32px,4vw,64px)] uppercase leading-[1.1] text-cream">
          Ready to specify?
        </h3>
        <p className="mx-auto m-0 mb-7 max-w-[560px] text-base leading-[1.7] text-cream/70">
          Our technical team will prepare a site-specific spec, sub-floor
          recommendation and installation estimate — at no charge.
        </p>
        <Link
          href={ROUTES.contact}
          className="inline-flex items-center gap-2.5 rounded-full bg-cream px-[30px] py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-brand transition-colors hover:bg-cream/90"
        >
          Talk to Our Team <ArrowRightIcon size={13} color="00687F" />
        </Link>
      </Reveal>
    </section>
  );
}
