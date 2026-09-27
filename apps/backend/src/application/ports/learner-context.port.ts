export const LEARNER_CONTEXT_PORT = 'LEARNER_CONTEXT_PORT';

export interface LearnerContextPort {
  getForUser(userId: string): Promise<unknown>;
}
