import {
    LEARNER_DIFFICULTY_MODES,
    LEARNER_LEVELS,
    LEARNER_RESOURCE_TYPES,
    LearnerIntent,
} from '../../application/ai-chat/learner-query.types';

const nullableString = { type: ['string', 'null'] } as const;

export const LEARNER_QUERY_SCHEMA = {
    type: 'object',
    properties: {
        intent: {
            type: 'string',
            enum: Object.values(LearnerIntent),
        },
        targets: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: LEARNER_RESOURCE_TYPES,
                    },
                    id: nullableString,
                    name: nullableString,
                },
                required: ['type', 'id', 'name'],
                additionalProperties: false,
            },
        },
        courseScope: nullableString,
        desiredSkills: {
            type: 'array',
            items: { type: 'string' },
        },
        existingSkills: {
            type: 'array',
            items: { type: 'string' },
        },
        desiredOutcomes: {
            type: 'array',
            items: { type: 'string' },
        },
        difficulty: {
            anyOf: [
                {
                    type: 'object',
                    properties: {
                        value: {
                            type: 'string',
                            enum: LEARNER_LEVELS,
                        },
                        mode: {
                            type: 'string',
                            enum: LEARNER_DIFFICULTY_MODES,
                        },
                    },
                    required: ['value', 'mode'],
                    additionalProperties: false,
                },
                { type: 'null' },
            ],
        },
        constraints: {
            type: 'object',
            properties: {
                maxDurationHours: { type: ['number', 'null'] },
                language: nullableString,
            },
            required: ['maxDurationHours', 'language'],
            additionalProperties: false,
        },
        searchQuery: nullableString,
        explanationLevel: {
            type: ['string', 'null'],
            enum: [...LEARNER_LEVELS, null],
        },
        includeDiscussions: { type: 'boolean' },
    },
    required: [
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
    ],
    additionalProperties: false,
} as const;

export const LEARNER_QUERY_FORMAT = {
    type: 'json_schema',
    name: 'rapideia_learner_query',
    strict: true,
    schema: LEARNER_QUERY_SCHEMA,
} as const;
