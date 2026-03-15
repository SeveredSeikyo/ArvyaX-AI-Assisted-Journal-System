export interface CreateJournalConstant {
	user_id: string;
	ambience: string;
	text: string;
}

export interface Journal {
	id: number;
	user_id: string;
	ambience: string;
	text: string;
	created_at: string;
}

export interface Insights {
	totalEntries: number;
	topEmotion: string;
	mostUsedAmbience: string;
	recentKeywords: string[];
}

export interface AnalyzeConstant {
	emotion: string;
	summary: string;
	keywords: string[];
}