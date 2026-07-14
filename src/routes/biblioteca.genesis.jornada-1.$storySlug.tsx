import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Clock, Sparkles, Play } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BdsButton, HeroSection, BibleBreadcrumb } from "@/components/bds";

const STORIES_DATA: Record<string, { title: string; ref: string; time: string; desc: string; image: string }> = {
  criacao: {
    title: "A Criação",
    ref: "Gênesis 1–2",
    time: "6 min",
    desc: "No princípio, Deus criou os céus e a terra, trazendo ordem, luz e vida a partir do caos absoluto.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  "adao-eva": {
    title: "Adão e Eva",
    ref: "Gênesis 2–3",
    time: "7 min",
    desc: "A vida no Jardim do Éden, a criação da humanidade, a tentação e a escolha que mudou o destino do mundo.",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80",
  },
  "caim-abel": {
    title: "Caim e Abel",
    ref: "Gênesis 4",
    time: "5 min",
    desc: "A história dos primeiros irmãos, a oferta ao Senhor, o ciúme e as consequências do primeiro homicídio.",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
  },
  noe: {
    title: "Noé e a Arca",
    ref: "Gênesis 6–9",
    time: "8 min",
    desc: "A corrupção da terra, a fidelidade de um homem justo e a grande arca que preservou a vida em meio ao dilúvio.",
    image: "https://images.unsplash.com/photo-1431512284068-4c4002298068?auto=format&fit=crop&w=1200&q=80",
  },
  babel: {
    title: "A Torre de Babel",
    ref: "Gênesis 11",
    time: "4 min",
    desc: "A ambição humana de tocar os céus, a confusão das línguas e a dispersão dos povos por toda a terra.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
  },
};

export const Route = createFileRoute("/biblioteca/genesis/jornada-1/$storySlug")({
  head: ({ params }) => {
    const story = STORIES_DATA[params.storySlug];
    const title = story ? `${story.title} — Gênesis` : "História — Gênesis";
    return {
      meta: [
        { title },
        { name: "description", content: story?.desc ?? "História bíblica interativa." },
      ],
    };
  },
  loader: ({ params }) => {
    const story = STORIES_DATA[params.storySlug];
    if (!story) throw notFound();
    return { story };
  },
  component: StoryPage,
});

function StoryPage() {
  const { story } = Route.useLoaderData();

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-8 md:py-12">
        <BibleBreadcrumb
          items={[
            { label: "Biblioteca", href: "/biblioteca" },
            { label: "Gênesis", href: "/biblioteca/genesis" },
            { label: "Jornada 1", href: "/biblioteca/genesis/jornada-1" },
            { label: story.title },
          ]}
        />

        <div className="mt-6">
          <HeroSection
            image={story.image}
            height="md"
            kicker={`${story.ref} · ${story.time}`}
            title={story.title}
            description={story.desc}
            icon={<BookOpen className="h-5 w-5" />}
            tag={
              <span className="inline-flex items-center gap-1 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-lavender">
                <Sparkles className="h-3 w-3" /> História Interativa
              </span>
            }
            actions={
              <>
                <BdsButton variant="primary" leadingIcon={<Play className="h-4 w-4 fill-current" />}>
                  Iniciar Leitura
                </BdsButton>
                <Link to="/biblioteca/genesis/jornada-1">
                  <BdsButton variant="glass" leadingIcon={<ArrowLeft className="h-4 w-4" />}>
                    Voltar para Jornada
                  </BdsButton>
                </Link>
              </>
            }
          />
        </div>

        <div className="mt-10 rounded-3xl border border-app-border bg-app-surface-elevated p-8 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-app-border bg-app-surface-high px-3 py-1 text-xs text-app-text-muted">
            <Clock className="h-3.5 w-3.5" />
            Em breve
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold text-app-text">
            O conteúdo interativo completo de "{story.title}" está sendo preparado.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-app-text-muted">
            Em breve você poderá ler, ouvir e interagir com esta história através de ilustrações cinematográficas e quizzes integrados.
          </p>
          <div className="mt-6">
            <Link to="/biblioteca/genesis/jornada-1">
              <BdsButton variant="secondary" leadingIcon={<ArrowLeft className="h-4 w-4" />}>
                Voltar para Jornada
              </BdsButton>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}