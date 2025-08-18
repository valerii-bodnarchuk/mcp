import { Pipeline, StepIO, PipelineEvent } from "./contracts.js";

export async function executePipeline(p: Pipeline, input: StepIO["input"], onEvent?: (e: PipelineEvent) => void) {
  let io: StepIO = { input, context: {} };
  for (const step of p.steps) {
    const started = Date.now();
    onEvent?.({ type: "step:start", step: step.name, ts: started });
    io = await step.run(io);
    onEvent?.({ type: "step:end", step: step.name, ms: Date.now() - started, contextKeys: Object.keys(io.context) });
  }
  return io.context;
}