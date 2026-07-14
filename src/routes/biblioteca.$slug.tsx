import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BdsButton, HeroSection, StatusChip, BibleBreadcrumb, feedback } from "@/components/bds";
import { getBookBySlug, CATEGORIES } from "@/lib/bible-books";

// Import modular Genesis components
import { GenesisHero } from "@/components/genesis/GenesisHero";
import { GenesisFicha } from "@/components/genesis/GenesisFicha";
import { GenesisContext } from "@/components/genesis/GenesisContext";
import { GenesisJourneys } from "@/components/genesis/GenesisJourneys";
import { GenesisProgress } from "@/components/genesis/GenesisProgress";
import { GenesisFooter } from "@/components/genesis/GenesisFooter";

export const Route = createFileRoute("/biblioteca/$slug")({
  head: ({ params }) => {
    const book = getBookBySlug(params.slug);
    const title = book ? `${book.name} — Biblioteca Viva` : "Livro — Biblioteca Viva";
    const desc = book
      ? `${book.name} · ${book.chapters} capítulos · Jornada Bíblica com Soph.`
      : "Livro não encontrado na Biblioteca Viva.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    const book = getBookBySlug(params.slug);
    if (!book) throw notFound();
    return { book };
  },
  component: BookDetail,
  notFoundComponent: () => (
    <AppShell>
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-app-text">Livro não encontrado</h1>
        <p className="mt-3 text-app-text-muted">Talvez este livro ainda esteja chegando à Biblioteca.</p>
        <div className="mt-6">
          <Link to="/biblioteca">
            <BdsButton variant="primary" leadingIcon={<ArrowLeft className="h-4 w-4" />}>
              Voltar à Biblioteca
            </BdsButton>
          </Link>
        </div>
      </div>
    </AppShell>
  ),
});

const PLACEHOLDERS = {
  cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  universe: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
  journey1: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
  journey2: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
  journey3: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80",
  journey4: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
  nextBook: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80",
};

const JOURNEYS = [
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
];

function BookDetail() {
  const { book } = Route.useLoaderData();
  const [isFavorited, setIsFavorited] = useState(false);

  const category = CATEGORIES.find((c) => c.id === book.category);
  const testamentLabel = book.testament === "AT" ? "Antigo Testamento" : "Novo Testamento";

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

  // Render the full premium Genesis experience if the slug is "genesis"
  if (book.slug === "genesis") {
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
        <GenesisHero
          coverImage={PLACEHOLDERS.cover}
          universeImage={PLACEHOLDERS.universe}
          isFavorited={isFavorited}
          onFavorite={handleFavorite}
          onShare={handleShare}
        />

        {/* 2. FICHA DO LIVRO */}
        <GenesisFicha />

        {/* 3. ANTES DE COMEÇAR */}
        <GenesisContext />

        {/* 4. JORNADAS */}
        <GenesisJourneys journeys={JOURNEYS} />

        {/* 5. PROGRESSO */}
        <GenesisProgress />

        {/* 6. RODAPÉ */}
        <GenesisFooter
          nextBookImage={PLACEHOLDERS.nextBook}
          onDownload={handleDownload}
          onShare={handleShare}
        />
      </AppShell>
    );
  }

  // Fallback placeholder for other books
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-8 md:py-12">
        <BibleBreadcrumb
          items={[
            { label: "Biblioteca", href: "/biblioteca" },
            { label: category?.title ?? testamentLabel },
            { label: book.name },
          ]}
        />

        <div className="mt-6">
          <HeroSection
            image={book.image}
            height="md"
            kicker={`${testamentLabel} · ${category?.title ?? ""}`}
            title={book.name}
            description={`${book.chapters} capítulos para explorar com Soph, em quatro trilhas visuais.`}
            icon={<BookOpen className="h-5 w-5" />}
            tag={<StatusChip status="new" label="Disponível" />}
            actions={
              <>
                <BdsButton variant="primary">Começar leitura</BdsButton>
                <BdsButton variant="glass">Ver personagens</BdsButton>
              </>
            }
          />
        </div>

        <div className="mt-10 rounded-3xl border border-app-border bg-app-surface-elevated p-8 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-app-border bg-app-surface-high px-3 py-1 text-xs text-app-text-muted">
            <Clock className="h-3.5 w-3.5" />
            Em construção
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold text-app-text">
            A experiência completa de {book.name} chega em breve.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-app-text-muted">
            Aqui você encontrará capítulos, cenas, personagens, locais, objetos, linha do tempo e
            atividades — tudo dentro do Bible Design System.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/biblioteca">
              <BdsButton variant="secondary" leadingIcon={<ArrowLeft className="h-4 w-4" />}>
                Voltar à Biblioteca
              </BdsButton>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}