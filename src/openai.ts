/**
 * Optional OpenAI adapter. Kept separate from core prompt building.
 * This module is only needed if you want the --run demo.
 */
import type { OpenAI } from "openai";

export type OpenAIRunOptions = {
  model: string;
  temperature: number;
};

export async function createOpenAIClientFromEnv(): Promise<OpenAI> {
  try {
    const dotenv = await import("dotenv");
    dotenv.config();
  } catch {}

  const { OpenAI } = await import("openai");
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
  return new OpenAI({ apiKey });
}

export async function runOpenAICompletion(
  client: OpenAI,
  prompt: string,
  opts: OpenAIRunOptions
): Promise<string> {
  const resp = await client.responses.create({
    model: opts.model,
    input: prompt,
    temperature: opts.temperature
  });

  const text =
    (resp as any).output_text ??
    (resp as any).output?.map((o: any) => o.content?.map((c: any) => c.text).join("")).join("\n") ??
    "";

  return String(text).trim();
}