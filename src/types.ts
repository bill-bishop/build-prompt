export type Example = {
  input: string;
  /**
   * Can be any JSON value (object/array/string/number/bool/null).
   * If it's not a string, it will be pretty-printed into the prompt.
   */
  output: unknown;
};

export type BuildPromptInputFile = {
  examples: Example[];
  input: string;
};

export type BuildPromptOptions = {
  exampleLabel?: string;
  finalInputLabel?: string;
  outputLabel?: string;
  prettyPrintJson?: boolean;
};