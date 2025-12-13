import { createOpenAIClientFromEnv, runOpenAICompletion } from "./openai.js";
export async function createOpenAIAdapterFromEnv() {
    const client = await createOpenAIClientFromEnv();
    return {
        run: (prompt, opts) => runOpenAICompletion(client, prompt, {
            model: opts.model
        })
    };
}
