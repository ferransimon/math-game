import { maxNumber } from "./difficulty";

export type Mode = "sumas" | "restas" | "tablas" | "mezcla";
export type Op = "+" | "−" | "×";

export interface Question {
  a: number;
  b: number;
  op: Op;
  answer: number;
  options: number[];
}

const rand = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeOperands(op: Op, correct: number): [number, number, number] {
  if (op === "×") {
    const a = rand(1, 10);
    const b = rand(1, 10);
    return [a, b, a * b];
  }
  const max = maxNumber(correct);
  if (op === "+") {
    const c = rand(2, max);
    const a = rand(1, c - 1);
    return [a, c - a, c];
  }
  const a = rand(2, max);
  const b = rand(1, a);
  return [a, b, a - b];
}

function distractors(op: Op, a: number, b: number, answer: number): number[] {
  const candidates = new Set<number>();
  const deltas = shuffle([1, -1, 2, -2, 3, -3, 10, -10]);
  if (op === "×") {
    candidates.add(a * (b + 1));
    if (b > 1) candidates.add(a * (b - 1));
    candidates.add((a + 1) * b);
    if (a > 1) candidates.add((a - 1) * b);
  }
  for (const d of deltas) candidates.add(answer + d);
  candidates.delete(answer);
  const valid = shuffle([...candidates].filter((n) => n >= 0));
  // Prefer multiplication-table neighbours first when present.
  const picked = valid.slice(0, 3);
  let extra = answer + 4;
  while (picked.length < 3) {
    if (!picked.includes(extra) && extra !== answer) picked.push(extra);
    extra++;
  }
  return picked;
}

const OPS_BY_MODE: Record<Mode, Op[]> = {
  sumas: ["+"],
  restas: ["−"],
  tablas: ["×"],
  mezcla: ["+", "−", "×"],
};

export function makeQuestion(
  mode: Mode,
  correct: number,
  prev?: Question,
): Question {
  const ops = OPS_BY_MODE[mode];
  for (let tries = 0; ; tries++) {
    const op = ops[rand(0, ops.length - 1)];
    const [a, b, answer] = makeOperands(op, correct);
    if (tries < 10 && prev && prev.a === a && prev.b === b && prev.op === op)
      continue;
    const options = shuffle([answer, ...distractors(op, a, b, answer)]);
    return { a, b, op, answer, options };
  }
}
