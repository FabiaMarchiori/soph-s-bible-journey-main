import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { BibleBreadcrumb, feedback } from "@/components/bds";
import { GenesisHero } from "@/components/genesis/GenesisHero";
import { GenesisFicha } from "@/components/genesis/GenesisFicha";
import { GenesisContext } from "@/components/genesis/GenesisContext";
import { GenesisJourneys } from "@/components/genesis/GenesisJourneys";
import { GenesisProgress } from "@/components/genesis/GenesisProgress";
import { GenesisFooter } from "@/components/genesis/GenesisFooter";

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