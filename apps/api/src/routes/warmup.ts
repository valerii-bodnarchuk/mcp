import { FastifyPluginAsync } from "fastify";
import { EmbedStep } from "../pipeline/components/embed.js";
import { LlmStep } from "../pipeline/components/llm.js";

const route: FastifyPluginAsync = async (app) => {
  app.get("/warmup", async () => {
    try {
      await EmbedStep().run({ input: "ping", context: {} });
    } catch {}
    try {
      await LlmStep().run({ input: "Ping", context: { ctx: "" } });
    } catch {}
    return { ok: true };
  });
};
export default route;
