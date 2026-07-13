import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/materiais")({
  head: () => ({
    meta: [
      { title: "Materiais para imprimir — Jornada Bíblica com Soph" },
      { name: "description", content: "Guias, ilustrações e roteiros de estudo prontos para imprimir." },
      { property: "og:title", content: "Materiais para imprimir — Jornada Bíblica com Soph" },
      { property: "og:description", content: "Guias, ilustrações e roteiros de estudo prontos para imprimir." },
    ],
  }),
  component: () => (
    <ComingSoon title="Materiais para imprimir" description="Guias, ilustrações e roteiros de estudo prontos para imprimir." />
  ),
});
