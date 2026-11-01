"use client";

import { useEffect, useRef, useState } from "react";
import type { Mode } from "@/lib/questions";
import { getBest, setBest } from "@/lib/storage";

interface Props {
  mode: Mode;
  score: number;
  accent: string;
  onRestart: () => void;
  onExit: () => void;
}

export default function GameOver({ mode, score, accent, onRestart, onExit }: Props) {
  const [prevBest] = useState(() => getBest(mode));
  const isRecord = score > prevBest;
  const again = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isRecord) setBest(mode, score);
    again.current?.focus();
  }, [isRecord, mode, score]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

  return (
    <main className="anim-enter mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-5 text-center">
      <p className="text-xl font-extrabold text-ink-soft">
        {isRecord && score > 0 ? "¡Nuevo récord!" : "¡Fin del juego!"}
      </p>
      <p className="my-4 text-8xl font-black tabular-nums">{score}</p>
      <p className="mb-10 font-semibold text-ink-soft">
        {score === 1 ? "acierto" : "aciertos"}
        {!isRecord && prevBest > 0 && <> · récord {prevBest}</>}
      </p>
      <button
        ref={again}
        onClick={onRestart}
        className={`${accent} w-full rounded-3xl py-6 text-3xl font-black text-white shadow-[0_6px_0_rgba(74,68,88,0.12)] outline-none active:translate-y-1 active:shadow-none`}
      >
        Otra vez
      </button>
      <button
        onClick={onExit}
        className="mt-4 w-full rounded-3xl bg-white py-4 text-xl font-extrabold text-ink-soft shadow-sm active:translate-y-0.5"
      >
        Inicio
      </button>
    </main>
  );
}
