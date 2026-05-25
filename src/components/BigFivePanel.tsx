import { BIG_FIVE_DESCRIPTIONS, BIG_FIVE_KEYS } from "@/data/functionDescriptions";
import type { BigFiveKey } from "@/lib/types";

export function BigFivePanel({ scores }: { scores: Record<BigFiveKey, number> }) {
  return (
    <section className="glass-card p-5">
      <h2 className="section-title">Big Five 辅助分数</h2>
      <div className="mt-4 space-y-4">
        {BIG_FIVE_KEYS.map((key) => (
          <div key={key}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-slate-200">
                {key} · {BIG_FIVE_DESCRIPTIONS[key].name}
              </span>
              <span className="text-cyan-200">{Math.round(scores[key])}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-emerald-300" style={{ width: `${Math.round(scores[key])}%` }} />
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-500">{BIG_FIVE_DESCRIPTIONS[key].summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
