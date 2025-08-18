import { z } from "zod";

export const StepIO = z.object({
  input: z.string(),
  context: z.record(z.object({})).default({}),
});
export type StepIO = z.infer<typeof StepIO>;

export type Step = {
  name: string;
  run(io: StepIO): Promise<StepIO>;
};

export type Pipeline = {
  steps: Step[];
};

export type PipelineEvent = 
  | { type: 'step:start'; step: string; ts: number }
  | { type: 'step:end'; step: string; ms: number; contextKeys: string[] };