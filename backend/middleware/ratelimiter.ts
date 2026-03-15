import { Request, Response, NextFunction } from 'express';

const requestTimestamps: Map<string, number[]> = new Map();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
	const key = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
	const now = Date.now();
	const timestamps = requestTimestamps.get(key) ?? [];

	const recent = timestamps.filter((time) => now - time < WINDOW_MS);
	recent.push(now);
	requestTimestamps.set(key, recent);

	if (recent.length > MAX_REQUESTS) {
		res.status(429).json({ error: `Rate limit exceeded (${MAX_REQUESTS} requests per minute).` });
		return;
	}

	next();
}
