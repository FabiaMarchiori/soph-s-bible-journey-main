import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/quizzes")({
  head: () => ({
    meta: [
      { title: "Quizzes — Jornada Bíblica com Soph" },
      { name: "description", content: "Teste o que você aprendeu com quizzes visuais em cada trilha." },
      { property: "og:title", content: "Quizzes — Jornada Bíblica com Soph" },
      { property: "og:description", content: "Teste o que você aprendeu com quizzes visuais em cada trilha." },
    ],
  }),
  component: () => (
    <ComingSoon title="Quizzes" description="Teste o que você aprendeu com quizzes visuais em cada trilha." />
  ),
});
