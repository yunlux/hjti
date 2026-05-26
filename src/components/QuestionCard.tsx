import type { Question } from "@/lib/types";
import { OptionScale } from "@/components/OptionScale";

export function QuestionCard({
  question,
  answer,
  onAnswer,
}: {
  question: Question;
  answer?: number;
  onAnswer: (value: number) => void;
}) {
  return (
    <article className="glass-card p-5 sm:p-7">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold leading-snug text-white">{question.text}</h1>
      </div>

      {question.kind === "bipolar" && question.left && question.right ? (
        <div className="mb-5 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <span className="font-semibold text-cyan-200">A</span> {question.left.label}
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <span className="font-semibold text-emerald-200">B</span> {question.right.label}
          </div>
        </div>
      ) : null}

      <OptionScale question={question} value={answer} onChange={onAnswer} />
    </article>
  );
}
