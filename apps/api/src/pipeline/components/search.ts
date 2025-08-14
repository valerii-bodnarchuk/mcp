import { Step } from "../contracts.js";
import { QdrantClient } from "@qdrant/js-client-rest";

// минимальный тип под нашу логику
type QHit = { payload?: Record<string, unknown> | null; score?: number };

export const SearchStep = (name = "search"): Step => ({
  name,
  async run(io) {
    const client = new QdrantClient({
      url: process.env.QDRANT_URL!,
      apiKey: process.env.QDRANT_API_KEY || undefined,
    });

    const vector = io.context.vector as number[];
    const collection = process.env.COLLECTION || "mcpx_docs";

    const res = await client.search(collection, {
      vector,
      limit: 4,
      with_payload: true,
    });

    // Клиент может вернуть либо массив, либо объект с { result }
    const points: QHit[] = Array.isArray(res) ? (res as QHit[]) : ((res as any)?.result ?? []);

    const hits = points.map((p) => {
      const payload = (p?.payload ?? {}) as Record<string, unknown>;
      return (payload["text"] as string) ?? "";
    });

    return { ...io, context: { ...io.context, hits } };
  },
});
