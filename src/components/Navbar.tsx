import Link from "next/link";
import { BrainCircuit, ClipboardList } from "lucide-react";

const navItems = [
  { href: "/test", label: "测试" },
  { href: "/methodology", label: "方法论" },
  { href: "/privacy", label: "隐私" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-slate-50">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10">
            <BrainCircuit className="h-5 w-5 text-cyan-200" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">HJTI-64 Preview</span>
            <span className="hidden text-xs text-slate-400 sm:block">Hybrid Jungian Type Indicator</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/test"
            className="hidden items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 sm:flex"
          >
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
            开始
          </Link>
        </div>
      </nav>
    </header>
  );
}
