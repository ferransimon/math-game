"use client";

interface Props {
  options: number[];
  answer: number;
  picked: number | null;
  /** True once the question is answered (or timed out): shows right/wrong. */
  feedback: boolean;
  onPick: (n: number) => void;
}

export default function AnswerGrid({ options, answer, picked, feedback, onPick }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((n) => {
        const isAnswer = n === answer;
        const isPicked = n === picked;
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
            onClick={() => onPick(n)}
            disabled={feedback}
            className={`${style} ${anim} h-24 rounded-3xl text-5xl font-black tabular-nums transition-[background-color,opacity,transform] duration-150 active:translate-y-1 active:shadow-none disabled:cursor-default`}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
