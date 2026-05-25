import { TYPE_DESCRIPTIONS } from "@/data/typeDescriptions";
import type { TypeScore } from "@/lib/types";

export function TypeRanking({ topTypes }: { topTypes: TypeScore[] }) {
  return (
    <section className="glass-card p-5">
      <h2 className="section-title">Top 3 类型输出</h2>
      <div className="mt-4 space-y-3">
        {topTypes.map((entry, index) => {
          const type = TYPE_DESCRIPTIONS[entry.type];
          return (
            <div key={entry.type} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">
                    {index + 1}. {entry.type}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{type.nameZh}</p>
                </div>
                <p className="text-xl font-semibold text-cyan-100">{Math.round(entry.score)}%</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-cyan-300" style={{ width: `${Math.round(entry.score)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
