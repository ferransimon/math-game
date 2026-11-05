import type { Mode } from "./questions";

export interface ModeInfo {
  id: Mode;
  symbol: string;
  /** Tailwind classes using the pastel tokens from globals.css */
  card: string;
  accent: string;
}

export const MODES: ModeInfo[] = [
  { id: "sumas", symbol: "+", card: "bg-mint", accent: "bg-mint-deep" },
  { id: "restas", symbol: "−", card: "bg-peach", accent: "bg-peach-deep" },
  { id: "tablas", symbol: "×", card: "bg-lavender", accent: "bg-lavender-deep" },
  { id: "mezcla", symbol: "★", card: "bg-sky", accent: "bg-sky-deep" },
];

export const PROBLEMS_STYLE = { symbol: "?", card: "bg-lemon", accent: "bg-lemon-deep" };
