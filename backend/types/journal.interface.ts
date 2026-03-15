export interface journalEntryRequest {
    user_id: string;
    ambience: string;
    text: string;
}

export interface journalParams {
    id: string;
}

export interface journalInsightsRequest {
    journal_id: number;
}

export interface userInsightRequest {
    userId: string;
}