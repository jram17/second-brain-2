import { OpenAI } from "openai";
import natural from "natural";
import { OPENAI_API_KEY } from '../config/openAi';
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});


export function findBestMatch(query: string, descriptions: string[]): number {
    const tokenizer = new natural.WordTokenizer();
    const queryTokens = tokenizer.tokenize(query.toLowerCase());

    let bestIndex = -1;
    let highestScore = 0;

    descriptions.forEach((description, index) => {
        const descriptionTokens = tokenizer.tokenize(description.toLowerCase());
        const commonTokens = descriptionTokens.filter((token) => queryTokens.includes(token));
        const score = commonTokens.length / queryTokens.length; // Similarity score

        if (score > highestScore) {
            highestScore = score;
            bestIndex = index;
        }
    });

    return bestIndex;
};

export async function generateSummary(text: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Summarize this content:\n\n${text}` }],
            max_tokens: 100,
        });

        return response.choices[0]?.message?.content || "No summary available.";
    } catch (error) {
        console.error("OpenAI Error:", error);
        return "Could not generate summary.";
    }
}

