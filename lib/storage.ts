import type { Lang } from "./i18n";

export type ScoreKey = "sumas" | "restas" | "tablas" | "mezcla" | "problemas";

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null): void {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

export const getBest = (mode: ScoreKey) => Number(read(`mathgame:best:${mode}`)) || 0;
export const setBest = (mode: ScoreKey, score: number) => write(`mathgame:best:${mode}`, String(score));

/** Problems series progress: blocks completed and hits so far. */
export function getProblemsProgress(): { block: number; correct: number } {
  return {
    block: Number(read("mathgame:problems:block")) || 0,
    correct: Number(read("mathgame:problems:correct")) || 0,
  };
}

export function setProblemsProgress(block: number, correct: number): void {
  write("mathgame:problems:block", block ? String(block) : null);
  write("mathgame:problems:correct", block ? String(correct) : null);
}

export function getLang(): Lang {
  const saved = read("mathgame:lang");
  if (saved === "es" || saved === "ca") return saved;
  try {
    return navigator.language.toLowerCase().startsWith("ca") ? "ca" : "es";
  } catch {
    return "es";
  }
}

export const setLang = (lang: Lang) => write("mathgame:lang", lang);
