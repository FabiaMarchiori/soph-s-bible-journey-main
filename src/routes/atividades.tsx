import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/atividades")({
  head: () => ({
    meta: [
      { title: "Atividades — Jornada Bíblica com Soph" },
      { name: "description", content: "Dinâmicas interativas para aprofundar cada história bíblica." },
      { property: "og:title", content: "Atividades — Jornada Bíblica com Soph" },
      { property: "og:description", content: "Dinâmicas interativas para aprofundar cada história bíblica." },
    ],
  }),
  component: () => (
    <ComingSoon title="Atividades" description="Dinâmicas interativas para aprofundar cada história bíblica." />
  ),
});
