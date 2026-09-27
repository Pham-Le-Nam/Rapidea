export const TOKEN_COUNTER_PORT = 'TOKEN_COUNTER_PORT';

export interface TokenCounterPort {
  count(text: string): number;
  truncate(text: string, maxTokens: number): string;
}
