import fs from "fs";
import path from "path";
import process from "process";
import { buildPromptFromFile } from "./prompt.js";
const usage = `
build-prompt

Usage:
  build-prompt <file.json> [--out <prompt.txt>] [--run]
              [--model <model>] [--temperature <num>]
              [--completion-stdout] [--quiet-prompt]

Defaults:
  --model gpt-4.1-mini
  --temperature 0

Notes:
- Default behavior is pipe-friendly: the prompt is written to stdout.
- If --run is set, the completion is written to stderr by default (so stdout can still be piped).
  Use --completion-stdout to print completion to stdout instead.
- Use --quiet-prompt to suppress printing the prompt (useful with --completion-stdout).
`;
function parseArgs(argv) {
    const args = {
        file: null,
        out: null,
        run: false,
        model: "gpt-4.1-mini",
        temperature: 0,
        completionToStdout: false,
        quietPrompt: false
    };
    const pos = [];
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === "--out")
            args.out = argv[++i] ?? null;
        else if (a === "--run")
            args.run = true;
        else if (a === "--model")
            args.model = argv[++i] ?? args.model;
        else if (a === "--temperature")
            args.temperature = Number(argv[++i]);
        else if (a === "--completion-stdout")
            args.completionToStdout = true;
        else if (a === "--quiet-prompt")
            args.quietPrompt = true;
        else
            pos.push(a);
    }
    args.file = pos[0] ?? null;
    return args;
}
function readJsonFile(p) {
    const raw = fs.readFileSync(p, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object")
        throw new Error("JSON must be an object");
    if (!Array.isArray(parsed.examples) || typeof parsed.input !== "string") {
        throw new Error('Expected shape: { "examples": [...], "input": string }');
    }
    return parsed;
}
export async function main(argv = process.argv.slice(2)) {
    const args = parseArgs(argv);
    if (!args.file) {
        console.error(usage.trim());
        process.exit(1);
    }
    const filePath = path.resolve(args.file);
    let payload;
    try {
        payload = readJsonFile(filePath);
    }
    catch (e) {
        console.error(`Error: ${e?.message ?? String(e)}`);
        process.exit(1);
        return;
    }
    let prompt;
    try {
        prompt = buildPromptFromFile(payload);
    }
    catch (e) {
        console.error(`Error: ${e?.message ?? String(e)}`);
        process.exit(1);
        return;
    }
    if (args.out) {
        fs.writeFileSync(path.resolve(args.out), prompt, "utf8");
    }
    if (!args.quietPrompt) {
        process.stdout.write(prompt + "\n");
    }
    if (args.run) {
        const { createOpenAIClientFromEnv, runOpenAICompletion } = await import("./openai.js");
        const client = await createOpenAIClientFromEnv();
        const completion = await runOpenAICompletion(client, prompt, {
            model: args.model,
            temperature: Number.isFinite(args.temperature) ? args.temperature : 0
        });
        const sink = args.completionToStdout ? process.stdout : process.stderr;
        sink.write((args.completionToStdout ? "" : "\n--- COMPLETION ---\n\n") + completion + "\n");
    }
}
