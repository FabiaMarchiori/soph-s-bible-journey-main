import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca — Jornada Bíblica com Soph" },
      { name: "description", content: "Um catálogo completo de histórias em quatro trilhas visuais, com filtros por livro e personagem." },
      { property: "og:title", content: "Biblioteca — Jornada Bíblica com Soph" },
      { property: "og:description", content: "Um catálogo completo de histórias em quatro trilhas visuais, com filtros por livro e personagem." },
    ],
  }),
  component: () => (
    <ComingSoon title="Biblioteca" description="Um catálogo completo de histórias em quatro trilhas visuais, com filtros por livro e personagem." />
  ),
});
