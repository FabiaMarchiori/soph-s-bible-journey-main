// Metadata dos 66 livros bíblicos para a Biblioteca Viva.
// Imagens são placeholders (mesmas usadas em outros mocks do BDS).
import storyCriacao from "@/assets/story-criacao.jpg";
import storyExodo from "@/assets/story-exodo.jpg";
import storyDavi from "@/assets/story-davi.jpg";
import storyJonas from "@/assets/story-jonas.jpg";
import storyNoe from "@/assets/story-noe.jpg";
import storyBabel from "@/assets/story-babel.jpg";
import storyAdao from "@/assets/story-adao.jpg";
import storyCaim from "@/assets/story-caim.jpg";
import trackTradicional from "@/assets/track-tradicional.jpg";
import trackTeen from "@/assets/track-teen.jpg";
import trackInfantil from "@/assets/track-infantil.jpg";
import trackManga from "@/assets/track-manga.jpg";

export type Testament = "AT" | "NT";
export type BookStatus = "available" | "coming-soon" | "in-development";
export type BibleCategory =
  | "pentateuco"
  | "historicos"
  | "poeticos"
  | "profetas-maiores"
  | "profetas-menores"
  | "evangelhos"
  | "cartas"
  | "apocalipse";

export interface BibleBook {
  slug: string;
  name: string;
  abbrev: string;
  chapters: number;
  testament: Testament;
  category: BibleCategory;
  status: BookStatus;
  image: string;
}

export interface CategoryMeta {
  id: BibleCategory;
  title: string;
  subtitle: string;
  testament: Testament;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: "pentateuco", title: "Pentateuco", subtitle: "Os cinco livros da Lei", testament: "AT" },
  { id: "historicos", title: "Livros Históricos", subtitle: "A jornada do povo de Deus", testament: "AT" },
  { id: "poeticos", title: "Poéticos", subtitle: "Sabedoria, cânticos e louvor", testament: "AT" },
  { id: "profetas-maiores", title: "Profetas Maiores", subtitle: "Vozes que anunciam", testament: "AT" },
  { id: "profetas-menores", title: "Profetas Menores", subtitle: "Doze mensagens breves e potentes", testament: "AT" },
  { id: "evangelhos", title: "Evangelhos", subtitle: "A vida e obra de Jesus", testament: "NT" },
  { id: "cartas", title: "Cartas", subtitle: "Ensinos aos primeiros cristãos", testament: "NT" },
  { id: "apocalipse", title: "Apocalipse", subtitle: "A revelação final", testament: "NT" },
];

// Pool de imagens placeholder rotativas por categoria
const IMG = {
  pentateuco: [storyCriacao, storyAdao, storyCaim, storyNoe, storyExodo],
  historicos: [trackTradicional, storyDavi, trackTeen, storyBabel, storyCriacao, trackInfantil, storyExodo, trackManga, storyNoe, storyDavi, trackTradicional, storyBabel],
  poeticos: [trackInfantil, storyDavi, storyCriacao, trackTeen, trackTradicional],
  "profetas-maiores": [trackTradicional, storyExodo, storyBabel, storyDavi, storyNoe],
  "profetas-menores": [storyJonas, storyBabel, storyNoe, storyCaim, storyAdao, storyDavi, storyCriacao, storyExodo, trackTradicional, trackTeen, trackInfantil, trackManga],
  evangelhos: [trackTeen, trackInfantil, trackManga, trackTradicional],
  cartas: [trackTradicional, trackTeen, trackInfantil, trackManga, storyDavi, storyExodo, storyCriacao, storyBabel, storyAdao, storyCaim, storyNoe, storyJonas, storyDavi, trackTradicional, trackTeen, trackInfantil, trackManga, storyExodo, storyCriacao, storyBabel, storyAdao],
  apocalipse: [storyBabel],
};

function build(
  category: BibleCategory,
  testament: Testament,
  entries: Array<[string, string, string, number]>,
): BibleBook[] {
  const pool = IMG[category];
  return entries.map(([slug, name, abbrev, chapters], i) => ({
    slug,
    name,
    abbrev,
    chapters,
    testament,
    category,
    status: slug === "genesis" ? "available" : "coming-soon",
    image: pool[i % pool.length],
  }));
}

export const BOOKS: BibleBook[] = [
  ...build("pentateuco", "AT", [
    ["genesis", "Gênesis", "Gn", 50],
    ["exodo", "Êxodo", "Êx", 40],
    ["levitico", "Levítico", "Lv", 27],
    ["numeros", "Números", "Nm", 36],
    ["deuteronomio", "Deuteronômio", "Dt", 34],
  ]),
  ...build("historicos", "AT", [
    ["josue", "Josué", "Js", 24],
    ["juizes", "Juízes", "Jz", 21],
    ["rute", "Rute", "Rt", 4],
    ["1-samuel", "1 Samuel", "1Sm", 31],
    ["2-samuel", "2 Samuel", "2Sm", 24],
    ["1-reis", "1 Reis", "1Rs", 22],
    ["2-reis", "2 Reis", "2Rs", 25],
    ["1-cronicas", "1 Crônicas", "1Cr", 29],
    ["2-cronicas", "2 Crônicas", "2Cr", 36],
    ["esdras", "Esdras", "Ed", 10],
    ["neemias", "Neemias", "Ne", 13],
    ["ester", "Ester", "Et", 10],
  ]),
  ...build("poeticos", "AT", [
    ["jo", "Jó", "Jó", 42],
    ["salmos", "Salmos", "Sl", 150],
    ["proverbios", "Provérbios", "Pv", 31],
    ["eclesiastes", "Eclesiastes", "Ec", 12],
    ["cantares", "Cânticos", "Ct", 8],
  ]),
  ...build("profetas-maiores", "AT", [
    ["isaias", "Isaías", "Is", 66],
    ["jeremias", "Jeremias", "Jr", 52],
    ["lamentacoes", "Lamentações", "Lm", 5],
    ["ezequiel", "Ezequiel", "Ez", 48],
    ["daniel", "Daniel", "Dn", 12],
  ]),
  ...build("profetas-menores", "AT", [
    ["oseias", "Oseias", "Os", 14],
    ["joel", "Joel", "Jl", 3],
    ["amos", "Amós", "Am", 9],
    ["obadias", "Obadias", "Ob", 1],
    ["jonas", "Jonas", "Jn", 4],
    ["miqueias", "Miqueias", "Mq", 7],
    ["naum", "Naum", "Na", 3],
    ["habacuque", "Habacuque", "Hc", 3],
    ["sofonias", "Sofonias", "Sf", 3],
    ["ageu", "Ageu", "Ag", 2],
    ["zacarias", "Zacarias", "Zc", 14],
    ["malaquias", "Malaquias", "Ml", 4],
  ]),
  ...build("evangelhos", "NT", [
    ["mateus", "Mateus", "Mt", 28],
    ["marcos", "Marcos", "Mc", 16],
    ["lucas", "Lucas", "Lc", 24],
    ["joao", "João", "Jo", 21],
  ]),
  ...build("cartas", "NT", [
    ["atos", "Atos", "At", 28],
    ["romanos", "Romanos", "Rm", 16],
    ["1-corintios", "1 Coríntios", "1Co", 16],
    ["2-corintios", "2 Coríntios", "2Co", 13],
    ["galatas", "Gálatas", "Gl", 6],
    ["efesios", "Efésios", "Ef", 6],
    ["filipenses", "Filipenses", "Fp", 4],
    ["colossenses", "Colossenses", "Cl", 4],
    ["1-tessalonicenses", "1 Tessalonicenses", "1Ts", 5],
    ["2-tessalonicenses", "2 Tessalonicenses", "2Ts", 3],
    ["1-timoteo", "1 Timóteo", "1Tm", 6],
    ["2-timoteo", "2 Timóteo", "2Tm", 4],
    ["tito", "Tito", "Tt", 3],
    ["filemom", "Filemom", "Fm", 1],
    ["hebreus", "Hebreus", "Hb", 13],
    ["tiago", "Tiago", "Tg", 5],
    ["1-pedro", "1 Pedro", "1Pe", 5],
    ["2-pedro", "2 Pedro", "2Pe", 3],
    ["1-joao", "1 João", "1Jo", 5],
    ["2-joao", "2 João", "2Jo", 1],
    ["3-joao", "3 João", "3Jo", 1],
    ["judas", "Judas", "Jd", 1],
  ]),
  ...build("apocalipse", "NT", [
    ["apocalipse", "Apocalipse", "Ap", 22],
  ]),
];

export function getBookBySlug(slug: string): BibleBook | undefined {
  return BOOKS.find((b) => b.slug === slug);
}
