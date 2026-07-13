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
        "group relative flex h-[380px] w-full flex-col overflow-hidden rounded-3xl border text-left transition-all duration-300 ease-smooth",
        "border-app-border bg-app-surface-elevated shadow-card hover:-translate-y-1.5 hover:shadow-hover",
        selected && "border-brand-primary/60 shadow-hover ring-1 ring-brand-primary/50",
      )}
      style={
        selected
          ? { boxShadow: `0 0 0 1px hsl(252 100% 67% / 0.5), 0 25px 60px -20px ${track.accentVar}` }
          : undefined
      }
    >
      {/* Image occupies ~70% of the card height */}
      <div className="relative h-[70%] w-full overflow-hidden">
        <img
          src={track.image}
          alt={`Capa da trilha ${track.name}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.06]"
        />
        <div
          className={cn("absolute inset-0 mix-blend-multiply opacity-60 transition-opacity duration-300 group-hover:opacity-50", track.gradientClass)}
          aria-hidden
        />
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-app-surface-elevated via-app-surface-elevated/20 to-transparent" />
        
        {/* Floating Icon Badge */}
        <div
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-2xl text-white shadow-glow transition-transform duration-300 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${track.accentVar}, hsl(252 100% 67%))` }}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Dark band bottom part (~30% height) */}
      <div className="flex h-[30%] flex-col justify-between bg-app-surface-elevated/95 p-5 border-t border-app-border/40">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-app-text-muted/60">
            Trilha
          </div>
          <h3 className="mt-0.5 font-display text-lg font-bold text-app-text tracking-wide transition-colors duration-200 group-hover:text-brand-primary">
            {track.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-app-text-muted/90">
            {track.tagline}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-app-text/90 transition-colors duration-200 group-hover:text-app-text">
          Conhecer trilha
          <ArrowRight 
            className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:translate-x-1.5" 
            style={{ color: track.accentVar }} 
          />
        </div>
      </div>
    </Comp>
  );
}