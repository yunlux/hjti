"use client";

import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { clearAnswers } from "@/lib/storage";

export function RestartButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  function restart() {
    if (!window.confirm("确定要清空当前答案并重新开始吗？")) return;
    clearAnswers();
    router.push("/test");
  }

  return (
    <button type="button" onClick={restart} className={className || "secondary-button"}>
      重新测试
      <RotateCcw className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
