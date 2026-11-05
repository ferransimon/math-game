"use client";

import { useSyncExternalStore } from "react";
import { MODES, PROBLEMS_STYLE } from "@/lib/modes";
import { BLOCK_SIZE, PROBLEMS } from "@/lib/problems";
import { LANGS } from "@/lib/i18n";
import { getBest, getProblemsProgress, type ScoreKey } from "@/lib/storage";
import { useLang } from "./LangProvider";

const noop = () => () => {};
const useStored = (read: () => number) => useSyncExternalStore(noop, read, () => 0);

const cardBase =
  "anim-enter flex flex-col items-center justify-center gap-2 rounded-[2rem] shadow-[0_6px_0_rgba(74,68,88,0.08)] transition-transform active:translate-y-1 active:shadow-none";
const subtitle = "text-sm font-semibold text-ink-soft";

function Best({ mode }: { mode: ScoreKey }) {
  const { t } = useLang();
  const best = useStored(() => getBest(mode));
  if (!best) return <span className={subtitle}>{t.letsPlay}</span>;
  return (
    <span className={subtitle}>
      {t.best} <span className="font-black text-ink">{best}</span>
    </span>
  );
}

function ProblemsStatus() {
  const { t } = useLang();
  const block = useStored(() => getProblemsProgress().block);
  const best = useStored(() => getBest("problemas"));
  if (block > 0)
    return <span className={subtitle}>{t.problemOf(block * BLOCK_SIZE + 1, PROBLEMS.length)}</span>;
  if (best > 0)
    return (
      <span className={subtitle}>
        {t.best} <span className="font-black text-ink">{best}/{PROBLEMS.length}</span>
      </span>
    );
  return <span className={subtitle}>{t.letsPlay}</span>;
}

function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t.language} className="flex rounded-full bg-white/80 p-1 shadow-sm">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 text-sm font-black uppercase transition-colors ${
            lang === l ? "bg-ink text-cream" : "text-ink-soft"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Home({ onPick }: { onPick: (m: ScoreKey) => void }) {
  const { t } = useLang();
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="flex justify-end py-2">
        <LangSwitch />
      </div>
      <h1 className="mb-1 text-center text-4xl font-black tracking-tight">Mates</h1>
      <p className="mb-6 text-center font-semibold text-ink-soft">{t.chooseGame}</p>
      <div className="grid flex-1 grid-cols-2 content-center gap-4">
        {MODES.map((m) => (
          <button key={m.id} onClick={() => onPick(m.id)} className={`${m.card} ${cardBase} aspect-square`}>
            <span
              className={`${m.accent} flex size-16 items-center justify-center rounded-full text-4xl font-black text-white`}
            >
              {m.symbol}
            </span>
            <span className="text-2xl font-black">{t.modes[m.id]}</span>
            <Best mode={m.id} />
          </button>
        ))}
        <button
          onClick={() => onPick("problemas")}
          className={`${PROBLEMS_STYLE.card} ${cardBase} col-span-2 flex-row gap-4 py-6`}
        >
          <span
            className={`${PROBLEMS_STYLE.accent} flex size-16 shrink-0 items-center justify-center rounded-full text-4xl font-black text-white`}
          >
            {PROBLEMS_STYLE.symbol}
          </span>
          <span className="flex flex-col items-start gap-1">
            <span className="text-2xl font-black">{t.modes.problemas}</span>
            <ProblemsStatus />
          </span>
        </button>
      </div>
    </main>
  );
}
