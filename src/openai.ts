import type { OpenAI } from "openai";

export async function createOpenAIClientFromEnv(): Promise<OpenAI> {
  try {
    const dotenv = await import("dotenv");
    dotenv.config();
  } catch {}
  const { OpenAI } = await import("openai");
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function runOpenAICompletion(
  client: OpenAI,
  prompt: string,
  opts: { model: string }
): Promise<string> {
  const res = await client.responses.create({
    model: opts.model,
    input: prompt
  });
  const text =
    (res as any).output_text ??
    (res as any).output?.map((o: any) => o.content?.map((c: any) => c.text).join("")).join("\n") ??
    "";
  return String(text).trim();
}