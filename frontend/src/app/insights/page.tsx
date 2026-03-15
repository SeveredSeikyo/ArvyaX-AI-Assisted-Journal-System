"use client"

import Link from "next/link";
import InsightsChart from "@/src/components/InsightsChart";
import { useInsights } from "@/src/hooks/useInsights";
import { useUserId } from "@/src/hooks/useUserId";

export default function InsightsPage() {
  const userId = useUserId();
  const { insights, loading, error } = useInsights(userId);

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-md p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Journal Insights</h1>
            <p className="text-slate-600 text-sm">Metrics from your previous journal entries.</p>
          </div>
          <Link href="/" className="text-blue-600 underline text-sm">Go to Journals</Link>
        </div>

        {!userId && <p>Loading user info...</p>}
        {userId && loading && <p>Loading insights...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {insights ? <InsightsChart insights={insights} /> : null}
      </div>
    </main>
  );
}
