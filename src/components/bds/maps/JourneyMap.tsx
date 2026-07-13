/**
 * JourneyMap — visual map of the biblical journey.
 * Accepts a list of steps and renders a scrollable, connected path.
 */
import { CheckCircle2, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MockJourneyStep } from "@/lib/bds-mocks";
import { CircularProgress } from "../progress/Progress";

export interface JourneyMapProps {
  steps: MockJourneyStep[];
  onSelect?: (id: string) => void;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export function JourneyMap({ steps, onSelect, className, orientation = "vertical" }: JourneyMapProps) {
  const isH = orientation === "horizontal";
  return (
    <div
      className={cn(
        "relative",
        isH ? "flex items-center gap-6 overflow-x-auto p-4 no-scrollbar" : "flex flex-col gap-4 p-4",
        className,
      )}
      role="list"
      aria-label="Mapa da jornada"
    >
      {steps.map((s, i) => {
        const locked = s.status === "locked";
        const completed = s.status === "completed";
        return (
          <div
            role="listitem"
            key={s.id}
            className={cn("flex items-center", isH ? "flex-col gap-2" : "gap-4")}
          >
            <button
              onClick={onSelect && !locked ? () => onSelect(s.id) : undefined}
              disabled={locked}
              aria-label={s.name}
              className={cn(
                "group relative grid h-20 w-20 shrink-0 place-items-center rounded-3xl border transition-smooth bds-press",
                "border-app-border bg-app-surface-elevated shadow-card",
                completed && "border-brand-mint/40 bg-brand-mint/10",
                !locked && !completed && "hover:-translate-y-1 hover:shadow-hover glow-primary",
                locked && "opacity-50",
              )}
            >
              {locked ? (
                <Lock className="h-6 w-6 text-app-text-muted" />
              ) : completed ? (
                <CheckCircle2 className="h-8 w-8 text-brand-mint" />
              ) : (
                <CircularProgress value={s.progress} size={64} strokeWidth={5}>
                  <Sparkles className="h-5 w-5 text-brand-primary" />
                </CircularProgress>
              )}
            </button>
            <div className={cn("min-w-0", isH ? "text-center" : "flex-1")}>
              <div className="truncate font-display text-sm font-semibold text-app-text">{s.name}</div>
              <div className="text-[11px] text-app-text-muted">
                {locked ? "Bloqueado" : completed ? "Completo" : `${s.progress}% percorrido`}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                aria-hidden
                className={cn(
                  "bg-gradient-to-r from-app-border to-transparent",
                  isH ? "h-px w-8" : "mx-9 w-px flex-1 bg-gradient-to-b from-app-border to-transparent",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
