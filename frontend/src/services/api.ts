import { CreateJournalConstant } from "../types/journal";
import { API_BASE_URL } from "../utils/constants";


interface CreateJournalData {
	data: CreateJournalConstant;
}


const baseUrl = API_BASE_URL;

export async function createJournal({ data }: CreateJournalData) {
	const res = await fetch(`${baseUrl}/journal`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	});

	return res.json();
}

export async function fetchJournals({ userId }: { userId: string }) {
	const res = await fetch(`${baseUrl}/journal/${userId}`);

	return res.json();
}

export async function analyzeJournal({ journalId }: { journalId: number }) {
	const res = await fetch(`${baseUrl}/journal/analyze`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ journal_id: journalId })
	});

	const result = await res.json();
	return result;
}



export async function fetchInsights({ userId }: {userId: string}) {
	const res = await fetch(`${baseUrl}/journal/insights/${userId}`);
	const data = await res.json();
	return data?.insights ?? data;
}