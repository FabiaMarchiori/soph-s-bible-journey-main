import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Play,
  Heart,
  Clock,
  BookOpen,
  Sparkles,
  Award,
  Star,
  HelpCircle,
  MapPin,
  Compass,
  ChevronRight,
  ArrowLeft,
  Info,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  BdsButton,
  ProgressBar,
  CircularProgress,
  Section,
  GlassCard,
  UniversalCard,
  BibleBreadcrumb,
  feedback,
} from "@/components/bds";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/biblioteca/genesis/jornada-1")({
  head: () => ({
    meta: [
      { title: "Jornada 1: As Origens — Gênesis" },
      {
        name: "description",
        content: "Descubra como Deus criou o universo, a humanidade e estabeleceu os fundamentos de toda a história bíblica.",
      },
    ],
  }),
  component: JourneyOnePage,
});

const PLACEHOLDERS = {
  hero: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  criacao: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  adaoEva: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
  caimAbel: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
  noe: "https://images.unsplash.com/photo-1431512284068-4c4002298068?auto=format&fit=crop&w=600&q=80",
  babel: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80",
};

const STORIES = [
  {
    id: "criacao",
    title: "A Criação",
    ref: "Gênesis 1–2",
    time: "6 min",
    desc: "No princípio, Deus criou os céus e a terra, trazendo ordem, luz e vida a partir do caos absoluto.",
    image: PLACEHOLDERS.criacao,
    status: "completed" as const,
    progress: 100,
  },
  {
    id: "adao-eva",
    title: "Adão e Eva",
    ref: "Gênesis 2–3",
    time: "7 min",
    desc: "A vida no Jardim do Éden, a criação da humanidade, a tentação e a escolha que mudou o destino do mundo.",
    image: PLACEHOLDERS.adaoEva,
    status: "in-progress" as const,
    progress: 30,
  },
  {
    id: "caim-abel",
    title: "Caim e Abel",
    ref: "Gênesis 4",
    time: "5 min",
    desc: "A história dos primeiros irmãos, a oferta ao Senhor, o ciúme e as consequências do primeiro homicídio.",
    image: PLACEHOLDERS.caimAbel,
    status: "locked" as const,
    progress: 0,
  },
  {
    id: "noe",
    title: "Noé e a Arca",
    ref: "Gênesis 6–9",
    time: "8 min",
    desc: "A corrupção da terra, a fidelidade de um homem justo e a grande arca que preservou a vida em meio ao dilúvio.",
    image: PLACEHOLDERS.noe,
    status: "locked" as const,
    progress: 0,
  },
  {
    id: "babel",
    title: "A Torre de Babel",
    ref: "Gênesis 11",
    time: "4 min",
    desc: "A ambição humana de tocar os céus, a confusão das línguas e a dispersão dos povos por toda a terra.",
    image: PLACEHOLDERS.babel,
    status: "locked" as const,
    progress: 0,
  },
];

const CHARACTERS = [
  { name: "Adão", role: "O primeiro homem", image: PLACEHOLDERS.adaoEva, bio: "Criado do pó da terra por Deus, recebeu o sopro da vida e a responsabilidade de cuidar do Jardim do Éden.", chapters: "Gênesis 2-5" },
  { name: "Eva", role: "A primeira mulher", image: PLACEHOLDERS.adaoEva, bio: "Criada por Deus para ser a companheira ideal de Adão, mãe de todos os seres viventes.", chapters: "Gênesis 2-5" },
  { name: "Caim", role: "O primeiro agricultor", image: PLACEHOLDERS.caimAbel, bio: "Filho mais velho de Adão e Eva, cuja oferta não agradou a Deus, levando-o ao ciúme e à tragédia contra seu irmão.", chapters: "Gênesis 4" },
  { name: "Abel", role: "O pastor justo", image: PLACEHOLDERS.caimAbel, bio: "Segundo filho de Adão e Eva, ofereceu a Deus o melhor de seu rebanho com um coração sincero e cheio de fé.", chapters: "Gênesis 4" },
  { name: "Noé", role: "O homem justo", image: PLACEHOLDERS.noe, bio: "Andava com Deus em uma geração corrompida. Construiu a arca em obediência e salvou sua família e a criação.", chapters: "Gênesis 6-9" },
];

const OBJECTS = [
  { name: "Árvore da Vida", desc: "Localizada no centro do Jardim do Éden, representava a comunhão eterna e a imortalidade concedida por Deus.", ref: "Gênesis 2:9" },
  { name: "A Arca", desc: "A gigantesca embarcação de madeira de gofer construída por Noé para preservar a vida terrestre durante o dilúvio.", ref: "Gênesis 6:14" },
  { name: "O Fruto Proibido", desc: "O fruto da Árvore do Conhecimento do Bem e do Mal, cujo consumo foi expressamente proibido por Deus.", ref: "Gênesis 2:17" },
  { name: "O Altar de Caim e Abel", desc: "O local onde os primeiros irmãos apresentaram suas ofertas ao Senhor, revelando a atitude de seus corações.", ref: "Gênesis 4:3" },
];

const LOCATIONS = [
  { name: "Jardim do Éden", desc: "O paraíso perfeito criado por Deus para habitação da humanidade, repleto de beleza, harmonia e provisão.", ref: "Gênesis 2" },
  { name: "Monte Ararate", desc: "A cordilheira montanhosa onde a Arca de Noé repousou após as águas do dilúvio começarem a baixar.", ref: "Gênesis 8:4" },
  { name: "Babel", desc: "A planície na terra de Sinar onde a humanidade tentou construir uma torre que tocasse os céus em rebeldia a Deus.", ref: "Gênesis 11" },
];

function JourneyOnePage() {
  const navigate = useNavigate();
  const [selectedChar, setSelectedChar] = useState<typeof CHARACTERS[0] | null>(null);
  const [selectedObj, setSelectedObj] = useState<typeof OBJECTS[0] | null>(null);
  const [selectedLoc, setSelectedLoc] = useState<typeof LOCATIONS[0] | null>(null);

  return (
    <AppShell>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-[1400px] px-4 pt-6 md:px-8">
        <BibleBreadcrumb
          items={[
            { label: "Biblioteca", href: "/biblioteca" },
            { label: "Gênesis", href: "/biblioteca/genesis" },
            { label: "Jornada 1: As Origens" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto mt-6 max-w-[1400px] px-4 md:px-8" aria-label="Apresentação da Jornada">
        <div className="relative overflow-hidden rounded-[32px] border border-app-border bg-app-surface-elevated/40 p-6 md:p-12 backdrop-blur-xl">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-hero opacity-40" />
            <img
              src={PLACEHOLDERS.hero}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-overlay"
            />
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-lavender">
              <Compass className="h-3.5 w-3.5" /> Jornada 1
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-app-text md:text-5xl lg:text-6xl">
              As Origens
            </h1>
            <p className="mt-4 text-base leading-relaxed text-app-text-muted md:text-lg">
              Descubra como Deus criou o universo, a humanidade e estabeleceu os fundamentos de toda a história bíblica.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <BdsButton
                size="lg"
                leadingIcon={<Play className="h-5 w-5 fill-current" />}
                onClick={() => navigate({ to: "/biblioteca/genesis/jornada-1/criacao" })}
              >
                Começar primeira história
              </BdsButton>
              <BdsButton
                variant="secondary"
                size="lg"
                leadingIcon={<Clock className="h-5 w-5" />}
                onClick={() => navigate({ to: "/biblioteca/genesis/jornada-1/adao-eva" })}
              >
                Continuar de onde parei
              </BdsButton>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Card */}
      <div className="mx-auto max-w-[1400px] px-4 mt-6 md:px-8">
        <UniversalCard className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">Sua Jornada</span>
              <h2 className="mt-1 font-display text-xl font-bold text-app-text">Histórias concluídas</h2>
              <div className="mt-3 flex items-center gap-3">
                <span className="font-display text-2xl font-extrabold text-brand-cyan">1 / 5</span>
                <span className="text-xs text-app-text-muted">concluídas</span>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-xs text-app-text-muted mb-2">
                <span>Progresso da Jornada</span>
                <span>20%</span>
              </div>
              <ProgressBar value={20} size="lg" />
            </div>
            <div className="flex items-center gap-2.5 rounded-2xl bg-app-surface/60 p-4 border border-app-border/40">
              <Clock className="h-5 w-5 text-brand-gold" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted">Tempo Estimado</div>
                <div className="font-display text-sm font-bold text-app-text">30 minutos</div>
              </div>
            </div>
          </div>
        </UniversalCard>
      </div>

      {/* Timeline of Stories */}
      <Section kicker="Linha do Tempo" title="Progresso das Histórias" subtitle="Acompanhe a sequência cronológica dos eventos desta jornada.">
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-5 md:px-0">
          {STORIES.map((s, idx) => {
            const isCompleted = s.status === "completed";
            const isInProgress = s.status === "in-progress";
            const isLocked = s.status === "locked";

            return (
              <div
                key={s.id}
                className={cn(
                  "group relative flex w-[240px] shrink-0 snap-start flex-col items-center text-center md:w-auto",
                  isLocked && "opacity-60"
                )}
              >
                {/* Node Circle */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={cn(
                      "grid h-14 w-14 place-items-center rounded-full border-2 transition-all duration-300",
                      isCompleted && "border-brand-mint bg-brand-mint/10 text-brand-mint shadow-[0_0_15px_rgba(98,240,170,0.2)]",
                      isInProgress && "border-brand-primary bg-brand-primary/10 text-brand-primary shadow-glow bds-glow-pulse",
                      isLocked && "border-app-border bg-app-surface text-app-text-muted"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : isLocked ? (
                      <Lock className="h-5 w-5" />
                    ) : (
                      <span className="font-display text-sm font-bold">{idx + 1}</span>
                    )}
                  </div>
                  {/* Connecting Line */}
                  {idx < STORIES.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-[calc(50%+28px)] top-1/2 h-[2px] w-[calc(100%-56px)] -translate-y-1/2 hidden md:block",
                        isCompleted ? "bg-brand-mint" : "bg-app-border"
                      )}
                    />
                  )}
                </div>

                {/* Info */}
                <div className="mt-4">
                  <div className="font-display text-sm font-bold text-app-text group-hover:text-brand-primary transition-colors">
                    {s.title}
                  </div>
                  <div className="mt-1 text-[10px] text-app-text-muted uppercase tracking-wider">
                    {s.ref} · {s.time}
                  </div>
                  <div className="mt-2">
                    {isCompleted ? (
                      <span className="rounded-full bg-brand-mint/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-mint">
                        Concluído
                      </span>
                    ) : isInProgress ? (
                      <span className="rounded-full bg-brand-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-primary">
                        Em andamento
                      </span>
                    ) : (
                      <span className="rounded-full bg-app-surface px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-app-text-muted border border-app-border">
                        Bloqueado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Story Cards */}
      <Section kicker="Histórias" title="Explore as Histórias" subtitle="Abra cada capítulo para viver a narrativa de forma imersiva.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((s) => (
            <UniversalCard
              key={s.id}
              className={cn(
                "group flex flex-col overflow-hidden h-[420px]",
                s.status === "locked" && "opacity-75"
              )}
            >
              {/* Image */}
              <div className="relative h-[45%] w-full overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-app-surface-elevated via-app-surface-elevated/20 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute left-3 top-3">
                  {s.status === "completed" ? (
                    <span className="rounded-full bg-brand-mint px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-app-background shadow-glow">
                      Concluído
                    </span>
                  ) : s.status === "in-progress" ? (
                    <span className="rounded-full bg-brand-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-glow">
                      Lendo
                    </span>
                  ) : (
                    <span className="rounded-full bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                      Bloqueado
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex h-[55%] flex-col justify-between p-5 bg-app-surface-elevated/95 border-t border-app-border/40">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
                    <span>{s.ref}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {s.time}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-app-text tracking-wide transition-colors duration-200 group-hover:text-brand-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs text-app-text-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="border-t border-app-border/40 pt-4">
                  <Link
                    to="/biblioteca/genesis/jornada-1/$storySlug"
                    params={{ storySlug: s.id }}
                    disabled={s.status === "locked"}
                    className="w-full"
                  >
                    <BdsButton
                      variant={s.status === "locked" ? "secondary" : "primary"}
                      className="w-full"
                      disabled={s.status === "locked"}
                    >
                      {s.status === "completed" ? "Rever História" : "Ler História"}
                    </BdsButton>
                  </Link>
                </div>
              </div>
            </UniversalCard>
          ))}
        </div>
      </Section>

      {/* Curiosities */}
      <div className="mx-auto max-w-[1400px] px-4 mt-6 md:px-8">
        <GlassCard className="p-6 border-brand-gold/20 bg-gradient-to-br from-brand-gold/5 to-transparent">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gold/10 text-brand-gold">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Você sabia?</span>
              <h3 className="mt-1 font-display text-lg font-bold text-app-text">O significado de Gênesis</h3>
              <p className="mt-2 text-sm leading-relaxed text-app-text-muted">
                A palavra "Gênesis" vem do grego antigo e significa "origem", "nascimento" ou "começo". No texto hebraico original, o livro é chamado de "Bereshit", que significa "No princípio", sendo a primeira palavra do texto sagrado.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Characters of this Journey */}
      <Section kicker="Personagens" title="Personagens desta Jornada" subtitle="Conheça as figuras centrais que moldaram os primeiros capítulos de Gênesis.">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {CHARACTERS.map((char) => (
            <button
              key={char.name}
              onClick={() => setSelectedChar(char)}
              className="group flex flex-col overflow-hidden rounded-2xl bg-app-surface-elevated border border-app-border/60 text-center transition-all duration-200 hover:border-brand-primary/40 hover:bg-app-surface-high hover:-translate-y-1"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <img
                  src={char.image}
                  alt={char.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-3">
                <div className="font-display text-sm font-bold text-app-text group-hover:text-brand-primary transition-colors">
                  {char.name}
                </div>
                <div className="mt-0.5 text-[10px] text-app-text-muted">{char.role}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-brand-primary">
                  Ver perfil <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Objects & Locations */}
      <Section kicker="Mundo Bíblico" title="Objetos e Locais Sagrados" subtitle="Explore os elementos físicos e geográficos que fazem parte desta jornada.">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Objects */}
          <GlassCard className="p-6">
            <h3 className="font-display text-lg font-bold text-app-text mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-brand-gold" /> Objetos Bíblicos
            </h3>
            <div className="grid gap-3">
              {OBJECTS.map((obj) => (
                <button
                  key={obj.name}
                  onClick={() => setSelectedObj(obj)}
                  className="flex items-center justify-between rounded-xl bg-app-surface/40 p-3 border border-app-border/40 text-left transition-all duration-150 hover:bg-app-surface-elevated hover:border-brand-gold/40"
                >
                  <div>
                    <div className="font-display text-sm font-bold text-app-text">{obj.name}</div>
                    <div className="text-[10px] text-app-text-muted mt-0.5">{obj.ref}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-app-text-muted" />
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Locations */}
          <GlassCard className="p-6">
            <h3 className="font-display text-lg font-bold text-app-text mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-cyan" /> Locais Históricos
            </h3>
            <div className="grid gap-3">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => setSelectedLoc(loc)}
                  className="flex items-center justify-between rounded-xl bg-app-surface/40 p-3 border border-app-border/40 text-left transition-all duration-150 hover:bg-app-surface-elevated hover:border-brand-cyan/40"
                >
                  <div>
                    <div className="font-display text-sm font-bold text-app-text">{loc.name}</div>
                    <div className="text-[10px] text-app-text-muted mt-0.5">{loc.ref}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-app-text-muted" />
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Chronological Timeline */}
      <Section kicker="Cronologia" title="Linha do Tempo Histórica" subtitle="A ordem cronológica dos grandes marcos da humanidade nesta jornada.">
        <div className="relative py-8">
          {/* Horizontal Line */}
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-app-border -translate-y-1/2 hidden md:block" />
          
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-5 md:px-0">
            {[
              { title: "Criação", desc: "O início de tudo" },
              { title: "Queda", desc: "A entrada do pecado" },
              { title: "Dilúvio", desc: "O julgamento e recomeço" },
              { title: "Nova Humanidade", desc: "A aliança com Noé" },
              { title: "Babel", desc: "A dispersão das nações" },
            ].map((item, idx) => (
              <div key={item.title} className="flex w-[200px] shrink-0 snap-start flex-col items-center text-center md:w-auto relative">
                {/* Node */}
                <div className="z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-brand-primary bg-app-background text-brand-primary font-display text-xs font-bold">
                  {idx + 1}
                </div>
                <h4 className="mt-4 font-display text-sm font-bold text-app-text">{item.title}</h4>
                <p className="mt-1 text-xs text-app-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Journey Challenge */}
      <div className="mx-auto max-w-[1400px] px-4 mt-6 md:px-8">
        <UniversalCard className="p-6 border-brand-primary/30 bg-gradient-to-br from-brand-primary/5 to-transparent">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Desafio Especial</span>
                <h3 className="mt-1 font-display text-lg font-bold text-app-text">Você consegue responder?</h3>
                <p className="mt-2 text-sm leading-relaxed text-app-text-muted max-w-xl">
                  Ao terminar esta Jornada, haverá um desafio especial contendo perguntas sobre todas as histórias para testar seus conhecimentos e liberar medalhas exclusivas.
                </p>
              </div>
            </div>
            <BdsButton variant="soph" className="shrink-0">
              Ver desafio
            </BdsButton>
          </div>
        </UniversalCard>
      </div>

      {/* Medals Area */}
      <Section kicker="Conquistas" title="Medalhas da Jornada" subtitle="Complete as histórias para desbloquear estas conquistas exclusivas.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Primeira História", desc: "Conclua 'A Criação'", tier: "bronze" as const },
            { name: "Primeira Jornada", desc: "Conclua todas as 5 histórias", tier: "silver" as const },
            { name: "Explorador", desc: "Descubra todos os locais e objetos", tier: "gold" as const },
            { name: "Leitor Fiel", desc: "Mantenha uma sequência de leitura", tier: "gold" as const },
          ].map((medal) => (
            <div
              key={medal.name}
              className="flex items-center gap-4 rounded-2xl border border-app-border bg-app-surface-elevated/50 p-4 opacity-60"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-app-surface text-app-text-muted border border-app-border">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display text-sm font-bold text-app-text">{medal.name}</div>
                <div className="text-xs text-app-text-muted mt-0.5">{medal.desc}</div>
                <div className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-app-text-muted">
                  <Lock className="h-2.5 w-2.5" /> Bloqueada
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer Navigation */}
      <section className="mx-auto max-w-[1400px] px-4 pb-20 pt-10 md:px-8" aria-label="Navegação de Jornada">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-app-border/60 pt-8">
          <Link to="/biblioteca/genesis">
            <BdsButton variant="secondary" leadingIcon={<ArrowLeft className="h-4 w-4" />}>
              Voltar ao Livro
            </BdsButton>
          </Link>
          <BdsButton
            variant="primary"
            trailingIcon={<ChevronRight className="h-4 w-4" />}
            onClick={() => feedback.info("Próxima Jornada", "A Jornada 2 estará disponível em breve.")}
          >
            Próxima Jornada
          </BdsButton>
        </div>
      </section>

      {/* Modals */}
      {/* Character Modal */}
      <Dialog open={!!selectedChar} onOpenChange={(open) => !open && setSelectedChar(null)}>
        <DialogContent className="border-app-border bg-app-surface-elevated text-app-text max-w-md">
          {selectedChar && (
            <>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10">
                <img src={selectedChar.image} alt={selectedChar.name} className="h-full w-full object-cover" />
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
                <BdsButton onClick={() => setSelectedChar(null)} className="w-full">
                  Fechar
                </BdsButton>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Object Modal */}
      <Dialog open={!!selectedObj} onOpenChange={(open) => !open && setSelectedObj(null)}>
        <DialogContent className="border-app-border bg-app-surface-elevated text-app-text max-w-md">
          {selectedObj && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
                  <Award className="h-3.5 w-3.5" /> Objeto Sagrado
                </div>
                <DialogTitle className="font-display text-2xl mt-1">{selectedObj.name}</DialogTitle>
                <DialogDescription className="text-brand-gold font-medium text-xs">
                  Referência: {selectedObj.ref}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm leading-relaxed text-app-text-muted">
                <p>{selectedObj.desc}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <BdsButton onClick={() => setSelectedObj(null)} className="w-full">
                  Fechar
                </BdsButton>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Location Modal */}
      <Dialog open={!!selectedLoc} onOpenChange={(open) => !open && setSelectedLoc(null)}>
        <DialogContent className="border-app-border bg-app-surface-elevated text-app-text max-w-md">
          {selectedLoc && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-cyan">
                  <MapPin className="h-3.5 w-3.5" /> Local Histórico
                </div>
                <DialogTitle className="font-display text-2xl mt-1">{selectedLoc.name}</DialogTitle>
                <DialogDescription className="text-brand-cyan font-medium text-xs">
                  Referência: {selectedLoc.ref}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm leading-relaxed text-app-text-muted">
                <p>{selectedLoc.desc}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <BdsButton onClick={() => setSelectedLoc(null)} className="w-full">
                  Fechar
                </BdsButton>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}