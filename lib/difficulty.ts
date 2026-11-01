/** Numeric ceiling for additions/subtractions, growing with correct answers. */
export function maxNumber(correct: number): number {
  if (correct >= 20) return 100;
  if (correct >= 12) return 50;
  if (correct >= 5) return 20;
  return 10;
}

/** Seconds allowed per question: starts at 15, drops 0.5 per hit, floor 6. */
export function timeLimit(correct: number): number {
  return Math.max(6, 15 - correct * 0.5);
}
