import { Step } from "../contracts.js";

export const ContextBuildStep = (name = "context"): Step => ({
  name,
  async run(io) {
    const hits = (io.context.hits as string[]) || [];
    const ctx = hits.join("\n---\n");
    return { ...io, context: { ...io.context, ctx } };
  },
});