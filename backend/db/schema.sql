-- USERS TABLE
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- JOURNAL ENTRIES
CREATE TABLE journal_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    ambience TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- LLM ANALYSIS RESULTS (CACHEABLE)
CREATE TABLE analysis_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    journal_id INTEGER NOT NULL,
    emotion TEXT NOT NULL,
    summary TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (journal_id) REFERENCES journal_entries(id)
);


-- KEYWORDS TABLE (since keywords are arrays)
CREATE TABLE analysis_keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    analysis_id INTEGER NOT NULL,
    keyword TEXT NOT NULL,

    FOREIGN KEY (analysis_id) REFERENCES analysis_results(id)
);


CREATE INDEX idx_journal_user ON journal_entries(user_id);
CREATE INDEX idx_analysis_journal ON analysis_results(journal_id);
CREATE INDEX idx_keywords_analysis ON analysis_keywords(analysis_id);
