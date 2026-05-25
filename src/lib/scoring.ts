import { PROTOTYPES } from "@/data/prototypes";
import { MBTI_TYPES, STACKS } from "@/data/stacks";
import { TYPE_DESCRIPTIONS } from "@/data/typeDescriptions";
import type {
  AnswerMap,
  BigFiveKey,
  ConfidenceLabel,
  FunctionKey,
  HJTIResult,
  LetterScores,
  MBTIType,
  Question,
  TypeScore,
} from "@/lib/types";
import { clamp } from "@/lib/format";

const FUNCTION_KEYS: FunctionKey[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];
const BIG_FIVE_KEYS: BigFiveKey[] = ["O", "C", "E", "A", "N"];

type ScoredKey = FunctionKey | BigFiveKey;

interface Range {
  min: number;
  max: number;
}

export interface RawScores {
  functionRaw: Record<FunctionKey, number>;
  bigFiveRaw: Record<BigFiveKey, number>;
  functionRange: Record<FunctionKey, Range>;
  bigFiveRange: Record<BigFiveKey, Range>;
  answeredCount: number;
  totalQuestions: number;
  consistencyPenalty: number;
}

function emptyFunctionRecord(value = 0): Record<FunctionKey, number> {
  return { Ne: value, Ni: value, Se: value, Si: value, Te: value, Ti: value, Fe: value, Fi: value };
}

function emptyBigFiveRecord(value = 0): Record<BigFiveKey, number> {
  return { O: value, C: value, E: value, A: value, N: value };
}

function emptyFunctionRange(): Record<FunctionKey, Range> {
  return {
    Ne: { min: 0, max: 0 },
    Ni: { min: 0, max: 0 },
    Se: { min: 0, max: 0 },
    Si: { min: 0, max: 0 },
    Te: { min: 0, max: 0 },
    Ti: { min: 0, max: 0 },
    Fe: { min: 0, max: 0 },
    Fi: { min: 0, max: 0 },
  };
}

function emptyBigFiveRange(): Record<BigFiveKey, Range> {
  return {
    O: { min: 0, max: 0 },
    C: { min: 0, max: 0 },
    E: { min: 0, max: 0 },
    A: { min: 0, max: 0 },
    N: { min: 0, max: 0 },
  };
}

function isFunctionKey(key: ScoredKey): key is FunctionKey {
  return FUNCTION_KEYS.includes(key as FunctionKey);
}

function isBigFiveKey(key: ScoredKey): key is BigFiveKey {
  return BIG_FIVE_KEYS.includes(key as BigFiveKey);
}

function addContribution(
  key: ScoredKey,
  kind: "function" | "bigfive",
  value: number,
  functionRaw: Record<FunctionKey, number>,
  bigFiveRaw: Record<BigFiveKey, number>,
) {
  if (kind === "function" && isFunctionKey(key)) {
    functionRaw[key] += value;
  }

  if (kind === "bigfive" && isBigFiveKey(key)) {
    bigFiveRaw[key] += value;
  }
}

function addRange(
  key: ScoredKey,
  kind: "function" | "bigfive",
  min: number,
  max: number,
  functionRange: Record<FunctionKey, Range>,
  bigFiveRange: Record<BigFiveKey, Range>,
) {
  if (kind === "function" && isFunctionKey(key)) {
    functionRange[key].min += min;
    functionRange[key].max += max;
  }

  if (kind === "bigfive" && isBigFiveKey(key)) {
    bigFiveRange[key].min += min;
    bigFiveRange[key].max += max;
  }
}

function normalizeWithRange<T extends string>(raw: Record<T, number>, ranges: Record<T, Range>) {
  return Object.fromEntries(
    Object.entries(raw).map(([key, value]) => {
      const range = ranges[key as T];
      if (!range || range.max === range.min) return [key, 50];
      return [key, clamp(((Number(value) - range.min) / (range.max - range.min)) * 100)];
    }),
  ) as Record<T, number>;
}

function normalizeTypeScores(scores: TypeScore[]): TypeScore[] {
  const values = scores.map((item) => item.score);
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (max === min) {
    return scores.map((item) => ({ ...item, score: 50 }));
  }

  return scores
    .map((item) => ({ ...item, score: clamp(((item.score - min) / (max - min)) * 100) }))
    .sort((a, b) => b.score - a.score);
}

function pairPreference(left: string, right: string, leftScore: number, rightScore: number) {
  const safeLeft = Math.max(0, leftScore);
  const safeRight = Math.max(0, rightScore);
  const total = safeLeft + safeRight || 1;
  const leftPercent = (safeLeft / total) * 100;
  const rightPercent = (safeRight / total) * 100;
  const winner = leftPercent >= rightPercent ? left : right;

  return {
    left,
    right,
    leftScore: safeLeft,
    rightScore: safeRight,
    leftPercent,
    rightPercent,
    winner,
    strength: Math.abs(leftPercent - rightPercent),
  };
}

function downgradeConfidence(label: ConfidenceLabel): ConfidenceLabel {
  if (label === "高") return "中高";
  if (label === "中高") return "中";
  return "低";
}

export function calculateRawScores(questions: Question[], answers: AnswerMap): RawScores {
  const functionRaw = emptyFunctionRecord();
  const bigFiveRaw = emptyBigFiveRecord();
  const functionRange = emptyFunctionRange();
  const bigFiveRange = emptyBigFiveRange();
  const contributionsByKey: Partial<Record<FunctionKey, number[]>> = {};
  let answeredCount = 0;

  for (const question of questions) {
    const answer = answers[question.id];
    const hasAnswer = Number.isInteger(answer) && answer >= 1 && answer <= 5;

    if (question.kind === "likert" && question.target) {
      const weight = question.target.weight ?? 1;
      const possible = [1, 2, 3, 4, 5].map((candidate) => (candidate - 3) * question.target!.polarity * weight);
      addRange(
        question.target.key,
        question.target.kind,
        Math.min(...possible),
        Math.max(...possible),
        functionRange,
        bigFiveRange,
      );

      if (hasAnswer) {
        answeredCount += 1;
        const contribution = (answer - 3) * question.target.polarity * weight;
        addContribution(question.target.key, question.target.kind, contribution, functionRaw, bigFiveRaw);

        if (question.target.kind === "function" && isFunctionKey(question.target.key)) {
          contributionsByKey[question.target.key] = [...(contributionsByKey[question.target.key] ?? []), contribution];
        }
      }
    }

    if (question.kind === "bipolar" && question.left && question.right) {
      const leftWeight = question.left.weight ?? 1;
      const rightWeight = question.right.weight ?? 1;
      addRange(question.left.key, question.left.kind, -2 * leftWeight, 2 * leftWeight, functionRange, bigFiveRange);
      addRange(question.right.key, question.right.kind, -2 * rightWeight, 2 * rightWeight, functionRange, bigFiveRange);

      if (hasAnswer) {
        answeredCount += 1;
        const leftContribution = (3 - answer) * leftWeight;
        const rightContribution = (answer - 3) * rightWeight;
        addContribution(question.left.key, question.left.kind, leftContribution, functionRaw, bigFiveRaw);
        addContribution(question.right.key, question.right.kind, rightContribution, functionRaw, bigFiveRaw);

        if (question.left.kind === "function" && isFunctionKey(question.left.key)) {
          contributionsByKey[question.left.key] = [...(contributionsByKey[question.left.key] ?? []), leftContribution];
        }

        if (question.right.kind === "function" && isFunctionKey(question.right.key)) {
          contributionsByKey[question.right.key] = [...(contributionsByKey[question.right.key] ?? []), rightContribution];
        }
      }
    }
  }

  const conflictSignals = FUNCTION_KEYS.map((key) => {
    const values = contributionsByKey[key] ?? [];
    const strongValues = values.filter((value) => Math.abs(value) >= 1);
    if (strongValues.length < 3) return 0;

    const mean = strongValues.reduce((sum, value) => sum + value, 0) / strongValues.length;
    const absoluteMean = strongValues.reduce((sum, value) => sum + Math.abs(value), 0) / strongValues.length;
    return absoluteMean === 0 ? 0 : clamp((1 - Math.abs(mean) / absoluteMean) * 100) / 100;
  });

  const consistencyPenalty = conflictSignals.reduce((sum, value) => sum + value, 0) / conflictSignals.length;

  return {
    functionRaw,
    bigFiveRaw,
    functionRange,
    bigFiveRange,
    answeredCount,
    totalQuestions: questions.length,
    consistencyPenalty,
  };
}

export function normalizeFunctionScores(rawScores: RawScores) {
  return normalizeWithRange(rawScores.functionRaw, rawScores.functionRange);
}

export function normalizeBigFiveScores(rawScores: RawScores) {
  return normalizeWithRange(rawScores.bigFiveRaw, rawScores.bigFiveRange);
}

export function calculateLetterScores(
  functionScores: Record<FunctionKey, number>,
  bigFiveScores: Record<BigFiveKey, number>,
): LetterScores {
  const adjustment = (value: number) => (value - 50) * 0.12;

  const eAdjust = adjustment(bigFiveScores.E);
  const oAdjust = adjustment(bigFiveScores.O);
  const cAdjust = adjustment(bigFiveScores.C);
  const aAdjust = adjustment(bigFiveScores.A);

  const e = functionScores.Ne + functionScores.Se + functionScores.Te + functionScores.Fe + eAdjust;
  const i = functionScores.Ni + functionScores.Si + functionScores.Ti + functionScores.Fi - eAdjust;
  const n = functionScores.Ne + functionScores.Ni + oAdjust;
  const s = functionScores.Se + functionScores.Si - oAdjust;
  const t = functionScores.Te + functionScores.Ti - aAdjust;
  const f = functionScores.Fe + functionScores.Fi + aAdjust;
  const j = functionScores.Te + functionScores.Fe + cAdjust;
  const p = functionScores.Ne + functionScores.Se - cAdjust;

  const EI = pairPreference("E", "I", e, i);
  const NS = pairPreference("N", "S", n, s);
  const TF = pairPreference("T", "F", t, f);
  const JP = pairPreference("J", "P", j, p);
  const type = `${EI.winner}${NS.winner}${TF.winner}${JP.winner}` as MBTIType;

  return { EI, NS, TF, JP, type };
}

export function calculateStackScores(functionScores: Record<FunctionKey, number>): TypeScore[] {
  const raw = MBTI_TYPES.map((type) => {
    const [dominant, auxiliary, tertiary, inferior] = STACKS[type];
    const score =
      4 * functionScores[dominant] +
      3 * functionScores[auxiliary] +
      1 * functionScores[tertiary] -
      2 * functionScores[inferior];

    return { type, score };
  });

  return normalizeTypeScores(raw);
}

function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, value, index) => sum + value * b[index], 0);
  const normA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
  const normB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));
  if (normA === 0 || normB === 0) return 0;
  return dot / (normA * normB);
}

export function calculatePrototypeScores(functionScores: Record<FunctionKey, number>): TypeScore[] {
  const userVector = FUNCTION_KEYS.map((key) => functionScores[key]);

  return MBTI_TYPES.map((type) => {
    const prototypeVector = FUNCTION_KEYS.map((key) => PROTOTYPES[type][key]);
    return { type, score: clamp(cosineSimilarity(userVector, prototypeVector) * 100) };
  }).sort((a, b) => b.score - a.score);
}

function getLetterCompatibility(type: MBTIType, letterScores: LetterScores) {
  const scores = [
    type[0] === "E" ? letterScores.EI.leftPercent : letterScores.EI.rightPercent,
    type[1] === "N" ? letterScores.NS.leftPercent : letterScores.NS.rightPercent,
    type[2] === "T" ? letterScores.TF.leftPercent : letterScores.TF.rightPercent,
    type[3] === "J" ? letterScores.JP.leftPercent : letterScores.JP.rightPercent,
  ];

  return scores.reduce((sum, value) => sum + value, 0) / scores.length;
}

function getBigFivePrior(type: MBTIType, bigFiveScores: Record<BigFiveKey, number>) {
  const values = [
    type[0] === "E" ? bigFiveScores.E : 100 - bigFiveScores.E,
    type[1] === "N" ? bigFiveScores.O : 100 - bigFiveScores.O,
    type[2] === "F" ? bigFiveScores.A : 100 - bigFiveScores.A,
    type[3] === "J" ? bigFiveScores.C : 100 - bigFiveScores.C,
  ];

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function calculateFinalTypeScores(
  prototypeScores: TypeScore[],
  stackScores: TypeScore[],
  letterScores: LetterScores,
  bigFiveScores: Record<BigFiveKey, number>,
): TypeScore[] {
  const prototypeMap = Object.fromEntries(prototypeScores.map((entry) => [entry.type, entry.score])) as Record<MBTIType, number>;
  const stackMap = Object.fromEntries(stackScores.map((entry) => [entry.type, entry.score])) as Record<MBTIType, number>;

  return MBTI_TYPES.map((type) => {
    const letterCompatibilityScore = getLetterCompatibility(type, letterScores);
    const bigFivePrior = getBigFivePrior(type, bigFiveScores);
    const score =
      0.4 * prototypeMap[type] +
      0.3 * stackMap[type] +
      0.2 * letterCompatibilityScore +
      0.1 * bigFivePrior;

    return { type, score: clamp(score) };
  }).sort((a, b) => b.score - a.score);
}

export function calculateConfidence(finalScores: TypeScore[], completion: number, consistencyPenalty = 0): ConfidenceLabel {
  const gap = (finalScores[0]?.score ?? 0) - (finalScores[1]?.score ?? 0);
  let label: ConfidenceLabel;

  if (completion < 90) label = "低";
  else if (gap < 3) label = "低";
  else if (gap < 7) label = "中";
  else if (gap < 12) label = "中高";
  else label = "高";

  if (completion < 80) return "低";
  if (completion < 95) label = downgradeConfidence(label);
  if (consistencyPenalty > 0.45) return "低";
  if (consistencyPenalty > 0.3) label = downgradeConfidence(label);

  return label;
}

function explainResult(
  topTypes: TypeScore[],
  functionRanking: Array<{ key: FunctionKey; score: number }>,
  letterScores: LetterScores,
  bigFiveScores: Record<BigFiveKey, number>,
) {
  const primary = topTypes[0];
  const secondary = topTypes[1];
  const typeDescription = TYPE_DESCRIPTIONS[primary.type];
  const [firstFunction, secondFunction] = functionRanking;
  const gap = primary.score - secondary.score;
  const stack = typeDescription.stack;

  const lines = [
    `你的最高候选是 ${primary.type}，核心功能栈为 ${stack.join(" - ")}。${typeDescription.summary}`,
    `八维排序中 ${firstFunction.key} 与 ${secondFunction.key} 较高，说明你更常从这两类认知偏好进入问题。`,
    `四字母直接算法目前给出 ${letterScores.type}，其中 ${letterScores.EI.winner}/${letterScores.NS.winner}/${letterScores.TF.winner}/${letterScores.JP.winner} 的倾向共同参与了最终融合。`,
  ];

  if (gap < 7) {
    lines.push(`第一候选 ${primary.type} 和第二候选 ${secondary.type} 差距较小，建议结合八维排序理解边界，而不是只看四字母标签。`);
  } else {
    lines.push(`${primary.type} 与第二候选 ${secondary.type} 的差距相对明显，说明多套算法在主类型上较为一致。`);
  }

  if (firstFunction.key === "Ti" && secondFunction.key === "Ne") {
    lines.push("你的结果显示 Ti 与 Ne 明显偏高，说明你更倾向于先建立内在逻辑模型，再探索不同可能性。");
  } else if (firstFunction.key === "Fi" && secondFunction.key === "Ne") {
    lines.push("你的 Fi 与 Ne 排名靠前，通常意味着个人价值感会引导你寻找更有意义的新可能。");
  } else if (firstFunction.key === "Ni" && secondFunction.key === "Te") {
    lines.push("你的 Ni 与 Te 排名靠前，显示出先判断长期方向、再推动结构化执行的倾向。");
  } else if (firstFunction.key === "Fe" && secondFunction.key === "Si") {
    lines.push("你的 Fe 与 Si 排名靠前，说明你可能很重视关系稳定、具体照顾和可预期的共同节奏。");
  }

  if (bigFiveScores.N > 65) {
    lines.push("Big Five 中情绪波动分偏高，结果解释时可以额外留意压力状态对答题的影响。");
  }

  return lines;
}

export function generateResultSummary(questions: Question[], answers: AnswerMap): HJTIResult {
  const rawScores = calculateRawScores(questions, answers);
  const functionScores = normalizeFunctionScores(rawScores);
  const bigFiveScores = normalizeBigFiveScores(rawScores);
  const letterScores = calculateLetterScores(functionScores, bigFiveScores);
  const stackScores = calculateStackScores(functionScores);
  const prototypeScores = calculatePrototypeScores(functionScores);
  const finalScores = calculateFinalTypeScores(prototypeScores, stackScores, letterScores, bigFiveScores);
  const completion = (rawScores.answeredCount / rawScores.totalQuestions) * 100;
  const confidence = calculateConfidence(finalScores, completion, rawScores.consistencyPenalty);
  const functionRanking = FUNCTION_KEYS.map((key) => ({ key, score: functionScores[key] })).sort((a, b) => b.score - a.score);
  const topTypes = finalScores.slice(0, 3);

  return {
    primaryType: finalScores[0].type,
    topTypes,
    confidence,
    completion,
    answeredCount: rawScores.answeredCount,
    totalQuestions: rawScores.totalQuestions,
    functionScores,
    bigFiveScores,
    functionRanking,
    letterScores,
    prototypeScores,
    stackScores,
    finalScores,
    explanation: explainResult(topTypes, functionRanking, letterScores, bigFiveScores),
  };
}
