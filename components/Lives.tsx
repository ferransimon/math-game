export default function Lives({ lives, max }: { lives: number; max: number }) {
  return (
    <div className="flex gap-1.5" aria-label={`${lives} vidas`}>
      {Array.from({ length: max }, (_, i) => {
        const alive = i < lives;
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={`size-8 transition-all duration-300 ${alive ? "" : "scale-75 opacity-60"}`}
            aria-hidden
          >
            <path
              d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3.1 4.5 6.8 4.5c2.1 0 3.6 1.1 5.2 3 1.6-1.9 3.1-3 5.2-3 3.7 0 5.9 3.7 4.4 7.2C19.5 16.4 12 21 12 21z"
              fill={alive ? "var(--color-heart)" : "#e8e3ec"}
            />
          </svg>
        );
      })}
    </div>
  );
}
