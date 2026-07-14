import { useState } from "react";
import { CheckCircle2, Map, BookMarked, User, BookOpen } from "lucide-react";
import { Section, GlassCard, UniversalCard, BdsButton } from "@/components/bds";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Character {
  name: string;
  role: string;
  image: string;
  bio: string;
  chapters: string;
}

const CHARACTERS: Character[] = [
  {
    name: "Adão e Eva",
    role: "Primeiros humanos",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
    bio: "Criados à imagem e semelhança de Deus, colocados no Jardim do Éden para cuidar da criação. Sua história aborda a inocência, a escolha e as consequências da desobediência.",
    chapters: "Gênesis 1 a 3",
  },
  {
    name: "Noé",
    role: "O construtor da arca",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    bio: "Um homem justo e íntegro em sua geração. Obedeceu fielmente a Deus ao construir uma grande arca para preservar a vida terrestre durante o Dilúvio, tornando-se o herdeiro de uma nova aliança.",
    chapters: "Gênesis 6 a 9",
  },
  {
    name: "Abraão",
    role: "Pai da fé",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
    bio: "Chamado por Deus para deixar sua terra natal rumo a uma herança desconhecida. Sua fé inabalável e obediência estabeleceram a aliança eterna e a promessa de uma descendência tão numerosa quanto as estrelas.",
    chapters: "Gênesis 12 a 25",
  },
  {
    name: "José",
    role: "Governador do Egito",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=400&q=80",
    bio: "O filho preferido de Jacó, vendido como escravo por seus irmãos. Através de sua integridade, sabedoria e dom de interpretar sonhos, ascendeu ao posto mais alto do Egito, salvando nações da fome.",
    chapters: "Gênesis 37 a 50",
  },
];

export function GenesisContext() {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

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
              {CHARACTERS.map((char) => (
                <button
                  key={char.name}
                  onClick={() => setSelectedChar(char)}
                  className="group flex flex-col overflow-hidden rounded-xl bg-app-surface/50 border border-app-border/40 text-center transition-all duration-200 hover:border-brand-primary/40 hover:bg-app-surface-elevated/80 hover:-translate-y-0.5"
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-2.5">
                    <div className="font-display text-xs font-bold text-app-text group-hover:text-brand-primary transition-colors">
                      {char.name}
                    </div>
                    <div className="mt-0.5 text-[10px] text-app-text-muted">{char.role}</div>
                  </div>
                </button>
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

      {/* Character Biography Modal */}
      <Dialog open={!!selectedChar} onOpenChange={(open) => !open && setSelectedChar(null)}>
        <DialogContent className="border-app-border bg-app-surface-elevated text-app-text max-w-md">
          {selectedChar && (
            <>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10">
                <img
                  src={selectedChar.image}
                  alt={selectedChar.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-app-surface-elevated via-transparent to-transparent" />
              </div>
              <DialogHeader>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-primary">
                  <User className="h-3.5 w-3.5" /> Personagem Bíblico
                </div>
                <DialogTitle className="font-display text-2xl mt-1">{selectedChar.name}</DialogTitle>
                <DialogDescription className="text-brand-gold font-medium text-xs">
                  {selectedChar.role}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm leading-relaxed text-app-text-muted">
                <p>{selectedChar.bio}</p>
                <div className="flex items-center gap-2 rounded-xl bg-app-surface/60 p-3 border border-app-border/40 text-xs">
                  <BookOpen className="h-4 w-4 text-brand-cyan shrink-0" />
                  <span>Aparece principalmente em: <strong className="text-app-text">{selectedChar.chapters}</strong></span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <BdsButton onClick={() => setSelectedChar(null)} className="w-full sm:w-auto">
                  Ver histórias
                </BdsButton>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}