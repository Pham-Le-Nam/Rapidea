import { LearnerIntent } from '../../application/ai-chat/learner-query.types';
import { LEARNER_QUERY_FORMAT, LEARNER_QUERY_SCHEMA } from './learner-query.schema';

describe('LearnerQuery structured output contract', () => {
    it('contains every supported learner intent', () => {
        expect(LEARNER_QUERY_SCHEMA.properties.intent.enum).toEqual(
            Object.values(LearnerIntent),
        );
    });

    it('uses UUID-compatible strings rather than numeric resource IDs', () => {
        const target = LEARNER_QUERY_SCHEMA.properties.targets.items;
        expect(target.properties.id.type).toEqual(['string', 'null']);
        expect(LEARNER_QUERY_SCHEMA.properties.courseScope.type).toEqual([
            'string',
            'null',
        ]);
    });

    it('marks every object property required and rejects extra properties', () => {
        const visit = (schema: unknown): void => {
            if (!schema || typeof schema !== 'object') return;
            const value = schema as Record<string, unknown>;
            if (value.type === 'object') {
                const properties = value.properties as Record<string, unknown>;
                expect(value.additionalProperties).toBe(false);
                expect(value.required).toEqual(Object.keys(properties));
            }
            Object.values(value).forEach(visit);
        };

        visit(LEARNER_QUERY_SCHEMA);
    });

    it('is configured as a strict Responses API JSON schema', () => {
        expect(LEARNER_QUERY_FORMAT).toMatchObject({
            type: 'json_schema',
            strict: true,
            schema: LEARNER_QUERY_SCHEMA,
        });
    });
});
