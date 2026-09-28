import { AiTextModelPurpose } from '../ports/learning-assistant-response.port';
import { LearnerIntent, LearnerQuery } from './learner-query.types';
import { LearningPathRetrievalService } from './learning-path-retrieval.service';
import { LearningPathStepCoverage } from './learning-path-plan.types';
import { CourseSearchResult } from './retrieval-primitives.types';

const query: LearnerQuery = {
  intent: LearnerIntent.CREATE_LEARNING_PATH,
  targets: [],
  courseScope: null,
  desiredSkills: ['Machine Learning'],
  existingSkills: ['Python'],
  desiredOutcomes: ['Build machine-learning models'],
  difficulty: null,
  constraints: { maxDurationHours: null, language: null },
  searchQuery: 'machine learning path',
  explanationLevel: null,
  includeDiscussions: false,
};

function course(id: string, title: string, skill: string): CourseSearchResult {
  return {
    id,
    title,
    description: `${title} description`,
    price: 0,
    currency: 'AUD',
    rating: 4.5,
    ratingCount: 10,
    subscribersCount: 20,
    creator: {
      username: 'teacher',
      firstname: 'Course',
      middlename: null,
      lastname: 'Creator',
    },
    profile: {
      summary: `${title} summary`,
      difficulty: 'BEGINNER',
      profileText: `${title} profile`,
      profileVersion: 1,
      generatedAt: new Date('2026-09-01T00:00:00Z'),
    },
    skills: [
      {
        id: 1,
        name: skill,
        description: null,
        outcome: `Understand ${skill}`,
        importance: 1,
      },
    ],
    tags: [],
    semanticScore: 0.8,
    keywordScore: 0.7,
    combinedScore: 0.03,
  };
}

function draft(
  matchedCourseReferences: string[] = ['C1'],
  searchQuery: string | null = null,
) {
  return JSON.stringify({
    steps: [
      {
        title: 'Programming foundations',
        objective: 'Use Python for data work',
        requiredSkills: ['Python'],
        rationale: 'Programming is needed before model implementation.',
        necessity: 'REQUIRED',
        matchedCourseReferences,
        searchQuery,
      },
      {
        title: 'Mathematics foundations',
        objective: 'Understand linear algebra and probability',
        requiredSkills: ['Linear Algebra', 'Probability'],
        rationale: 'These concepts support machine-learning algorithms.',
        necessity: 'REQUIRED',
        matchedCourseReferences: [],
        searchQuery: 'linear algebra probability for machine learning',
      },
    ],
  });
}

function createFixture(response = draft()) {
  const learningAssistant = {
    createResponse: jest.fn().mockResolvedValue(response),
  };
  const courses = {
    searchSummaries: jest
      .fn()
      .mockResolvedValue([
        course('course-math', 'Mathematics for ML', 'Linear Algebra'),
      ]),
    getSummary: jest.fn(),
    getSummaries: jest.fn(),
    getDetails: jest.fn(),
  };
  return {
    learningAssistant,
    courses,
    service: new LearningPathRetrievalService(learningAssistant, courses),
  };
}

describe('LearningPathRetrievalService', () => {
  it('searches uncovered steps and keeps model-visible course IDs backend-owned', async () => {
    const fixture = createFixture();
    const result = await fixture.service.enrich(
      query,
      {
        userId: 'private-user-id',
        skills: [{ skillId: 10, skill: { name: 'Python' } }],
      },
      [course('private-course-id', 'Python Foundations', 'Python')],
    );

    expect(fixture.courses.searchSummaries).toHaveBeenCalledTimes(1);
    expect(fixture.courses.searchSummaries).toHaveBeenCalledWith({
      query: 'linear algebra probability for machine learning',
      desiredSkills: ['Linear Algebra', 'Probability'],
      desiredOutcomes: ['Understand linear algebra and probability'],
      difficulty: undefined,
      difficultyMode: undefined,
      limit: 3,
    });
    expect(result.plan?.steps.map((step) => step.coverage)).toEqual([
      LearningPathStepCoverage.INITIAL_MATCH,
      LearningPathStepCoverage.SUPPLEMENTAL_CANDIDATES,
    ]);
    expect(result.supplementalCourses.map((item) => item.title)).toEqual([
      'Mathematics for ML',
    ]);
    const plannerInput = fixture.learningAssistant.createResponse.mock
      .calls[0][0].input as string;
    expect(
      fixture.learningAssistant.createResponse.mock.calls[0][0].modelPurpose,
    ).toBe(AiTextModelPurpose.PLANNING);
    expect(plannerInput).toContain('"reference":"C1"');
    expect(plannerInput).not.toContain('private-course-id');
    expect(plannerInput).not.toContain('private-user-id');
  });

  it('marks a step uncovered only after its targeted search returns no new course', async () => {
    const fixture = createFixture();
    fixture.courses.searchSummaries.mockResolvedValue([]);

    const result = await fixture.service.enrich(query, { skills: [] }, [
      course('course-python', 'Python Foundations', 'Python'),
    ]);

    expect(result.plan?.steps[1]).toEqual(
      expect.objectContaining({
        coverage: LearningPathStepCoverage.UNCOVERED,
        supplementalSearchPerformed: true,
        courseTitles: [],
      }),
    );
  });

  it('does not accept an invented temporary course reference', async () => {
    const fixture = createFixture(draft(['C99'], null));

    const result = await fixture.service.enrich(query, { skills: [] }, [
      course('course-python', 'Python Foundations', 'Python'),
    ]);

    expect(result.plan).toBeNull();
    expect(result.supplementalCourses).toEqual([]);
    expect(result.warnings).toEqual([
      'Learning-path gap analysis was unavailable; only the initial course search results were used.',
    ]);
    expect(fixture.courses.searchSummaries).not.toHaveBeenCalled();
  });

  it('distinguishes a failed supplemental search from a completed empty search', async () => {
    const fixture = createFixture();
    fixture.courses.searchSummaries.mockRejectedValue(
      new Error('search unavailable'),
    );

    const result = await fixture.service.enrich(query, { skills: [] }, [
      course('course-python', 'Python Foundations', 'Python'),
    ]);

    expect(result.plan?.steps[1].coverage).toBe(
      LearningPathStepCoverage.SEARCH_UNAVAILABLE,
    );
    expect(result.warnings).toContain(
      'The additional Rapideia course search for "Mathematics foundations" was unavailable.',
    );
  });

  it('runs supplemental searches with bounded concurrency and preserves step order', async () => {
    const response = JSON.stringify({
      steps: Array.from({ length: 6 }, (_, index) => ({
        title: `Step ${index + 1}`,
        objective: `Learn skill ${index + 1}`,
        requiredSkills: [`Skill ${index + 1}`],
        rationale: `Skill ${index + 1} is required.`,
        necessity: 'REQUIRED',
        matchedCourseReferences: [],
        searchQuery: `skill ${index + 1}`,
      })),
    });
    const fixture = createFixture(response);
    let activeSearches = 0;
    let maximumActiveSearches = 0;
    fixture.courses.searchSummaries.mockImplementation(async (input) => {
      activeSearches += 1;
      maximumActiveSearches = Math.max(maximumActiveSearches, activeSearches);
      await new Promise((resolve) => setTimeout(resolve, 10));
      activeSearches -= 1;
      return [course(`course-${input.query}`, input.query, input.query)];
    });

    const result = await fixture.service.enrich(query, { skills: [] }, []);

    expect(fixture.courses.searchSummaries).toHaveBeenCalledTimes(6);
    expect(maximumActiveSearches).toBe(3);
    expect(result.plan?.steps.map((step) => step.sequence)).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
    expect(result.plan?.steps.map((step) => step.title)).toEqual([
      'Step 1',
      'Step 2',
      'Step 3',
      'Step 4',
      'Step 5',
      'Step 6',
    ]);
  });
});
