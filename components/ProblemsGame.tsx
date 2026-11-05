"use client";

import { useCallback, useEffect, useReducer } from "react";
import { BLOCK_SIZE, PROBLEMS } from "@/lib/problems";
import { PROBLEMS_STYLE } from "@/lib/modes";
import { shuffle } from "@/lib/questions";
import { getProblemsProgress, setProblemsProgress } from "@/lib/storage";
import AnswerGrid from "./AnswerGrid";
import GameOver from "./GameOver";
import { useLang } from "./LangProvider";

const TOTAL = PROBLEMS.length;
const RIGHT_DELAY = 900;

interface State {
  index: number;
  correct: number;
  options: number[];
  phase: "ask" | "right" | "wrong" | "over";
  picked: number | null;
}

type Action = { type: "answer"; value: number } | { type: "next" } | { type: "restart" };

const optionsFor = (i: number) => shuffle([PROBLEMS[i].answer, ...PROBLEMS[i].wrong]);

function start(index: number, correct: number): State {
  return { index, correct, options: optionsFor(index), phase: "ask", picked: null };
}

function init(): State {
  const { block, correct } = getProblemsProgress();
  const index = block * BLOCK_SIZE;
  return index > 0 && index < TOTAL ? start(index, correct) : start(0, 0);
}

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "answer":
      if (s.phase !== "ask") return s;
      return a.value === PROBLEMS[s.index].answer
        ? { ...s, phase: "right", picked: a.value, correct: s.correct + 1 }
        : { ...s, phase: "wrong", picked: a.value };
    case "next":
      if (s.phase !== "right" && s.phase !== "wrong") return s;
      if (s.index + 1 >= TOTAL) return { ...s, phase: "over" };
      return start(s.index + 1, s.correct);
    case "restart":
      return start(0, 0);
  }
}

export default function ProblemsGame({ onExit }: { onExit: () => void }) {
  const { lang, t } = useLang();
  const [s, dispatch] = useReducer(reducer, undefined, init);
  const problem = PROBLEMS[s.index];
  const feedback = s.phase === "right" || s.phase === "wrong";

  const next = useCallback(() => {
    if (!feedback) return;
    const nextIndex = s.index + 1;
    // Save at block boundaries; a finished series clears the bookmark.
    if (nextIndex >= TOTAL) setProblemsProgress(0, 0);
    else if (nextIndex % BLOCK_SIZE === 0) setProblemsProgress(nextIndex / BLOCK_SIZE, s.correct);
    dispatch({ type: "next" });
  }, [feedback, s.index, s.correct]);

  // Right answers advance on their own; wrong ones wait for "Next".
  useEffect(() => {
    if (s.phase !== "right") return;
    const timer = setTimeout(next, RIGHT_DELAY);
    return () => clearTimeout(timer);
  }, [s.phase, next]);

  useEffect(() => {
    if (s.phase === "over") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onExit();
      if (e.key === "Enter" && s.phase === "wrong" && !(e.target instanceof HTMLButtonElement)) return next();
      const i = Number(e.key) - 1;
      if (i >= 0 && i < 4) dispatch({ type: "answer", value: s.options[i] });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [s.phase, s.options, next, onExit]);

  if (s.phase === "over") {
    return (
      <GameOver
        scoreKey="problemas"
        score={s.correct}
        total={TOTAL}
        accent={PROBLEMS_STYLE.accent}
        onRestart={() => dispatch({ type: "restart" })}
        onExit={onExit}
      />
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between py-2">
        <button
          onClick={onExit}
          aria-label={t.backHome}
          className="flex size-11 items-center justify-center rounded-full bg-white/70 text-xl font-black text-ink-soft shadow-sm active:scale-95"
        >
          ✕
        </button>
        <span className="text-lg font-black tabular-nums text-ink-soft">
          {s.index + 1}/{TOTAL}
        </span>
        <div
          className={`${PROBLEMS_STYLE.card} min-w-11 rounded-full px-3 py-1.5 text-center text-xl font-black tabular-nums`}
          aria-label={t.points(s.correct)}
        >
          {s.correct}
        </div>
      </header>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/80">
        <div
          className={`h-full rounded-full ${PROBLEMS_STYLE.accent} transition-[width] duration-500`}
          style={{ width: `${((s.index + (feedback ? 1 : 0)) / TOTAL) * 100}%` }}
        />
      </div>

      <section className="flex flex-1 flex-col justify-center py-4">
        <div
          key={`p${s.index}`}
          className={`${PROBLEMS_STYLE.card} ${s.phase === "right" ? "anim-pop" : "anim-enter"} mb-6 rounded-[2rem] px-6 py-7 text-xl font-bold leading-snug sm:text-2xl`}
        >
          {problem[lang]}
        </div>

        <AnswerGrid
          key={`o${s.index}`}
          options={s.options}
          answer={problem.answer}
          picked={s.picked}
          feedback={feedback}
          onPick={(n) => dispatch({ type: "answer", value: n })}
        />

        <div className="mt-5 flex min-h-20 flex-col items-center justify-start gap-3">
          <p
            className={`text-lg font-extrabold transition-opacity ${feedback ? "opacity-100" : "opacity-0"}`}
            aria-live="polite"
          >
            {s.phase === "right" ? t.wellDone : s.phase === "wrong" ? t.was(problem.answer) : ""}
          </p>
          {s.phase === "wrong" && (
            <button
              onClick={next}
              autoFocus
              className={`${PROBLEMS_STYLE.accent} anim-enter w-full rounded-3xl py-4 text-2xl font-black text-ink shadow-[0_6px_0_rgba(74,68,88,0.12)] outline-none active:translate-y-1 active:shadow-none`}
            >
              {t.next}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
