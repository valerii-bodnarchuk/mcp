import { Step, Emit } from "../contracts.js";
import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

export const SearchStep = (name = "search"): Step => ({
  name,
  async run(io, emit?: Emit) {
    const collection = process.env.QDRANT_COLLECTION || "mcpx_docs";
    const vector = (io as any).vector;

    // если нет конфигов или упали — не валим пайплайн
    try {
      if (!process.env.QDRANT_URL || !process.env.QDRANT_API_KEY || !vector) {
        emit?.({ type: "warn", step: name, msg: "qdrant disabled or no vector" });
        return { ...io, context: { ...io.context, hits: [] } };
      }

      // реальный поиск (как было)
      const res = await client.search(collection, { vector, limit: 5 });
      const hits = (res as any)?.result ?? res; // под твой клиент
      return { ...io, context: { ...io.context, hits } };
    } catch (err: any) {
      if (err?.status === 404) {
        emit?.({ type: "warn", step: name, msg: `collection '${collection}' not found` });
        return { ...io, context: { ...io.context, hits: [] } };
      }
      throw err; // прочие ошибки пусть летят
    }
  },
});
