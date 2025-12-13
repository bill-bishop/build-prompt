import type { BuildPromptInputFile, BuildPromptOptions } from "./types.js";
import { buildPromptFromFile } from "./prompt.js";

export type LLMAdapter = {
  run(prompt: string, opts: { model: string }): Promise<string>;
};

export type LLMFunctionRunOptions = {
  model?: string; // default: gpt-5-mini
  promptOptions?: BuildPromptOptions;
};

export async function runLLMFunction(
  adapter: LLMAdapter,
  payload: BuildPromptInputFile,
  opts: LLMFunctionRunOptions = {}
): Promise<{ prompt: string; completion: string }> {
  const model = opts.model ?? "gpt-5-mini";
  const prompt = buildPromptFromFile(payload, opts.promptOptions);
  const completion = await adapter.run(prompt, { model });
  return { prompt, completion };
}