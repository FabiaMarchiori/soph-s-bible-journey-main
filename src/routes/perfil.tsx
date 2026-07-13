import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — Jornada Bíblica com Soph" },
      { name: "description", content: "Personalize sua conta, avatar e preferências de leitura." },
      { property: "og:title", content: "Perfil — Jornada Bíblica com Soph" },
      { property: "og:description", content: "Personalize sua conta, avatar e preferências de leitura." },
    ],
  }),
  component: () => (
    <ComingSoon title="Perfil" description="Personalize sua conta, avatar e preferências de leitura." />
  ),
});
