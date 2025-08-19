import Fastify from "fastify";
import dotenv from "dotenv";
import websocket from "@fastify/websocket";
import cors from "@fastify/cors";
import pipelineRoutes from "./routes/pipeline.js";
import ingestRoutes from "./routes/ingest.js";

dotenv.config();

const app = Fastify({ logger: true });
await app.register(cors, {
  origin: [
    /localhost:3000$/,                 // dev
    /.*\.vercel\.app$/,                // vercel preview/prod
    "https://mcp-web-pi.vercel.app"    // если будет кастомный домен
  ]
});
await app.register(websocket);

app.register(ingestRoutes, { prefix: "/ingest" });
app.register(pipelineRoutes, { prefix: "/pipeline" });

const port = Number(process.env.PORT || 3001);

app.get("/healthz", async () => ({ ok: true }));

app.listen({ port, host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
