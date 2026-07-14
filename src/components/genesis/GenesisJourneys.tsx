import { ChevronRight } from "lucide-react";
import { Section } from "@/components/bds";

interface JourneyItem {
  id: string;
  title: string;
  desc: string;
  stories: string;
  time: string;
  image: string;
  accent: string;
}

interface GenesisJourneysProps {
  journeys: JourneyItem[];
}

export function GenesisJourneys({ journeys }: GenesisJourneysProps) {
  return (
    <Section kicker="Trilha de Aprendizado" title="As 4 Jornadas de Gênesis" subtitle="Explore o livro dividido em quatro grandes arcos narrativos.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {journeys.map((j) => (
          <article
            key={j.id}
            className="group relative flex h-[400px] flex-col overflow-hidden rounded-3xl border border-app-border bg-app-surface-elevated shadow-card transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:shadow-hover"
          >
            {/* Image */}
            <div className="relative h-[55%] w-full overflow-hidden">
              <img
                src={j.image}
                alt={j.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-app-surface-elevated via-app-surface-elevated/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="flex h-[45%] flex-col justify-between p-5 bg-app-surface-elevated/95 border-t border-app-border/40">
              <div>
                <h3 className="font-display text-base font-bold text-app-text tracking-wide transition-colors duration-200 group-hover:text-brand-primary">
                  {j.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs text-app-text-muted/90 leading-relaxed">
                  {j.desc}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-app-border/40 pt-3">
                <div className="text-[10px] font-semibold text-app-text-muted">
                  {j.stories} · {j.time}
                </div>
                <button className="inline-flex items-center gap-1 text-xs font-bold text-app-text transition-colors duration-200 group-hover:text-brand-primary">
                  Explorar <ChevronRight className="h-3.5 w-3.5" style={{ color: j.accent }} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}