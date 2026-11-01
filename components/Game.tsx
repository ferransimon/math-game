"use client";

import { useEffect, useReducer } from "react";
import { makeQuestion, type Mode, type Question } from "@/lib/questions";
import { timeLimit } from "@/lib/difficulty";
import { MODES } from "@/lib/modes";
import Lives from "./Lives";
import GameOver from "./GameOver";

const MAX_LIVES = 3;
const RIGHT_DELAY = 600;
const WRONG_DELAY = 1300;

type Phase = "ask" | "right" | "wrong" | "over";

interface State {
  mode: Mode;
  correct: number;
  lives: number;
  q: Question;
  qid: number;
  phase: Phase;
  picked: number | null;
  /** Seconds for the current question, frozen when it is shown. */
  seconds: number;
}

type Action =
  | { type: "answer"; value: number }
  | { type: "timeout" }
  | { type: "next" }
  | { type: "restart" };

function init(mode: Mode): State {
  return {
    mode,
    correct: 0,
    lives: MAX_LIVES,
    q: makeQuestion(mode, 0),
    qid: 0,
    phase: "ask",
    picked: null,
    seconds: timeLimit(0),
  };
}

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "answer":
      if (s.phase !== "ask") return s;
      return a.value === s.q.answer
        ? { ...s, phase: "right", picked: a.value, correct: s.correct + 1 }
        : { ...s, phase: "wrong", picked: a.value, lives: s.lives - 1 };
    case "timeout":
      if (s.phase !== "ask") return s;
      return { ...s, phase: "wrong", picked: null, lives: s.lives - 1 };
    case "next":
      if (s.lives <= 0) return { ...s, phase: "over" };
      return {
        ...s,
        q: makeQuestion(s.mode, s.correct, s.q),
        qid: s.qid + 1,
        phase: "ask",
        picked: null,
        seconds: timeLimit(s.correct),
      };
    case "restart":
      return { ...init(s.mode), qid: s.qid + 1 };
  }
}

export default function Game({ mode, onExit }: { mode: Mode; onExit: () => void }) {
  const [s, dispatch] = useReducer(reducer, mode, init);
  const info = MODES.find((m) => m.id === mode)!;

  // Question timer and feedback delays.
  useEffect(() => {
    if (s.phase === "ask") {
      const t = setTimeout(() => dispatch({ type: "timeout" }), s.seconds * 1000);
      return () => clearTimeout(t);
    }
    if (s.phase === "right" || s.phase === "wrong") {
      const t = setTimeout(
        () => dispatch({ type: "next" }),
        s.phase === "right" ? RIGHT_DELAY : WRONG_DELAY,
      );
      return () => clearTimeout(t);
    }
  }, [s.phase, s.qid, s.seconds]);

  // Keyboard: 1-4 answer, Esc exits.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onExit();
      const i = Number(e.key) - 1;
      if (i >= 0 && i < 4) dispatch({ type: "answer", value: s.q.options[i] });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [s.q, onExit]);

  if (s.phase === "over") {
    return (
      <GameOver
        mode={mode}
        score={s.correct}
        accent={info.accent}
        onRestart={() => dispatch({ type: "restart" })}
        onExit={onExit}
      />
    );
  }

  const { q } = s;
  const feedback = s.phase !== "ask";

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between py-2">
        <button
          onClick={onExit}
          aria-label="Volver al inicio"
          className="flex size-11 items-center justify-center rounded-full bg-white/70 text-xl font-black text-ink-soft shadow-sm active:scale-95"
        >
          ✕
        </button>
        <Lives lives={s.lives} max={MAX_LIVES} />
        <div
          className={`${info.card} min-w-11 rounded-full px-3 py-1.5 text-center text-xl font-black tabular-nums`}
          aria-label={`Puntos: ${s.correct}`}
        >
          {s.correct}
        </div>
      </header>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/80">
        <div
          key={s.qid}
          className={`timer-bar h-full rounded-full ${info.accent}`}
          style={{
            animationDuration: `${s.seconds}s`,
            animationPlayState: feedback ? "paused" : "running",
          }}
        />
      </div>

      <section className="flex flex-1 flex-col justify-center">
        <div
          key={`q${s.qid}`}
          className={`${info.card} ${s.phase === "right" ? "anim-pop" : "anim-enter"} mb-8 rounded-[2rem] py-10 text-center text-6xl font-black tabular-nums tracking-tight`}
        >
          {q.a} {q.op} {q.b}
        </div>

        <div key={`o${s.qid}`} className="grid grid-cols-2 gap-4">
          {q.options.map((n) => {
            const isAnswer = n === q.answer;
            const isPicked = n === s.picked;
            let style = "bg-white shadow-[0_5px_0_rgba(74,68,88,0.08)]";
            let anim = "";
            if (feedback) {
              if (isAnswer) {
                style = "bg-good";
                if (isPicked) anim = "anim-pop";
              } else if (isPicked) {
                style = "bg-bad";
                anim = "anim-shake";
              } else style = "bg-white opacity-40";
            }
            return (
              <button
                key={n}
                onClick={() => dispatch({ type: "answer", value: n })}
                disabled={feedback}
                className={`${style} ${anim} h-24 rounded-3xl text-5xl font-black tabular-nums transition-[background-color,opacity,transform] duration-150 active:translate-y-1 active:shadow-none disabled:cursor-default`}
              >
                {n}
              </button>
            );
          })}
        </div>

        <p
          className={`mt-6 h-7 text-center text-lg font-extrabold ${feedback ? "opacity-100" : "opacity-0"} transition-opacity`}
          aria-live="polite"
        >
          {s.phase === "right"
            ? "¡Muy bien!"
            : s.phase === "wrong"
              ? s.picked === null
                ? `¡Tiempo! Era ${q.answer}`
                : `Era ${q.answer}`
              : ""}
        </p>
      </section>
    </main>
  );
}
