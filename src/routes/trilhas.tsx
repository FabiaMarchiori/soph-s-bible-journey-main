import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { TrackCard } from "@/components/TrackCard";
import { tracks, type TrackId } from "@/lib/tracks";

const searchSchema = z.object({
  t: z.enum(["infantil", "teen", "manga", "tradicional"]).optional(),
});

export const Route = createFileRoute("/trilhas")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Trilhas — Jornada Bíblica com Soph" },
      {
        name: "description",
        content:
          "Escolha entre as trilhas Infantil, Teen, Mangá e Tradicional. Cada uma com linguagem e visual próprios.",
      },
      { property: "og:title", content: "Escolha sua trilha" },
      {
        property: "og:description",
        content: "Quatro linguagens visuais para viver a Bíblia do seu jeito.",
      },
    ],
  }),
  component: TrilhasPage,
});

const STORAGE_KEY = "jbs:selectedTrack";

function TrilhasPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<TrackId | null>(null);

  useEffect(() => {
    if (search.t) {
      setSelected(search.t);
      return;
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as TrackId | null;
      if (saved && tracks.some((t) => t.id === saved)) setSelected(saved);
    } catch { /* noop */ }
  }, [search.t]);

  const choose = (id: TrackId) => {
    setSelected(id);
    try { localStorage.setItem(STORAGE_KEY, id); } catch { /* noop */ }
  };

  const enter = () => {
    if (!selected) return;
    toast.success(`Entrando na trilha ${tracks.find((t) => t.id === selected)?.name}.`);
    navigate({ to: "/biblioteca" });
  };

  const selectedTrack = selected ? tracks.find((t) => t.id === selected) : null;

  return (
    <AppShell>
      <div className="relative isolate overflow-hidden border-b border-app-border/60">
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="absolute inset-0 -z-10 grid-bg" aria-hidden />
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-lavender">
              Trilhas
            </div>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-app-text md:text-5xl">
              Escolha sua trilha
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-app-text-muted md:text-lg">
              Cada trilha traz uma linguagem e um visual próprios. Você pode explorar outras trilhas a qualquer momento.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tracks.map((t) => (
            <TrackCard key={t.id} track={t} selected={selected === t.id} onSelect={() => choose(t.id)} />
          ))}
        </div>

        {/* Summary bar */}
        <div className="sticky bottom-20 mt-10 md:bottom-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-app-border bg-app-surface-elevated/90 p-4 shadow-elevated backdrop-blur md:p-5">
            <div className="flex min-w-0 items-center gap-3">
              {selectedTrack ? (
                <>
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white shadow-glow"
                    style={{ background: `linear-gradient(135deg, ${selectedTrack.accentVar}, hsl(252 100% 67%))` }}
                  >
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-app-text-muted">
                      Trilha selecionada
                    </div>
                    <div className="truncate font-display text-lg font-bold text-app-text">
                      {selectedTrack.name}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm text-app-text-muted">
                  Selecione uma trilha acima para continuar.
                </div>
              )}
            </div>
            <button
              onClick={enter}
              disabled={!selected}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-display text-sm font-semibold text-white shadow-glow transition-smooth hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              Entrar na biblioteca <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
