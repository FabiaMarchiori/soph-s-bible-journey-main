import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Play,
  Compass,
  Heart,
  ChevronRight,
  Flame,
  Trophy,
  BookMarked,
  Star,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StoryCard } from "@/components/StoryCard";
import { TrackCard } from "@/components/TrackCard";
import { tracks } from "@/lib/tracks";
import { genesisStories, featuredStories } from "@/lib/stories";
import { useReveal } from "@/hooks/use-reveal";
import { prefersReducedMotion } from "@/lib/animations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Início — Jornada Bíblica com Soph" },
      {
        name: "description",
        content:
          "Descubra histórias bíblicas em quatro trilhas visuais: Infantil, Teen, Mangá e Tradicional. Comece por Gênesis.",
      },
      { property: "og:title", content: "A Bíblia como você nunca viveu" },
      {
        property: "og:description",
        content: "Continue sua jornada, explore trilhas e viva histórias bíblicas com Soph.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <AppShell>
      <Hero />
      <div className="mx-auto flex max-w-[1400px] flex-col gap-16 px-4 pb-16 pt-4 md:px-8 md:pt-6">
        <ContinueJourney />
        <TracksSection />
        <GenesisCarousel />
        <FeaturedStories />
        <EvolutionSection />
      </div>
    </AppShell>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-anim]", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
      });
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden border-b border-app-border/60"
      aria-label="Boas-vindas"
    >
      <div ref={parallaxRef} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div
          className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, hsl(252 100% 67% / 0.6), transparent)" }}
        />
        <div
          className="absolute -right-32 top-20 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, hsl(186 79% 58% / 0.6), transparent)" }}
        />
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-8 md:py-20">
        <div className="flex flex-col justify-center">
          <div
            data-hero-anim
            className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-lavender"
          >
            <Sparkles className="h-3.5 w-3.5" /> Nova jornada
          </div>
          <h1
            data-hero-anim
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-app-text text-balance md:text-6xl lg:text-[68px]"
          >
            A Bíblia como <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-brand-lavender via-white to-brand-cyan bg-clip-text text-transparent">
              você nunca viveu.
            </span>
          </h1>
          <p data-hero-anim className="mt-6 max-w-xl text-base leading-relaxed text-app-text-muted md:text-lg">
            Histórias bíblicas para aprender, viver e compartilhar — em quatro trilhas visuais
            desenhadas para cada leitor.
          </p>

          <div data-hero-anim className="mt-6 flex flex-wrap gap-3">
            <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-display text-sm font-semibold text-white shadow-glow transition-smooth hover:scale-[1.02] hover:shadow-hover">
              <Play className="h-4 w-4 fill-current" />
              Continuar jornada
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-app-border bg-app-surface-elevated/70 px-6 py-3 font-display text-sm font-semibold text-app-text backdrop-blur transition-smooth hover:border-brand-primary/50 hover:bg-app-surface-high">
              Explorar biblioteca
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div data-hero-anim className="mt-8 flex items-center gap-3 text-xs text-app-text-muted">
            <div className="flex -space-x-2">
              {tracks.map((t) => (
                <div
                  key={t.id}
                  className="h-7 w-7 rounded-full border-2 border-app-background"
                  style={{ background: `linear-gradient(135deg, ${t.accentVar}, hsl(252 100% 67%))` }}
                  aria-hidden
                />
              ))}
            </div>
            <span>4 trilhas · 66 livros · +180 histórias</span>
          </div>
        </div>

        {/* Right composition */}
        <div data-hero-anim className="relative min-h-[320px] md:min-h-full">
          <div className="absolute inset-0 rounded-[32px] border border-app-border/70 bg-app-surface-elevated/40 backdrop-blur-xl" />
          <div className="relative flex h-full flex-col p-6">
            {/* Soph greeting */}
            <div className="flex items-start gap-3 rounded-2xl border border-brand-primary/30 bg-brand-primary/10 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-brand shadow-glow">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-sm font-bold text-app-text">Oi, eu sou a Soph!</div>
                <p className="mt-1 text-xs leading-relaxed text-app-text-muted">
                  Vamos aprender a Bíblia de um jeito visual, divertido e profundo?
                </p>
              </div>
            </div>

            {/* Mini next-up cards */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {featuredStories.slice(0, 2).map((s) => (
                <div
                  key={s.id}
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-app-border"
                >
                  <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-cyan">
                      Em destaque
                    </div>
                    <div className="mt-0.5 truncate font-display text-sm font-bold text-white">{s.title}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Track legend */}
            <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
              {tracks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-2 rounded-xl border border-app-border bg-app-surface px-3 py-2 text-xs"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: t.accentVar }}
                    aria-hidden
                  />
                  <span className="font-semibold text-app-text">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Continue Journey ---------------- */
function ContinueJourney() {
  const ref = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { width: "0%" },
          {
            width: "42%",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
          },
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  const story = genesisStories.find((s) => s.id === "noe")!;

  return (
    <section ref={ref} aria-labelledby="continuar-titulo">
      <SectionHeader id="continuar-titulo" eyebrow="Continuar" title="Retome de onde parou" />
      <article className="relative overflow-hidden rounded-3xl border border-app-border bg-app-surface-elevated shadow-panel">
        <div className="grid gap-0 md:grid-cols-[280px_1fr]">
          <div className="relative aspect-video md:aspect-auto">
            <img src={story.image} alt={story.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-app-surface-elevated via-transparent to-transparent md:from-transparent md:via-transparent md:to-app-surface-elevated" />
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-lavender">
                Trilha Teen
              </span>
              <span className="text-xs text-app-text-muted">{story.reference} — Parte 1</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-app-text md:text-3xl">{story.title}</h3>
            <div>
              <div className="flex items-center justify-between text-xs text-app-text-muted">
                <span>42% concluído</span>
                <span>8 min restantes</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-app-surface">
                <div ref={progressRef} className="h-full rounded-full bg-gradient-brand" style={{ width: "0%" }} />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 font-display text-sm font-semibold text-white shadow-glow transition-smooth hover:scale-[1.02]">
                <Play className="h-4 w-4 fill-current" /> Retomar
              </button>
              <button
                aria-label="Favoritar"
                className="grid h-10 w-10 place-items-center rounded-full border border-app-border text-app-text-muted transition-smooth hover:border-brand-coral/60 hover:text-brand-coral"
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

/* ---------------- Tracks ---------------- */
function TracksSection() {
  const ref = useReveal<HTMLElement>({ selector: "[data-track-card]", stagger: 0.1, y: 30, scale: 0.96 });
  return (
    <section ref={ref} aria-labelledby="trilhas-titulo">
      <SectionHeader
        id="trilhas-titulo"
        eyebrow="Escolha sua trilha"
        title="Quatro linguagens, uma mesma Palavra"
        action={{ label: "Ver todas", to: "/trilhas" }}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tracks.map((t) => (
          <div key={t.id} data-track-card>
            <TrackCard track={t} as="article" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Genesis carousel ---------------- */
function GenesisCarousel() {
  const ref = useReveal<HTMLElement>({ selector: "[data-story]", stagger: 0.08, y: 24 });
  return (
    <section ref={ref} aria-labelledby="genesis-titulo">
      <SectionHeader
        id="genesis-titulo"
        eyebrow="Comece por Gênesis"
        title="Do início do tudo"
        action={{ label: "Ver livro", to: "/antigo-testamento" }}
      />
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
        {genesisStories.map((s) => (
          <div key={s.id} data-story className="snap-start">
            <StoryCard story={s} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Featured ---------------- */
function FeaturedStories() {
  const ref = useReveal<HTMLElement>({ selector: "[data-featured]", stagger: 0.1, y: 24 });
  return (
    <section ref={ref} aria-labelledby="destaque-titulo">
      <SectionHeader
        id="destaque-titulo"
        eyebrow="Em destaque"
        title="Histórias que marcam"
        action={{ label: "Ver biblioteca", to: "/biblioteca" }}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredStories.map((s) => (
          <div key={s.id} data-featured className="w-full">
            <StoryCardFeatured story={s} />
          </div>
        ))}
      </div>
    </section>
  );
}

function StoryCardFeatured({ story }: { story: (typeof featuredStories)[number] }) {
  return (
    <article className="group relative flex overflow-hidden rounded-2xl border border-app-border bg-app-surface-elevated shadow-card transition-smooth hover:-translate-y-1 hover:shadow-hover">
      <div className="relative h-40 w-40 shrink-0 overflow-hidden sm:h-full sm:w-44">
        <img src={story.image} alt={story.title} className="absolute inset-0 h-full w-full object-cover transition-smooth group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-app-surface-elevated/60" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-app-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-app-text-muted">
            {story.track}
          </span>
          {story.badge && (
            <span className="rounded-full bg-brand-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand-lavender">
              {story.badge}
            </span>
          )}
        </div>
        <h3 className="line-clamp-1 font-display text-lg font-bold text-app-text">{story.title}</h3>
        <p className="text-xs text-app-text-muted">
          {story.reference} · {story.duration}
        </p>
        <button className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-primary transition-fast hover:text-brand-lavender">
          Assistir agora <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}

/* ---------------- Evolution ---------------- */
function EvolutionSection() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const ctx = gsap.context(() => {
      const nums = ref.current!.querySelectorAll<HTMLElement>("[data-count]");
      nums.forEach((el) => {
        const target = Number(el.dataset.count || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      });
      gsap.from("[data-achievement]", {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.8)",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const achievements = [
    { name: "Primeiros passos", icon: Star, color: "var(--brand-gold)" },
    { name: "Sequência de 7 dias", icon: Flame, color: "var(--brand-coral)" },
    { name: "Explorador de Gênesis", icon: BookMarked, color: "var(--brand-cyan)" },
  ];

  return (
    <section ref={ref} aria-labelledby="evolucao-titulo">
      <SectionHeader id="evolucao-titulo" eyebrow="Sua evolução" title="Sua jornada até aqui" />
      <div className="grid gap-4 md:grid-cols-4">
        <Stat value={12} label="Histórias lidas" icon={BookMarked} tint="var(--brand-primary)" />
        <Stat value={7} label="Sequência de dias" icon={Flame} tint="var(--brand-coral)" />
        <Stat value={5} label="Meta semanal (5/7)" icon={Compass} tint="var(--brand-cyan)" />
        <Stat value={3} label="Conquistas" icon={Trophy} tint="var(--brand-gold)" />
      </div>
      <div className="mt-4 rounded-3xl border border-app-border bg-app-surface-elevated p-6 shadow-panel">
        <div className="text-xs font-semibold uppercase tracking-widest text-app-text-muted">Conquistas</div>
        <div className="mt-4 flex flex-wrap gap-3">
          {achievements.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.name}
                data-achievement
                className="flex items-center gap-3 rounded-2xl border border-app-border bg-app-surface px-4 py-3"
              >
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl"
                  style={{ background: `${a.color}22`, color: a.color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-display text-sm font-semibold text-app-text">{a.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  icon: Icon,
  tint,
}: {
  value: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tint: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-app-border bg-app-surface-elevated p-5 shadow-card">
      <div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-25 blur-2xl"
        style={{ background: tint }}
        aria-hidden
      />
      <div className="flex items-center gap-3">
        <div
          className="grid h-10 w-10 place-items-center rounded-xl"
          style={{ background: `${tint}22`, color: tint }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="font-display text-3xl font-extrabold text-app-text" data-count={value}>
          0
        </div>
      </div>
      <div className="mt-3 text-xs text-app-text-muted">{label}</div>
    </div>
  );
}

/* ---------------- Section header ---------------- */
function SectionHeader({
  id,
  eyebrow,
  title,
  action,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-lavender">
          {eyebrow}
        </div>
        <h2 id={id} className="mt-1 font-display text-2xl font-bold text-app-text md:text-3xl">
          {title}
        </h2>
      </div>
      {action && (
        <a
          href={action.to}
          className="inline-flex items-center gap-1 text-sm font-semibold text-app-text-muted transition-fast hover:text-app-text"
        >
          {action.label}
          <ChevronRight className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}
