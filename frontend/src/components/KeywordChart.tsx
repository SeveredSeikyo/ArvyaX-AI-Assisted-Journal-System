"use client";

import { BarChart, Bar, XAxis, Tooltip } from "recharts";

export default function KeywordChart({ keywords }: { keywords: string[] }) {

  const data = keywords.map(k => ({
    keyword: k,
    count: 1
  }));

  return (
    <BarChart width={400} height={300} data={data}>
      <XAxis dataKey="keyword" />
      <Tooltip />
      <Bar dataKey="count" />
    </BarChart>
  );
}