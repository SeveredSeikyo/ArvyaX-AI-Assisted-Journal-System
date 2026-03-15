"use client";

import { PieChart, Pie, Tooltip } from "recharts";

export default function EmotionChart({ emotion }: { emotion: string }) {

  const data = [
    { name: emotion, value: 1 }
  ];

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" label />
      <Tooltip />
    </PieChart>
  );
}