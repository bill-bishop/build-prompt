export function formatOutput(value, prettyPrintJson = true) {
    if (typeof value === "string")
        return value.trim();
    if (!prettyPrintJson)
        return String(value);
    return JSON.stringify(value, null, 2);
}
export function buildPrompt(examples, input, opts = {}) {
    const { exampleLabel = "Example", finalInputLabel = "Final Input", outputLabel = "Output", prettyPrintJson = true } = opts;
    if (!Array.isArray(examples))
        throw new Error(`"examples" must be an array`);
    if (typeof input !== "string")
        throw new Error(`"input" must be a string`);
    const lines = [];
    examples.forEach((ex, i) => {
        if (!ex || typeof ex.input !== "string") {
            throw new Error(`${exampleLabel} ${i + 1} missing "input" string`);
        }
        lines.push(`${exampleLabel} ${i + 1}:`);
        lines.push(`Input: ${ex.input.trim()}`);
        lines.push(`${outputLabel}: ${formatOutput(ex.output, prettyPrintJson)}`);
        lines.push("");
    });
    lines.push(`${finalInputLabel}:`);
    lines.push(input.trim());
    lines.push(`${outputLabel}:`);
    return lines.join("\n");
}
export function buildPromptFromFile(payload, opts = {}) {
    return buildPrompt(payload.examples, payload.input, opts);
}
