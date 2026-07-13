// Mock data for the Bible Design System showcase.
// NOTE: These mocks are ONLY for previewing components. No real biblical
// content or database is wired here.
import trackInfantil from "@/assets/track-infantil.jpg";
import trackTeen from "@/assets/track-teen.jpg";
import trackManga from "@/assets/track-manga.jpg";
import trackTradicional from "@/assets/track-tradicional.jpg";
import storyCriacao from "@/assets/story-criacao.jpg";
import storyAdao from "@/assets/story-adao.jpg";
import storyNoe from "@/assets/story-noe.jpg";
import storyBabel from "@/assets/story-babel.jpg";
import storyDavi from "@/assets/story-davi.jpg";

export type BookStatus = "locked" | "new" | "in-progress" | "completed";
export type StoryStatus = BookStatus | "favorite";

export interface MockBook {
  id: string;
  name: string;
  abbrev: string;
  category: "AT" | "NT";
  chapters: number;
  status: BookStatus;
  progress: number;
  image: string;
}

export interface MockCharacter {
  id: string;
  name: string;
  meaning: string;
  description: string;
  books: string[];
  family?: string[];
  facts: string[];
  image: string;
}

export interface MockLocation {
  id: string;
  name: string;
  description: string;
  importance: string;
  image: string;
  coords?: { x: number; y: number };
}

export interface MockObject {
  id: string;
  name: string;
  description: string;
  reference: string;
  image: string;
}

export interface MockTimelineItem {
  id: string;
  title: string;
  period: string;
  description: string;
  status: BookStatus;
}

export interface MockJourneyStep {
  id: string;
  name: string;
  icon: string;
  status: BookStatus;
  progress: number;
}

export const mockBooks: MockBook[] = [
  { id: "genesis", name: "Gênesis", abbrev: "Gn", category: "AT", chapters: 50, status: "in-progress", progress: 42, image: storyCriacao },
  { id: "exodo", name: "Êxodo", abbrev: "Êx", category: "AT", chapters: 40, status: "new", progress: 0, image: trackTradicional },
  { id: "salmos", name: "Salmos", abbrev: "Sl", category: "AT", chapters: 150, status: "locked", progress: 0, image: trackInfantil },
  { id: "joao", name: "João", abbrev: "Jo", category: "NT", chapters: 21, status: "completed", progress: 100, image: trackTeen },
];

export const mockCharacters: MockCharacter[] = [
  {
    id: "abraao",
    name: "Abraão",
    meaning: "Pai de muitas nações",
    description: "Patriarca escolhido para dar origem a um povo de fé.",
    books: ["Gênesis"],
    family: ["Sara", "Isaque", "Ismael"],
    facts: ["Deixou Ur aos 75 anos", "Recebeu a aliança de Deus"],
    image: trackTradicional,
  },
  {
    id: "davi",
    name: "Davi",
    meaning: "Amado",
    description: "Pastor, poeta, guerreiro e rei de Israel.",
    books: ["1 Samuel", "2 Samuel", "Salmos"],
    family: ["Jessé", "Salomão", "Betsabá"],
    facts: ["Venceu Golias ainda jovem", "Escreveu diversos salmos"],
    image: storyDavi,
  },
];

export const mockLocations: MockLocation[] = [
  { id: "eden", name: "Éden", description: "Jardim onde tudo começou.", importance: "Criação e queda", image: storyCriacao, coords: { x: 34, y: 42 } },
  { id: "babel", name: "Babel", description: "Cidade da torre e da confusão das línguas.", importance: "Dispersão dos povos", image: storyBabel, coords: { x: 58, y: 38 } },
];

export const mockObjects: MockObject[] = [
  { id: "arca", name: "Arca de Noé", description: "Embarcação construída por ordem divina.", reference: "Gênesis 6", image: storyNoe },
  { id: "tabuas", name: "Tábuas da Lei", description: "Duas pedras com os dez mandamentos.", reference: "Êxodo 20", image: trackTradicional },
  { id: "cajado", name: "Cajado de Moisés", description: "Símbolo do chamado e do poder de Deus.", reference: "Êxodo 4", image: trackTradicional },
];

export const mockTimeline: MockTimelineItem[] = [
  { id: "criacao", title: "Criação", period: "Início", description: "Deus cria os céus e a terra.", status: "completed" },
  { id: "diluvio", title: "Dilúvio", period: "Gênesis 6-9", description: "Noé e sua família são salvos.", status: "completed" },
  { id: "abraao", title: "Abraão", period: "Gênesis 12", description: "Chamado do patriarca.", status: "in-progress" },
  { id: "exodo", title: "Êxodo", period: "Êxodo 12", description: "Saída do Egito.", status: "new" },
  { id: "reis", title: "Reis de Israel", period: "1 Samuel", description: "Início da monarquia.", status: "locked" },
];

export const mockJourney: MockJourneyStep[] = [
  { id: "criacao", name: "Criação", icon: "sparkles", status: "completed", progress: 100 },
  { id: "eden", name: "Éden", icon: "leaf", status: "completed", progress: 100 },
  { id: "queda", name: "Queda", icon: "cloud-rain", status: "in-progress", progress: 60 },
  { id: "diluvio", name: "Dilúvio", icon: "waves", status: "new", progress: 0 },
  { id: "babel", name: "Babel", icon: "building-2", status: "locked", progress: 0 },
  { id: "abraao", name: "Abraão", icon: "mountain", status: "locked", progress: 0 },
  { id: "jose", name: "José", icon: "crown", status: "locked", progress: 0 },
];

export const mockQuiz = {
  id: "q1",
  title: "O que você lembra da Criação?",
  questions: [
    {
      id: "q1a",
      prompt: "Em qual dia Deus criou a luz?",
      options: [
        { id: "a", text: "Primeiro dia", correct: true },
        { id: "b", text: "Terceiro dia" },
        { id: "c", text: "Sexto dia" },
        { id: "d", text: "Sétimo dia" },
      ],
    },
  ],
};

export const mockActivities = [
  { id: "print-arca", type: "printable" as const, title: "Imprima a Arca", description: "Monte a Arca de Noé em papel.", image: storyNoe },
  { id: "colorir-eden", type: "coloring" as const, title: "Colorir Éden", description: "Desenho lúdico do jardim.", image: storyCriacao },
  { id: "versiculo-1", type: "memory-verse" as const, title: "Salmo 23:1", description: "O Senhor é o meu pastor...", image: trackTradicional },
];
