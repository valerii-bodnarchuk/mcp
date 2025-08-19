import { Step } from "../contracts.js";

export const PostStep = (name = "post"): Step => ({
  name,
  async run(io) {
    const answer = io.context.answer as string;
    return { 
      input: answer,
      context: { ...io.context, result: answer }
    };
  },
});