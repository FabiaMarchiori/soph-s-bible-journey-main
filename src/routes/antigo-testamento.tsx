import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/antigo-testamento")({
  head: () => ({
    meta: [
      { title: "Antigo Testamento — Jornada Bíblica com Soph" },
      { name: "description", content: "Do Gênesis a Malaquias — 39 livros para explorar com Soph." },
      { property: "og:title", content: "Antigo Testamento — Jornada Bíblica com Soph" },
      { property: "og:description", content: "Do Gênesis a Malaquias — 39 livros para explorar com Soph." },
    ],
  }),
  component: () => (
    <ComingSoon title="Antigo Testamento" description="Do Gênesis a Malaquias — 39 livros para explorar com Soph." />
  ),
});
