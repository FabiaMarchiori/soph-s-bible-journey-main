import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/jornada")({
  head: () => ({
    meta: [
      { title: "Minha jornada — Jornada Bíblica com Soph" },
      { name: "description", content: "Acompanhe seu progresso, suas metas e sua sequência de leituras diárias." },
      { property: "og:title", content: "Minha jornada — Jornada Bíblica com Soph" },
      { property: "og:description", content: "Acompanhe seu progresso, suas metas e sua sequência de leituras diárias." },
    ],
  }),
  component: () => (
    <ComingSoon title="Minha jornada" description="Acompanhe seu progresso, suas metas e sua sequência de leituras diárias." />
  ),
});
