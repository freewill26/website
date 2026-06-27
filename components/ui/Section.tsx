import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

type Tone = "ink" | "panel";

interface SectionProps {
  children: ReactNode;
  /** Background tone — sections alternate between `ink` and `panel`. */
  tone?: Tone;
  /** Vertical rhythm preset. */
  spacing?: "default" | "tight";
  id?: string;
  className?: string;
}

const TONE_CLASS: Record<Tone, string> = {
  ink: "bg-ink",
  panel: "bg-ink-panel",
};

const SPACING_CLASS = {
  default: "py-14 sm:py-20 lg:py-24",
  tight: "py-12 sm:py-16 lg:py-20",
};

/**
 * Standard full-width content section: sets the background tone, vertical
 * padding and the shared horizontal gutter in one place.
 */
export default function Section({
  children,
  tone = "ink",
  spacing = "default",
  id,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`${TONE_CLASS[tone]} ${className}`.trim()}>
      <Container className={SPACING_CLASS[spacing]}>{children}</Container>
    </section>
  );
}
