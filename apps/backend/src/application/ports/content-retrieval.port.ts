import { ContentSearchInput } from '../ai-chat/retrieval-primitives.types';

export const CONTENT_RETRIEVAL_PORT = 'CONTENT_RETRIEVAL_PORT';

export interface ContentRetrievalPort {
  search(
    userId: string,
    input: ContentSearchInput,
  ): Promise<readonly unknown[]>;
  getPost(userId: string, postId: string): Promise<unknown>;
  getFile(userId: string, fileId: string): Promise<unknown>;
  getDiscussion(userId: string, discussionId: string): Promise<unknown>;
  getPostDiscussions(
    userId: string,
    postId: string,
    limit?: number,
  ): Promise<unknown>;
  getCourseReviews(
    userId: string,
    courseId: string,
    limit?: number,
  ): Promise<readonly unknown[]>;
}
