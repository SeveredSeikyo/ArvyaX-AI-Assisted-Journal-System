import Database from 'better-sqlite3';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('journal.db', { verbose: console.log });

const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

try {
	db.exec(schema);
	console.log("Schema Initialized successfully");
} catch (err) {
	console.error("Failed to Initialize schema:", err.message);
}

export default db;
