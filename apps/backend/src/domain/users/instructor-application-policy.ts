import { ConflictException } from '@nestjs/common';

export const INSTRUCTOR_REAPPLICATION_WAIT_MS = 5 * 60 * 1000;

export function instructorReapplyAt(application: { status: string; reviewedAt?: Date | string | null } | null): Date | null {
    if (application?.status !== 'DISAPPROVED' || !application.reviewedAt) return null;
    return new Date(new Date(application.reviewedAt).getTime() + INSTRUCTOR_REAPPLICATION_WAIT_MS);
}

export function assertInstructorApplicationAllowed(application: { status: string; reviewedAt?: Date | string | null } | null, now = Date.now()) {
    if (!application) return;
    const reapplyAt = instructorReapplyAt(application);
    if (application.status !== 'DISAPPROVED' || !reapplyAt) {
        throw new ConflictException('An instructor application has already been submitted');
    }
    if (now < reapplyAt.getTime()) {
        throw new ConflictException({
            message: 'Please wait 5 minutes after disapproval before applying again.',
            reapplyAt: reapplyAt.toISOString(),
        });
    }
}
