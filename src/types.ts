export type Example = { input: string; output: unknown };
export type BuildPromptInputFile = { examples: Example[]; input: string };

export type BuildPromptOptions = {
  exampleLabel?: string;
  finalInputLabel?: string;
  outputLabel?: string;
  prettyPrintJson?: boolean;
};