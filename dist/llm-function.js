import { buildPromptFromFile } from "./prompt.js";
export async function runLLMFunction(adapter, payload, opts = {}) {
    const model = opts.model ?? "gpt-5-mini";
    const prompt = buildPromptFromFile(payload, opts.promptOptions);
    const completion = await adapter.run(prompt, { model });
    return { prompt, completion };
}
