import { Journal } from "../types/journal";
import AnalyzeButton from "./AnalyzeButton";

interface journalListProps {
    journals: Journal[];
}

export default function JournalList({journals}: journalListProps) {
    if (!journals || (Array.isArray(journals) && journals.length === 0)) {
        return <p className="text-slate-600">No journal entries yet. Write your first one above.</p>;
    }

    if ((journals as any).error) {
        return <p className="text-red-600">{(journals as any).error}</p>;
    }

    return (
        <div className="space-y-3">
            {journals.map(j => (
                <div key={j.id} className="border rounded-lg p-3 bg-white shadow-sm">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>{j.ambience}</span>
                        <span>{new Date(j.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-slate-800 mb-2">{j.text}</p>
                    <AnalyzeButton journalId={j.id} />
                </div>
            ))}
        </div>
    )
}
