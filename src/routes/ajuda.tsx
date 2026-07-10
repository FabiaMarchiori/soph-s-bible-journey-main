import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/ajuda")({
  head: () => ({
    meta: [
      { title: "Ajuda — Jornada Bíblica com Soph" },
      { name: "description", content: "Perguntas frequentes, tutoriais e canal de contato com a equipe." },
      { property: "og:title", content: "Ajuda — Jornada Bíblica com Soph" },
      { property: "og:description", content: "Perguntas frequentes, tutoriais e canal de contato com a equipe." },
    ],
  }),
  component: () => (
    <ComingSoon title="Ajuda" description="Perguntas frequentes, tutoriais e canal de contato com a equipe." />
  ),
});
