import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BdsButton, HeroSection, StatusChip, BibleBreadcrumb } from "@/components/bds";
import { getBookBySlug, CATEGORIES } from "@/lib/bible-books";

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

function BookDetail() {
  const { book } = Route.useLoaderData();
  const category = CATEGORIES.find((c) => c.id === book.category);
  const testamentLabel = book.testament === "AT" ? "Antigo Testamento" : "Novo Testamento";

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
