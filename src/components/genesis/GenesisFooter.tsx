import { Link } from "@tanstack/react-router";
import { Download, Share2, ArrowRight } from "lucide-react";
import { BdsButton } from "@/components/bds";

interface GenesisFooterProps {
  nextBookImage: string;
  onDownload: () => void;
  onShare: () => void;
}

export function GenesisFooter({ nextBookImage, onDownload, onShare }: GenesisFooterProps) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-20 md:px-8" aria-label="Próximos Passos">
      <div className="rounded-3xl border border-app-border bg-app-surface-elevated/30 p-6 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_320px]">
          {/* Next Book Teaser */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-lavender">Próximo Livro</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-app-text">Êxodo</h3>
              <p className="mt-2 text-sm leading-relaxed text-app-text-muted max-w-xl">
                A continuação da saga do povo de Deus. Da escravidão no Egito à libertação milagrosa através do Mar Vermelho e a revelação dos Dez Mandamentos no Monte Sinai.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <BdsButton variant="secondary" size="sm" onClick={onDownload} leadingIcon={<Download className="h-4 w-4" />}>
                Baixar Guia PDF
              </BdsButton>
              <BdsButton variant="ghost" size="sm" onClick={onShare} leadingIcon={<Share2 className="h-4 w-4" />}>
                Compartilhar Livro
              </BdsButton>
            </div>
          </div>

          {/* Next Book Cover Card */}
          <div className="relative overflow-hidden rounded-2xl border border-app-border bg-app-surface h-[160px] md:h-full flex items-center p-4 gap-4">
            <img
              src={nextBookImage}
              alt="Capa de Êxodo"
              className="h-24 w-16 object-cover rounded-lg shadow-card shrink-0"
            />
            <div>
              <h4 className="font-display text-base font-bold text-app-text">Êxodo</h4>
              <p className="text-xs text-app-text-muted mt-1">40 Capítulos · Pentateuco</p>
              <Link
                to="/biblioteca"
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:underline"
              >
                Ver na Biblioteca <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}