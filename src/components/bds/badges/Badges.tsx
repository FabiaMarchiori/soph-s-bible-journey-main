/**
 * Badges & Status chips for the BDS.
 * AchievementBadge · ProgressBadge · NewBadge · CompletedBadge · LockedBadge · StatusChip
 */
import type { ReactNode } from "react";
import { Award, CheckCircle2, Circle, Lock, Sparkles, Heart, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type BdsStatus = "new" | "coming-soon" | "completed" | "in-progress" | "favorite" | "locked";

const statusMap: Record<BdsStatus, { label: string; icon: ReactNode; className: string }> = {
  new: { label: "Novo", icon: <Sparkles className="h-3 w-3" />, className: "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30" },
  "coming-soon": { label: "Em breve", icon: <Clock className="h-3 w-3" />, className: "bg-brand-gold/15 text-brand-gold border-brand-gold/30" },
  completed: { label: "Completo", icon: <CheckCircle2 className="h-3 w-3" />, className: "bg-brand-mint/15 text-brand-mint border-brand-mint/30" },
  "in-progress": { label: "Em andamento", icon: <Circle className="h-3 w-3" />, className: "bg-brand-primary/15 text-brand-lavender border-brand-primary/30" },
  favorite: { label: "Favorito", icon: <Heart className="h-3 w-3 fill-current" />, className: "bg-brand-coral/15 text-brand-coral border-brand-coral/30" },
  locked: { label: "Bloqueado", icon: <Lock className="h-3 w-3" />, className: "bg-app-surface-high text-app-text-muted border-app-border" },
};

export interface StatusChipProps {
  status: BdsStatus;
  label?: string;
  className?: string;
}

export function StatusChip({ status, label, className }: StatusChipProps) {
  const cfg = statusMap[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        cfg.className,
        className,
      )}
      aria-label={label ?? cfg.label}
    >
      {cfg.icon}
      {label ?? cfg.label}
    </span>
  );
}

export interface AchievementBadgeProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  tier?: "bronze" | "silver" | "gold";
  className?: string;
}

const tierRing: Record<NonNullable<AchievementBadgeProps["tier"]>, string> = {
  bronze: "from-brand-coral to-brand-gold",
  silver: "from-app-text-muted to-app-text",
  gold: "from-brand-gold to-brand-primary",
};

export function AchievementBadge({ title, description, icon, tier = "gold", className }: AchievementBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3 rounded-2xl border border-app-border bg-app-surface-elevated p-3", className)}>
      <div className={cn("relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br text-white bds-glow-pulse", tierRing[tier])}>
        {icon ?? <Award className="h-6 w-6" />}
      </div>
      <div className="min-w-0">
        <div className="truncate font-display text-sm font-semibold text-app-text">{title}</div>
        {description && <div className="truncate text-xs text-app-text-muted">{description}</div>}
      </div>
    </div>
  );
}

export interface ProgressBadgeProps {
  value: number; // 0-100
  label?: string;
  className?: string;
}
export function ProgressBadge({ value, label, className }: ProgressBadgeProps) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border border-app-border bg-app-surface-elevated px-3 py-1 text-xs text-app-text", className)}>
      <span className="relative h-1.5 w-16 overflow-hidden rounded-full bg-app-surface-high">
        <span className="absolute inset-y-0 left-0 rounded-full bg-gradient-brand" style={{ width: `${v}%` }} />
      </span>
      {label ?? `${v}%`}
    </span>
  );
}

export const NewBadge = ({ className }: { className?: string }) => <StatusChip status="new" className={className} />;
export const CompletedBadge = ({ className }: { className?: string }) => <StatusChip status="completed" className={className} />;
export const LockedBadge = ({ className }: { className?: string }) => <StatusChip status="locked" className={className} />;
