import { Inject, Injectable } from '@nestjs/common';
import {
  CONTENT_RETRIEVAL_PORT,
  ContentRetrievalPort,
} from '../ports/content-retrieval.port';
import {
  COURSE_RETRIEVAL_PORT,
  CourseRetrievalPort,
} from '../ports/course-retrieval.port';
import {
  LEARNER_CONTEXT_PORT,
  LearnerContextPort,
} from '../ports/learner-context.port';
import { AiContentAccessMode } from './ai-content-authorization.types';
import { ContentChunkSourceType } from './hybrid-content-search.types';
import {
  IntentEvidenceKind,
  IntentRetrievalEvidence,
  IntentRetrievalResult,
} from './intent-retrieval.types';
import {
  LearnerIntent,
  LearnerQuery,
  LearnerQueryTarget,
} from './learner-query.types';
import { LearningPathRetrievalService } from './learning-path-retrieval.service';
import { CourseSearchResult } from './retrieval-primitives.types';

const PERSONALIZED_INTENTS = new Set<LearnerIntent>([
  LearnerIntent.FIND_COURSE,
  LearnerIntent.COMPARE_COURSES,
  LearnerIntent.CREATE_LEARNING_PATH,
  LearnerIntent.NEXT_LEARNING_STEP,
  LearnerIntent.CHECK_PREREQUISITES,
]);

@Injectable()
export class IntentRetrievalRouterService {
  constructor(
    @Inject(COURSE_RETRIEVAL_PORT)
    private readonly courses: CourseRetrievalPort,
    @Inject(CONTENT_RETRIEVAL_PORT)
    private readonly content: ContentRetrievalPort,
    @Inject(LEARNER_CONTEXT_PORT)
    private readonly learnerContext: LearnerContextPort,
    private readonly learningPaths: LearningPathRetrievalService,
  ) {}

  async retrieve(
    userId: string,
    query: LearnerQuery,
  ): Promise<IntentRetrievalResult> {
    const result: IntentRetrievalResult = {
      intent: query.intent,
      query,
      evidence: [],
      warnings: this.constraintWarnings(query),
    };

    let learnerContextData: unknown = null;
    if (PERSONALIZED_INTENTS.has(query.intent)) {
      learnerContextData = await this.learnerContext.getForUser(userId);
      this.addEvidence(
        result,
        IntentEvidenceKind.LEARNER_CONTEXT,
        learnerContextData,
      );
    }

    switch (query.intent) {
      case LearnerIntent.FIND_COURSE:
      case LearnerIntent.NEXT_LEARNING_STEP:
        await this.retrieveCourseSearch(query, result);
        break;
      case LearnerIntent.CREATE_LEARNING_PATH: {
        const initialCourses = await this.retrieveCourseSearch(query, result);
        const enrichment = await this.learningPaths.enrich(
          query,
          learnerContextData,
          initialCourses,
        );
        if (enrichment.plan) result.learningPathPlan = enrichment.plan;
        if (enrichment.supplementalCourses.length > 0) {
          this.addEvidence(
            result,
            IntentEvidenceKind.COURSE_SEARCH_RESULTS,
            enrichment.supplementalCourses,
          );
        }
        result.warnings.push(...enrichment.warnings);
        break;
      }
      case LearnerIntent.COMPARE_COURSES:
      case LearnerIntent.CHECK_PREREQUISITES:
        await this.retrieveSpecifiedCourseSummaries(userId, query, result);
        break;
      case LearnerIntent.ASK_COURSE:
        await this.retrieveCourseQuestion(userId, query, result);
        break;
      case LearnerIntent.ASK_POST:
        await this.retrievePostQuestion(userId, query, result);
        break;
      case LearnerIntent.ASK_FILE:
        await this.retrieveFileQuestion(userId, query, result);
        break;
      case LearnerIntent.FIND_CONTENT:
        await this.retrieveContentSearch(userId, query, result);
        break;
      case LearnerIntent.EXPLAIN_CONTENT:
        await this.retrieveExplanation(userId, query, result);
        break;
      case LearnerIntent.SUMMARIZE_CONTENT:
        await this.retrieveSummary(userId, query, result);
        break;
      case LearnerIntent.SUMMARIZE_DISCUSSION:
      case LearnerIntent.SEARCH_DISCUSSION:
        await this.retrieveCommunity(userId, query, result);
        break;
      case LearnerIntent.GENERAL:
        break;
    }

    if (
      query.includeDiscussions &&
      query.intent !== LearnerIntent.SUMMARIZE_DISCUSSION &&
      query.intent !== LearnerIntent.SEARCH_DISCUSSION
    ) {
      await this.retrieveCommunity(userId, query, result);
    }

    return result;
  }

  private async retrieveCourseSearch(
    query: LearnerQuery,
    result: IntentRetrievalResult,
  ): Promise<CourseSearchResult[]> {
    const courses = await this.courses.searchSummaries({
      query: this.searchText(query),
      desiredSkills: query.desiredSkills,
      desiredOutcomes: query.desiredOutcomes,
      difficulty: query.difficulty?.value,
      difficultyMode: query.difficulty?.mode,
    });
    this.addEvidence(result, IntentEvidenceKind.COURSE_SEARCH_RESULTS, courses);
    return courses;
  }

  private async retrieveSpecifiedCourseSummaries(
    userId: string,
    query: LearnerQuery,
    result: IntentRetrievalResult,
  ): Promise<void> {
    const courseIds = this.courseIds(query);
    if (courseIds.length === 0) {
      result.warnings.push(
        'No trusted course ID was available; course search results were used instead.',
      );
      await this.retrieveCourseSearch(query, result);
      return;
    }

    const summaries = await this.courses.getSummaries(userId, courseIds);
    this.addEvidence(result, IntentEvidenceKind.COURSE_SUMMARY, summaries);
  }

  private async retrieveCourseQuestion(
    userId: string,
    query: LearnerQuery,
    result: IntentRetrievalResult,
  ): Promise<void> {
    const courseIds = this.courseIds(query);
    if (courseIds.length === 0) {
      result.warnings.push(
        'No trusted course ID was available for the course question.',
      );
    }

    const details = await Promise.all(
      courseIds.map(async (courseId) => ({
        courseId,
        data: await this.courses.getDetails(userId, courseId),
      })),
    );
    details.forEach(({ courseId, data }) =>
      this.addEvidence(result, IntentEvidenceKind.COURSE_DETAILS, data, {
        type: 'COURSE',
        id: courseId,
      }),
    );

    await this.searchOfficialContent(userId, query, result, courseIds);
  }

  private async retrievePostQuestion(
    userId: string,
    query: LearnerQuery,
    result: IntentRetrievalResult,
  ): Promise<void> {
    const posts = this.targets(query, 'POST');
    if (posts.length === 0) {
      result.warnings.push(
        'No trusted post ID was available for the post question.',
      );
    }
    await this.retrievePostDetails(userId, posts, result);
    await this.searchOfficialContent(userId, query, result);
  }

  private async retrieveFileQuestion(
    userId: string,
    query: LearnerQuery,
    result: IntentRetrievalResult,
  ): Promise<void> {
    const files = this.targets(query, 'FILE');
    if (files.length === 0) {
      result.warnings.push(
        'No trusted file ID was available for the file question.',
      );
    }
    await this.retrieveFileDetails(userId, files, result);
    await this.searchOfficialContent(userId, query, result);
  }

  private async retrieveContentSearch(
    userId: string,
    query: LearnerQuery,
    result: IntentRetrievalResult,
  ): Promise<void> {
    const chunks = await this.content.search(userId, {
      query: this.searchText(query),
      courseIds: this.officialSearchCourseIds(query),
      sources: this.contentSources(query),
      sourceTypes: [ContentChunkSourceType.POST, ContentChunkSourceType.FILE],
      accessMode: AiContentAccessMode.DETAILS,
    });
    this.addEvidence(result, IntentEvidenceKind.CONTENT_CHUNKS, chunks);
  }

  private async retrieveExplanation(
    userId: string,
    query: LearnerQuery,
    result: IntentRetrievalResult,
  ): Promise<void> {
    const courseIds = this.officialSearchCourseIds(query);
    const posts = this.targets(query, 'POST');
    const files = this.targets(query, 'FILE');

    await Promise.all([
      this.retrieveCourseDetails(userId, courseIds, result),
      this.retrievePostDetails(userId, posts, result),
      this.retrieveFileDetails(userId, files, result),
    ]);
    await this.searchOfficialContent(userId, query, result, courseIds);
  }

  private async retrieveSummary(
    userId: string,
    query: LearnerQuery,
    result: IntentRetrievalResult,
  ): Promise<void> {
    const courseIds = this.officialSearchCourseIds(query);
    const posts = this.targets(query, 'POST');
    const files = this.targets(query, 'FILE');

    const [courseSummaries] = await Promise.all([
      courseIds.length > 0
        ? this.courses.getSummaries(userId, courseIds)
        : Promise.resolve([]),
      this.retrievePostDetails(userId, posts, result),
      this.retrieveFileDetails(userId, files, result),
    ]);
    if (courseSummaries.length > 0) {
      this.addEvidence(
        result,
        IntentEvidenceKind.COURSE_SUMMARY,
        courseSummaries,
      );
    }

    if (posts.length > 0 || files.length > 0) {
      await this.searchOfficialContent(userId, query, result);
    }
    if (courseIds.length === 0 && posts.length === 0 && files.length === 0) {
      result.warnings.push(
        'No trusted source ID was available for the requested summary.',
      );
    }
  }

  private async retrieveCommunity(
    userId: string,
    query: LearnerQuery,
    result: IntentRetrievalResult,
  ): Promise<void> {
    const posts = this.targets(query, 'POST');
    const courseIds = this.officialSearchCourseIds(query);

    const [threads, reviews, chunks] = await Promise.all([
      Promise.all(
        posts.map(async (post) => ({
          post,
          data: await this.content.getPostDiscussions(
            userId,
            post.id as string,
          ),
        })),
      ),
      Promise.all(
        courseIds.map(async (courseId) => ({
          courseId,
          data: await this.content.getCourseReviews(userId, courseId),
        })),
      ),
      this.content.search(userId, {
        query: this.searchText(query),
        courseIds,
        sourceTypes: [
          ContentChunkSourceType.DISCUSSION,
          ContentChunkSourceType.REVIEW,
        ],
        accessMode: AiContentAccessMode.SUMMARY,
      }),
    ]);

    threads.forEach(({ post, data }) =>
      this.addEvidence(result, IntentEvidenceKind.DISCUSSION_THREAD, data, {
        type: 'POST',
        id: post.id as string,
      }),
    );
    reviews.forEach(({ courseId, data }) =>
      this.addEvidence(result, IntentEvidenceKind.COURSE_REVIEWS, data, {
        type: 'COURSE',
        id: courseId,
      }),
    );
    this.addEvidence(result, IntentEvidenceKind.COMMUNITY_CHUNKS, chunks);
  }

  private async searchOfficialContent(
    userId: string,
    query: LearnerQuery,
    result: IntentRetrievalResult,
    courseIds = this.officialSearchCourseIds(query),
  ): Promise<void> {
    const chunks = await this.content.search(userId, {
      query: this.searchText(query),
      courseIds,
      sources: this.contentSources(query),
      sourceTypes: [ContentChunkSourceType.POST, ContentChunkSourceType.FILE],
      accessMode: AiContentAccessMode.DETAILS,
    });
    this.addEvidence(result, IntentEvidenceKind.CONTENT_CHUNKS, chunks);
  }

  private async retrieveCourseDetails(
    userId: string,
    courseIds: readonly string[],
    result: IntentRetrievalResult,
  ): Promise<void> {
    const values = await Promise.all(
      courseIds.map(async (courseId) => ({
        courseId,
        data: await this.courses.getDetails(userId, courseId),
      })),
    );
    values.forEach(({ courseId, data }) =>
      this.addEvidence(result, IntentEvidenceKind.COURSE_DETAILS, data, {
        type: 'COURSE',
        id: courseId,
      }),
    );
  }

  private async retrievePostDetails(
    userId: string,
    posts: readonly LearnerQueryTarget[],
    result: IntentRetrievalResult,
  ): Promise<void> {
    const values = await Promise.all(
      posts.map(async (post) => ({
        post,
        data: await this.content.getPost(userId, post.id as string),
      })),
    );
    values.forEach(({ post, data }) =>
      this.addEvidence(result, IntentEvidenceKind.POST_DETAILS, data, {
        type: 'POST',
        id: post.id as string,
      }),
    );
  }

  private async retrieveFileDetails(
    userId: string,
    files: readonly LearnerQueryTarget[],
    result: IntentRetrievalResult,
  ): Promise<void> {
    const values = await Promise.all(
      files.map(async (file) => ({
        file,
        data: await this.content.getFile(userId, file.id as string),
      })),
    );
    values.forEach(({ file, data }) =>
      this.addEvidence(result, IntentEvidenceKind.FILE_DETAILS, data, {
        type: 'FILE',
        id: file.id as string,
      }),
    );
  }

  private courseIds(query: LearnerQuery): string[] {
    return [
      ...new Set([
        ...this.targets(query, 'COURSE').map((target) => target.id as string),
        ...(query.courseScope ? [query.courseScope] : []),
      ]),
    ];
  }

  private contentSources(query: LearnerQuery) {
    return query.targets.flatMap((target) => {
      if (!target.id || target.type === 'COURSE') return [];
      return [
        {
          sourceType:
            target.type === 'POST'
              ? ContentChunkSourceType.POST
              : ContentChunkSourceType.FILE,
          sourceId: target.id,
        },
      ];
    });
  }

  private officialSearchCourseIds(query: LearnerQuery): string[] {
    const explicitCourseIds = this.targets(query, 'COURSE').map(
      (target) => target.id as string,
    );
    if (this.contentSources(query).length > 0) {
      return [...new Set(explicitCourseIds)];
    }
    return [
      ...new Set([
        ...explicitCourseIds,
        ...(query.courseScope ? [query.courseScope] : []),
      ]),
    ];
  }

  private targets(
    query: LearnerQuery,
    type: LearnerQueryTarget['type'],
  ): LearnerQueryTarget[] {
    return query.targets.filter(
      (target) => target.type === type && target.id !== null,
    );
  }

  private searchText(query: LearnerQuery): string {
    const text = [
      query.searchQuery,
      ...query.targets.map((target) => target.name),
      ...query.desiredSkills,
      ...query.desiredOutcomes,
    ]
      .filter((value): value is string => Boolean(value?.trim()))
      .map((value) => value.trim())
      .join(' ');
    return text || query.intent.toLowerCase().replaceAll('_', ' ');
  }

  private constraintWarnings(query: LearnerQuery): string[] {
    const warnings: string[] = [];
    if (query.constraints.maxDurationHours !== null) {
      warnings.push(
        'Course duration is not available in the current retrieval data, so the duration constraint was not applied.',
      );
    }
    if (query.constraints.language !== null) {
      warnings.push(
        'Course language is not available in the current retrieval data, so the language constraint was not applied.',
      );
    }
    return warnings;
  }

  private addEvidence(
    result: IntentRetrievalResult,
    kind: IntentEvidenceKind,
    data: unknown,
    source?: { type: 'COURSE' | 'POST' | 'FILE'; id: string },
  ): void {
    result.evidence.push({ kind, data, ...(source ? { source } : {}) });
  }
}
