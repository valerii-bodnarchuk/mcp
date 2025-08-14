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
    const pipeline = { steps: [
      InputStep(),
      ValidateStep(),
      EmbedStep(),
      SearchStep(),
      ContextBuildStep(),
      LlmStep(),
      PostStep(),
    ] };

    const result = await executePipeline(pipeline, { query: req.body.query });
    return reply.send(result);
  });

  // SSE stream of step events
  app.get("/events", async (req, reply) => {
    // CORS для SSE
    const origin = (req.headers as any).origin ?? "*";
    reply.raw.setHeader("Access-Control-Allow-Origin", origin);
    // если не нужны куки — credentials не ставим
    // reply.raw.setHeader("Access-Control-Allow-Credentials", "true");
  
    // SSE заголовки
    reply.raw.setHeader("Content-Type", "text/event-stream");
    reply.raw.setHeader("Cache-Control", "no-cache");
    reply.raw.setHeader("Connection", "keep-alive");
    // Отправляем заголовки сразу
    (reply.raw as any).flushHeaders?.();
  
    const write = (data: any) => reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
  
    // keep-alive, чтобы прокси/браузер не закрывали коннект
    const hb = setInterval(() => reply.raw.write(`: ping\n\n`), 15000);
    // закрытие при дисконнекте
    req.raw.on("close", () => {
      clearInterval(hb);
      try { reply.raw.end(); } catch {}
    });
  
    const pipeline = {
      steps: [
        InputStep(), ValidateStep(), EmbedStep(),
        SearchStep(), ContextBuildStep(), LlmStep(), PostStep()
      ]
    };
  
    executePipeline(pipeline, { query: (req.query as any)?.q || "What is MCP?" }, write)
      .then((ctx) => write({ type: "done", ctx }))
      .catch((err) => write({ type: "error", error: String(err) }))
      .finally(() => {
        clearInterval(hb);
        try { reply.raw.end(); } catch {}
      });
  
    return reply; // держим соединение открытым
  });
  
};
export default route;