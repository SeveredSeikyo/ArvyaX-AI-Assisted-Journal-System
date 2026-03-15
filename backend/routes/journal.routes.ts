import express from 'express';
import { createJournal, fetchJournal, getJournalInsights, getAnalysis } from '../controllers/journal.controller';
import { rateLimiter } from '../middleware/ratelimiter';

const router = express.Router();

router.post('/', rateLimiter, (req, res) => createJournal(req, res));
router.get('/:id', rateLimiter, (req, res) => fetchJournal(req, res));
router.post('/analyze', rateLimiter, (req, res) => getAnalysis(req, res));
router.get('/insights/:userId', rateLimiter, (req, res) => getJournalInsights(req, res));

export default router;

