import Link from "next/link";
import { WhatsAppIcon, EditIcon } from "@/components/ui/icons";

/**
 * Persistent floating actions anchored to the bottom-right corner: a WhatsApp
 * quick-chat button stacked above the "Get Free Estimate" pill.
 */
export default function FloatingEstimate() {
  return (
    <div className="fixed bottom-[clamp(16px,3vw,32px)] right-[clamp(16px,3vw,32px)] z-[800] flex flex-col items-end gap-3">
      <a
        href="https://wa.me/912066114215?text=Hi%20Freewill%2C%20I%27d%20like%20a%20quote%20for%20a%20sports%20project."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fw-anim-float flex h-[54px] w-[54px] items-center justify-center rounded-full text-white no-underline transition-transform hover:scale-105"
        style={{ background: "#25D366", boxShadow: "0 14px 32px rgba(37,211,102,0.45)" }}
      >
        <WhatsAppIcon size={28} />
      </a>

      <Link
        href="/contact"
        className="fw-anim-float inline-flex items-center gap-3 rounded-full bg-brand px-6 py-4 text-[13px] font-bold tracking-[0.08em] text-white no-underline transition-colors hover:bg-[#004E5F]"
        style={{ boxShadow: "0 16px 38px rgba(0,104,127,0.42)" }}
      >
        <span
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.18)" }}
        >
          <EditIcon size={15} />
        </span>
        GET FREE ESTIMATE
      </Link>
    </div>
  );
}
