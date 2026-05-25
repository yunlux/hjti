import { ShieldAlert } from "lucide-react";

export function DisclaimerCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="glass-card border-cyan-300/15 p-4 text-sm leading-6 text-slate-300">
      <div className="flex items-start gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
        <p>
          {compact ? "HJTI 不是官方 MBTI，也不是临床心理评估。" : "该测试不是官方 MBTI，也不是临床心理评估。"}
          HJTI 只是一种用于自我理解、讨论和娱乐的人格类型模型，不应用于医疗、招聘、诊断或重大人生决策。
        </p>
      </div>
    </div>
  );
}
