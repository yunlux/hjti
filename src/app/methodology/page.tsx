import { BrainCircuit, GitMerge, Scale, ShieldAlert } from "lucide-react";
import { DisclaimerCard } from "@/components/DisclaimerCard";

const functionGroups = [
  { key: "Ne / Ni", text: "外倾直觉偏向可能性扩散，内倾直觉偏向模式收束和长期图景。" },
  { key: "Se / Si", text: "外倾感觉偏向当下体验和现场行动，内倾感觉偏向经验参照和稳定秩序。" },
  { key: "Te / Ti", text: "外倾思维偏向外部标准和执行效率，内倾思维偏向定义、原理和逻辑一致。" },
  { key: "Fe / Fi", text: "外倾情感偏向关系氛围和社会表达，内倾情感偏向真实感、价值和边界。" },
];

const algorithms = [
  {
    title: "四字母直接算法",
    text: "把八维分数合并为 E/I、N/S、T/F、J/P 四组倾向，并用 Big Five 做不超过 15% 的弱校准。",
  },
  {
    title: "功能栈算法",
    text: "按 16 型功能栈给主导、辅助、第三和劣势功能不同权重，评估八维排序是否贴近某一类型结构。",
  },
  {
    title: "原型相似度算法",
    text: "为每个类型建立八维原型向量，用 cosine similarity 计算用户画像与类型原型的接近程度。",
  },
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <section>
        <h1 className="text-4xl font-semibold text-white">HJTI 方法论</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          HJTI 是一个混合人格类型模型：它以荣格八维为核心，结合 MBTI 式四字母推断、多算法类型排序，以及 Big Five
          的弱校准层。它不是临床诊断，也不是官方 MBTI。
        </p>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {functionGroups.map((item) => (
          <article key={item.key} className="glass-card p-5">
            <BrainCircuit className="h-6 w-6 text-cyan-200" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-white">{item.key}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-white">三套算法</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {algorithms.map((item) => (
            <article key={item.title} className="glass-card p-5">
              <GitMerge className="h-6 w-6 text-emerald-200" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <article className="glass-card p-5">
          <Scale className="h-6 w-6 text-cyan-200" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold text-white">Big Five 弱校准</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Big Five 不直接替代八维或 MBTI 式类型。它只轻微影响 E/I、N/S、T/F、J/P 的边界判断；
            神经质分数主要用于解释压力与情绪波动，不直接映射为某个类型。
          </p>
        </article>
        <article className="glass-card p-5">
          <ShieldAlert className="h-6 w-6 text-cyan-200" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold text-white">使用边界</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            HJTI 不用于招聘、诊断、医疗、筛选、亲密关系裁判或重大人生决策。结果应该被看作一组可讨论的认知偏好线索。
          </p>
        </article>
      </section>

      <div className="mt-10">
        <DisclaimerCard />
      </div>
    </div>
  );
}
