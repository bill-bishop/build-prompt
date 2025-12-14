import {createOpenAIAdapterFromEnv} from "./openai-adapter.js";
import {runLLMFunction} from "./llm-function.js";

const openAIAdapter = await createOpenAIAdapterFromEnv();

const output = await runLLMFunction(
    openAIAdapter,
    {
        examples: [
            {
                "input": "I definitely never received that email.",
                "output": {
                    "deception_likelihood": "medium",
                    "signals": ["absolute denial", "missing corroborating detail"]
                }
            },
            {
                "input": "I might have forgotten to submit it, I'm not sure.",
                "output": {
                    "deception_likelihood": "low",
                    "signals": ["expressed uncertainty", "self-attribution of fault"]
                }
            },
            {
                "input": "The system just deleted my work on its own.",
                "output": {
                    "deception_likelihood": "medium",
                    "signals": ["external blame", "agentless causation"]
                }
            },
        ],
        input: "the sky is red\n",
    }
);

console.log('DECEPTION CLASSIFICATION:\n\n');
console.log(output);