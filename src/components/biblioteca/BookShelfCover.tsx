/**
 * BookShelfCover — capa de livro para a Biblioteca Viva.
 * Livros disponíveis são clicáveis. Demais aparecem dessaturados com etiqueta "Em breve".
 */
import { useState, type KeyboardEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { StatusChip } from "@/components/bds";
import type { BibleBook } from "@/lib/bible-books";

interface Props {
  book: BibleBook;
  className?: string;
}

export function BookShelfCover({ book, className }: Props) {
  const [opening, setOpening] = useState(false);
  const navigate = useNavigate();
  const isAvailable = book.status === "available";

  const handleOpen = () => {
    if (!isAvailable) return;
    setOpening(true);
    window.setTimeout(() => {
      navigate({ to: "/biblioteca/$slug", params: { slug: book.slug } });
    }, 320);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isAvailable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  const statusChip =
    book.status === "available" ? (
      <StatusChip status="new" label="Disponível" />
    ) : book.status === "in-development" ? (
      <StatusChip status="in-progress" label="Em desenvolvimento" />
    ) : (
      <StatusChip status="coming-soon" />
    );

  return (
    <div
      role={isAvailable ? "button" : undefined}
      tabIndex={isAvailable ? 0 : undefined}
      aria-label={isAvailable ? `Abrir ${book.name}` : `${book.name} — em breve`}
      onClick={isAvailable ? handleOpen : undefined}
      onKeyDown={onKey}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-app-border bg-app-surface-elevated shadow-card transition-smooth",
        isAvailable
          ? "cursor-pointer bds-press hover:-translate-y-1 hover:shadow-hover hover:border-brand-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          : "cursor-default opacity-80",
        opening && "bds-book-open",
        className,
      )}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
        <img
          src={book.image}
          alt=""
          aria-hidden
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-smooth",
            isAvailable ? "group-hover:scale-[1.06]" : "saturate-[0.35] brightness-90",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-app-background/95 via-app-background/25 to-transparent" />
        {!isAvailable && <div className="absolute inset-0 bg-app-background/25" />}
        <div className="absolute left-3 top-3">{statusChip}</div>
        <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
          {book.abbrev}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h3 className="line-clamp-1 font-display text-sm font-semibold text-app-text">{book.name}</h3>
        <p className="text-xs text-app-text-muted">
          {book.chapters} {book.chapters === 1 ? "capítulo" : "capítulos"}
        </p>
      </div>
      {/* Ambient glow for available books */}
      {isAvailable && (
        <div className="pointer-events-none absolute inset-x-6 -bottom-6 h-10 rounded-full bg-brand-primary/25 blur-2xl opacity-0 transition-smooth group-hover:opacity-100" />
      )}
    </div>
  );
}
