import type { LetterScores, PreferencePair } from "@/lib/types";

function PreferenceBar({ pair, label }: { pair: PreferencePair; label: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-200">{label}</span>
        <span className="text-cyan-200">
          {pair.winner} · {Math.round(pair.strength)}%
        </span>
      </div>
      <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-slate-800">
        <div className="bg-cyan-300" style={{ width: `${pair.leftPercent}%` }} />
        <div className="bg-emerald-300" style={{ width: `${pair.rightPercent}%` }} />
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>
          {pair.left} {Math.round(pair.leftPercent)}%
        </span>
        <span>
          {pair.right} {Math.round(pair.rightPercent)}%
        </span>
      </div>
    </div>
  );
}

export function LetterPreferenceBars({ letterScores }: { letterScores: LetterScores }) {
  return (
    <section className="glass-card p-5">
      <h2 className="section-title">四字母倾向</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <PreferenceBar pair={letterScores.EI} label="E / I" />
        <PreferenceBar pair={letterScores.NS} label="N / S" />
        <PreferenceBar pair={letterScores.TF} label="T / F" />
        <PreferenceBar pair={letterScores.JP} label="J / P" />
      </div>
    </section>
  );
}
