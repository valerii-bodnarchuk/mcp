import { FastifyPluginAsync } from "fastify";
import { executePipeline } from "../pipeline/executor.js";
import { InputStep } from "../pipeline/components/input.js";
import { ValidateStep } from "../pipeline/components/validate.js";
import { EmbedStep } from "../pipeline/components/embed.js";
import { SearchStep } from "../pipeline/components/search.js";
import { ContextBuildStep } from "../pipeline/components/context.js";
import { LlmStep } from "../pipeline/components/llm.js";
import { PostStep } from "../pipeline/components/post.js";

const route: FastifyPluginAsync = async (app) => {
  app.post<{ Body: { query: string } }>("/run", async (req, reply) => {
    try {
      const pipeline = { steps: [InputStep(), ValidateStep(), EmbedStep(), SearchStep(), ContextBuildStep(), LlmStep(), PostStep()] };
      const result = await executePipeline(pipeline, req.body.query);
      return reply.send(result);
    } catch (e) {
      req.log.error(e);
      return reply.code(200).send({ error: "pipeline_failed", message: String(e) }); // чтобы UI не падал
    }
  });

  app.get<{ Querystring: { q?: string } }>("/events", async (req, reply) => {
    const origin = typeof req.headers.origin === "string" ? req.headers.origin : "*";

    // CORS + SSE заголовки
    reply.raw.statusCode = 200;
    reply.raw.setHeader("Access-Control-Allow-Origin", origin);
    reply.raw.setHeader("Content-Type", "text/event-stream");
    reply.raw.setHeader("Cache-Control", "no-cache, no-transform");
    reply.raw.setHeader("Connection", "keep-alive");
    reply.raw.setHeader("X-Accel-Buffering", "no");
    (reply.raw as any).flushHeaders?.();

    const send = (data: unknown) => reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
    const ping = setInterval(() => reply.raw.write(`: ping\n\n`), 15000);
    req.raw.on("close", () => { clearInterval(ping); try { reply.raw.end(); } catch {} });

    const pipeline = { steps: [InputStep(), ValidateStep(), EmbedStep(), SearchStep(), ContextBuildStep(), LlmStep(), PostStep()] };

    try {
      const ctx = await executePipeline(pipeline, (req.query.q ?? "What is MCP?") as string, send);
      send({ type: "done", ctx });
    } catch (err) {
      send({ type: "error", error: String(err) });
    } finally {
      clearInterval(ping);
      try { reply.raw.end(); } catch {}
    }
    return; // ничего не возвращаем после stream
  });
};
export default route;