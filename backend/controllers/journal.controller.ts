import { Request, Response } from 'express';

import { createJournalEntry, fetchJournalEntries } from '../services/journals.service';
import { analyzeJournalEntry, getUserInsights } from '../services/insights.service';

const createJournal = async ( req: Request, res: Response ) => {
	try {
		const { user_id, ambience, text } : 
		{user_id: string, ambience: string, text: string} = req.body;

		if ( !user_id || !text || !ambience ) {
			return res.status(400).json({
				error: "Missing fields"
			});
		}

		const result = await createJournalEntry ({
			user_id,
			text,
			ambience
		});

		res.status(201).json(result);
	
	} catch (err: any) {
		console.error(err);
		res.status(500).json({
			error: "Internal server error"
		});
	}
};

const fetchJournal = (req: Request<{ id: string }> , res: Response) => {
	try {
		const { id } = req.params;

		const result = fetchJournalEntries(id);

		res.status(200).json(result);

	}catch (err: any) {
		console.error(err);
		res.status(500).json({
			error: "Internal server error"
		})
	}
}

const getAnalysis = async (req: Request, res: Response) => {
	try {

		const { journal_id }: {journal_id: number} = req.body;

		const analysis = await analyzeJournalEntry({ journal_id });

		return res.status(200).json({
			analysis
		});

	} catch (err: any) {
		console.error(err);
		res.status(500).json({
			error: "Internal server error"
		});
	}
}

const getJournalInsights = (req: Request<{userId: string}>, res: Response) => {
	try {
		
		const { userId } = req.params;

		const insights = getUserInsights({ userId });

		res.status(200).json({
			insights
		})

	} catch(err) {
		console.error(err);
		res.status(500).json({
			error: "Internal server error"
		});
	}
}

export { createJournal, fetchJournal, getJournalInsights, getAnalysis  };
