"use client";

import { useEffect, useState, type ReactNode } from "react";
import { XTwitterIcon, LinkedInIcon, FacebookIcon, WhatsAppIcon, LinkIcon, CheckIcon } from "@/components/ui/icons";

interface ShareBarProps {
  title: string;
  /** `row` for the inline byline strip, `column` for the sticky desktop rail. */
  layout?: "row" | "column";
  className?: string;
}

type Net = { key: string; label: string; href: (u: string, t: string) => string; icon: ReactNode };

const NETWORKS: Net[] = [
  {
    key: "x",
    label: "Share on X",
    href: (u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
    icon: <XTwitterIcon />,
  },
  {
    key: "linkedin",
    label: "Share on LinkedIn",
    href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    icon: <LinkedInIcon />,
  },
  {
    key: "facebook",
    label: "Share on Facebook",
    href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    icon: <FacebookIcon />,
  },
  {
    key: "whatsapp",
    label: "Share on WhatsApp",
    href: (u, t) => `https://wa.me/?text=${t}%20${u}`,
    icon: <WhatsAppIcon size={16} color="181A20" />,
  },
];

/** Social-share controls used on article screens, with a copy-link affordance. */
export default function ShareBar({ title, layout = "row", className = "" }: ShareBarProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const enc = (s: string) => encodeURIComponent(s);
  const eUrl = enc(url);
  const eTitle = enc(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const isCol = layout === "column";
  const btn =
    "flex h-10 w-10 items-center justify-center rounded-full border text-[#181A20]/70 transition-colors hover:border-brand hover:bg-brand hover:text-white";

  return (
    <div
      className={`flex items-center gap-2.5 ${isCol ? "flex-col" : "flex-row flex-wrap"} ${className}`.trim()}
    >
      {!isCol && (
        <span className="mr-1 text-[11px] font-bold tracking-[0.18em] text-[#181A20]/45">
          SHARE
        </span>
      )}
      {NETWORKS.map((n) => (
        <a
          key={n.key}
          href={n.href(eUrl, eTitle)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={n.label}
          title={n.label}
          className={btn}
          style={{ borderColor: "rgba(24,26,32,0.16)" }}
        >
          {n.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        title={copied ? "Link copied" : "Copy link"}
        className={`relative ${btn}`}
        style={{ borderColor: "rgba(24,26,32,0.16)" }}
      >
        {copied ? (
          <CheckIcon size={16} color="181A20" />
        ) : (
          <LinkIcon />
        )}
      </button>
    </div>
  );
}
