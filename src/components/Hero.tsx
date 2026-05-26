import Link from "next/link";
import { ArrowRight, BookOpen, GitBranch, Layers3, Radar, Sparkles } from "lucide-react";
import { DisclaimerCard } from "@/components/DisclaimerCard";

const featureCards = [
  { title: "八维功能", body: "围绕 Ne Ni Se Si Te Ti Fe Fi 分别计分，不只看四个字母。", icon: Layers3 },
  { title: "多算法融合", body: "结合四字母倾向、功能栈匹配和原型相似度，给出更稳的候选结果。", icon: Radar },
  { title: "Top 3 类型", body: "展示最接近的 3 个类型和置信度，方便理解边界而不是只收一个标签。", icon: Sparkles },
  { title: "80 题场景版", body: "最新题库为 80 题版本，更多使用生活、学习和工作情境来减少抽象自评偏差。", icon: BookOpen },
];

export function Hero() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
            HJTI8
            <span className="block text-gradient">混合荣格类型指标</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-cyan-100">
            80 Preview：最新题库为 80 题版本，正在以更具体的情境题提升结果稳定性和可读性。
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Hybrid Jungian Type Indicator is a hybrid eight-function personality test integrating Jungian functions,
            MBTI-style typology, and Big Five calibration.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
            中文译文：HJTI8 是一个融合荣格八维、MBTI 式类型推断与大五人格校准的混合八维人格测试。
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            关联：MBTI、荣格八维、16型人格、认知功能、人格测试。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="primary-button" href="/test">
              开始测试
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link className="secondary-button" href="/methodology">
              查看方法论
              <BookOpen className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              className="secondary-button"
              href="https://github.com/yunlux/hjti"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <GitBranch className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden="true" />
          <div className="relative grid grid-cols-2 gap-3">
            {["Ne", "Ni", "Se", "Si", "Te", "Ti", "Fe", "Fi"].map((item, index) => (
              <div key={item} className="glass-card min-h-24 p-4">
                <div className="text-2xl font-semibold text-white">{item}</div>
                <div className="mt-4 h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-indigo-300 to-emerald-300"
                    style={{ width: `${44 + index * 6}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="glass-card p-5" key={card.title}>
              <Icon className="h-6 w-6 text-cyan-200" aria-hidden="true" />
              <h2 className="mt-4 text-base font-semibold text-white">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{card.body}</p>
            </article>
          );
        })}
      </section>

      <div className="mt-8">
        <DisclaimerCard compact />
      </div>
    </div>
  );
}
