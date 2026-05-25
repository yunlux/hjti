"use client";

import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import type { FunctionKey } from "@/lib/types";

export function FunctionBarChart({ ranking }: { ranking: Array<{ key: FunctionKey; score: number }> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const data = ranking.map((item) => ({ key: item.key, score: Math.round(item.score) }));

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const nextWidth = Math.floor(entry.contentRect.width);
      if (nextWidth > 0) setChartWidth(nextWidth);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="glass-card p-5">
      <h2 className="section-title">八维排序条形图</h2>
      <div ref={containerRef} className="mt-4 h-80 min-w-0">
        {chartWidth > 0 ? (
          <BarChart width={chartWidth} height={320} data={data} layout="vertical" margin={{ left: 8, right: 18 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.16)" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis type="category" dataKey="key" tick={{ fill: "#cbd5e1", fontSize: 13 }} width={36} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                color: "#e2e8f0",
              }}
            />
            <Bar dataKey="score" fill="#67e8f9" radius={[0, 6, 6, 0]} />
          </BarChart>
        ) : null}
      </div>
    </section>
  );
}
