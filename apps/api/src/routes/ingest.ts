import { FastifyPluginAsync } from "fastify";
import { QdrantClient } from "@qdrant/js-client-rest";
import OpenAI from "openai";

const route: FastifyPluginAsync = async (app) => {
  const client = new QdrantClient({ url: process.env.QDRANT_URL!, apiKey: process.env.QDRANT_API_KEY || undefined });
  const collection = process.env.COLLECTION || "mcpx_docs";

  app.post<{ Body: { texts: string[] } }>("/", async (req, reply) => {
    const { texts } = req.body;
    const oa = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const emb = await oa.embeddings.create({ model: "text-embedding-3-small", input: texts });

    const points = emb.data.map((e, idx) => ({
      id: Date.now() + idx,
      vector: e.embedding,
      payload: { text: texts[idx] }
    }));

    // create collection if not exists (size inferred by first vector)
    try { await client.getCollection(collection); } catch {
      await client.createCollection(collection, { vectors: { size: emb.data[0].embedding.length, distance: "Cosine" } });
    }

    await client.upsert(collection, { points });
    return reply.send({ ok: true, count: points.length });
  });
};
export default route;