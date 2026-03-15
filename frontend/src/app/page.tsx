"use client"

import JournalForm from "../components/JournalForm";
import JournalList from "../components/JournalList";
import InsightCards from "../components/InsightCards";
import InsightsChart from "../components/InsightsChart";
import { useUserId } from "../hooks/useUserId";
import { useInsights } from "../hooks/useInsights";
import { useJournals } from "../hooks/useJournals";

export default function Home() {
  const userId = useUserId();
  const { journals, loading: loadingJournals, error: journalsError } = useJournals(userId);
  const { insights, loading: loadingInsights, error: insightsError } = useInsights(userId);

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">User: {userId ?? "..."}</p>
            <h1 className="text-3xl font-bold">Quick Journal</h1>
            <p className="text-slate-600 mt-1">Write entries, analyze feelings, and view insights.</p>
          </div>
          <a href="/insights" className="px-3 py-2 rounded-md border border-slate-300 text-blue-600">Insights</a>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <div>
            {userId ? (
              <JournalForm userId={userId} onSaved={() => window.location.reload()} />
            ) : (
              <div>Loading user ID...</div>
            )}
          </div>

          <div className="border border-slate-200 rounded-md p-4 bg-white shadow-sm">
            <h2 className="text-xl font-semibold">Insights</h2>
            {loadingInsights && <p>Loading insights...</p>}
            {insightsError && <p className="text-red-600">{insightsError}</p>}
            {insights && <InsightCards insights={insights} />}
            {insights && <InsightsChart insights={insights} />}
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Journal Entries</h2>
            <span className="text-xs text-slate-500">{journals ? (Array.isArray(journals) ? `${journals.length} entries` : "") : ""}</span>
          </div>
          {loadingJournals && <p>Loading journal entries...</p>}
          {journalsError && <p className="text-red-600">{journalsError}</p>}
          {journals && <JournalList journals={journals} />}
        </section>
      </div>
    </main>
  );
}
