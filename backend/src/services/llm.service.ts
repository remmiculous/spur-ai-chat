import "dotenv/config";
import OpenAI from "openai";

/**
 * OpenRouter client (OpenAI-compatible)
 */
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:4000",
    "X-Title": "Spur AI Chat Assignment",
  },
});

/**
 * Shared message type (used by routes)
 */
export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

/**
 * System + domain context
 */
const SYSTEM_PROMPT = `
You are a helpful and professional customer support agent for a small e-commerce store.
Answer clearly, concisely, and politely.
If you do not know the answer, say so honestly.
`;

const FAQ_CONTEXT = `
Store Information:
- Shipping: We ship worldwide. Orders are delivered within 5–10 business days.
- Returns: Customers can return products within 30 days for a full refund.
- Refunds: Refunds are processed within 5 business days after receiving the return.
- Support Hours: Monday to Friday, 9 AM to 6 PM IST.
`;

/**
 * Generate an AI reply using OpenRouter
 */
export async function generateReply(
  history: ChatMessage[],
  userMessage: string
): Promise<string> {
  try {
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "system", content: FAQ_CONTEXT },
      ...history,
      { role: "user", content: userMessage },
    ];

    const response = await client.chat.completions.create({
      model: "openai/gpt-4o",
      messages,
      max_tokens: 200,        // safer for free tier
      temperature: 0.3,
    });

    return (
      response.choices[0]?.message?.content ??
      "Sorry, I couldn't generate a response right now."
    );
  } catch (error: any) {
    console.log('===> llm.service.ts:68 ~ error', error);
    // Graceful handling for free-tier & quota issues
    if (error?.code === 404 || error?.code === "insufficient_quota") {
      return "Our return policy allows returns within 30 days for a full refund.";
    }

    console.error("LLM error:", error);
    return "Sorry, I'm having trouble responding right now. Please try again later.";
  }
}
