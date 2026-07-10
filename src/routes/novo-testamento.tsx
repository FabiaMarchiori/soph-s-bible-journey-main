import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/novo-testamento")({
  head: () => ({
    meta: [
      { title: "Novo Testamento — Jornada Bíblica com Soph" },
      { name: "description", content: "De Mateus ao Apocalipse — 27 livros contados de forma visual." },
      { property: "og:title", content: "Novo Testamento — Jornada Bíblica com Soph" },
      { property: "og:description", content: "De Mateus ao Apocalipse — 27 livros contados de forma visual." },
    ],
  }),
  component: () => (
    <ComingSoon title="Novo Testamento" description="De Mateus ao Apocalipse — 27 livros contados de forma visual." />
  ),
});
