import { CheckCircle2, Map, BookMarked } from "lucide-react";
import { Section, GlassCard, UniversalCard, BdsButton } from "@/components/bds";

export function GenesisContext() {
  return (
    <Section kicker="Contexto Visual" title="Antes de Começar" subtitle="Prepare-se para a leitura compreendendo o cenário geral.">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Left: Theme, Characters, What you will learn */}
        <div className="flex flex-col gap-6">
          <GlassCard className="p-6">
            <h3 className="font-display text-lg font-bold text-app-text">Tema Central</h3>
            <p className="mt-2 text-sm leading-relaxed text-app-text-muted">
              O início de todas as coisas: o universo, a humanidade, a entrada do pecado no mundo e o início do plano de redenção de Deus através de uma aliança com uma família escolhida.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-display text-lg font-bold text-app-text">Personagens Principais</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { name: "Adão e Eva", role: "Primeiros pais" },
                { name: "Noé", role: "O construtor da arca" },
                { name: "Abraão", role: "Pai da fé" },
                { name: "José", role: "Governador do Egito" },
              ].map((char) => (
                <div key={char.name} className="rounded-xl bg-app-surface/50 p-3 border border-app-border/40 text-center">
                  <div className="font-display text-xs font-bold text-app-text">{char.name}</div>
                  <div className="mt-1 text-[10px] text-app-text-muted">{char.role}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-display text-lg font-bold text-app-text">O que você aprenderá</h3>
            <ul className="mt-3 space-y-2 text-sm text-app-text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-mint" />
                <span>Como Deus estabeleceu a ordem e a beleza a partir do caos.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-mint" />
                <span>A origem das nações, línguas e culturas da Terra.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-mint" />
                <span>O desenvolvimento da fé e da confiança nas promessas divinas.</span>
              </li>
            </ul>
          </GlassCard>
        </div>

        {/* Right: Stylized Map & Timeline Placeholders */}
        <div className="flex flex-col gap-6">
          {/* Stylized Map Placeholder */}
          <UniversalCard className="relative overflow-hidden p-6 h-[220px] flex flex-col justify-between">
            <div className="absolute inset-0 -z-10 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-transparent" />
              <div className="absolute left-10 top-10 h-32 w-32 rounded-full border border-dashed border-brand-cyan/30" />
              <div className="absolute right-20 bottom-10 h-24 w-24 rounded-full border border-dashed border-brand-cyan/30" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Map className="h-5 w-5 text-brand-cyan" />
                <h3 className="font-display text-base font-bold text-app-text">Mapa do Mundo Antigo</h3>
              </div>
              <span className="rounded-full bg-brand-cyan/10 px-2 py-0.5 text-[10px] font-bold text-brand-cyan">Interativo</span>
            </div>
            <p className="text-xs text-app-text-muted max-w-xs">
              Explore as rotas de Abraão, a localização do Jardim do Éden e a jornada de José até o Egito.
            </p>
            <BdsButton size="sm" variant="secondary" className="w-fit">
              Abrir Mapa
            </BdsButton>
          </UniversalCard>

          {/* Stylized Timeline Placeholder */}
          <UniversalCard className="relative overflow-hidden p-6 h-[220px] flex flex-col justify-between">
            <div className="absolute inset-0 -z-10 opacity-20">
              <div className="absolute inset-y-1/2 left-6 right-6 h-px bg-dashed bg-brand-gold/40" />
              <div className="absolute left-12 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-brand-gold" />
              <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-brand-gold" />
              <div className="absolute left-2/3 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-brand-gold" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-brand-gold" />
                <h3 className="font-display text-base font-bold text-app-text">Linha do Tempo</h3>
              </div>
              <span className="rounded-full bg-brand-gold/10 px-2 py-0.5 text-[10px] font-bold text-brand-gold">Cronológico</span>
            </div>
            <p className="text-xs text-app-text-muted max-w-xs">
              Visualize a ordem cronológica dos patriarcas e os grandes marcos da história da salvação.
              </p>
            <BdsButton size="sm" variant="secondary" className="w-fit">
              Ver Linha do Tempo
            </BdsButton>
          </UniversalCard>
        </div>
      </div>
    </Section>
  );
}