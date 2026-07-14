import { User, Layers, Calendar } from "lucide-react";
import { Section, UniversalCard } from "@/components/bds";

export function GenesisFicha() {
  return (
    <Section kicker="Ficha de Biblioteca" title="Ficha do Livro" subtitle="Detalhes históricos e literários de Gênesis.">
      <div className="grid gap-6 md:grid-cols-3">
        <UniversalCard className="p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
              <User className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-app-text">Autor Tradicional</h3>
          </div>
          <p className="mt-3 text-sm text-app-text-muted">
            Moisés, que compilou as tradições orais e escritas sob inspiração divina para guiar o povo de Israel no deserto.
          </p>
        </UniversalCard>

        <UniversalCard className="p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-app-text">Categoria Literária</h3>
          </div>
          <p className="mt-3 text-sm text-app-text-muted">
            Pentateuco (ou Torá), representando a Lei e os fundamentos históricos da fé judaico-cristã.
          </p>
        </UniversalCard>

        <UniversalCard className="p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gold/10 text-brand-gold">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-app-text">Eventos Principais</h3>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Criação", "Queda", "Dilúvio", "Babel", "Abraão", "Isaque", "Jacó", "José"].map((event) => (
              <span
                key={event}
                className="rounded-full bg-app-surface px-2.5 py-1 text-xs font-medium text-app-text-muted border border-app-border"
              >
                {event}
              </span>
            ))}
          </div>
        </UniversalCard>
      </div>
    </Section>
  );
}