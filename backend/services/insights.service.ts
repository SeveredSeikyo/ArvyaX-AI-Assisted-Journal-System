import db from '../db/db';
import { journalInsightsRequest, userInsightRequest } from '../types/journal.interface';
import analyzeJournal from './llm.service';

const analyzeJournalEntry = async (data: journalInsightsRequest) => {

	const { journal_id } = data;

	const selectAnalysis = db.prepare(`
		SELECT * FROM analysis_results
		WHERE journal_id = ?
	`);

	const analysis = selectAnalysis.get(journal_id);

	if(analysis) {
		
		const analysis_id: number = analysis.id;

		const selectKeywords = db.prepare(`
			SELECT keyword FROM analysis_keywords
			WHERE analysis_id = ?
		`);

		const keywords = selectKeywords.all(analysis_id);

		const keywordsList: string[] = [];

		for (const kw of keywords) {
			keywordsList.push(kw.keyword);
		}

		return {
			emotion: analysis.emotion,
			summary: analysis.summary,
			keywords: keywordsList
		}

	}

	const selectJournal = db.prepare(`
		SELECT * FROM journal_entries
		WHERE id = ?
	`);

	const journalResult = selectJournal.get(journal_id)

	if (!journalResult) {
		throw new Error("Journal Entry Not Found")
	}

	const { text }: {text: string} = journalResult;

	const aiAnalysis = await analyzeJournal(text);

	const insertAnalysis = db.prepare(`
		INSERT INTO analysis_results (journal_id, emotion, summary)
		VALUES (?,?,?)
	`);

	const analysisResult = insertAnalysis.run(
		journal_id,
		aiAnalysis.emotion,
		aiAnalysis.summary
	);

	const analysisId = analysisResult.lastInsertRowid;

	const keywordStmt = db.prepare(`
		INSERT INTO analysis_keywords (analysis_id, keyword)
		VALUES (?,?)
	`);

	for (const kw of aiAnalysis.keywords) {
		keywordStmt.run(analysisId, kw);
	}

	return {
		emotion: aiAnalysis.emotion,
		summary: aiAnalysis.summary,
		keywords: aiAnalysis.keywords
	};

}

const getUserInsights = (data: userInsightRequest) => {

	const { userId } = data;

    const totalEntries = db.prepare(`
        SELECT COUNT(*) as count
        FROM journal_entries
        WHERE user_id = ?
    `).get(userId);

    const topEmotion = db.prepare(`
        SELECT ar.emotion, COUNT(*) as count
        FROM analysis_results ar
        JOIN journal_entries je
        ON ar.journal_id = je.id
        WHERE je.user_id = ?
        GROUP BY ar.emotion
        ORDER BY count DESC
        LIMIT 1
    `).get(userId);

    const mostUsedAmbience = db.prepare(`
        SELECT ambience, COUNT(*) as count
        FROM journal_entries
        WHERE user_id = ?
        GROUP BY ambience
        ORDER BY count DESC
        LIMIT 1
    `).get(userId);

    const recentKeywords = db.prepare(`
        SELECT DISTINCT ak.keyword
        FROM analysis_keywords ak
        JOIN analysis_results ar
        ON ak.analysis_id = ar.id
        JOIN journal_entries je
        ON ar.journal_id = je.id
        WHERE je.user_id = ?
        ORDER BY ar.created_at DESC
        LIMIT 10
    `).all(userId);

	const keywordsList: string[] = [];

	for (const kw of recentKeywords) {
		keywordsList.push(kw.keyword);
	}

    return {
        totalEntries: totalEntries?.count || 0,
        topEmotion: topEmotion?.emotion || null,
        mostUsedAmbience: mostUsedAmbience?.ambience || null,
        recentKeywords: keywordsList
    };
};


export { analyzeJournalEntry, getUserInsights };
