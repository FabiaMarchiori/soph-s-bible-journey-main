import trackInfantil from "@/assets/track-infantil.jpg";
import trackTeen from "@/assets/track-teen.jpg";
import trackManga from "@/assets/track-manga.jpg";
import trackTradicional from "@/assets/track-tradicional.jpg";

export type TrackId = "infantil" | "teen" | "manga" | "tradicional";

export interface Track {
  id: TrackId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  gradientClass: string;
  accentVar: string;
  icon: string;
}

export const tracks: Track[] = [
  {
    id: "infantil",
    name: "Infantil",
    tagline: "Alegre, luminosa e lúdica",
    description: "Histórias contadas com leveza para crianças descobrirem a Bíblia com encanto.",
    image: trackInfantil,
    gradientClass: "bg-gradient-infantil",
    accentVar: "var(--track-infantil-a)",
    icon: "sun",
  },
  {
    id: "teen",
    name: "Teen",
    tagline: "Tecnológica, energética, jovem",
    description: "Uma leitura visual e confiante para adolescentes que buscam profundidade.",
    image: trackTeen,
    gradientClass: "bg-gradient-teen",
    accentVar: "var(--brand-primary)",
    icon: "sparkles",
  },
  {
    id: "manga",
    name: "Mangá",
    tagline: "Narrativa, dramática, cinematográfica",
    description: "Painéis intensos e alto contraste para viver a Bíblia como uma saga épica.",
    image: trackManga,
    gradientClass: "bg-gradient-manga",
    accentVar: "var(--track-manga-b)",
    icon: "flame",
  },
  {
    id: "tradicional",
    name: "Tradicional",
    tagline: "Elegante, contemplativa, serena",
    description: "Uma leitura reverente com tipografia clássica e luz dourada.",
    image: trackTradicional,
    gradientClass: "bg-gradient-tradicional",
    accentVar: "var(--brand-gold)",
    icon: "book-open",
  },
];

export const getTrack = (id: TrackId) => tracks.find((t) => t.id === id)!;
