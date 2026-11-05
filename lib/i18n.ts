export type Lang = "es" | "ca";
export const LANGS: Lang[] = ["ca", "es"];

type Num = (n: number) => string;

export interface Strings {
  chooseGame: string;
  modes: Record<"sumas" | "restas" | "tablas" | "mezcla" | "problemas", string>;
  letsPlay: string;
  best: string;
  backHome: string;
  points: Num;
  lives: Num;
  wellDone: string;
  was: Num;
  timeUp: Num;
  gameOver: string;
  newRecord: string;
  hits: Num;
  again: string;
  home: string;
  next: string;
  problemOf: (n: number, total: number) => string;
  seriesDone: string;
  language: string;
}

const es: Strings = {
  chooseGame: "Elige un juego",
  modes: { sumas: "Sumas", restas: "Restas", tablas: "Tablas", mezcla: "Mezcla", problemas: "Problemas" },
  letsPlay: "¡A jugar!",
  best: "Récord",
  backHome: "Volver al inicio",
  points: (n) => `Puntos: ${n}`,
  lives: (n) => `${n} vidas`,
  wellDone: "¡Muy bien!",
  was: (n) => `Era ${n}`,
  timeUp: (n) => `¡Tiempo! Era ${n}`,
  gameOver: "¡Fin del juego!",
  newRecord: "¡Nuevo récord!",
  hits: (n) => (n === 1 ? "acierto" : "aciertos"),
  again: "Otra vez",
  home: "Inicio",
  next: "Siguiente",
  problemOf: (n, total) => `Problema ${n} de ${total}`,
  seriesDone: "¡Serie terminada!",
  language: "Idioma",
};

const ca: Strings = {
  chooseGame: "Tria un joc",
  modes: { sumas: "Sumes", restas: "Restes", tablas: "Taules", mezcla: "Barreja", problemas: "Problemes" },
  letsPlay: "A jugar!",
  best: "Rècord",
  backHome: "Tornar a l'inici",
  points: (n) => `Punts: ${n}`,
  lives: (n) => `${n} vides`,
  wellDone: "Molt bé!",
  was: (n) => `Era ${n}`,
  timeUp: (n) => `Temps! Era ${n}`,
  gameOver: "Fi del joc!",
  newRecord: "Nou rècord!",
  hits: (n) => (n === 1 ? "encert" : "encerts"),
  again: "Una altra vegada",
  home: "Inici",
  next: "Següent",
  problemOf: (n, total) => `Problema ${n} de ${total}`,
  seriesDone: "Sèrie acabada!",
  language: "Idioma",
};

export const STRINGS: Record<Lang, Strings> = { es, ca };
