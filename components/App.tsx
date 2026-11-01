"use client";

import { useState } from "react";
import type { Mode } from "@/lib/questions";
import Home from "./Home";
import Game from "./Game";

export default function App() {
  const [mode, setMode] = useState<Mode | null>(null);
  return mode ? (
    <Game key={mode} mode={mode} onExit={() => setMode(null)} />
  ) : (
    <Home onPick={setMode} />
  );
}
