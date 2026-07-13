import { Heart, Play, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Story } from "@/lib/stories";
import { getTrack } from "@/lib/tracks";

interface StoryCardProps {
  story: Story;
  size?: "md" | "lg";
}

export function StoryCard({ story, size = "md" }: StoryCardProps) {
  const track = getTrack(story.track);
  return (
    <article
      className={cn(
        "group relative shrink-0 overflow-hidden rounded-2xl border border-app-border/80 bg-app-surface-elevated shadow-card transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:shadow-hover",
        size === "md" ? "w-[220px]" : "w-[260px]",
      )}
      style={{
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
      }}
    >
      {/* Book spine effect on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-black/30 z-10 border-r border-white/5" />

      {/* Cover Image occupies almost the entire cover */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.05]"
        />
        {/* Premium gradient veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-app-surface-elevated via-app-surface-elevated/30 to-transparent" />
        
        {/* Track ribbon */}
        <div
          className="absolute left-4 top-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-card backdrop-blur-md"
          style={{ background: `linear-gradient(135deg, ${track.accentVar}, hsl(252 100% 67%))` }}
        >
          {track.name}
        </div>
        {story.badge && (
          <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            {story.badge}
          </div>
        )}
        
        {/* Favorite */}
        <button
          aria-label={`Favoritar ${story.title}`}
          className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-200 group-hover:opacity-100 hover:bg-brand-coral hover:scale-110"
        >
          <Heart className="h-4 w-4" />
        </button>
        
        {/* Play */}
        <button
          aria-label={`Abrir história ${story.title}`}
          className="absolute inset-x-4 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-xl bg-white/95 py-2.5 font-display text-xs font-bold text-app-background opacity-0 shadow-elevated transition-all duration-300 ease-smooth group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white hover:scale-[1.02]"
          style={{ transitionProperty: "opacity, transform, background-color, scale" }}
        >
          <Play className="h-3.5 w-3.5 fill-current" /> Assistir
        </button>
      </div>

      {/* Bottom Info */}
      <div className="p-4 bg-app-surface-elevated/95 border-t border-app-border/40">
        <h3 className="line-clamp-1 font-display text-sm font-bold text-app-text tracking-wide transition-colors duration-200 group-hover:text-brand-primary">
          {story.title}
        </h3>
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-app-text-muted/80">
          <span className="truncate font-medium">{story.reference}</span>
          <span className="flex items-center gap-1 font-semibold">
            <Clock className="h-3 w-3 text-brand-cyan" /> {story.duration}
          </span>
        </div>
      </div>
    </article>
  );
}