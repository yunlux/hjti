import { TYPE_DESCRIPTIONS } from "@/data/typeDescriptions";
import type { HJTIResult } from "@/lib/types";
import { formatPercent } from "@/lib/format";

export function ResultHeader({ result }: { result: HJTIResult }) {
  const type = TYPE_DESCRIPTIONS[result.primaryType];

  return (
    <section className="glass-card p-6 sm:p-8">
      <p className="text-sm font-medium text-cyan-200">你的 HJTI 结果</p>
      <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-5xl font-semibold text-white">{result.primaryType}</h1>
          <p className="mt-2 text-lg text-slate-300">
            {type.nameZh} / {type.nameEn}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-slate-400">置信度</p>
            <p className="mt-1 text-2xl font-semibold text-cyan-100">{result.confidence}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-slate-400">完成度</p>
            <p className="mt-1 text-2xl font-semibold text-cyan-100">{formatPercent(result.completion)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
