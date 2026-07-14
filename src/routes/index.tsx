import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
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
  Clock,
  BookOpen,
  Calendar,
  Award,
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

// Premium cinematic placeholder images
const PLACEHOLDERS = {
  hero: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80", // Cosmic light
  soph: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", // Friendly guide portrait
  descubra1: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", // Sunset ocean
  descubra2: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80", // Majestic mountains
  descubra3: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80", // Starry night mountain
  featured1: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80", // Ancient path
  featured2: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80", // Forest light
  featured3: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80", // Morning mist
};

function HomePage() {
  return (
    <AppShell>
      <Hero />
      <div className="mx-auto flex max-w-[1240px] flex-col gap-24 px-4 pb-24 pt-6 md:gap-28 md:px-10 md:pt-10">
        <ContinueJourney />
        <DescubraHoje />
        <TracksSection />
        <GenesisCarousel />
        <FeaturedStoriesSection />
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
        <img
          src={PLACEHOLDERS.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay"
        />
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

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-8 md:py-24">
        <div className="flex flex-col justify-center">
          <div
            data-hero-anim
            className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-lavender mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" /> Nova jornada
          </div>
          <h1
            data-hero-anim
            className="font-display text-4xl font-extrabold leading-[1.05] text-app-text text-balance md:text-6xl lg:text-[68px] mb-8"
          >
            A Bíblia como <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-brand-lavender via-white to-brand-cyan bg-clip-text text-transparent">
              você nunca viveu.
            </span>
          </h1>
          <p data-hero-anim className="max-w-xl text-base leading-relaxed text-app-text-muted md:text-lg mb-10">
            Histórias bíblicas para aprender, viver e compartilhar — em quatro trilhas visuais
            desenhadas para cada leitor.
          </p>

          <div data-hero-anim className="flex flex-wrap gap-4 mb-10">
            <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 font-display text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:scale-[1.02] hover:shadow-hover">
              <Play className="h-4 w-4 fill-current" />
              Continuar jornada
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-app-border bg-app-surface-elevated/70 px-7 py-3.5 font-display text-sm font-semibold text-app-text backdrop-blur transition-all duration-200 hover:border-brand-primary/50 hover:bg-app-surface-high">
              Explorar biblioteca
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div data-hero-anim className="flex items-center gap-3 text-xs text-app-text-muted">
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
            <span className="font-medium">4 trilhas · 66 livros · +180 histórias</span>
          </div>
        </div>

        {/* Recreated Soph Card (Friendly Guide) */}
        <div data-hero-anim className="relative min-h-[360px] md:min-h-full">
          <div className="absolute inset-0 rounded-[32px] border border-app-border/70 bg-app-surface-elevated/40 backdrop-blur-xl" />
          <div className="relative flex h-full flex-col md:flex-row overflow-hidden rounded-[32px]">
            {/* Soph Image Placeholder (occupies ~50% space) */}
            <div className="relative h-48 md:h-full md:w-1/2 overflow-hidden">
              <img
                src={PLACEHOLDERS.soph}
                alt="Soph"
                className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-app-surface-elevated/90 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-app-surface-elevated/90" />
            </div>

            {/* Soph Content */}
            <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-primary/20 text-brand-primary">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">Guia Amigável</span>
              </div>

              <div className="my-4">
                <h3 className="font-display text-2xl font-extrabold text-app-text">Olá! Eu sou a Soph.</h3>
                <p className="mt-2 text-sm leading-relaxed text-app-text-muted">
                  Vamos descobrir juntos mais uma história incrível hoje? Estou pronta para te guiar!
                </p>
              </div>

              <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand py-3 font-display text-sm font-bold text-white shadow-glow transition-all duration-200 hover:scale-[1.02] hover:shadow-hover">
                Começar <ArrowRight className="h-4 w-4" />
              </button>
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
      <article className="relative overflow-hidden rounded-3xl border border-app-border bg-app-surface-elevated shadow-panel transition-all duration-300 hover:shadow-hover">
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

/* ---------------- Descubra Hoje (New Section) ---------------- */
function DescubraHoje() {
  const ref = useReveal<HTMLElement>({ selector: "[data-descubra-card]", stagger: 0.1, y: 24 });

  const recommended = [
    {
      title: "A Travessia do Mar",
      book: "Êxodo 14",
      time: "12 min",
      image: PLACEHOLDERS.descubra1,
      track: "Tradicional",
    },
    {
      title: "O Chamado de Abraão",
      book: "Gênesis 12",
      time: "10 min",
      image: PLACEHOLDERS.descubra2,
      track: "Teen",
    },
    {
      title: "A Aliança do Arco-Íris",
      book: "Gênesis 9",
      time: "8 min",
      image: PLACEHOLDERS.descubra3,
      track: "Infantil",
    },
  ];

  return (
    <section ref={ref} aria-labelledby="descubra-titulo">
      <SectionHeader
        id="descubra-titulo"
        eyebrow="Recomendado"
        title="Descubra hoje"
        subtitle="Histórias recomendadas especialmente para você."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.map((item, idx) => (
          <div
            key={idx}
            data-descubra-card
            className="group relative flex h-[280px] flex-col overflow-hidden rounded-3xl border border-app-border bg-app-surface-elevated shadow-card transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:shadow-hover"
            style={{
              boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            }}
          >
            {/* Book spine effect */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-black/30 z-10 border-r border-white/5" />

            {/* Image Cover */}
            <div className="relative h-[60%] w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-app-surface-elevated via-app-surface-elevated/20 to-transparent" />
              <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {item.track}
              </span>
            </div>

            {/* Content */}
            <div className="flex h-[40%] flex-col justify-between p-4 bg-app-surface-elevated/95 border-t border-app-border/40">
              <div className="min-w-0">
                <h3 className="truncate font-display text-base font-bold text-app-text tracking-wide transition-colors duration-200 group-hover:text-brand-primary">
                  {item.title}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-app-text-muted/80">
                  <span className="font-medium">{item.book}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="h-3 w-3 text-brand-cyan" /> {item.time}
                  </span>
                </div>
              </div>

              <button className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/95 py-2 font-display text-xs font-bold text-app-background transition-all duration-200 hover:bg-white hover:scale-[1.02]">
                <Play className="h-3 w-3 fill-current" /> Abrir
              </button>
            </div>
          </div>
        ))}
      </div>
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

/* ---------------- Featured Stories (Mini Posters) ---------------- */
function FeaturedStoriesSection() {
  const ref = useReveal<HTMLElement>({ selector: "[data-featured]", stagger: 0.1, y: 24 });

  const featuredPosters = [
    {
      title: "Davi e Golias",
      book: "1 Samuel 17",
      time: "10 min",
      track: "Teen",
      badge: "Épico",
      image: PLACEHOLDERS.featured1,
    },
    {
      title: "Jonas e o Grande Peixe",
      book: "Jonas 1–4",
      time: "9 min",
      track: "Mangá",
      badge: "Destaque",
      image: PLACEHOLDERS.featured2,
    },
    {
      title: "Êxodo — A Fuga",
      book: "Êxodo 12–14",
      time: "14 min",
      track: "Tradicional",
      badge: "Épico",
      image: PLACEHOLDERS.featured3,
    },
  ];

  return (
    <section ref={ref} aria-labelledby="destaque-titulo">
      <SectionHeader
        id="destaque-titulo"
        eyebrow="Em destaque"
        title="Histórias que marcam"
        action={{ label: "Ver biblioteca", to: "/biblioteca" }}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredPosters.map((s, idx) => (
          <div key={idx} data-featured className="w-full">
            <article className="group relative flex h-[320px] flex-col overflow-hidden rounded-3xl border border-app-border bg-app-surface-elevated shadow-card transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:shadow-hover">
              {/* Mini Poster Image Background */}
              <div className="absolute inset-0">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                  loading="lazy"
                />
                {/* Dark cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-app-background via-app-background/60 to-transparent" />
              </div>

              {/* Poster Content */}
              <div className="relative mt-auto flex flex-col gap-3 p-6 z-10">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                    {s.track}
                  </span>
                  {s.badge && (
                    <span className="rounded-full bg-brand-primary/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-lavender backdrop-blur-md">
                      {s.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl font-extrabold text-app-text tracking-wide transition-colors duration-200 group-hover:text-brand-primary">
                  {s.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-app-text-muted/90">
                  <span className="font-medium">{s.book}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="h-3.5 w-3.5 text-brand-cyan" /> {s.time}
                  </span>
                </div>

                <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/95 py-3 font-display text-xs font-bold text-app-background transition-all duration-200 hover:bg-white hover:scale-[1.02]">
                  Assistir agora <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
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
        <Stat value={12} label="Você já descobriu" suffix="histórias" icon={BookOpen} tint="var(--brand-primary)" />
        <Stat value={7} label="Você manteve" suffix="dias seguidos" icon={Flame} tint="var(--brand-coral)" />
        <Stat value={5} label="Você completou" suffix="metas da semana" icon={Compass} tint="var(--brand-cyan)" />
        <Stat value={3} label="Você conquistou" suffix="medalhas" icon={Award} tint="var(--brand-gold)" />
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
                className="flex items-center gap-3 rounded-2xl border border-app-border bg-app-surface px-4 py-3 transition-all duration-200 hover:border-brand-primary/40 hover:bg-app-surface-elevated"
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
  suffix,
  icon: Icon,
  tint,
}: {
  value: number;
  label: string;
  suffix: string;
  icon: React.ComponentType<{ className?: string }>;
  tint: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-app-border bg-app-surface-elevated p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
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
      <div className="mt-3 text-xs text-app-text-muted">
        <span className="block text-app-text-muted/60 font-medium">{label}</span>
        <span className="block font-bold text-app-text mt-0.5">{suffix}</span>
      </div>
    </div>
  );
}

/* ---------------- Section header ---------------- */
function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  action,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-lavender">
          {eyebrow}
        </div>
        <h2 id={id} className="mt-1 font-display text-2xl font-bold text-app-text md:text-3xl tracking-wide">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-sm text-app-text-muted/80 font-medium">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <a
          href={action.to}
          className="inline-flex items-center gap-1 text-sm font-semibold text-app-text-muted transition-all duration-150 hover:text-app-text hover:translate-x-0.5"
        >
          {action.label}
          <ChevronRight className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}