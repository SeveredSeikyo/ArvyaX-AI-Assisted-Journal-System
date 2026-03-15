"use client";

import { useState } from "react";
import { analyzeJournal } from "../services/api";
import { AnalyzeConstant } from "../types/journal";

export default function AnalyzeButton({ journalId }: { journalId: number }) {
  const [analysis, setAnalysis] = useState<AnalyzeConstant | any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeJournal({ journalId });
      if (!result) {
        setError("No analysis returned.");
        setAnalysis(null);
      } else if (result.error) {
        setError(result.error || "Analysis failed.");
        setAnalysis(null);
      } else {
        const parsed = result.analysis ?? result;
        setAnalysis(parsed);
      }
    } catch (err: any) {
      setError(err?.message || "Analysis request failed. Try again.");
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        className="rounded-md bg-blue-600 px-2 py-1 text-white text-xs hover:bg-blue-700 disabled:bg-slate-400"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}

      {analysis && (
        <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 p-2 text-xs">
          {analysis.emotion && <p><strong>Emotion:</strong> {analysis.emotion}</p>}
          {analysis.summary && <p>{analysis.summary}</p>}
          {Array.isArray(analysis.keywords) && analysis.keywords.length > 0 ? (
            <p className="mt-1"><strong>Keywords:</strong> {analysis.keywords.join(", ")}</p>
          ) : (
            <p className="mt-1 text-slate-500">No keywords returned yet.</p>
          )}
        </div>
      )}
    </div>
  );
}