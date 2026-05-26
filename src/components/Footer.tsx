import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>HJTI8 混合荣格类型指标 · 80 Preview · 原创娱乐/自我探索工具</p>
        <div className="flex gap-4">
          <Link className="hover:text-cyan-200" href="/methodology">
            方法论
          </Link>
          <Link className="hover:text-cyan-200" href="/privacy">
            隐私
          </Link>
        </div>
      </div>
    </footer>
  );
}
