import type { Question } from "@/lib/types";

const likertLabels = ["非常不像我", "不太像我", "一般", "比较像我", "非常像我"];
const bipolarLabels = ["明显更像 A", "稍微更像 A", "两者差不多", "稍微更像 B", "明显更像 B"];

export function OptionScale({
  question,
  value,
  onChange,
}: {
  question: Question;
  value?: number;
  onChange: (value: number) => void;
}) {
  const labels = question.kind === "likert" ? likertLabels : bipolarLabels;

  return (
    <div className="grid gap-2 sm:grid-cols-5">
      {[1, 2, 3, 4, 5].map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-16 rounded-lg border px-3 py-3 text-left text-sm transition sm:text-center ${
              selected
                ? "border-cyan-200 bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-950/25"
                : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-200/60 hover:bg-white/[0.08]"
            }`}
          >
            <span className="block text-base font-semibold">{option}</span>
            <span className="mt-1 block leading-5">{labels[option - 1]}</span>
          </button>
        );
      })}
    </div>
  );
}
