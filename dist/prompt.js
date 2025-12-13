export function formatOutput(value, prettyPrintJson = true) {
    if (typeof value === "string")
        return value.trim();
    return prettyPrintJson ? JSON.stringify(value, null, 2) : String(value);
}
export function buildPrompt(examples, input, opts = {}) {
    const { exampleLabel = "Example", finalInputLabel = "Final Input", outputLabel = "Output", prettyPrintJson = true } = opts;
    const lines = [];
    examples.forEach((ex, i) => {
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
export function buildPromptFromFile(payload, opts) {
    return buildPrompt(payload.examples, payload.input, opts);
}
