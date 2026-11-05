"use client";

import { useState } from "react";
import type { Mode } from "@/lib/questions";
import { LangProvider } from "./LangProvider";
import Home from "./Home";
import Game from "./Game";
import ProblemsGame from "./ProblemsGame";

type Screen = Mode | "problemas" | null;

export default function App() {
  const [screen, setScreen] = useState<Screen>(null);
  const exit = () => setScreen(null);
  return (
    <LangProvider>
      {screen === "problemas" ? (
        <ProblemsGame onExit={exit} />
      ) : screen ? (
        <Game key={screen} mode={screen} onExit={exit} />
      ) : (
        <Home onPick={setScreen} />
      )}
    </LangProvider>
  );
}
