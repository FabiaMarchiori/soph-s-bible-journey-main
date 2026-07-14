import { Link } from "@tanstack/react-router";
import { ChevronRight, Star, Award, Clock, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/bds";
import { cn } from "@/lib/utils";

interface JourneyItem {
  id: string;
  title: string;
  desc: string;
  stories: string;
  time: string;
  image: string;
  accent: string;
  // Gamification placeholders
  progress?: number;
  completedStories?: string;
  medalsCount?: number;
  starsCount?: number;
}

interface GenesisJourneysProps {
  journeys: JourneyItem[];
}

export function GenesisJourneys({ journeys }: GenesisJourneysProps) {
  return (
    <Section kicker="Trilha de Aprendizado" title="As 4 Jornadas de Gênesis" subtitle="Explore o livro dividido em quatro grandes arcos narrativos.">
      {/* Responsive layout: Desktop 4 side-by-side, Tablet 2x2, Mobile horizontal swipe carousel */}
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-4">
        {journeys.map((j) => {
          // Highlight Jornada 2 as the current active journey
          const isCurrent = j.id === "j2";
          const isJ1 = j.id === "j1";
          
          const cardContent = (
            <article
              className={cn(
                "group relative flex h-[420px] w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border transition-all duration-300 ease-smooth md:w-auto text-left",
                isCurrent 
                  ? "border-brand-primary/60 bg-app-surface-elevated shadow-glow ring-1 ring-brand-primary/30" 
                  : "border-app-border bg-app-surface-elevated/80 shadow-card hover:-translate-y-1 hover:shadow-hover"
              )}
            >
              {/* Image */}
              <div className="relative h-[45%] w-full overflow-hidden">
                <img
                  src={j.image}
                  alt={j.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-app-surface-elevated via-app-surface-elevated/20 to-transparent" />
                
                {/* Current Journey Badge */}
                {isCurrent && (
                  <span className="absolute left-3 top-3 rounded-full bg-brand-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-glow">
                    Atual
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex h-[55%] flex-col justify-between p-4 bg-app-surface-elevated/95 border-t border-app-border/40">
                <div>
                  <h3 className="font-display text-sm font-bold text-app-text tracking-wide transition-colors duration-200 group-hover:text-brand-primary">
                    {j.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-app-text-muted/90 leading-relaxed">
                    {j.desc}
                  </p>
                </div>

                {/* Gamification Placeholders (Layout Ready) */}
                <div className="border-t border-app-border/40 py-2.5 my-1">
                  <div className="flex items-center justify-between text-[10px] text-app-text-muted/80">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-brand-mint" />
                      {j.completedStories || "0/5 histórias"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-brand-cyan" />
                      {j.time}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-2">
                    <div className="h-1 w-full rounded-full bg-app-surface overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full", isCurrent ? "bg-gradient-brand" : "bg-app-text-muted/40")} 
                        style={{ width: `${j.progress || 0}%` }} 
                      />
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[9px] font-semibold text-app-text-muted/60">
                      <span>{j.progress || 0}% concluído</span>
                      {/* Stars & Medals placeholders */}
                      <div className="flex items-center gap-1.5">
                        <span className="flex items-center gap-0.5">
                          <Star className="h-2.5 w-2.5 text-brand-gold fill-brand-gold" />
                          {j.starsCount || 0}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Award className="h-2.5 w-2.5 text-brand-lavender" />
                          {j.medalsCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-app-border/40 pt-2">
                  <span className="text-[10px] font-bold text-app-text-muted/60 uppercase tracking-wider">
                    {j.stories}
                  </span>
                  <span className={cn(
                    "inline-flex items-center gap-1 text-xs font-bold transition-colors duration-200",
                    isCurrent ? "text-brand-primary group-hover:text-brand-primary-strong" : "text-app-text group-hover:text-brand-primary"
                  )}>
                    Explorar <ChevronRight className="h-3.5 w-3.5" style={{ color: j.accent }} />
                  </span>
                </div>
              </div>
            </article>
          );

          if (isJ1) {
            return (
              <Link key={j.id} to="/biblioteca/genesis/jornada-1" className="snap-start">
                {cardContent}
              </Link>
            );
          }

          return <div key={j.id} className="snap-start">{cardContent}</div>;
        })}
      </div>
    </Section>
  );
}