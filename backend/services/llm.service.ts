import OpenAI from "openai";


const baseUrl = process.env.OPENAI_URL; 
const apiKey = process.env.API_KEY; 
const llmModel = process.env.LLM_MODEL || "";

const analyzeJournal = async(text:string) => {
	
	const client = new OpenAI({
		baseURL: baseUrl,
		apiKey: apiKey
	});

	const prompt = `
	Analyze the following journal entry.

	Return JSON with:
	emotion (string)
	summary (string)
	keywords (array)

	Journal:
	${text}
	`;

	const response = await client.chat.completions.create({
		model: llmModel,
		messages: [{ role: "user", content: prompt }],
		response_format: { type: "json_object" }
	});

	if(response?.choices[0]?.message?.content){

		const raw = response.choices[0].message.content;
		const cleanJson = raw.replace(/```json|```/g, "").trim();
		const result = JSON.parse(cleanJson);
		return result;
	}
}

export default analyzeJournal;
