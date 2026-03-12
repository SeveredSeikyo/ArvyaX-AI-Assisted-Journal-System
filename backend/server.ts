import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import './db/db';
import journalRoutes from './routes/journal.routes';

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 5000;


app.use(cors());
app.use(express.json());

const apiRouter = express.Router();


apiRouter.use('/journal', journalRoutes);

apiRouter.use('/health', (req,res) => {
	res.status(200).json({
		status: 'UP',
		timestamp: new Date().toISOString(),
		uptime: `${process.uptime().toFixed(2)} seconds`
	});
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
	console.log(`Backend Server running on port ${PORT}`);
});

