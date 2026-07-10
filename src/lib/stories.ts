import storyCriacao from "@/assets/story-criacao.jpg";
import storyAdao from "@/assets/story-adao.jpg";
import storyCaim from "@/assets/story-caim.jpg";
import storyNoe from "@/assets/story-noe.jpg";
import storyBabel from "@/assets/story-babel.jpg";
import storyDavi from "@/assets/story-davi.jpg";
import storyJonas from "@/assets/story-jonas.jpg";
import storyExodo from "@/assets/story-exodo.jpg";
import type { TrackId } from "./tracks";

export interface Story {
  id: string;
  title: string;
  reference: string;
  duration: string;
  track: TrackId;
  badge?: string;
  image: string;
}

export const genesisStories: Story[] = [
  { id: "criacao", title: "A criação", reference: "Gênesis 1", duration: "6 min", track: "tradicional", badge: "Início", image: storyCriacao },
  { id: "adao-eva", title: "Adão e Eva", reference: "Gênesis 2–3", duration: "7 min", track: "infantil", image: storyAdao },
  { id: "caim-abel", title: "Caim e Abel", reference: "Gênesis 4", duration: "5 min", track: "manga", image: storyCaim },
  { id: "noe", title: "Noé e a Grande Arca", reference: "Gênesis 6–9", duration: "12 min", track: "teen", badge: "Destaque", image: storyNoe },
  { id: "babel", title: "A torre de Babel", reference: "Gênesis 11", duration: "8 min", track: "tradicional", image: storyBabel },
];

export const featuredStories: Story[] = [
  { id: "davi", title: "Davi e Golias", reference: "1 Samuel 17", duration: "10 min", track: "teen", badge: "Épico", image: storyDavi },
  { id: "jonas", title: "Jonas e o Grande Peixe", reference: "Jonas 1–4", duration: "9 min", track: "manga", image: storyJonas },
  { id: "exodo", title: "Êxodo — A Fuga", reference: "Êxodo 12–14", duration: "14 min", track: "tradicional", badge: "Épico", image: storyExodo },
];
