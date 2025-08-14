import { Step } from "../contracts.js";

export const ValidateStep = (name = "validate"): Step => ({
  name,
  async run(io) {
    const query = io.input?.query?.trim?.();
    if (!query) throw new Error("Empty query");
    return { ...io, context: { ...io.context, query } };
  },
});