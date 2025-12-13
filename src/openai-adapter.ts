import { createOpenAIClientFromEnv, runOpenAICompletion } from "./openai.js";
import type { LLMAdapter } from "./llm-function.js";

export async function createOpenAIAdapterFromEnv(): Promise<LLMAdapter> {
  const client = await createOpenAIClientFromEnv();
  return {
    run: (prompt, opts) =>
      runOpenAICompletion(client as any, prompt, {
        model: opts.model
      })
  };
}