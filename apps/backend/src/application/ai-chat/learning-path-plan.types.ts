import { CourseSearchResult } from './retrieval-primitives.types';

export enum LearningPathStepNecessity {
  REQUIRED = 'REQUIRED',
  RECOMMENDED = 'RECOMMENDED',
  UNCERTAIN = 'UNCERTAIN',
}

export enum LearningPathStepCoverage {
  INITIAL_MATCH = 'INITIAL_MATCH',
  SUPPLEMENTAL_CANDIDATES = 'SUPPLEMENTAL_CANDIDATES',
  UNCOVERED = 'UNCOVERED',
  SEARCH_UNAVAILABLE = 'SEARCH_UNAVAILABLE',
}

export type LearningPathPlanStep = {
  sequence: number;
  title: string;
  objective: string;
  requiredSkills: string[];
  rationale: string;
  necessity: LearningPathStepNecessity;
  coverage: LearningPathStepCoverage;
  courseTitles: string[];
  searchQuery: string | null;
  supplementalSearchPerformed: boolean;
};

export type LearningPathPlan = {
  steps: LearningPathPlanStep[];
};

export type LearningPathEnrichmentResult = {
  plan: LearningPathPlan | null;
  supplementalCourses: CourseSearchResult[];
  warnings: string[];
};
