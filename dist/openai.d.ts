/**
 * Optional OpenAI adapter. Kept separate from core prompt building.
 * This module is only needed if you want the --run demo.
 */
import type { OpenAI } from "openai";
export type OpenAIRunOptions = {
    model: string;
    temperature: number;
};
export declare function createOpenAIClientFromEnv(): Promise<OpenAI>;
export declare function runOpenAICompletion(client: OpenAI, prompt: string, opts: OpenAIRunOptions): Promise<string>;
