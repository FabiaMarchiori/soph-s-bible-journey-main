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
        "group relative shrink-0 overflow-hidden rounded-2xl border border-app-border bg-app-surface-elevated shadow-card transition-smooth hover:-translate-y-1 hover:shadow-hover",
        size === "md" ? "w-[220px]" : "w-[260px]",
      )}
    >
      <div className={cn("relative overflow-hidden", size === "md" ? "aspect-[3/4]" : "aspect-[3/4]")}>
        <img
          src={story.image}
          alt={story.title}
          loading="lazy"
          className="h-full w-full object-cover transition-smooth group-hover:scale-[1.04]"
        />
        {/* Gradient veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-app-background via-app-background/40 to-transparent" />
        {/* Track ribbon */}
        <div
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-card backdrop-blur"
          style={{ background: `linear-gradient(135deg, ${track.accentVar}, hsl(252 100% 67%))` }}
        >
          {track.name}
        </div>
        {story.badge && (
          <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
            {story.badge}
          </div>
        )}
        {/* Favorite */}
        <button
          aria-label={`Favoritar ${story.title}`}
          className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-smooth group-hover:opacity-100 hover:bg-brand-coral"
        >
          <Heart className="h-4 w-4" />
        </button>
        {/* Play */}
        <button
          aria-label={`Abrir história ${story.title}`}
          className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-xl bg-white/95 py-2 font-display text-xs font-semibold text-app-background opacity-0 shadow-elevated transition-smooth group-hover:translate-y-0 group-hover:opacity-100"
          style={{ transitionProperty: "opacity, transform" }}
        >
          <Play className="h-3.5 w-3.5 fill-current" /> Assistir
        </button>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 font-display text-sm font-semibold text-app-text">{story.title}</h3>
        <div className="mt-1 flex items-center justify-between text-[11px] text-app-text-muted">
          <span className="truncate">{story.reference}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {story.duration}
          </span>
        </div>
      </div>
    </article>
  );
}
