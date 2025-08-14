import { Step } from "../contracts.js";
import OpenAI from "openai";

export const LlmStep = (name = "llm"): Step => ({
  name,
  async run(io) {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `You are an MCP assistant. Use context below to answer.\n\nCONTEXT:\n${io.context.ctx}\n\nQUESTION:\n${io.context.query}`;
    const chat = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });
    const answer = chat.choices[0]?.message?.content || "";
    return { ...io, context: { ...io.context, answer } };
  },
});