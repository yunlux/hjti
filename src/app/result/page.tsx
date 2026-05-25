"use client";

import Link from "next/link";
import { Check, ClipboardCopy } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { BigFivePanel } from "@/components/BigFivePanel";
import { DisclaimerCard } from "@/components/DisclaimerCard";
import { FunctionBarChart } from "@/components/FunctionBarChart";
import { FunctionRadarChart } from "@/components/FunctionRadarChart";
import { LetterPreferenceBars } from "@/components/LetterPreferenceBars";
import { RestartButton } from "@/components/RestartButton";
import { ResultHeader } from "@/components/ResultHeader";
import { TypeRanking } from "@/components/TypeRanking";
import { questions } from "@/data/questions";
import { TYPE_DESCRIPTIONS } from "@/data/typeDescriptions";
import { buildResultCopy } from "@/lib/format";
import { generateResultSummary } from "@/lib/scoring";
import {
  getAnswersSnapshot,
  getServerAnswersSnapshot,
  subscribeStoredTestState,
} from "@/lib/storage";
import type { AnswerMap } from "@/lib/types";

export default function ResultPage() {
  const [copied, setCopied] = useState(false);
  const answersSnapshot = useSyncExternalStore(
    subscribeStoredTestState,
    getAnswersSnapshot,
    getServerAnswersSnapshot,
  );
  const answers = useMemo(() => JSON.parse(answersSnapshot) as AnswerMap, [answersSnapshot]);

  const answeredCount = useMemo(
    () => questions.filter((question) => Number.isInteger(answers[question.id])).length,
    [answers],
  );
  const result = useMemo(() => generateResultSummary(questions, answers), [answers]);
  const type = TYPE_DESCRIPTIONS[result.primaryType];

  async function copyResult() {
    await navigator.clipboard.writeText(buildResultCopy(result));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  if (answeredCount === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <section className="glass-card p-8 text-center">
          <h1 className="text-3xl font-semibold text-white">还没有可计算的答案</h1>
          <p className="mt-3 text-slate-400">请先完成至少一部分测试，结果会根据已答题目计算并显示完成度。</p>
          <Link href="/test" className="primary-button mt-6">
            开始测试
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ResultHeader result={result} />

      {result.completion < 80 ? (
        <div className="mt-4 rounded-lg border border-amber-300/25 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
          完成度低于 80%，当前结果的置信度较低。建议补答更多题目后再查看。
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <TypeRanking topTypes={result.topTypes} />
        <section className="glass-card p-5">
          <h2 className="section-title">类型解释</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">{type.summary}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-cyan-100">优势</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                {type.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-cyan-100">风险</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                {type.risks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-cyan-100">发展建议</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{type.growth}</p>
            </div>
          </div>
        </section>
      </div>

      <section className="glass-card mt-5 p-5">
        <h2 className="section-title">为什么是这个类型</h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
          {result.explanation.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <FunctionRadarChart scores={result.functionScores} />
        <FunctionBarChart ranking={result.functionRanking} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <LetterPreferenceBars letterScores={result.letterScores} />
        <BigFivePanel scores={result.bigFiveScores} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={copyResult} className="primary-button">
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <ClipboardCopy className="h-4 w-4" aria-hidden="true" />}
          {copied ? "已复制" : "复制结果摘要"}
        </button>
        <RestartButton />
      </div>

      <div className="mt-8">
        <DisclaimerCard />
      </div>
    </div>
  );
}
