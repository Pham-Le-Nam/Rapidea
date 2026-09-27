import { Inject, Injectable } from '@nestjs/common';
import {
  COURSE_RETRIEVAL_PORT,
  CourseRetrievalPort,
} from '../ports/course-retrieval.port';
import {
  LEARNING_ASSISTANT_RESPONSE_PORT,
  LearningAssistantResponsePort,
} from '../ports/learning-assistant-response.port';
import { LearnerQuery } from './learner-query.types';
import { LEARNING_PATH_PLAN_OUTPUT } from './learning-path-plan.schema';
import {
  LearningPathEnrichmentResult,
  LearningPathPlanStep,
  LearningPathStepCoverage,
  LearningPathStepNecessity,
} from './learning-path-plan.types';
import { LEARNING_PATH_PLANNING_PROMPT } from './prompts/learning-path-planning.prompt';
import { CourseSearchResult } from './retrieval-primitives.types';

type DraftStep = {
  title: string;
  objective: string;
  requiredSkills: string[];
  rationale: string;
  necessity: LearningPathStepNecessity;
  matchedCourseReferences: string[];
  searchQuery: string | null;
};

type CourseCandidate = {
  reference: string;
  course: CourseSearchResult;
  modelData: unknown;
};

const MAX_OUTPUT_TOKENS = 2_500;
const MAX_PLAN_STEPS = 8;
const SUPPLEMENTAL_RESULTS_PER_STEP = 3;
const PLANNING_UNAVAILABLE_WARNING =
  'Learning-path gap analysis was unavailable; only the initial course search results were used.';

@Injectable()
export class LearningPathRetrievalService {
  constructor(
    @Inject(LEARNING_ASSISTANT_RESPONSE_PORT)
    private readonly learningAssistant: LearningAssistantResponsePort,
    @Inject(COURSE_RETRIEVAL_PORT)
    private readonly courses: CourseRetrievalPort,
  ) {}

  async enrich(
    query: LearnerQuery,
    learnerContext: unknown,
    initialCourses: readonly CourseSearchResult[],
  ): Promise<LearningPathEnrichmentResult> {
    const candidates = initialCourses.map((course, index) =>
      this.courseCandidate(course, index),
    );
    let draft: DraftStep[];
    try {
      const response = await this.learningAssistant.createResponse({
        additionalPolicyLayers: [LEARNING_PATH_PLANNING_PROMPT],
        input: this.modelInput(query, learnerContext, candidates),
        structuredOutput: LEARNING_PATH_PLAN_OUTPUT,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        failureLabel: 'Rapideia learning-path planning',
      });
      draft = this.parseDraft(response, candidates);
    } catch {
      return {
        plan: null,
        supplementalCourses: [],
        warnings: [PLANNING_UNAVAILABLE_WARNING],
      };
    }

    const byReference = new Map(
      candidates.map((candidate) => [candidate.reference, candidate.course]),
    );
    const initialIds = new Set(initialCourses.map((course) => course.id));
    const supplementalById = new Map<string, CourseSearchResult>();
    const warnings: string[] = [];
    const steps: LearningPathPlanStep[] = [];

    for (const [index, step] of draft.entries()) {
      const initialMatches = step.matchedCourseReferences.flatMap(
        (reference) => {
          const course = byReference.get(reference);
          return course ? [course] : [];
        },
      );
      if (initialMatches.length > 0) {
        steps.push({
          sequence: index + 1,
          title: step.title,
          objective: step.objective,
          requiredSkills: step.requiredSkills,
          rationale: step.rationale,
          necessity: step.necessity,
          coverage: LearningPathStepCoverage.INITIAL_MATCH,
          courseTitles: initialMatches.map((course) => course.title),
          searchQuery: null,
          supplementalSearchPerformed: false,
        });
        continue;
      }

      try {
        const results = await this.courses.searchSummaries({
          query: step.searchQuery ?? this.fallbackSearchQuery(step),
          desiredSkills: step.requiredSkills,
          desiredOutcomes: [step.objective],
          difficulty: query.difficulty?.value,
          difficultyMode: query.difficulty?.mode,
          limit: SUPPLEMENTAL_RESULTS_PER_STEP,
        });
        const newCandidates = results.filter(
          (course) => !initialIds.has(course.id),
        );
        for (const course of newCandidates) {
          supplementalById.set(course.id, course);
        }
        steps.push({
          sequence: index + 1,
          title: step.title,
          objective: step.objective,
          requiredSkills: step.requiredSkills,
          rationale: step.rationale,
          necessity: step.necessity,
          coverage:
            newCandidates.length > 0
              ? LearningPathStepCoverage.SUPPLEMENTAL_CANDIDATES
              : LearningPathStepCoverage.UNCOVERED,
          courseTitles: newCandidates.map((course) => course.title),
          searchQuery: step.searchQuery,
          supplementalSearchPerformed: true,
        });
      } catch {
        warnings.push(
          `The additional Rapideia course search for "${step.title}" was unavailable.`,
        );
        steps.push({
          sequence: index + 1,
          title: step.title,
          objective: step.objective,
          requiredSkills: step.requiredSkills,
          rationale: step.rationale,
          necessity: step.necessity,
          coverage: LearningPathStepCoverage.SEARCH_UNAVAILABLE,
          courseTitles: [],
          searchQuery: step.searchQuery,
          supplementalSearchPerformed: true,
        });
      }
    }

    return {
      plan: { steps },
      supplementalCourses: [...supplementalById.values()],
      warnings,
    };
  }

  private modelInput(
    query: LearnerQuery,
    learnerContext: unknown,
    candidates: readonly CourseCandidate[],
  ): string {
    return [
      '<LEARNER_GOAL>',
      JSON.stringify({
        desiredSkills: query.desiredSkills,
        existingSkills: query.existingSkills,
        desiredOutcomes: query.desiredOutcomes,
        difficulty: query.difficulty,
        constraints: query.constraints,
        searchQuery: query.searchQuery,
      }),
      '</LEARNER_GOAL>',
      '<LEARNER_CONTEXT>',
      JSON.stringify(this.sanitize(learnerContext)),
      '</LEARNER_CONTEXT>',
      '<INITIAL_COURSE_CANDIDATES>',
      JSON.stringify(candidates.map((candidate) => candidate.modelData)),
      '</INITIAL_COURSE_CANDIDATES>',
    ].join('\n');
  }

  private courseCandidate(
    course: CourseSearchResult,
    index: number,
  ): CourseCandidate {
    const reference = `C${index + 1}`;
    return {
      reference,
      course,
      modelData: {
        reference,
        title: course.title,
        description: course.description,
        profile: course.profile
          ? {
              summary: course.profile.summary,
              difficulty: course.profile.difficulty,
              profileText: course.profile.profileText,
            }
          : null,
        skills: course.skills.map((skill) => ({
          name: skill.name,
          description: skill.description,
          outcome: skill.outcome,
          importance: skill.importance,
        })),
        tags: course.tags,
      },
    };
  }

  private parseDraft(
    value: string,
    candidates: readonly CourseCandidate[],
  ): DraftStep[] {
    let parsed: unknown;
    try {
      parsed = JSON.parse(value);
    } catch {
      throw new Error('Learning-path planner returned invalid JSON');
    }
    const record = this.record(parsed);
    if (!record || !Array.isArray(record.steps)) {
      throw new Error('Learning-path planner returned an invalid plan');
    }
    if (record.steps.length === 0 || record.steps.length > MAX_PLAN_STEPS) {
      throw new Error('Learning-path planner returned an invalid step count');
    }

    const validReferences = new Set(
      candidates.map((candidate) => candidate.reference),
    );
    return record.steps.map((value) => {
      const step = this.record(value);
      const title = this.requiredString(step?.title);
      const objective = this.requiredString(step?.objective);
      const rationale = this.requiredString(step?.rationale);
      const requiredSkills = this.stringArray(step?.requiredSkills);
      const matchedCourseReferences = this.stringArray(
        step?.matchedCourseReferences,
      );
      const necessity = step?.necessity;
      const searchQuery =
        step?.searchQuery === null
          ? null
          : this.requiredString(step?.searchQuery);

      if (
        !Object.values(LearningPathStepNecessity).includes(
          necessity as LearningPathStepNecessity,
        ) ||
        matchedCourseReferences.some(
          (reference) => !validReferences.has(reference),
        ) ||
        (matchedCourseReferences.length === 0 && searchQuery === null)
      ) {
        throw new Error('Learning-path planner returned an invalid step');
      }

      return {
        title,
        objective,
        requiredSkills,
        rationale,
        necessity: necessity as LearningPathStepNecessity,
        matchedCourseReferences: [...new Set(matchedCourseReferences)],
        searchQuery: matchedCourseReferences.length > 0 ? null : searchQuery,
      };
    });
  }

  private fallbackSearchQuery(step: DraftStep): string {
    return [step.title, step.objective, ...step.requiredSkills].join(' ');
  }

  private sanitize(value: unknown, depth = 0): unknown {
    if (depth >= 8) return '[nested data omitted]';
    if (
      value === null ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      return value;
    }
    if (value instanceof Date) return value.toISOString();
    if (Array.isArray(value)) {
      return value.slice(0, 50).map((item) => this.sanitize(item, depth + 1));
    }
    const record = this.record(value);
    if (!record) return String(value);
    return Object.fromEntries(
      Object.entries(record).flatMap(([key, item]) => {
        if (
          key === 'id' ||
          key.endsWith('Id') ||
          key.endsWith('Ids') ||
          key === 'instructions' ||
          key === 'prompt' ||
          key === 'systemPrompt'
        ) {
          return [];
        }
        return [[key, this.sanitize(item, depth + 1)]];
      }),
    );
  }

  private requiredString(value: unknown): string {
    if (typeof value !== 'string' || !value.trim()) {
      throw new Error('Learning-path planner returned an invalid string');
    }
    return value.trim();
  }

  private stringArray(value: unknown): string[] {
    if (
      !Array.isArray(value) ||
      value.some((item) => typeof item !== 'string')
    ) {
      throw new Error('Learning-path planner returned an invalid array');
    }
    return [
      ...new Set(value.map((item) => (item as string).trim()).filter(Boolean)),
    ];
  }

  private record(value: unknown): Record<string, unknown> | null {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  }
}
