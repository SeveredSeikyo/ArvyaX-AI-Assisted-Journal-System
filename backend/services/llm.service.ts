import OpenAI from "openai";

const baseUrl = process.env.OPENAI_URL;
const apiKey = process.env.API_KEY;
const llmModel = process.env.LLM_MODEL || "gpt-4o-mini";

const buildPrompt = (text: string) => `Analyze the following journal entry.\n\nReturn JSON with:\nemotion (string)\nsummary (string)\nkeywords (array)\n\nJournal:\n${text}`;

const analyzeJournal = async (text: string) => {
  const client = new OpenAI({ baseURL: baseUrl, apiKey });

  const prompt = buildPrompt(text);

  const response = await client.chat.completions.create({
    model: llmModel,
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  if (response?.choices?.[0]?.message?.content) {
    const raw = response.choices[0].message.content;
    const cleanJson = raw.replace(/```json|```/g, "").trim();
    try {
      const parsed = JSON.parse(cleanJson);
      return {
        emotion: parsed.emotion ?? "neutral",
        summary: parsed.summary ?? "No summary generated.",
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
      };
    } catch (error) {
      return {
        emotion: "neutral",
        summary: "Could not parse model output.",
        keywords: [],
      };
    }
  }

  return {
    emotion: "neutral",
    summary: "No response from LLM.",
    keywords: [],
  };
};

export { analyzeJournal };

