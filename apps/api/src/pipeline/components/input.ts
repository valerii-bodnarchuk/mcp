import { Step } from "../contracts.js";

export const InputStep = (name = "input"): Step => ({
  name,
  async run(io) {
    // passthrough; assumes io.input already has { query }
    return io;
  },
});