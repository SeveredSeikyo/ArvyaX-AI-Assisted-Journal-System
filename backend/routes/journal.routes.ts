import { Request, Response } from 'express';
import express from 'express';

import { 
	createJournal, 
	fetchJournal, 
	getJournalInsights,
	getAnalysis
} from '../controllers/journal.controller';

const router = express.Router();

router.post('/', (req: Request,res: Response) => {
	createJournal(req, res);
});

router.get('/:id', (req: Request<{id : string}>,res: Response) => {
	fetchJournal(req, res);
});

router.post('/analyze', async (req: Request, res: Response) => {
	getAnalysis(req, res);
})

router.get('/insights/:userId', (req: Request<{userId: string}>, res: Response) => {
	getJournalInsights(req, res);
})

export default router;

