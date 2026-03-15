# ArvyaX AI-Assisted Journal System

## Overview
ArvyaX is a full-stack journaling app with AI-assisted emotion/summary/keyword analysis and user insights.

- Backend: Node.js + Express + TypeScript
- Frontend: Next.js App Router + TypeScript
- Data store: SQLite (local), with an easy production switch to PostgreSQL
- AI: OpenAI (GPT-4.1/ChatGPT) for journal analysis

## Features
- Create and list journal entries
- On-demand AI analysis for each journal entry
- Insights dashboard with emotion trends and keyword counts
- Rate limiting for abuse protection
- Docker-friendly setup

## Required Files
This submission includes:
- `README.md`
- `ARCHITECTURE.md`

## Quick Start
### 1) Configure environment
Copy `.env.example` to `.env` in both `backend/` and `frontend/`.

`backend/.env` should include:
```env
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

`frontend/.env` should include:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 2) Install dependencies
```bash
cd backend
npm install
cd ../frontend
npm install
```

### 3) Run locally
```bash
cd backend
npm run dev
```
In another terminal:
```bash
cd frontend
npm run dev
```
Open `http://localhost:3000`.

### 4) Build for production
```bash
cd frontend
npm run build
npm run start
```

## API Endpoints
- `POST /api/journal` - create new journal entry
- `GET /api/journal/:userId` - get journals for user
- `POST /api/journal/analyze` - analyze a journal entry
- `GET /api/journal/insights/:userId` - get aggregated insights
- `GET /api/health` - health check

## Postgres & Production Notes
This project currently uses SQLite for quick local development. For production, configure the backend to use PostgreSQL and update DB client connection in `backend/db/db.ts`.

## Testing
Use the backend HTTP test file at `backend/test/test.http` or use the frontend app UI.

## Deployment
1. Ensure backend `.env` and frontend `.env` are set correctly
2. Start backend service
3. Start frontend service

## How to Use
1. Enter `user_id`, `ambience`, and journal text
2. Save journal
3. Click Analyze to get emotion, summary, and keywords
4. Go to Insights to view emotion distribution and keyword leaderboard

---

## Submission Checklist
- [x] README.md
- [x] ARCHITECTURE.md
- [x] Working backend API routes
- [x] Working frontend UI
- [x] Minimal local deployment instructions

