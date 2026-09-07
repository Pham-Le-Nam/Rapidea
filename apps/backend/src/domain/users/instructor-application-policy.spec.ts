import { ConflictException } from '@nestjs/common';
import { assertInstructorApplicationAllowed, instructorReapplyAt } from './instructor-application-policy';

describe('Instructor reapplication cooldown', () => {
    const reviewedAt = new Date('2026-09-07T00:00:00Z');
    const rejected = { status: 'DISAPPROVED', reviewedAt };
    it('allows first applications', () => {
        expect(() => assertInstructorApplicationAllowed(null)).not.toThrow();
    });
    it.each(['PENDING', 'APPROVED'])('blocks an existing %s application', (status) => {
        expect(() => assertInstructorApplicationAllowed({ status, reviewedAt })).toThrow(ConflictException);
    });
    it('blocks until exactly five minutes after the decision', () => {
        expect(instructorReapplyAt(rejected)?.toISOString()).toBe('2026-09-07T00:05:00.000Z');
        expect(() => assertInstructorApplicationAllowed(rejected, reviewedAt.getTime() + 299999)).toThrow(ConflictException);
        expect(() => assertInstructorApplicationAllowed(rejected, reviewedAt.getTime() + 300000)).not.toThrow();
        expect(() => assertInstructorApplicationAllowed(rejected, reviewedAt.getTime() + 600000)).not.toThrow();
    });
    it('does not bypass the wait if a historical decision time is missing', () => {
        expect(() => assertInstructorApplicationAllowed({ status: 'DISAPPROVED', reviewedAt: null })).toThrow(ConflictException);
    });
});
