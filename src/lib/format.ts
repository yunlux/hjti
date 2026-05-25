import { BIG_FIVE_DESCRIPTIONS, FUNCTION_DESCRIPTIONS } from "@/data/functionDescriptions";
import { TYPE_DESCRIPTIONS } from "@/data/typeDescriptions";
import type { BigFiveKey, FunctionKey, HJTIResult } from "@/lib/types";

export function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

export function roundScore(value: number) {
  return Math.round(value);
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function getFunctionLabel(key: FunctionKey) {
  return `${key} ${FUNCTION_DESCRIPTIONS[key].name}`;
}

export function getBigFiveLabel(key: BigFiveKey) {
  return `${key} ${BIG_FIVE_DESCRIPTIONS[key].name}`;
}

export function buildResultCopy(result: HJTIResult) {
  const type = TYPE_DESCRIPTIONS[result.primaryType];
  const top = result.topTypes.map((entry, index) => `${index + 1}. ${entry.type} ${Math.round(entry.score)}%`).join("\n");
  const functions = result.functionRanking.map((entry) => `${entry.key} ${Math.round(entry.score)}`).join(" / ");

  return [
    `HJTI-64 Preview 结果：${result.primaryType}`,
    `${type.nameZh} / ${type.nameEn}`,
    `置信度：${result.confidence}`,
    `完成度：${formatPercent(result.completion)}`,
    "",
    "Top 3 类型：",
    top,
    "",
    `八维排序：${functions}`,
    "",
    "该结果不是官方 MBTI，也不是临床心理评估，仅用于自我理解、讨论和娱乐。",
  ].join("\n");
}
