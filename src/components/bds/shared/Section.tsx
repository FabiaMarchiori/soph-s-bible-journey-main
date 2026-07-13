/**
 * Section — consistent page section container with title/subtitle/actions.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Kicker, H2, Muted } from "../typography/Typography";

export interface SectionProps {
  kicker?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
  id?: string;
}

export function Section({ kicker, title, subtitle, actions, className, contentClassName, children, id }: SectionProps) {
  return (
    <section id={id} className={cn("px-4 py-8 md:px-8 md:py-12", className)}>
      {(kicker || title || subtitle || actions) && (
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            {kicker && <Kicker className="mb-2 block">{kicker}</Kicker>}
            {title && <H2 className="text-balance">{title}</H2>}
            {subtitle && <Muted className="mt-1 max-w-2xl">{subtitle}</Muted>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
