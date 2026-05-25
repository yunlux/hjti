"use client";

import { useEffect, useRef, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import type { FunctionKey } from "@/lib/types";

export function FunctionRadarChart({ scores }: { scores: Record<FunctionKey, number> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const data = Object.entries(scores).map(([key, value]) => ({ key, score: Math.round(value) }));

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
      <h2 className="section-title">八维分数雷达图</h2>
      <div ref={containerRef} className="mt-4 h-80 min-w-0">
        {chartWidth > 0 ? (
          <RadarChart width={chartWidth} height={320} data={data}>
            <PolarGrid stroke="rgba(148, 163, 184, 0.28)" />
            <PolarAngleAxis dataKey="key" tick={{ fill: "#cbd5e1", fontSize: 13 }} />
            <Radar
              dataKey="score"
              stroke="#67e8f9"
              fill="#67e8f9"
              fillOpacity={0.26}
              strokeWidth={2}
              dot={{ r: 3, fill: "#a7f3d0" }}
            />
          </RadarChart>
        ) : null}
      </div>
    </section>
  );
}
