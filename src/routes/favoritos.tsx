import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — Jornada Bíblica com Soph" },
      { name: "description", content: "Suas histórias marcadas ficam aqui, prontas para você retomar quando quiser." },
      { property: "og:title", content: "Favoritos — Jornada Bíblica com Soph" },
      { property: "og:description", content: "Suas histórias marcadas ficam aqui, prontas para você retomar quando quiser." },
    ],
  }),
  component: () => (
    <ComingSoon title="Favoritos" description="Suas histórias marcadas ficam aqui, prontas para você retomar quando quiser." />
  ),
});
