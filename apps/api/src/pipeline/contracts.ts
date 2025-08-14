import { z } from "zod";

export const StepIO = z.object({
  input: z.any(),
  context: z.record(z.any()).default({}),
});
export type StepIO = z.infer<typeof StepIO>;

export type Step = {
  name: string;
  run(io: StepIO): Promise<StepIO>;
};

export type Pipeline = {
  steps: Step[];
};