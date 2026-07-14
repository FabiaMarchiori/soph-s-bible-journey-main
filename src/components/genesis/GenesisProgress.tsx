import { Play, Trophy } from "lucide-react";
import { Section, UniversalCard, CircularProgress, ProgressBar, BdsButton, ElevatedCard } from "@/components/bds";

export function GenesisProgress() {
  return (
    <Section kicker="Seu Progresso" title="Acompanhe sua Jornada" subtitle="Veja onde você parou e continue lendo.">
      <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
        {/* Progress Card */}
        <UniversalCard className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">Jornada Atual</span>
                <h3 className="mt-1 font-display text-xl font-bold text-app-text">Jornada 2 — Os Patriarcas</h3>
              </div>
              <CircularProgress value={42} size={64} />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-app-text-muted">
                <span>Progresso Geral de Gênesis</span>
                <span>42% concluído</span>
              </div>
              <ProgressBar value={42} className="mt-2" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-app-border/40 pt-4">
            <div className="text-xs text-app-text-muted">
              <span className="block text-app-text-muted/60">Última leitura:</span>
              <span className="font-semibold text-app-text">Noé e a Grande Arca</span>
            </div>
            <BdsButton size="sm" leadingIcon={<Play className="h-4 w-4 fill-current" />}>
              Continuar Lendo
            </BdsButton>
          </div>
        </UniversalCard>

        {/* Quick Quiz / Challenge Card */}
        <ElevatedCard className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Desafio de Gênesis</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold text-app-text">Pronto para testar seus conhecimentos?</h3>
            <p className="mt-2 text-xs leading-relaxed text-app-text-muted">
              Responda ao quiz rápido sobre a criação e os patriarcas para ganhar a medalha "Explorador de Gênesis".
            </p>
          </div>
          <BdsButton variant="soph" size="sm" className="mt-4 w-full">
            Iniciar Desafio
          </BdsButton>
        </ElevatedCard>
      </div>
    </Section>
  );
}