import { Step } from "../contracts.js";
import OpenAI from "openai";

export const EmbedStep = (name = "embed"): Step => ({
  name,
  async run(io) {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const text = io.context.query as string;
    const { data } = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    const vector = data[0].embedding;
    return { ...io, context: { ...io.context, vector } };
  },
});