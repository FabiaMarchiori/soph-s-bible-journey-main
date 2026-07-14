import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Library, Search, Filter } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  BdsInput,
  BdsButton,
  HeroSection,
  Section,
  EmptyState,
  StatusChip,
} from "@/components/bds";
import { BookShelfCover } from "@/components/biblioteca/BookShelfCover";
import { BOOKS, CATEGORIES, type BookStatus, type Testament } from "@/lib/bible-books";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca Viva — Jornada Bíblica com Soph" },
      { name: "description", content: "Uma biblioteca digital com os 66 livros da Bíblia — organizados por categoria, com capas ilustradas e trilhas visuais." },
      { property: "og:title", content: "Biblioteca Viva — Jornada Bíblica com Soph" },
      { property: "og:description", content: "Explore os 66 livros da Bíblia em uma biblioteca digital premium, organizada por categoria." },
    ],
  }),
  component: BibliotecaRoute,
});

function BibliotecaRoute() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/biblioteca/$slug");
  if (isChild) return <Outlet />;
  return <BibliotecaIndex />;
}

type FilterKey = "all" | "available" | "coming-soon" | "at" | "nt";

const FILTERS: Array<{ id: FilterKey; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "available", label: "Disponíveis" },
  { id: "coming-soon", label: "Em breve" },
  { id: "at", label: "Antigo Testamento" },
  { id: "nt", label: "Novo Testamento" },
];

function matchesFilter(status: BookStatus, testament: Testament, filter: FilterKey): boolean {
  switch (filter) {
    case "all": return true;
    case "available": return status === "available";
    case "coming-soon": return status === "coming-soon" || status === "in-development";
    case "at": return testament === "AT";
    case "nt": return testament === "NT";
  }
}

function BibliotecaIndex() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const q = query.trim().toLowerCase();

  const grouped = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const books = BOOKS.filter((b) => b.category === cat.id)
        .filter((b) => matchesFilter(b.status, b.testament, filter))
        .filter((b) => {
          if (!q) return true;
          return (
            b.name.toLowerCase().includes(q) ||
            b.abbrev.toLowerCase().includes(q) ||
            cat.title.toLowerCase().includes(q) ||
            (b.testament === "AT" ? "antigo testamento" : "novo testamento").includes(q)
          );
        });
      return { cat, books };
    });
  }, [q, filter]);

  const totalResults = grouped.reduce((sum, g) => sum + g.books.length, 0);
  const availableCount = BOOKS.filter((b) => b.status === "available").length;

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-8 md:py-12">
        <HeroSection
          height="sm"
          kicker="Biblioteca Viva"
          title="Toda a Bíblia em uma única estante."
          description="66 livros organizados por categoria, com capas ilustradas e trilhas visuais. Comece por Gênesis — os demais chegam em breve."
          icon={<Library className="h-5 w-5" />}
          tag={<StatusChip status="new" label={`${availableCount} disponível agora`} />}
          gradientClassName="bg-gradient-to-br from-brand-primary/30 via-app-background/50 to-brand-lavender/25"
        />

        {/* Search + Filters */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-app-border bg-app-surface-elevated p-4 md:flex-row md:items-center md:gap-6 md:p-5">
          <div className="flex-1">
            <BdsInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por livro, categoria ou testamento…"
              leadingIcon={<Search className="h-4 w-4" />}
              aria-label="Buscar na biblioteca"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible">
            <Filter className="h-4 w-4 shrink-0 text-app-text-muted" aria-hidden />
            <div className="flex items-center gap-2">
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <BdsButton
                    key={f.id}
                    size="sm"
                    variant={active ? "primary" : "secondary"}
                    onClick={() => setFilter(f.id)}
                    aria-pressed={active}
                    className={cn(!active && "border-app-border/60")}
                  >
                    {f.label}
                  </BdsButton>
                );
              })}
            </div>
          </div>
        </div>

        {/* Shelves */}
        {totalResults === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="Nada encontrado por aqui"
              description="Tente outro termo, mude os filtros ou limpe a busca para ver toda a estante."
              actionLabel="Limpar busca"
              onAction={() => { setQuery(""); setFilter("all"); }}
            />
          </div>
        ) : (
          grouped.map(({ cat, books }) => {
            if (books.length === 0) return null;
            return (
              <Section
                key={cat.id}
                kicker={cat.testament === "AT" ? "Antigo Testamento" : "Novo Testamento"}
                title={cat.title}
                subtitle={cat.subtitle}
                className="!px-0"
              >
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {books.map((book) => (
                    <BookShelfCover key={book.slug} book={book} />
                  ))}
                </div>
              </Section>
            );
          })
        )}
      </div>
    </AppShell>
  );
}
