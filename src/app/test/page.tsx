"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BarChart3, RotateCcw } from "lucide-react";
import { useMemo, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";
import { questions } from "@/data/questions";
import type { AnswerMap } from "@/lib/types";
import {
  clearAnswers,
  getAnswersSnapshot,
  getCurrentIndexSnapshot,
  getServerAnswersSnapshot,
  getServerCurrentIndexSnapshot,
  saveAnswers,
  saveCurrentIndex,
  subscribeStoredTestState,
} from "@/lib/storage";

export default function TestPage() {
  const router = useRouter();
  const answersSnapshot = useSyncExternalStore(
    subscribeStoredTestState,
    getAnswersSnapshot,
    getServerAnswersSnapshot,
  );
  const currentIndexSnapshot = useSyncExternalStore(
    subscribeStoredTestState,
    getCurrentIndexSnapshot,
    getServerCurrentIndexSnapshot,
  );
  const answers = useMemo(() => JSON.parse(answersSnapshot) as AnswerMap, [answersSnapshot]);
  const parsedIndex = Number.parseInt(currentIndexSnapshot, 10);
  const currentIndex = Math.min(Number.isFinite(parsedIndex) ? parsedIndex : 0, questions.length - 1);

  const answeredCount = useMemo(
    () => questions.filter((question) => Number.isInteger(answers[question.id])).length,
    [answers],
  );
  const currentQuestion = questions[currentIndex];
  const answer = answers[currentQuestion.id];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const completion = (answeredCount / questions.length) * 100;

  function updateIndex(nextIndex: number) {
    const safeIndex = Math.min(Math.max(nextIndex, 0), questions.length - 1);
    saveCurrentIndex(safeIndex);
  }

  function handleAnswer(value: number) {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    saveAnswers(nextAnswers);
  }

  function restart() {
    if (!window.confirm("确定要清空当前答案并重新开始吗？")) return;
    clearAnswers();
    saveCurrentIndex(0);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <section className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-cyan-200">题目进度</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">
              {currentIndex + 1} / {questions.length}
            </h1>
          </div>
          <div className="text-sm text-slate-400">
            已答 {answeredCount} 题 · 完成度 {Math.round(completion)}%
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar value={progress} />
        </div>
        {answer === undefined ? <p className="mt-3 text-sm text-amber-200">你可以稍后回来补答，未答题会降低结果置信度。</p> : null}
      </section>

      <QuestionCard key={currentQuestion.id} question={currentQuestion} answer={answer} onAnswer={handleAnswer} />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => updateIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="secondary-button disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            上一题
          </button>
          <button
            type="button"
            onClick={() => updateIndex(currentIndex + 1)}
            disabled={currentIndex === questions.length - 1}
            className="secondary-button disabled:cursor-not-allowed disabled:opacity-40"
          >
            下一题
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={restart} className="secondary-button">
            重新开始
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => router.push("/result")} className="primary-button">
            查看结果
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-slate-500">
        想先了解算法？ <Link className="text-cyan-200 hover:text-cyan-100" href="/methodology">查看方法论</Link>
      </div>
    </div>
  );
}
