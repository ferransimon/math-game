import type { Mode } from "./questions";

const key = (mode: Mode) => `mathgame:best:${mode}`;

export function getBest(mode: Mode): number {
  try {
    return Number(localStorage.getItem(key(mode))) || 0;
  } catch {
    return 0;
  }
}

export function setBest(mode: Mode, score: number): void {
  try {
    localStorage.setItem(key(mode), String(score));
  } catch {
    /* storage unavailable */
  }
}
