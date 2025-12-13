import type { Example, BuildPromptOptions, BuildPromptInputFile } from "./types.js";
export declare function formatOutput(value: unknown, prettyPrintJson?: boolean): string;
export declare function buildPrompt(examples: Example[], input: string, opts?: BuildPromptOptions): string;
export declare function buildPromptFromFile(payload: BuildPromptInputFile, opts?: BuildPromptOptions): string;
