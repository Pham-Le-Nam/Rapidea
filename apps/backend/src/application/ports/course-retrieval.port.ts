import { CourseSearchInput } from '../ai-chat/retrieval-primitives.types';

export const COURSE_RETRIEVAL_PORT = 'COURSE_RETRIEVAL_PORT';

export interface CourseRetrievalPort {
  searchSummaries(input: CourseSearchInput): Promise<readonly unknown[]>;
  getSummary(userId: string, courseId: string): Promise<unknown>;
  getSummaries(
    userId: string,
    courseIds: readonly string[],
  ): Promise<readonly unknown[]>;
  getDetails(userId: string, courseId: string): Promise<unknown>;
}
