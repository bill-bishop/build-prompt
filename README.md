# build-prompt

Minimal example-driven few-shot prompt builder.

## Install

```bash
npm install
npm link
```

## Usage

Build a prompt from a JSON file:

```bash
build-prompt samples/basic.json
```

Write prompt to a file:

```bash
build-prompt samples/basic.json --out prompt.txt
```

Optional OpenAI demo (prints completion after prompt):

```bash
export OPENAI_API_KEY="..."
build-prompt samples/basic.json --run --model gpt-5-mini
```

## Input JSON format

```json
{
  "examples": [
    { "input": "freeform", "output": "string OR any JSON value" }
  ],
  "input": "final freeform input"
}
```

- If `output` is not a string, it will be pretty-printed into the prompt.