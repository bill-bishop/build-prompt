import { createOpenAIAdapterFromEnv } from "./openai-adapter.js";
import { runLLMFunction } from "./llm-function.js";
const openAIAdapter = await createOpenAIAdapterFromEnv();
const output = await runLLMFunction(openAIAdapter, {
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
        {
            "input": "Everyone else was doing the same thing, so I assumed it was fine.",
            "output": {
                "deception_likelihood": "high",
                "signals": ["appeal to common behavior", "norm diffusion"]
            }
        },
        {
            "input": "I followed the instructions exactly as written.",
            "output": {
                "deception_likelihood": "medium",
                "signals": ["over-precision claim", "defensive framing"]
            }
        },
        {
            "input": "I misunderstood the deadline and submitted late.",
            "output": {
                "deception_likelihood": "low",
                "signals": ["clear causal chain", "acceptance of responsibility"]
            }
        },
        {
            "input": "That must have been a glitch or something.",
            "output": {
                "deception_likelihood": "high",
                "signals": ["vague attribution", "hedging without evidence"]
            }
        }
    ],
    input: "u need some domme juice bruh\n",
});
console.log('DECEPTION CLASSIFICATION:\n\n');
console.log(output);
