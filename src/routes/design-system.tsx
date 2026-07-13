import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import {
  Section, Display, H2, H3, Body, Muted, Kicker,
  BdsButton, BdsInput, BdsSearch, BdsTextarea,
  StatusChip, AchievementBadge, ProgressBadge, NewBadge, CompletedBadge, LockedBadge,
  UniversalCard, GlassCard, ElevatedCard, CompactCard, HorizontalCard,
  BookCover, StoryCover, PartCover, SceneCover,
  HeroSection, BibleBreadcrumb,
  ProgressBar, CircularProgress, ProgressCard, JourneyProgress,
  Timeline, JourneyMap,
  QuizCard, QuestionCard, AnswerCard, ResultCard, ScoreCard,
  ActivityCard, PrintableCard, ColoringCard, MemoryVerseCard, ReflectionCard, ChallengeCard,
  IllustrationFrame,
  ConfirmDialog, InfoDialog, AchievementDialog,
  SkeletonBook, SkeletonStory, SkeletonHero, SkeletonTimeline, SkeletonCard,
  EmptyState,
  SophTip, SophWelcome, SophAchievement, SophQuestion, SophHint, SophSmallCard, SophFloatingButton,
  CharacterCard, LocationCard, ObjectCard,
  feedback,
} from "@/components/bds";
import { mockBooks, mockCharacters, mockLocations, mockObjects, mockTimeline, mockJourney } from "@/lib/bds-mocks";
import { BookOpen, Play, Search, Sparkles, Star } from "lucide-react";
import heroImg from "@/assets/hero-backdrop.jpg";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Bible Design System · Jornada Bíblica com Soph" },
      { name: "description", content: "Biblioteca de componentes reutilizáveis do BDS: capas, cards, jornadas, quizzes, atividades e mais." },
    ],
  }),
  component: DesignSystemPage,
});

function DesignSystemPage() {
  const [confirm, setConfirm] = useState(false);
  const [info, setInfo] = useState(false);
  const [achieve, setAchieve] = useState(false);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        <Section
          kicker="Bible Design System"
          title="Componentes reutilizáveis do BDS"
          subtitle="Uma biblioteca completa que serve de base para todas as telas do aplicativo — nenhuma página deve recriar componentes."
        >
          <BibleBreadcrumb
            items={[
              { label: "Biblioteca", href: "/biblioteca" },
              { label: "Gênesis", href: "/livros/genesis" },
              { label: "Parte 1" },
              { label: "A Criação" },
              { label: "Cena 3" },
            ]}
          />
        </Section>

        <Section kicker="1. Layouts" title="HeroSection">
          <HeroSection
            image={heroImg}
            kicker="Trilha Teen"
            title="Viva a Bíblia como você nunca imaginou"
            subtitle="Quatro trilhas visuais, histórias interativas e conquistas por toda a jornada."
            description="Reutilizável em todas as páginas de livro, parte e história."
            icon={<Sparkles className="h-5 w-5" />}
            badge={<NewBadge />}
            actions={
              <>
                <BdsButton leadingIcon={<Play className="h-4 w-4" />}>Começar</BdsButton>
                <BdsButton variant="glass">Explorar trilhas</BdsButton>
              </>
            }
          />
        </Section>

        <Section kicker="2. Tipografia" title="Escala tipográfica" contentClassName="space-y-3">
          <Display>Display · Sora Bold</Display>
          <H2>H2 · Título de seção</H2>
          <H3>H3 · Subtítulo</H3>
          <Body>Body · Nunito Sans para o corpo de texto longo, com boa leitura.</Body>
          <Muted>Muted · usado para legendas e metadados.</Muted>
          <Kicker>Kicker · uppercase</Kicker>
        </Section>

        <Section kicker="3. Botões" title="BdsButton — variantes" contentClassName="flex flex-wrap gap-3">
          <BdsButton>Primary</BdsButton>
          <BdsButton variant="secondary">Secondary</BdsButton>
          <BdsButton variant="ghost">Ghost</BdsButton>
          <BdsButton variant="glass">Glass</BdsButton>
          <BdsButton variant="soph" leadingIcon={<Sparkles className="h-4 w-4" />}>Soph</BdsButton>
          <BdsButton variant="danger">Danger</BdsButton>
          <BdsButton loading>Carregando</BdsButton>
          <BdsButton size="icon" aria-label="Buscar"><Search className="h-4 w-4" /></BdsButton>
        </Section>

        <Section kicker="4. Inputs" title="Formulários" contentClassName="grid gap-3 md:grid-cols-2">
          <BdsSearch />
          <BdsInput placeholder="Seu nome" />
          <BdsTextarea placeholder="Sua reflexão..." />
          <BdsInput placeholder="Com erro" invalid />
        </Section>

        <Section kicker="5. Status & Badges" title="Chips, badges e conquistas" contentClassName="space-y-4">
          <div className="flex flex-wrap gap-2">
            <NewBadge />
            <StatusChip status="coming-soon" />
            <CompletedBadge />
            <StatusChip status="in-progress" />
            <StatusChip status="favorite" />
            <LockedBadge />
          </div>
          <div className="flex flex-wrap gap-3">
            <AchievementBadge title="Primeiro passo" description="Você iniciou sua jornada" tier="bronze" />
            <AchievementBadge title="Explorador" description="10 histórias lidas" tier="silver" />
            <AchievementBadge title="Mestre" description="Livro completo" tier="gold" />
          </div>
          <div className="flex flex-wrap gap-2">
            <ProgressBadge value={20} />
            <ProgressBadge value={65} label="65% Gênesis" />
            <ProgressBadge value={100} label="Completo" />
          </div>
        </Section>

        <Section kicker="6. Cards universais" title="Primitivas de card" contentClassName="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <UniversalCard className="p-5"><H3>UniversalCard</H3><Muted>Card padrão do BDS.</Muted></UniversalCard>
          <GlassCard className="p-5"><H3>GlassCard</H3><Muted>Efeito de vidro esfumado.</Muted></GlassCard>
          <ElevatedCard className="p-5"><H3>ElevatedCard</H3><Muted>Alto destaque, sombra profunda.</Muted></ElevatedCard>
          <CompactCard interactive><H3>CompactCard</H3><Muted>Para listas densas.</Muted></CompactCard>
          <HorizontalCard
            title="HorizontalCard"
            subtitle="Item de lista com mídia"
            media={<img src={mockBooks[0].image} alt="" className="h-full w-full object-cover" />}
            meta={<><Star className="h-3 w-3" /> 42%</>}
            actions={<BdsButton size="sm" variant="ghost">Abrir</BdsButton>}
            interactive
          />
        </Section>

        <Section kicker="7. Capas" title="BookCover · StoryCover · PartCover · SceneCover" contentClassName="flex flex-wrap gap-4">
          <BookCover
            image={mockBooks[0].image}
            title={mockBooks[0].name}
            abbreviation={mockBooks[0].abbrev}
            category="Antigo Testamento"
            chapters={mockBooks[0].chapters}
            status={mockBooks[0].status}
            progress={mockBooks[0].progress}
            onOpen={() => feedback.info("Abrindo Gênesis")}
          />
          <StoryCover
            image={mockBooks[0].image}
            title="A criação do mundo"
            subtitle="Gênesis 1"
            status="new"
            onOpen={() => feedback.info("Abrindo história")}
          />
          <PartCover
            image={mockBooks[3].image}
            title="Parte 1 — Os patriarcas"
            subtitle="4 histórias · 22 minutos"
            status="in-progress"
            progress={40}
            onOpen={() => {}}
          />
          <SceneCover
            image={mockBooks[1].image}
            title="Cena 3 — O sétimo dia"
            subtitle="Descanso e contemplação"
            onOpen={() => {}}
          />
        </Section>

        <Section kicker="8. Progresso" title="Progress components" contentClassName="grid gap-4 md:grid-cols-2">
          <ProgressCard kicker="Continue a jornada" title="Gênesis" subtitle="Capítulo 12 · Abraão" value={42} action={<BdsButton size="sm">Continuar</BdsButton>} />
          <div className="flex items-center justify-around rounded-2xl border border-app-border bg-app-surface-elevated p-6">
            <CircularProgress value={25} />
            <CircularProgress value={60} />
            <CircularProgress value={92} />
          </div>
          <div className="space-y-3 rounded-2xl border border-app-border bg-app-surface-elevated p-5">
            <Kicker>Barras</Kicker>
            <ProgressBar value={30} size="sm" />
            <ProgressBar value={60} />
            <ProgressBar value={90} size="lg" />
          </div>
          <div className="rounded-2xl border border-app-border bg-app-surface-elevated p-5">
            <Kicker>JourneyProgress</Kicker>
            <div className="mt-3">
              <JourneyProgress
                currentIndex={2}
                steps={[{ id: "1", label: "Criação" }, { id: "2", label: "Éden" }, { id: "3", label: "Queda" }, { id: "4", label: "Dilúvio" }]}
              />
            </div>
          </div>
        </Section>

        <Section kicker="9. Timeline" title="Timeline vertical & horizontal" contentClassName="grid gap-6 lg:grid-cols-2">
          <Timeline items={mockTimeline} />
          <div>
            <Muted className="mb-3">Horizontal</Muted>
            <Timeline items={mockTimeline} orientation="horizontal" />
          </div>
        </Section>

        <Section kicker="10. Journey Map" title="Mapa da Jornada">
          <div className="rounded-3xl border border-app-border bg-app-surface">
            <JourneyMap steps={mockJourney} orientation="horizontal" />
          </div>
        </Section>

        <Section kicker="11. Quiz" title="Componentes de quiz" contentClassName="grid gap-4 lg:grid-cols-2">
          <QuizCard title="Você lembra da Criação?" description="Um quiz rápido para revisar." questionsCount={5} duration="3 min" onStart={() => {}} />
          <QuestionCard index={2} total={5} prompt="Em qual dia Deus criou a luz?">
            <AnswerCard index={0} label="Primeiro dia" state="correct" />
            <AnswerCard index={1} label="Terceiro dia" />
            <AnswerCard index={2} label="Sexto dia" state="wrong" />
            <AnswerCard index={3} label="Sétimo dia" />
          </QuestionCard>
          <ResultCard score={80} correct={4} total={5} onRetry={() => {}} onContinue={() => {}} />
          <div className="grid grid-cols-3 gap-3">
            <ScoreCard label="Acertos" value={4} />
            <ScoreCard label="Tempo" value={2} suffix="min" />
            <ScoreCard label="Pontos" value={120} />
          </div>
        </Section>

        <Section kicker="12. Atividades" title="Activity cards" contentClassName="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <PrintableCard title="Imprima a Arca" description="Monte a Arca de Noé em papel." image={mockBooks[0].image} />
          <ColoringCard title="Colorir Éden" description="Desenho lúdico do jardim." image={mockBooks[1].image} />
          <MemoryVerseCard title="Salmo 23:1" description="O Senhor é o meu pastor..." />
          <ReflectionCard title="Reflexão" description="O que aprendi hoje?" />
          <ChallengeCard title="Desafio semanal" description="Leia 7 histórias em 7 dias." />
          <ActivityCard title="Atividade livre" description="Personalize com qualquer ícone." />
        </Section>

        <Section kicker="13. Personagens · Lugares · Objetos" title="Entity cards" contentClassName="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockCharacters.map((c) => <CharacterCard key={c.id} character={c} />)}
          {mockLocations.map((l) => <LocationCard key={l.id} location={l} />)}
          {mockObjects.map((o) => <ObjectCard key={o.id} object={o} />)}
        </Section>

        <Section kicker="14. Ilustração" title="IllustrationFrame">
          <IllustrationFrame src={heroImg} alt="Cena bíblica" caption="A criação — visão contemplativa" author="Estúdio Soph" />
        </Section>

        <Section kicker="15. Soph" title="Componentes da Soph" contentClassName="grid gap-4 md:grid-cols-2">
          <SophWelcome message="Bem-vindo à sua jornada! Vamos começar por Gênesis?" />
          <SophTip message="Você pode favoritar histórias para ler depois." />
          <SophHint message="Tente completar 3 cenas seguidas para desbloquear uma conquista." />
          <SophQuestion message="O que mais te marcou na história de Noé?" />
          <SophAchievement message="Você completou sua primeira cena!" />
          <SophSmallCard message="Quer uma dica sobre esta cena?" onClick={() => {}} />
        </Section>

        <Section kicker="16. Diálogos" title="Dialogs" contentClassName="flex flex-wrap gap-3">
          <BdsButton onClick={() => setConfirm(true)}>ConfirmDialog</BdsButton>
          <BdsButton variant="secondary" onClick={() => setInfo(true)}>InfoDialog</BdsButton>
          <BdsButton variant="soph" onClick={() => setAchieve(true)}>AchievementDialog</BdsButton>
          <ConfirmDialog open={confirm} onOpenChange={setConfirm} title="Reiniciar progresso?" description="Isso apagará todo o seu progresso deste livro." destructive confirmLabel="Reiniciar" />
          <InfoDialog open={info} onOpenChange={setInfo} title="Como funcionam as trilhas" description="Cada trilha apresenta o mesmo conteúdo com uma linguagem visual distinta." />
          <AchievementDialog open={achieve} onOpenChange={setAchieve} title="Nova conquista!" description="Você completou seu primeiro capítulo." achievement="Explorador de Gênesis" reward="+50 XP" />
        </Section>

        <Section kicker="17. Feedback" title="Toasts" contentClassName="flex flex-wrap gap-3">
          <BdsButton size="sm" onClick={() => feedback.success("Salvo!", "Suas preferências foram atualizadas.")}>Success</BdsButton>
          <BdsButton size="sm" variant="danger" onClick={() => feedback.error("Erro", "Não foi possível salvar.")}>Error</BdsButton>
          <BdsButton size="sm" variant="secondary" onClick={() => feedback.info("Informação", "Nova trilha disponível.")}>Info</BdsButton>
          <BdsButton size="sm" variant="soph" onClick={() => feedback.achievement("Conquista!", "Cena completa.")}>Achievement</BdsButton>
        </Section>

        <Section kicker="18. Loading" title="Skeletons" contentClassName="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonBook />
          <SkeletonStory />
          <SkeletonCard />
          <SkeletonHero />
          <SkeletonTimeline />
        </Section>

        <Section kicker="19. Empty state" title="Estado vazio">
          <EmptyState
            title="Nenhum favorito ainda"
            description="Toque no coração em qualquer história para adicionar aos seus favoritos."
            actionLabel="Explorar biblioteca"
            onAction={() => {}}
          />
        </Section>
      </div>

      <SophFloatingButton />
    </AppShell>
  );
}
