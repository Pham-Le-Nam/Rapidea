export const LEARNING_ASSISTANT_RESPONSE_PORT =
  'LEARNING_ASSISTANT_RESPONSE_PORT';

export type StructuredOutputDefinition = {
  name: string;
  schema: Record<string, unknown>;
};

export type LearningAssistantResponseRequest = {
  input: string;
  failureLabel: string;
  maxOutputTokens?: number;
  additionalPolicyLayers?: readonly string[];
  structuredOutput?: StructuredOutputDefinition;
};

export interface LearningAssistantResponsePort {
  createResponse(input: LearningAssistantResponseRequest): Promise<string>;
}
