export enum LearnerIntent {
    FIND_COURSE = 'FIND_COURSE',
    COMPARE_COURSES = 'COMPARE_COURSES',

    CREATE_LEARNING_PATH = 'CREATE_LEARNING_PATH',
    NEXT_LEARNING_STEP = 'NEXT_LEARNING_STEP',
    CHECK_PREREQUISITES = 'CHECK_PREREQUISITES',

    ASK_COURSE = 'ASK_COURSE',
    ASK_POST = 'ASK_POST',
    ASK_FILE = 'ASK_FILE',

    FIND_CONTENT = 'FIND_CONTENT',
    EXPLAIN_CONTENT = 'EXPLAIN_CONTENT',
    SUMMARIZE_CONTENT = 'SUMMARIZE_CONTENT',

    SUMMARIZE_DISCUSSION = 'SUMMARIZE_DISCUSSION',
    SEARCH_DISCUSSION = 'SEARCH_DISCUSSION',

    GENERAL = 'GENERAL',
}

export const LEARNER_RESOURCE_TYPES = ['COURSE', 'POST', 'FILE'] as const;
export type LearnerResourceType = (typeof LEARNER_RESOURCE_TYPES)[number];

export const LEARNER_LEVELS = [
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
] as const;
export type LearnerLevel = (typeof LEARNER_LEVELS)[number];

export const LEARNER_DIFFICULTY_MODES = [
    'PREFERENCE',
    'CONSTRAINT',
] as const;
export type LearnerDifficultyMode =
    (typeof LEARNER_DIFFICULTY_MODES)[number];

export interface LearnerQueryTarget {
    type: LearnerResourceType;
    /** A Rapideia UUID supplied by trusted application context, never invented. */
    id: string | null;
    name: string | null;
}

export interface LearnerQueryDifficulty {
    value: LearnerLevel;
    mode: LearnerDifficultyMode;
}

export interface LearnerQueryConstraints {
    maxDurationHours: number | null;
    language: string | null;
}

/**
 * Nullable fields remain required in structured output. This keeps the
 * TypeScript contract aligned with OpenAI strict JSON Schema output.
 */
export interface LearnerQuery {
    intent: LearnerIntent;
    targets: LearnerQueryTarget[];
    courseScope: string | null;
    desiredSkills: string[];
    existingSkills: string[];
    desiredOutcomes: string[];
    difficulty: LearnerQueryDifficulty | null;
    constraints: LearnerQueryConstraints;
    searchQuery: string | null;
    explanationLevel: LearnerLevel | null;
    includeDiscussions: boolean;
}
