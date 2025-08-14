import { Step } from "../contracts.js";

export const PostStep = (name = "postprocess"): Step => ({
  name,
  async run(io) {
    const answer = io.context.answer as string;
    return { input: null, context: { result: answer } };
  },
});