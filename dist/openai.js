export async function createOpenAIClientFromEnv() {
    try {
        const dotenv = await import("dotenv");
        dotenv.config();
    }
    catch { }
    const { OpenAI } = await import("openai");
    if (!process.env.OPENAI_API_KEY)
        throw new Error("OPENAI_API_KEY not set");
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}
export async function runOpenAICompletion(client, prompt, opts) {
    const res = await client.responses.create({
        model: opts.model,
        input: prompt
    });
    const text = res.output_text ??
        res.output?.map((o) => o.content?.map((c) => c.text).join("")).join("\n") ??
        "";
    return String(text).trim();
}
