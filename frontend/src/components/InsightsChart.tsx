"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Insights } from "@/src/types/journal";

export default function InsightsChart({ insights }: { insights: Insights }) {
  const keywordCounts = (insights.recentKeywords ?? []).reduce((acc: Record<string, number>, keyword) => {
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {});

  const keywordData = Object.entries(keywordCounts).map(([name, count]) => ({ name, count }));

  return (
    <div className="mt-4 border border-slate-200 rounded-md bg-white p-3">
      <h3 className="font-semibold text-slate-800 mb-2 text-sm">Insights Chart</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-md border border-slate-200 p-2">
          <p className="text-xs text-slate-500">Journal Entry Stats</p>
          <div className="mt-1 text-sm text-slate-700">
            <div className="flex justify-between"><span>Total Entries</span><span>{insights.totalEntries}</span></div>
            <div className="flex justify-between"><span>Top Emotion</span><span>{insights.topEmotion ?? "N/A"}</span></div>
            <div className="flex justify-between"><span>Top Ambience</span><span>{insights.mostUsedAmbience ?? "N/A"}</span></div>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 p-2">
          <p className="text-xs text-slate-500">Recent Keywords</p>
          <div className="mt-1 text-sm text-slate-700">
            {(insights.recentKeywords ?? []).length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {(insights.recentKeywords ?? []).map((keyword, idx) => (
                  <span key={`${keyword}-${idx}`} className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs">No keywords yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 h-44">
        {keywordData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={keywordData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-xs">No keyword data for charts yet.</div>
        )}
      </div>
    </div>
  );
}
