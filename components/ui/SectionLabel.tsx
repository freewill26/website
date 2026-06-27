import Reveal from "@/components/ui/Reveal";

interface SectionLabelProps {
  children: string;
  className?: string;
}

/**
 * The recurring "— LABEL" eyebrow used to introduce each section:
 * a short teal rule followed by a spaced, monospaced caption.
 */
export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <Reveal className={`flex items-center gap-3 ${className}`.trim()}>
      <span className="block h-0.5 w-7 bg-brand-accent" />
      <span className="font-mono text-[11px] tracking-[0.22em] text-brand-light">
        {children}
      </span>
    </Reveal>
  );
}
