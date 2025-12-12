#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import process from 'process'
import 'dotenv/config'
import { OpenAI } from 'openai'

const usage = `
build-prompt

Usage:
  build-prompt <file.json> [--out <prompt.txt>] [--run] [--model <model>] [--temperature <num>]

Input file schema:
  {
    "examples": [ { "input": string, "output": any }, ... ],
    "input": string
  }

Notes:
- "output" may be a string OR any JSON value (object/array/etc). Non-strings are pretty-printed.
- --run will call the OpenAI API and print the completion after the prompt.
- Requires OPENAI_API_KEY in environment for --run.
`

function parseArgs(argv) {
  const args = { file: null, out: null, run: false, model: 'gpt-4.1-mini', temperature: undefined }
  const pos = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--out') args.out = argv[++i]
    else if (a === '--run') args.run = true
    else if (a === '--model') args.model = argv[++i]
    else if (a === '--temperature') args.temperature = Number(argv[++i])
    else pos.push(a)
  }
  args.file = pos[0] ?? null
  return args
}

function formatOutput(value) {
  if (typeof value === 'string') return value.trim()
  return JSON.stringify(value, null, 2)
}

function buildPrompt(examples, input) {
  const lines = [
      `Complete the Output following the structure of the examples below.`,
      ``,
  ]
  examples.forEach((ex, i) => {
    if (!ex || typeof ex.input !== 'string') throw new Error(`Example ${i + 1} missing "input" string`)
    lines.push(`Example ${i + 1}:`)
    lines.push(`Input: ${ex.input.trim()}`)
    lines.push(`Output: ${formatOutput(ex.output)}`)
    lines.push('')
  })
  lines.push('Final Input:')
  lines.push(input.trim())
  lines.push('Output:')
  return lines.join('\n')
}

async function runOpenAI(prompt, model, temperature) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set (required for --run)')
  const client = new OpenAI({ apiKey })

  const resp = await client.responses.create({
    model,
    input: prompt,
    ...(Number.isFinite(temperature) ? { temperature } : {}),
  })

  const text =
    resp.output_text ??
    resp.output?.map(o => o.content?.map(c => c.text).join('')).join('\n') ??
    ''
  return text.trim()
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.file) {
    console.error(usage.trim())
    process.exit(1)
  }

  const filePath = path.resolve(args.file)
  let parsed
  try {
    parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (e) {
    console.error(`Error: failed to read/parse JSON: ${e.message}`)
    process.exit(1)
  }

  const { examples, input } = parsed
  if (!Array.isArray(examples) || typeof input !== 'string') {
    console.error('Error: invalid input JSON. Expected { examples: [...], input: string }.')
    process.exit(1)
  }

  let prompt
  try {
    prompt = buildPrompt(examples, input)
  } catch (e) {
    console.error(`Error: ${e.message}`)
    process.exit(1)
  }

  if (args.out) {
    fs.writeFileSync(path.resolve(args.out), prompt, 'utf8')
    console.log(`Wrote prompt to ${args.out}`)
  } else {
    console.log(prompt)
  }

  if (args.run) {
    const completion = await runOpenAI(prompt, args.model, args.temperature)
    console.log(completion)
  }
}

main().catch(err => {
  console.error(`Error: ${err.message}`)
  process.exit(1)
})