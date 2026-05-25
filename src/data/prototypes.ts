import type { FunctionKey, MBTIType } from "@/lib/types";

export const PROTOTYPES: Record<MBTIType, Record<FunctionKey, number>> = {
  INTJ: { Ni: 100, Te: 86, Fi: 58, Se: 28, Ne: 54, Ti: 52, Fe: 36, Si: 44 },
  INFJ: { Ni: 100, Fe: 86, Ti: 58, Se: 28, Ne: 52, Fi: 54, Te: 34, Si: 44 },
  ISTJ: { Si: 100, Te: 86, Fi: 58, Ne: 28, Ni: 50, Ti: 50, Fe: 38, Se: 46 },
  ISFJ: { Si: 100, Fe: 86, Ti: 58, Ne: 28, Ni: 50, Fi: 56, Te: 34, Se: 46 },

  INTP: { Ti: 100, Ne: 86, Si: 58, Fe: 28, Ni: 56, Te: 45, Fi: 44, Se: 32 },
  INFP: { Fi: 100, Ne: 86, Si: 58, Te: 28, Ni: 54, Fe: 46, Ti: 44, Se: 34 },
  ISTP: { Ti: 100, Se: 86, Ni: 58, Fe: 28, Si: 48, Te: 52, Fi: 40, Ne: 34 },
  ISFP: { Fi: 100, Se: 86, Ni: 58, Te: 28, Si: 48, Fe: 50, Ti: 40, Ne: 34 },

  ENTJ: { Te: 100, Ni: 86, Se: 58, Fi: 28, Ne: 52, Ti: 54, Fe: 38, Si: 42 },
  ENFJ: { Fe: 100, Ni: 86, Se: 58, Ti: 28, Ne: 52, Fi: 54, Te: 40, Si: 42 },
  ESTJ: { Te: 100, Si: 86, Ne: 58, Fi: 28, Se: 54, Ti: 52, Fe: 42, Ni: 38 },
  ESFJ: { Fe: 100, Si: 86, Ne: 58, Ti: 28, Se: 52, Fi: 56, Te: 38, Ni: 38 },

  ENTP: { Ne: 100, Ti: 86, Fe: 58, Si: 28, Ni: 56, Te: 48, Fi: 38, Se: 46 },
  ENFP: { Ne: 100, Fi: 86, Te: 58, Si: 28, Ni: 54, Fe: 52, Ti: 38, Se: 46 },
  ESTP: { Se: 100, Ti: 86, Fe: 58, Ni: 28, Ne: 52, Te: 50, Fi: 38, Si: 46 },
  ESFP: { Se: 100, Fi: 86, Te: 58, Ni: 28, Ne: 52, Fe: 54, Ti: 38, Si: 46 },
};
