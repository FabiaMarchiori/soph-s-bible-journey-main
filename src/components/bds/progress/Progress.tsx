/**
 * Progress components:
 * ProgressBar · CircularProgress · ProgressCard · JourneyProgress
 * StoryProgress · BookProgress · ChapterProgress · SceneProgress
 * All accept a value from 0 to 100 and are fully accessible.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Kicker, Muted } from "../typography/Typography";

const clamp = (v: number) => Math.min(100, Math.max(0, v));

export interface ProgressBarProps {
  value: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function ProgressBar({ value, className, size = "md", label }: ProgressBarProps) {
  const v = clamp(value);
  const heights = { sm: "h-1", md: "h-2", lg: "h-3" };
  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-full bg-app-surface-high", heights[size], className)}
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Progresso"}
    >
      <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-brand transition-all" style={{ width: `${v}%` }} />
    </div>
  );
}

export interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: ReactNode;
  label?: string;
}

export function CircularProgress({ value, size = 72, strokeWidth = 6, className, children, label }: CircularProgressProps) {
  const v = clamp(value);
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (v / 100) * c;
  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={strokeWidth} className="fill-none stroke-app-surface-high" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="fill-none stroke-brand-primary transition-all"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div
        className="absolute inset-0 grid place-items-center font-display text-sm font-semibold text-app-text"
        role="progressbar"
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progresso"}
      >
        {children ?? `${v}%`}
      </div>
    </div>
  );
}

export interface ProgressCardProps {
  title: string;
  subtitle?: string;
  value: number;
  kicker?: string;
  action?: ReactNode;
  className?: string;
}

export function ProgressCard({ title, subtitle, value, kicker, action, className }: ProgressCardProps) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-2xl border border-app-border bg-app-surface-elevated p-5 shadow-card", className)}>
      {kicker && <Kicker>{kicker}</Kicker>}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate font-display text-lg font-semibold text-app-text">{title}</div>
          {subtitle && <Muted className="mt-0.5 truncate">{subtitle}</Muted>}
        </div>
        <CircularProgress value={value} size={56} strokeWidth={5} />
      </div>
      <ProgressBar value={value} />
      {action && <div>{action}</div>}
    </div>
  );
}

export interface JourneyProgressProps {
  steps: { id: string; label: string; done?: boolean }[];
  currentIndex?: number;
  className?: string;
}

export function JourneyProgress({ steps, currentIndex = 0, className }: JourneyProgressProps) {
  return (
    <ol className={cn("flex items-center gap-2 overflow-x-auto no-scrollbar", className)}>
      {steps.map((s, i) => {
        const state = s.done || i < currentIndex ? "done" : i === currentIndex ? "current" : "pending";
        return (
          <li key={s.id} className="flex items-center gap-2">
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full border font-display text-xs font-semibold",
                state === "done" && "border-brand-mint/40 bg-brand-mint/15 text-brand-mint",
                state === "current" && "border-brand-primary/50 bg-brand-primary/20 text-app-text glow-primary",
                state === "pending" && "border-app-border bg-app-surface-elevated text-app-text-muted",
              )}
              aria-current={state === "current" ? "step" : undefined}
            >
              {i + 1}
            </span>
            <span className="whitespace-nowrap text-xs text-app-text-muted">{s.label}</span>
            {i < steps.length - 1 && <span className="mx-1 h-px w-8 bg-app-border" aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}

// Contextual aliases — semantic wrappers around ProgressBar for clarity.
export const StoryProgress = (props: ProgressBarProps) => <ProgressBar {...props} label={props.label ?? "Progresso da história"} />;
export const BookProgress = (props: ProgressBarProps) => <ProgressBar {...props} label={props.label ?? "Progresso do livro"} />;
export const ChapterProgress = (props: ProgressBarProps) => <ProgressBar {...props} label={props.label ?? "Progresso do capítulo"} />;
export const SceneProgress = (props: ProgressBarProps) => <ProgressBar {...props} label={props.label ?? "Progresso da cena"} />;
