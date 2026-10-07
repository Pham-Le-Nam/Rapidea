export const LEARNING_ASSISTANT_RESPONSE_PORT =
  'LEARNING_ASSISTANT_RESPONSE_PORT';

export type StructuredOutputDefinition = {
  name: string;
  schema: Record<string, unknown>;
};

export enum AiTextModelPurpose {
  PROCESSING = 'PROCESSING',
  PLANNING = 'PLANNING',
  RESPONSE = 'RESPONSE',
}

export type LearningAssistantResponseRequest = {
  input: string;
  assistantMode?: 'LEARNER' | 'INSTRUCTOR';
  failureLabel: string;
  modelPurpose: AiTextModelPurpose;
  maxOutputTokens?: number;
  additionalPolicyLayers?: readonly string[];
  structuredOutput?: StructuredOutputDefinition;
};

export interface LearningAssistantResponsePort {
  createResponse(input: LearningAssistantResponseRequest): Promise<string>;
}
