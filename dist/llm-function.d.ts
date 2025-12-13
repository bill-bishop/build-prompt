import type { BuildPromptInputFile, BuildPromptOptions } from "./types.js";
export type LLMAdapter = {
    run(prompt: string, opts: {
        model: string;
    }): Promise<string>;
};
export type LLMFunctionRunOptions = {
    model?: string;
    promptOptions?: BuildPromptOptions;
};
export declare function runLLMFunction(adapter: LLMAdapter, payload: BuildPromptInputFile, opts?: LLMFunctionRunOptions): Promise<{
    prompt: string;
    completion: string;
}>;
