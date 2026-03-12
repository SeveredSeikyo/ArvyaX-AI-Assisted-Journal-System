import express from 'express';

import { createJournal } from '../controllers/journal.controller';

const router = express.Router();

router.post('/', (req,res) => {
	res.status(200).json({
		message: "hello"
	});
});

router.get('/:id', (req,res) => {
	res.status(200).json({
		message: "hello"
	});
});

export default router;

