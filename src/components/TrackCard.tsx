import { ArrowRight, Sun, Sparkles, Flame, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Track } from "@/lib/tracks";

const icons = { sun: Sun, sparkles: Sparkles, flame: Flame, "book-open": BookOpen } as const;

interface TrackCardProps {
  track: Track;
  selected?: boolean;
  onSelect?: () => void;
  as?: "button" | "article";
}

export function TrackCard({ track, selected, onSelect, as = "button" }: TrackCardProps) {
  const Icon = icons[track.icon as keyof typeof icons] ?? Sparkles;
  const Comp: React.ElementType = as === "button" ? "button" : "article";
  return (
    <Comp
      onClick={onSelect}
      onKeyDown={
        onSelect
          ? (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
      aria-pressed={as === "button" ? !!selected : undefined}
      className={cn(
        "group relative flex h-full min-h-[280px] w-full flex-col overflow-hidden rounded-3xl border text-left transition-smooth",
        "border-app-border bg-app-surface-elevated shadow-card hover:-translate-y-1 hover:shadow-hover",
        selected && "border-brand-primary/60 shadow-hover ring-1 ring-brand-primary/50",
      )}
      style={
        selected
          ? { boxShadow: `0 0 0 1px hsl(252 100% 67% / 0.5), 0 25px 60px -20px ${track.accentVar}` }
          : undefined
      }
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={track.image}
          alt={`Capa da trilha ${track.name}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-smooth group-hover:scale-[1.05]"
        />
        <div
          className={cn("absolute inset-0 mix-blend-multiply opacity-70", track.gradientClass)}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-app-surface-elevated via-app-surface-elevated/30 to-transparent" />
        <div
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-2xl text-white shadow-glow"
          style={{ background: `linear-gradient(135deg, ${track.accentVar}, hsl(252 100% 67%))` }}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-app-text-muted">
            Trilha
          </div>
          <h3 className="mt-1 font-display text-xl font-bold text-app-text">{track.name}</h3>
        </div>
        <p className="text-sm leading-relaxed text-app-text-muted">{track.tagline}</p>
        <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-app-text">
          Conhecer trilha
          <ArrowRight className="h-4 w-4 transition-smooth group-hover:translate-x-1" style={{ color: track.accentVar }} />
        </div>
      </div>
    </Comp>
  );
}
