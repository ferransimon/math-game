"use client";

import { useSyncExternalStore } from "react";
import { MODES } from "@/lib/modes";
import { getBest } from "@/lib/storage";
import type { Mode } from "@/lib/questions";

const noop = () => () => {};

function Best({ mode }: { mode: Mode }) {
  const best = useSyncExternalStore(noop, () => getBest(mode), () => 0);
  if (!best) return <span className="text-sm font-semibold text-ink-soft">¡A jugar!</span>;
  return (
    <span className="text-sm font-semibold text-ink-soft">
      Récord <span className="font-black text-ink">{best}</span>
    </span>
  );
}

export default function Home({ onPick }: { onPick: (m: Mode) => void }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))]">
      <h1 className="mb-1 text-center text-4xl font-black tracking-tight">Mates</h1>
      <p className="mb-8 text-center font-semibold text-ink-soft">Elige un juego</p>
      <div className="grid flex-1 grid-cols-2 content-center gap-4">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => onPick(m.id)}
            className={`${m.card} anim-enter flex aspect-square flex-col items-center justify-center gap-2 rounded-[2rem] shadow-[0_6px_0_rgba(74,68,88,0.08)] transition-transform active:translate-y-1 active:shadow-none`}
          >
            <span
              className={`${m.accent} flex size-16 items-center justify-center rounded-full text-4xl font-black text-white`}
            >
              {m.symbol}
            </span>
            <span className="text-2xl font-black">{m.label}</span>
            <Best mode={m.id} />
          </button>
        ))}
      </div>
    </main>
  );
}
