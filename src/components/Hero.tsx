import Link from "next/link";
import { ArrowRight, BookOpen, Layers3, Radar, Sparkles } from "lucide-react";
import { DisclaimerCard } from "@/components/DisclaimerCard";

const featureCards = [
  { title: "八维功能", body: "Ne Ni Se Si Te Ti Fe Fi 八个认知功能独立计分。", icon: Layers3 },
  { title: "多算法融合", body: "结合四字母、功能栈和原型相似度三套输出。", icon: Radar },
  { title: "Top 3 类型", body: "不只给一个标签，也展示接近候选与置信度。", icon: Sparkles },
  { title: "原创题库", body: "非官方 MBTI，不复刻商业题库，用于娱乐与自我探索。", icon: BookOpen },
];

export function Hero() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
            HJTI-64 Preview
            <span className="block text-gradient">Hybrid Jungian Type Indicator</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A hybrid eight-function personality test integrating Jungian functions, MBTI-style typology, and Big Five
            calibration.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
            融合荣格八维、MBTI式类型推断与大五人格校准的混合人格测试。
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
