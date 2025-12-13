export async function createOpenAIClientFromEnv() {
    try {
        const dotenv = await import("dotenv");
        dotenv.config();
    }
    catch { }
    const { OpenAI } = await import("openai");
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey)
        throw new Error("OPENAI_API_KEY is not set");
    return new OpenAI({ apiKey });
}
export async function runOpenAICompletion(client, prompt, opts) {
    const resp = await client.responses.create({
        model: opts.model,
        input: prompt,
        temperature: opts.temperature
    });
    const text = resp.output_text ??
        resp.output?.map((o) => o.content?.map((c) => c.text).join("")).join("\n") ??
        "";
    return String(text).trim();
}
