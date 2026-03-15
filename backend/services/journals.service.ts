import db from '../db/db'
import { journalEntryRequest } from '../types/journal.interface';

const createJournalEntry = (data: journalEntryRequest) => {
    
    const {user_id, ambience, text} = data;
	
	db.prepare(`
		   INSERT OR IGNORE INTO users (id)
		   VALUES (?)
	`).run(user_id);

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

    return { journalId };
}

const fetchJournalEntries = ( id: string ) => {

    const selectJournal = db.prepare(`
        SELECT * FROM journal_entries WHERE user_id = ? 
    `);

    const result = selectJournal.all(id);

    if(!result.length) {
        return {
            error: "No Journals found"
        }
    }

    return result;

}

export { fetchJournalEntries, createJournalEntry };