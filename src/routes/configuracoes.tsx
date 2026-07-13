import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — Jornada Bíblica com Soph" },
      { name: "description", content: "Ajuste tema, notificações, idioma e preferências de acessibilidade." },
      { property: "og:title", content: "Configurações — Jornada Bíblica com Soph" },
      { property: "og:description", content: "Ajuste tema, notificações, idioma e preferências de acessibilidade." },
    ],
  }),
  component: () => (
    <ComingSoon title="Configurações" description="Ajuste tema, notificações, idioma e preferências de acessibilidade." />
  ),
});
