import { WhatsAppIcon } from "@/components/ui/icons";
import { getContactChannels, whatsappHref } from "@/lib/api/contact";

const WHATSAPP_PREFILL =
  "?text=Hi%20Freewill%2C%20I%27d%20like%20a%20quote%20for%20a%20sports%20project.";

/**
 * Persistent floating action anchored to the bottom-right corner: a single
 * WhatsApp quick-chat pill.
 */
export default async function FloatingEstimate() {
  const { whatsapp } = await getContactChannels();
  return (
    <div className="fixed bottom-[clamp(16px,3vw,32px)] right-[clamp(16px,3vw,32px)] z-[800] flex flex-col items-end gap-3">
      <a
        href={whatsappHref(whatsapp) + WHATSAPP_PREFILL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fw-anim-float inline-flex items-center gap-3 rounded-full px-6 py-4 text-[13px] font-bold tracking-[0.08em] text-white no-underline transition-transform hover:scale-105"
        style={{ background: "#25D366", boxShadow: "0 16px 38px rgba(37,211,102,0.45)" }}
      >
        <span
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.18)" }}
        >
          <WhatsAppIcon size={18} />
        </span>
        LET&apos;S CONNECT
      </a>
    </div>
  );
}
