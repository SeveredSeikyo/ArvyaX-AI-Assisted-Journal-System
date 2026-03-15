"use client"

import { useState } from "react"
import { createJournal } from "../services/api"
import { AMBIENCE_OPTIONS } from "../utils/constants"


export default function JournalForm({ userId, onSaved }: { userId: string; onSaved?: () => void }) {

    const [text, setText] = useState("");
    const [ambience, setAmbience] = useState("nature");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async() => {
        if (!text.trim()) {
            setError("Please write something before saving.");
            return;
        }
        setSaving(true);
        setError(null);
        try {
            const data = {
                user_id: userId,
                ambience,
                text
            };
            await createJournal({ data });
            setText("");
            onSaved?.();
        } catch (err) {
            setError("Could not save your journal entry.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="border border-slate-200 rounded-md p-4 shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-2">Write a journal entry</h2>
            <textarea
                className="w-full p-2 border border-slate-300 rounded-md min-h-[120px]"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your journal..."
            />

            <div className="mt-2 flex items-center gap-2">
                <select
                    className="border border-slate-300 rounded-md p-2"
                    value={ambience}
                    onChange={(e) => setAmbience(e.target.value)}
                >
                    {AMBIENCE_OPTIONS.map(a => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>
                <button
                    className="bg-blue-600 text-white px-3 py-2 rounded-md"
                    onClick={handleSubmit}
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save"}
                </button>
            </div>
            {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
    )
}