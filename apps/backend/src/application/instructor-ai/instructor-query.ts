export enum InstructorIntent {
  CREATE_COURSE_STRUCTURE = 'CREATE_COURSE_STRUCTURE',
  CREATE_LEARNING_OUTCOMES = 'CREATE_LEARNING_OUTCOMES',
  DEFINE_COURSE_SKILLS = 'DEFINE_COURSE_SKILLS',
  DEFINE_PREREQUISITES = 'DEFINE_PREREQUISITES',
  DRAFT_POST = 'DRAFT_POST',
  IMPROVE_CONTENT = 'IMPROVE_CONTENT',
  GENERATE_EXAMPLE = 'GENERATE_EXAMPLE',
  SUMMARIZE_SOURCE_FOR_CONTENT = 'SUMMARIZE_SOURCE_FOR_CONTENT',
  REVIEW_COURSE = 'REVIEW_COURSE',
  CHECK_COURSE_COVERAGE = 'CHECK_COURSE_COVERAGE',
  CHECK_DIFFICULTY_CONSISTENCY = 'CHECK_DIFFICULTY_CONSISTENCY',
  CHECK_PREREQUISITE_ALIGNMENT = 'CHECK_PREREQUISITE_ALIGNMENT',
  DETECT_CONTENT_GAPS = 'DETECT_CONTENT_GAPS',
  DETECT_DUPLICATE_CONTENT = 'DETECT_DUPLICATE_CONTENT',
  ASK_ABOUT_OWN_COURSE = 'ASK_ABOUT_OWN_COURSE',
  SEARCH_OWN_CONTENT = 'SEARCH_OWN_CONTENT',
  SUMMARIZE_DISCUSSIONS = 'SUMMARIZE_DISCUSSIONS',
  FIND_COMMON_QUESTIONS = 'FIND_COMMON_QUESTIONS',
  FIND_COMMON_PROBLEMS = 'FIND_COMMON_PROBLEMS',
  FIND_MISCONCEPTIONS = 'FIND_MISCONCEPTIONS',
  ANALYZE_LEARNER_FEEDBACK = 'ANALYZE_LEARNER_FEEDBACK',
  RECOMMEND_COURSE_IMPROVEMENTS = 'RECOMMEND_COURSE_IMPROVEMENTS',
  GENERAL = 'GENERAL',
}

export enum InstructorIntentFamily {
  COURSE_DESIGN = 'COURSE_DESIGN',
  AUTHORING = 'AUTHORING',
  CONTENT_ANALYSIS = 'CONTENT_ANALYSIS',
  LEARNER_INSIGHT = 'LEARNER_INSIGHT',
  RETRIEVAL = 'RETRIEVAL',
  COURSE_IMPROVEMENT = 'COURSE_IMPROVEMENT',
  GENERAL = 'GENERAL',
}

const families: Record<InstructorIntentFamily, readonly InstructorIntent[]> = {
  COURSE_DESIGN: [
    InstructorIntent.CREATE_COURSE_STRUCTURE,
    InstructorIntent.CREATE_LEARNING_OUTCOMES,
    InstructorIntent.DEFINE_COURSE_SKILLS,
    InstructorIntent.DEFINE_PREREQUISITES,
  ],
  AUTHORING: [
    InstructorIntent.DRAFT_POST,
    InstructorIntent.IMPROVE_CONTENT,
    InstructorIntent.GENERATE_EXAMPLE,
    InstructorIntent.SUMMARIZE_SOURCE_FOR_CONTENT,
  ],
  CONTENT_ANALYSIS: [
    InstructorIntent.REVIEW_COURSE,
    InstructorIntent.CHECK_COURSE_COVERAGE,
    InstructorIntent.CHECK_DIFFICULTY_CONSISTENCY,
    InstructorIntent.CHECK_PREREQUISITE_ALIGNMENT,
    InstructorIntent.DETECT_CONTENT_GAPS,
    InstructorIntent.DETECT_DUPLICATE_CONTENT,
  ],
  LEARNER_INSIGHT: [
    InstructorIntent.SUMMARIZE_DISCUSSIONS,
    InstructorIntent.FIND_COMMON_QUESTIONS,
    InstructorIntent.FIND_COMMON_PROBLEMS,
    InstructorIntent.FIND_MISCONCEPTIONS,
    InstructorIntent.ANALYZE_LEARNER_FEEDBACK,
  ],
  RETRIEVAL: [
    InstructorIntent.ASK_ABOUT_OWN_COURSE,
    InstructorIntent.SEARCH_OWN_CONTENT,
  ],
  COURSE_IMPROVEMENT: [InstructorIntent.RECOMMEND_COURSE_IMPROVEMENTS],
  GENERAL: [InstructorIntent.GENERAL],
};
export function instructorIntentFamily(
  intent: InstructorIntent,
): InstructorIntentFamily {
  return (Object.entries(families).find(([, intents]) =>
    intents.includes(intent),
  )?.[0] ?? 'GENERAL') as InstructorIntentFamily;
}

export type InstructorSource = {
  type: 'COURSE' | 'POST' | 'FILE';
  id: string;
  name: string | null;
  courseScope: string | null;
  current: boolean;
};
export type InstructorQuery = {
  intent: InstructorIntent;
  // An index into backend-authorized context, never a model-generated resource ID.
  targetSourceIndex: number | null;
  targetName: string | null;
  topic: string;
  audience: string | null;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | null;
  desiredSkills: string[];
  desiredOutcomes: string[];
  transformation:
    | 'SIMPLIFY'
    | 'SHORTEN'
    | 'EXPAND'
    | 'RESTRUCTURE'
    | 'CLARIFY'
    | null;
  includeDiscussions: boolean;
};

export type InstructorRetrievalPlan = {
  query: InstructorQuery;
  inventory: boolean;
  coverage: boolean;
  community: boolean;
  duplicateCandidates: boolean;
};

export function parseInstructorQuery(
  value: unknown,
  sources: readonly InstructorSource[],
): InstructorQuery {
  if (!value || typeof value !== 'object')
    throw new Error('Invalid instructor query');
  const q = value as InstructorQuery;
  const allowedKeys = [
    'intent',
    'targetSourceIndex',
    'targetName',
    'topic',
    'audience',
    'difficulty',
    'desiredSkills',
    'desiredOutcomes',
    'transformation',
    'includeDiscussions',
  ];
  if (
    Object.keys(q).length !== allowedKeys.length ||
    Object.keys(q).some((k) => !allowedKeys.includes(k))
  )
    throw new Error('Unexpected instructor query fields');
  if (
    !Object.values(InstructorIntent).includes(q.intent) ||
    typeof q.topic !== 'string' ||
    q.topic.length > 2000 ||
    typeof q.includeDiscussions !== 'boolean' ||
    !Array.isArray(q.desiredSkills) ||
    !Array.isArray(q.desiredOutcomes) ||
    [...q.desiredSkills, ...q.desiredOutcomes].some(
      (v) => typeof v !== 'string' || v.length > 500,
    ) ||
    ![q.targetName, q.audience].every(
      (v) => v === null || (typeof v === 'string' && v.length <= 500),
    ) ||
    ![null, 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].includes(q.difficulty) ||
    ![null, 'SIMPLIFY', 'SHORTEN', 'EXPAND', 'RESTRUCTURE', 'CLARIFY'].includes(
      q.transformation,
    ) ||
    (q.targetSourceIndex !== null &&
      (!Number.isInteger(q.targetSourceIndex) ||
        q.targetSourceIndex < 0 ||
        q.targetSourceIndex >= sources.length))
  ) {
    throw new Error(
      'Invalid instructor query or unauthorized source reference',
    );
  }
  return q;
}
