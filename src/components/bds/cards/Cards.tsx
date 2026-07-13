/**
 * Universal card primitives — compose bigger BDS cards from these.
 * UniversalCard · GlassCard · ElevatedCard · CompactCard · HorizontalCard
 */
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BaseProps = HTMLAttributes<HTMLDivElement> & { interactive?: boolean };

const interactiveClasses =
  "cursor-pointer transition-smooth bds-press hover:-translate-y-0.5 hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary";

export const UniversalCard = forwardRef<HTMLDivElement, BaseProps>(function UniversalCard(
  { className, interactive, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-app-border bg-app-surface-elevated shadow-card",
        interactive && interactiveClasses,
        className,
      )}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    />
  );
});

export const GlassCard = forwardRef<HTMLDivElement, BaseProps>(function GlassCard(
  { className, interactive, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 shadow-card backdrop-blur-xl",
        interactive && interactiveClasses,
        className,
      )}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    />
  );
});

export const ElevatedCard = forwardRef<HTMLDivElement, BaseProps>(function ElevatedCard(
  { className, interactive, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-app-border bg-gradient-surface shadow-elevated",
        interactive && interactiveClasses,
        className,
      )}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    />
  );
});

export const CompactCard = forwardRef<HTMLDivElement, BaseProps>(function CompactCard(
  { className, interactive, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-app-border bg-app-surface-elevated p-3 shadow-card",
        interactive && interactiveClasses,
        className,
      )}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    />
  );
});

export interface HorizontalCardProps extends BaseProps {
  media?: ReactNode;
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  actions?: ReactNode;
}

export function HorizontalCard({ media, title, subtitle, meta, actions, className, interactive, ...rest }: HorizontalCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-app-border bg-app-surface-elevated p-3 shadow-card",
        interactive && interactiveClasses,
        className,
      )}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    >
      {media && <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">{media}</div>}
      <div className="min-w-0 flex-1">
        <div className="truncate font-display text-sm font-semibold text-app-text">{title}</div>
        {subtitle && <div className="truncate text-xs text-app-text-muted">{subtitle}</div>}
        {meta && <div className="mt-1 flex items-center gap-2 text-[11px] text-app-text-muted">{meta}</div>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
