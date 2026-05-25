import type { BigFiveKey, FunctionKey } from "@/lib/types";

export const FUNCTION_KEYS: FunctionKey[] = ["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"];

export const BIG_FIVE_KEYS: BigFiveKey[] = ["O", "C", "E", "A", "N"];

export const FUNCTION_DESCRIPTIONS: Record<FunctionKey, { name: string; summary: string }> = {
  Ne: { name: "外倾直觉", summary: "关注可能性、联想扩散、新奇路径与开放式探索。" },
  Ni: { name: "内倾直觉", summary: "关注模式收束、长期趋势、象征意义与核心洞察。" },
  Se: { name: "外倾感觉", summary: "关注当下现实、身体反应、即时行动与环境刺激。" },
  Si: { name: "内倾感觉", summary: "关注经验参照、细节记忆、稳定秩序与身体内感。" },
  Te: { name: "外倾思维", summary: "关注目标推进、外部标准、资源配置与系统执行。" },
  Ti: { name: "内倾思维", summary: "关注概念定义、原理拆解、分类建模与逻辑一致。" },
  Fe: { name: "外倾情感", summary: "关注群体气氛、关系协调、情绪反馈与社会表达。" },
  Fi: { name: "内倾情感", summary: "关注真实感、个人价值、身份边界与内在道德。" },
};

export const BIG_FIVE_DESCRIPTIONS: Record<BigFiveKey, { name: string; summary: string }> = {
  O: { name: "开放性", summary: "对想象、审美、新经验与复杂观念的开放程度。" },
  C: { name: "尽责性", summary: "计划、秩序、自律、责任感与持续执行的倾向。" },
  E: { name: "外向性", summary: "社交能量、表达欲、主动性与外部刺激需求。" },
  A: { name: "宜人性", summary: "合作、信任、体谅、温和与关系维护的倾向。" },
  N: { name: "神经质", summary: "压力敏感、情绪波动、担忧与不确定感受的强度。" },
};
