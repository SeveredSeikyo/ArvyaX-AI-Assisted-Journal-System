import dotenv from "dotenv";
import analyzeJournal from "../services/llm.service.ts";

dotenv.config();

const text = "I'm loving the nature in korea. It's really good";

analyzeJournal(text);
