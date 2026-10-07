import { Inject, Injectable } from '@nestjs/common';
import {
  INSTRUCTOR_CONTENT_PORT,
  InstructorContentPort,
} from '../ports/instructor-content.port';
import {
  InstructorIntent,
  InstructorIntentFamily,
  InstructorQuery,
  InstructorRetrievalPlan,
  InstructorSource,
  instructorIntentFamily,
} from './instructor-query';

@Injectable()
export class InstructorIntentRetrievalRouterService {
  constructor(
    @Inject(INSTRUCTOR_CONTENT_PORT)
    private readonly content: InstructorContentPort,
  ) {}
  plan(query: InstructorQuery): InstructorRetrievalPlan {
    const family = instructorIntentFamily(query.intent);
    const inventory = [
      InstructorIntentFamily.COURSE_DESIGN,
      InstructorIntentFamily.CONTENT_ANALYSIS,
      InstructorIntentFamily.COURSE_IMPROVEMENT,
    ].includes(family);
    return {
      query,
      inventory,
      coverage: inventory,
      community:
        query.includeDiscussions ||
        [
          InstructorIntentFamily.LEARNER_INSIGHT,
          InstructorIntentFamily.COURSE_IMPROVEMENT,
        ].includes(family),
      duplicateCandidates: [
        InstructorIntent.REVIEW_COURSE,
        InstructorIntent.DETECT_DUPLICATE_CONTENT,
        InstructorIntent.RECOMMEND_COURSE_IMPROVEMENTS,
      ].includes(query.intent),
    };
  }
  retrieve(
    userId: string,
    query: InstructorQuery,
    sources: readonly InstructorSource[],
  ) {
    return this.content.retrieve(userId, this.plan(query), sources);
  }
}
