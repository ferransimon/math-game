import type { Mode } from "./questions";

export interface ModeInfo {
  id: Mode;
  label: string;
  symbol: string;
  /** Tailwind classes using the pastel tokens from globals.css */
  card: string;
  accent: string;
}

export const MODES: ModeInfo[] = [
  { id: "sumas", label: "Sumas", symbol: "+", card: "bg-mint", accent: "bg-mint-deep" },
  { id: "restas", label: "Restas", symbol: "−", card: "bg-peach", accent: "bg-peach-deep" },
  { id: "tablas", label: "Tablas", symbol: "×", card: "bg-lavender", accent: "bg-lavender-deep" },
  { id: "mezcla", label: "Mezcla", symbol: "★", card: "bg-sky", accent: "bg-sky-deep" },
];
