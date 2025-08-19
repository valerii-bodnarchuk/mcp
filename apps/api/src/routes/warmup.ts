import { FastifyPluginAsync } from "fastify";
import { EmbedStep } from "../pipeline/components/embed.js";
import { LlmStep } from "../pipeline/components/llm.js";

const route: FastifyPluginAsync = async (app) => {
  // путь внутри плагина — корень
  app.get("/", async () => {
    try { await EmbedStep().run({ input: "ping", context: {} }); } catch {}
    try { await LlmStep().run({ input: "Ping", context: { ctx: "", maxTokens: 1 } }); } catch {}
    return { ok: true };
  });
};

export default route;
