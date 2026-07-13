import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowLeft } from "lucide-react";
import { AppShell } from "./AppShell";

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-app-border bg-app-surface-elevated p-10 shadow-panel">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-primary/20 blur-3xl" aria-hidden />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-lavender">
              <Sparkles className="h-3.5 w-3.5" /> Em breve
            </div>
            <h1 className="mt-5 font-display text-3xl font-extrabold text-app-text md:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-app-text-muted">
              {description}
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-app-border bg-app-surface px-5 py-2.5 font-display text-sm font-semibold text-app-text transition-smooth hover:border-brand-primary/50 hover:bg-app-surface-high"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
