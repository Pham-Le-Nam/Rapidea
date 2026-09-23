import {
    LEARNER_DIFFICULTY_MODES,
    LEARNER_LEVELS,
    LEARNER_RESOURCE_TYPES,
    LearnerIntent,
    LearnerQuery,
    LearnerQueryDifficulty,
    LearnerQueryTarget,
    LearnerQueryTrustedContext,
} from './learner-query.types';

const LEARNER_QUERY_KEYS = [
    'intent',
    'targets',
    'courseScope',
    'desiredSkills',
    'existingSkills',
    'desiredOutcomes',
    'difficulty',
    'constraints',
    'searchQuery',
    'explanationLevel',
    'includeDiscussions',
] as const;

export function parseLearnerQuery(value: unknown): LearnerQuery {
    const query = exactObject(value, LEARNER_QUERY_KEYS, 'learner query');
    const intent = enumValue(
        query.intent,
        Object.values(LearnerIntent),
        'intent',
    );
    const targets = arrayValue(query.targets, 'targets').map((target, index) =>
        parseTarget(target, index),
    );
    const difficulty = parseDifficulty(query.difficulty);
    const constraints = exactObject(
        query.constraints,
        ['maxDurationHours', 'language'] as const,
        'constraints',
    );
    const maxDurationHours = nullableNumber(
        constraints.maxDurationHours,
        'constraints.maxDurationHours',
    );
    if (maxDurationHours !== null && maxDurationHours <= 0) {
        throw new Error('constraints.maxDurationHours must be positive');
    }
    if (typeof query.includeDiscussions !== 'boolean') {
        throw new Error('includeDiscussions must be a boolean');
    }

    return {
        intent,
        targets,
        courseScope: nullableString(query.courseScope, 'courseScope'),
        desiredSkills: stringArray(query.desiredSkills, 'desiredSkills'),
        existingSkills: stringArray(query.existingSkills, 'existingSkills'),
        desiredOutcomes: stringArray(query.desiredOutcomes, 'desiredOutcomes'),
        difficulty,
        constraints: {
            maxDurationHours,
            language: nullableString(constraints.language, 'constraints.language'),
        },
        searchQuery: nullableString(query.searchQuery, 'searchQuery'),
        explanationLevel: nullableEnumValue(
            query.explanationLevel,
            LEARNER_LEVELS,
            'explanationLevel',
        ),
        includeDiscussions: query.includeDiscussions,
    };
}

export function constrainLearnerQueryReferences(
    query: LearnerQuery,
    context: readonly LearnerQueryTrustedContext[],
): LearnerQuery {
    const allowedTargets = new Map(
        context.map((item) => [`${item.type}:${item.id}`, item]),
    );
    const allowedCourseScopes = new Set(
        context.flatMap((item) => {
            const scopes = item.courseScope ? [item.courseScope] : [];
            return item.type === 'COURSE' ? [item.id, ...scopes] : scopes;
        }),
    );

    return {
        ...query,
        targets: query.targets.map((target) => {
            if (!target.id) return target;
            const trusted = allowedTargets.get(`${target.type}:${target.id}`);
            if (!trusted) return { ...target, id: null };
            return {
                ...target,
                name: trusted.name ?? target.name,
            };
        }),
        courseScope:
            query.courseScope && allowedCourseScopes.has(query.courseScope)
                ? query.courseScope
                : null,
    };
}

function parseTarget(value: unknown, index: number): LearnerQueryTarget {
    const target = exactObject(
        value,
        ['type', 'id', 'name'] as const,
        `targets[${index}]`,
    );
    return {
        type: enumValue(
            target.type,
            LEARNER_RESOURCE_TYPES,
            `targets[${index}].type`,
        ),
        id: nullableString(target.id, `targets[${index}].id`),
        name: nullableString(target.name, `targets[${index}].name`),
    };
}

function parseDifficulty(value: unknown): LearnerQueryDifficulty | null {
    if (value === null) return null;
    const difficulty = exactObject(
        value,
        ['value', 'mode'] as const,
        'difficulty',
    );
    return {
        value: enumValue(difficulty.value, LEARNER_LEVELS, 'difficulty.value'),
        mode: enumValue(
            difficulty.mode,
            LEARNER_DIFFICULTY_MODES,
            'difficulty.mode',
        ),
    };
}

function exactObject<const TKeys extends readonly string[]>(
    value: unknown,
    keys: TKeys,
    label: string,
): Record<TKeys[number], unknown> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`${label} must be an object`);
    }
    const record = value as Record<string, unknown>;
    const actualKeys = Object.keys(record).sort();
    const expectedKeys = [...keys].sort();
    if (
        actualKeys.length !== expectedKeys.length ||
        actualKeys.some((key, index) => key !== expectedKeys[index])
    ) {
        throw new Error(`${label} has invalid properties`);
    }
    return record as Record<TKeys[number], unknown>;
}

function arrayValue(value: unknown, label: string): unknown[] {
    if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
    return value;
}

function stringArray(value: unknown, label: string): string[] {
    return Array.from(
        new Set(
            arrayValue(value, label).map((item, index) => {
                if (typeof item !== 'string' || !item.trim()) {
                    throw new Error(`${label}[${index}] must be a non-empty string`);
                }
                return item.replace(/\s+/g, ' ').trim();
            }),
        ),
    );
}

function nullableString(value: unknown, label: string): string | null {
    if (value === null) return null;
    if (typeof value !== 'string' || !value.trim()) {
        throw new Error(`${label} must be a non-empty string or null`);
    }
    return value.trim();
}

function nullableNumber(value: unknown, label: string): number | null {
    if (value === null) return null;
    if (typeof value !== 'number' || !Number.isFinite(value)) {
        throw new Error(`${label} must be a finite number or null`);
    }
    return value;
}

function enumValue<const T extends readonly string[]>(
    value: unknown,
    values: T,
    label: string,
): T[number] {
    if (typeof value !== 'string' || !values.includes(value)) {
        throw new Error(`${label} has an unsupported value`);
    }
    return value as T[number];
}

function nullableEnumValue<const T extends readonly string[]>(
    value: unknown,
    values: T,
    label: string,
): T[number] | null {
    return value === null ? null : enumValue(value, values, label);
}
