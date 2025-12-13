import type { OpenAI } from "openai";
export declare function createOpenAIClientFromEnv(): Promise<OpenAI>;
export declare function runOpenAICompletion(client: OpenAI, prompt: string, opts: {
    model: string;
}): Promise<string>;
