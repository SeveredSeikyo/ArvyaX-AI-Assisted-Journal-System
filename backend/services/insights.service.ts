import db from '../db/db';
import { analyzeJournal } from './llm.service';

const createJournalEntry = async (data: any) => {

	const {user_id, ambience, text} = data;
	
	const insertJournal = db.prepare(`
		INSERT INTO journal_entries (user_id, ambience, text)
		VALUES (?,?,?)
	`);

	const result = insertJournal.run(
		user_id,
		ambience,
		text
	);

	const journalId = result.lastInsertRowid;

	const analysis = await analyzeJournal(text);

	const insertAnalysis = db.prepare(`
		INSERT INTO analysis_results (journal_id, emotion, summary)
		VALUES (?,?,?)
	`);

	const analysisResult = insertAnalysis.run(
		journalId,
		analysis.emotion,
		analysis.summary
	);

	const analysisId = analysisResult.lastInsertRowid;

	const keywordStmt = db.prepare(`
		INSERT INTO analysis_keywords (analysis_id, keyword)
		VALUES (?,?)
	`);

	for (const kw of analysis.keywords) {
		keywordStmt.run(analysisId, kw);
	}

	return {
		journal_id: journalId,
		analysis
	};
}


