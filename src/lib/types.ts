export type FunctionKey = "Ne" | "Ni" | "Se" | "Si" | "Te" | "Ti" | "Fe" | "Fi";

export type BigFiveKey = "O" | "C" | "E" | "A" | "N";

export type MBTIType =
  | "INTJ"
  | "INFJ"
  | "ISTJ"
  | "ISFJ"
  | "INTP"
  | "INFP"
  | "ISTP"
  | "ISFP"
  | "ENTJ"
  | "ENFJ"
  | "ESTJ"
  | "ESFJ"
  | "ENTP"
  | "ENFP"
  | "ESTP"
  | "ESFP";

export type QuestionKind = "likert" | "bipolar";

export interface LikertTarget {
  kind: "function" | "bigfive";
  key: FunctionKey | BigFiveKey;
  polarity: 1 | -1;
  weight?: number;
}

export interface BipolarSide {
  label: string;
  kind: "function" | "bigfive";
  key: FunctionKey | BigFiveKey;
  weight?: number;
}

export interface Question {
  id: string;
  kind: QuestionKind;
  text: string;
  dimension?: string;
  target?: LikertTarget;
  left?: BipolarSide;
  right?: BipolarSide;
}

export interface AnswerMap {
  [questionId: string]: number;
}

export type ConfidenceLabel = "低" | "中" | "中高" | "高";

export interface TypeScore {
  type: MBTIType;
  score: number;
}

export interface PreferencePair {
  left: string;
  right: string;
  leftScore: number;
  rightScore: number;
  leftPercent: number;
  rightPercent: number;
  winner: string;
  strength: number;
}

export type LetterScores = {
  EI: PreferencePair;
  NS: PreferencePair;
  TF: PreferencePair;
  JP: PreferencePair;
  type: MBTIType;
};

export interface HJTIResult {
  primaryType: MBTIType;
  topTypes: TypeScore[];
  confidence: ConfidenceLabel;
  completion: number;
  answeredCount: number;
  totalQuestions: number;
  functionScores: Record<FunctionKey, number>;
  bigFiveScores: Record<BigFiveKey, number>;
  functionRanking: Array<{ key: FunctionKey; score: number }>;
  letterScores: LetterScores;
  prototypeScores: TypeScore[];
  stackScores: TypeScore[];
  finalScores: TypeScore[];
  explanation: string[];
}
