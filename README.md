# build-prompt (TypeScript)

Example-driven few-shot prompt builder.

- Core is model-agnostic: turns `{ examples, input }` into a single prompt string.
- CLI is pipe-friendly by default.
- OpenAI demo (`--run`) is optional and isolated from core prompt building.

## Install

```bash
npm install
npm run build
npm link
```

## CLI

```bash
build-prompt samples/basic.json
build-prompt samples/basic.json --out prompt.txt
```

OpenAI demo:

```bash
export OPENAI_API_KEY="..."
build-prompt samples/basic.json --run
```

Pipe completion to stdout:

```bash
build-prompt samples/basic.json --run --quiet-prompt --completion-stdout
```

## Library

```ts
import { buildPrompt } from "build-prompt";

const prompt = buildPrompt(
  [{ input: "Hello", output: { ok: true } }],
  "World"
);
```