import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Applies the shared horizontal page gutter (6vw, matching the design) so
 * sections line up consistently. Vertical padding is left to each section.
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return <div className={`page-gutter ${className}`.trim()}>{children}</div>;
}
