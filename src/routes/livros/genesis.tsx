import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpen,
  User,
  Calendar,
  Clock,
  Compass,
  MapPin,
  Share2,
  Download,
  Heart,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronRight,
  BookMarked,
  Layers,
  Map,
  HelpCircle,
  Play,
  Trophy,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  Section,
  Display,
  H2,
  H3,
  Body,
  Muted,
  Kicker,
  BdsButton,
  ProgressBar,
  CircularProgress,
  UniversalCard,
  GlassCard,
  ElevatedCard,
  BibleBreadcrumb,
  feedback,
} from "@/components/bds";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/livros/genesis")({
  head: () => ({
    meta: [
      { title: "Gênesis — Jornada Bíblica com Soph" },
      {
        name: "description",
        content: "Explore o Livro das Origens. Comece sua jornada pelas origens da humanidade e as promessas de Deus.",
      },
    ],
  }),
  component: GenesisBookPage,
});

const PLACEHOLDERS = {
  cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Sunset/Creation vibe
  universe: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80", // Cosmic light
  journey1: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80", // Mountains
  journey2: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80", // Ancient path
  journey3: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80", // Desert/Egypt
  journey4: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80", // Forest light
  nextBook: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80", // Red Sea/Desert
};

function GenesisBookPage() {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    feedback.success(
      isFavorited ? "Removido dos favoritos" : "Adicionado aos favoritos",
      "Gênesis foi atualizado na sua estante."
    );
  };

  const handleShare = () => {
    feedback.info("Link copiado!", "Compartilhe a jornada de Gênesis com seus amigos.");
  };

  const handleDownload = () => {
    feedback.success("Download iniciado", "O guia de estudos em PDF está sendo baixado.");
  };

  return (
    <AppShell>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-[1400px] px-4 pt-6 md:px-8">
        <BibleBreadcrumb
          items={[
            { label: "Biblioteca", href: "/biblioteca" },
            { label: "Antigo Testamento", href: "/antigo-testamento" },
            { label: "Gênesis" },
          ]}
        />
      </div>

      {/* 1. HERO DO LIVRO */}
      <section className="relative mx-auto mt-6 max-w-[1400px] px-4 md:px-8" aria-label="Apresentação do Livro">
        <div className="relative overflow-hidden rounded-[32px] border border-app-border bg-app-surface-elevated/40 p-6 md:p-12 backdrop-blur-xl">
          {/* Background glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-hero opacity-40" />
            <img
              src={PLACEHOLDERS.universe}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-10 mix-blend-overlay"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:gap-12">
            {/* Book Cover with 3D Spine Effect */}
            <div className="relative mx-auto w-[220px] shrink-0 md:w-[280px]">
              <div
                className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 shadow-elevated transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Book spine effect */}
                <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-black/40 z-10 border-r border-white/5" />
                <img
                  src={PLACEHOLDERS.cover}
                  alt="Capa de Gênesis"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="rounded bg-brand-gold/20 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-widest text-brand-gold backdrop-blur-sm">
                    Gn
                  </span>
                  <h1 className="mt-2 font-display text-2xl font-extrabold text-white">Gênesis</h1>
                  <p className="text-xs text-app-text-muted">O Livro das Origens</p>
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="flex flex-col justify-between py-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-gold">
                  <Sparkles className="h-3.5 w-3.5" /> Livro das Origens
                </div>
                <h2 className="mt-4 font-display text-4xl font-extrabold text-app-text md:text-5xl lg:text-6xl">
                  Gênesis
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-app-text-muted md:text-lg">
                  Toda grande história tem um começo. Aqui começa a jornada da humanidade, a criação do universo e o estabelecimento das promessas eternas de Deus.
                </p>

                {/* Quick Stats */}
                <div className="mt-8 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-app-surface text-brand-primary">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted">Capítulos</div>
                      <div className="font-display text-sm font-bold text-app-text">50 Capítulos</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-app-surface text-brand-cyan">
                      <Compass className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted">Jornadas</div>
                      <div className="font-display text-sm font-bold text-app-text">4 Jornadas</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-app-surface text-brand-gold">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted">Tempo Estimado</div>
                      <div className="font-display text-sm font-bold text-app-text">~4.5 horas</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <BdsButton size="lg" leadingIcon={<Play className="h-5 w-5 fill-current" />}>
                  Começar Jornada
                </BdsButton>
                <BdsButton
                  variant="secondary"
                  size="lg"
                  onClick={handleFavorite}
                  leadingIcon={<Heart className={cn("h-5 w-5", isFavorited && "fill-brand-coral text-brand-coral")} />}
                >
                  {isFavorited ? "Favoritado" : "Favoritar Livro"}
                </BdsButton>
                <BdsButton variant="ghost" size="lg" onClick={handleShare} aria-label="Compartilhar">
                  <Share2 className="h-5 w-5" />
                </BdsButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FICHA DO LIVRO */}
      <Section kicker="Ficha de Biblioteca" title="Ficha do Livro" subtitle="Detalhes históricos e literários de Gênesis.">
        <div className="grid gap-6 md:grid-cols-3">
          <UniversalCard className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <User className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-app-text">Autor Tradicional</h3>
            </div>
            <p className="mt-3 text-sm text-app-text-muted">
              Moisés, que compilou as tradições orais e escritas sob inspiração divina para guiar o povo de Israel no deserto.
            </p>
          </UniversalCard>

          <UniversalCard className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-app-text">Categoria Literária</h3>
            </div>
            <p className="mt-3 text-sm text-app-text-muted">
              Pentateuco (ou Torá), representando a Lei e os fundamentos históricos da fé judaico-cristã.
            </p>
          </UniversalCard>

          <UniversalCard className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gold/10 text-brand-gold">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-app-text">Eventos Principais</h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Criação", "Queda", "Dilúvio", "Babel", "Abraão", "Isaque", "Jacó", "José"].map((event) => (
                <span
                  key={event}
                  className="rounded-full bg-app-surface px-2.5 py-1 text-xs font-medium text-app-text-muted border border-app-border"
                >
                  {event}
                </span>
              ))}
            </div>
          </UniversalCard>
        </div>
      </Section>

      {/* 3. ANTES DE COMEÇAR */}
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

      {/* 4. JORNADAS */}
      <Section kicker="Trilha de Aprendizado" title="As 4 Jornadas de Gênesis" subtitle="Explore o livro dividido em quatro grandes arcos narrativos.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              id: "j1",
              title: "Jornada 1 — As Origens",
              desc: "A criação do universo, o Éden, a queda do homem, o dilúvio de Noé e a dispersão em Babel.",
              stories: "5 histórias",
              time: "36 min",
              image: PLACEHOLDERS.journey1,
              accent: "var(--brand-primary)",
            },
            {
              id: "j2",
              title: "Jornada 2 — Os Patriarcas",
              desc: "O chamado de Abraão, a promessa de Isaque e as lutas de Jacó para herdar a bênção.",
              stories: "6 histórias",
              time: "45 min",
              image: PLACEHOLDERS.journey2,
              accent: "var(--brand-gold)",
            },
            {
              id: "j3",
              title: "Jornada 3 — José no Egito",
              desc: "A traição dos irmãos, a prisão de José e sua ascensão milagrosa a governador do Egito.",
              stories: "4 histórias",
              time: "30 min",
              image: PLACEHOLDERS.journey3,
              accent: "var(--brand-cyan)",
            },
            {
              id: "j4",
              title: "Jornada 4 — O Legado",
              desc: "A reconciliação da família de Jacó e o estabelecimento das doze tribos de Israel.",
              stories: "3 histórias",
              time: "22 min",
              image: PLACEHOLDERS.journey4,
              accent: "var(--brand-coral)",
            },
          ].map((j) => (
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

      {/* 5. PROGRESSO */}
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

      {/* 6. RODAPÉ */}
      <section className="mx-auto max-w-[1400px] px-4 pb-20 md:px-8" aria-label="Próximos Passos">
        <div className="rounded-3xl border border-app-border bg-app-surface-elevated/30 p-6 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_320px]">
            {/* Next Book Teaser */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-lavender">Próximo Livro</span>
                <h3 className="mt-2 font-display text-2xl font-bold text-app-text">Êxodo</h3>
                <p className="mt-2 text-sm leading-relaxed text-app-text-muted max-w-xl">
                  A continuação da saga do povo de Deus. Da escravidão no Egito à libertação milagrosa através do Mar Vermelho e a revelação dos Dez Mandamentos no Monte Sinai.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <BdsButton variant="secondary" size="sm" onClick={handleDownload} leadingIcon={<Download className="h-4 w-4" />}>
                  Baixar Guia PDF
                </BdsButton>
                <BdsButton variant="ghost" size="sm" onClick={handleShare} leadingIcon={<Share2 className="h-4 w-4" />}>
                  Compartilhar Livro
                </BdsButton>
              </div>
            </div>

            {/* Next Book Cover Card */}
            <div className="relative overflow-hidden rounded-2xl border border-app-border bg-app-surface h-[160px] md:h-full flex items-center p-4 gap-4">
              <img
                src={PLACEHOLDERS.nextBook}
                alt="Capa de Êxodo"
                className="h-24 w-16 object-cover rounded-lg shadow-card shrink-0"
              />
              <div>
                <h4 className="font-display text-base font-bold text-app-text">Êxodo</h4>
                <p className="text-xs text-app-text-muted mt-1">40 Capítulos · Pentateuco</p>
                <Link
                  to="/biblioteca"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:underline"
                >
                  Ver na Biblioteca <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}