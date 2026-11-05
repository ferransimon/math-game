"use client";

import { useEffect, useRef, useState } from "react";
import { getBest, setBest, type ScoreKey } from "@/lib/storage";
import { useLang } from "./LangProvider";

interface Props {
  scoreKey: ScoreKey;
  score: number;
  /** When set (problems series), score is shown as "n of total". */
  total?: number;
  accent: string;
  onRestart: () => void;
  onExit: () => void;
}

export default function GameOver({ scoreKey, score, total, accent, onRestart, onExit }: Props) {
  const { t } = useLang();
  const [prevBest] = useState(() => getBest(scoreKey));
  const isRecord = score > prevBest;
  const again = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isRecord) setBest(scoreKey, score);
    again.current?.focus();
  }, [isRecord, scoreKey, score]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

  const title = isRecord && score > 0 ? t.newRecord : total ? t.seriesDone : t.gameOver;
  const bestNote = !isRecord && prevBest > 0 && (
    <>
      {" · "}
      {t.best.toLowerCase()} {prevBest}
      {total ? `/${total}` : ""}
    </>
  );

  return (
    <main className="anim-enter mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-5 text-center">
      <p className="text-xl font-extrabold text-ink-soft">{title}</p>
      <p className="my-4 text-8xl font-black tabular-nums">
        {score}
        {total && <span className="text-4xl text-ink-soft">/{total}</span>}
      </p>
      <p className="mb-10 font-semibold text-ink-soft">
        {t.hits(score)}
        {bestNote}
      </p>
      <button
        ref={again}
        onClick={onRestart}
        className={`${accent} w-full rounded-3xl py-6 text-3xl font-black text-ink shadow-[0_6px_0_rgba(74,68,88,0.12)] outline-none active:translate-y-1 active:shadow-none`}
      >
        {t.again}
      </button>
      <button
        onClick={onExit}
        className="mt-4 w-full rounded-3xl bg-white py-4 text-xl font-extrabold text-ink-soft shadow-sm active:translate-y-0.5"
      >
        {t.home}
      </button>
    </main>
  );
}
