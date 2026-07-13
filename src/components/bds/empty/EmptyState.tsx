/**
 * EmptyState — elegant empty state; never render a blank screen.
 */
import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { BdsButton } from "../buttons/BdsButton";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondary?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, actionLabel, onAction, secondary, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-app-border bg-app-surface p-10 text-center", className)}>
      <div className="grid h-16 w-16 place-items-center rounded-full bg-app-surface-elevated text-app-text-muted bds-floating">
        {icon ?? <Inbox className="h-7 w-7" />}
      </div>
      <div className="max-w-md">
        <h3 className="font-display text-lg font-semibold text-app-text">{title}</h3>
        {description && <p className="mt-1 text-sm text-app-text-muted">{description}</p>}
      </div>
      {(actionLabel || secondary) && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {actionLabel && onAction && <BdsButton onClick={onAction}>{actionLabel}</BdsButton>}
          {secondary}
        </div>
      )}
    </div>
  );
}
