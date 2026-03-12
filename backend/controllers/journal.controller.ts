import { Request, Response } from 'express';
import { createJournalEntry } from '../services/insights.service';

const createJournal = async ( req: Request, res: Response ) => {
	try {
		const { user_id, text, ambience } = req.body;

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

export default createJournal;
