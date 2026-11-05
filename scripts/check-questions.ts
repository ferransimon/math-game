// Sanity check for question generation.
// Run: npx esbuild scripts/check-questions.ts --bundle --platform=node --outfile=/tmp/check.cjs && node /tmp/check.cjs
import { makeQuestion, type Mode } from "../lib/questions";
import { maxNumber } from "../lib/difficulty";
import { PROBLEMS } from "../lib/problems";

let failures = 0;
const fail = (msg: string) => { failures++; if (failures < 20) console.error(msg); };

for (const mode of ["sumas", "restas", "tablas", "mezcla"] as Mode[]) {
  for (let correct = 0; correct < 40; correct++) {
    for (let i = 0; i < 300; i++) {
      const q = makeQuestion(mode, correct);
      const tag = `${mode} c=${correct} ${q.a}${q.op}${q.b}=${q.answer} [${q.options}]`;
      if (q.options.length !== 4) fail(`len ${tag}`);
      if (new Set(q.options).size !== 4) fail(`dupes ${tag}`);
      if (q.options.filter((o) => o === q.answer).length !== 1) fail(`answer ${tag}`);
      if (q.options.some((o) => o < 0 || !Number.isInteger(o))) fail(`neg ${tag}`);
      const expected = q.op === "+" ? q.a + q.b : q.op === "−" ? q.a - q.b : q.a * q.b;
      if (expected !== q.answer) fail(`math ${tag}`);
      if (q.op === "×" && (q.a < 1 || q.a > 10 || q.b < 1 || q.b > 10)) fail(`table ${tag}`);
      if (q.op === "+" && q.answer > maxNumber(correct)) fail(`range ${tag}`);
      if (q.op === "−" && q.a > maxNumber(correct)) fail(`range ${tag}`);
      if (mode !== "mezcla" && q.op !== { sumas: "+", restas: "−", tablas: "×" }[mode]) fail(`op ${tag}`);
    }
  }
}
if (PROBLEMS.length !== 50) fail(`expected 50 problems, got ${PROBLEMS.length}`);
PROBLEMS.forEach((p, i) => {
  const tag = `problem ${i + 1} (${p.expr})`;
  if (!p.es.trim() || !p.ca.trim()) fail(`missing text ${tag}`);
  if (!/^[\d+\-*/() ]+$/.test(p.expr)) fail(`bad expr ${tag}`);
  const value = Function(`return (${p.expr})`)() as number;
  if (value !== p.answer) fail(`answer ${p.answer} != ${value} ${tag}`);
  if (!Number.isInteger(p.answer) || p.answer < 0) fail(`answer not natural ${tag}`);
  const opts = [p.answer, ...p.wrong];
  if (new Set(opts).size !== 4) fail(`dupe options ${tag}`);
  if (opts.some((o) => !Number.isInteger(o) || o < 0)) fail(`bad option ${tag}`);
  // Both translations must mention the same numbers.
  const nums = (txt: string) => (txt.match(/\d+/g) ?? []).map(Number).sort((a, b) => a - b).join(",");
  if (nums(p.es) !== nums(p.ca)) fail(`es/ca numbers differ ${tag}`);
});

console.log(failures ? `${failures} failures` : "all question checks passed");
process.exit(failures ? 1 : 0);
