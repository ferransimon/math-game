// Sanity check for question generation.
// Run: npx esbuild scripts/check-questions.ts --bundle --platform=node --outfile=/tmp/check.cjs && node /tmp/check.cjs
import { makeQuestion, type Mode } from "../lib/questions";
import { maxNumber } from "../lib/difficulty";

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
console.log(failures ? `${failures} failures` : "all question checks passed");
process.exit(failures ? 1 : 0);
